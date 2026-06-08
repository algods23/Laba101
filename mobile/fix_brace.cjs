/**
 * Proper brace tracker that handles:
 * - Single/double quoted strings
 * - Template literals (with nested ${...})
 * - Line comments  //
 * - Block comments  /* *\/
 */
const fs = require('fs');
const src = fs.readFileSync('src/main.ts', 'utf8');

const lines = src.split('\n');
let i = 0;           // char index
let lineNo = 1;
let depth = 0;
let inLineComment = false;
let inBlockComment = false;
let inString = false;
let stringChar = '';
let templateDepthStack = []; // stack of brace depths when we entered each template literal

// Track what depth each top-level function starts at
const funcEvents = [];

while (i < src.length) {
  const c = src[i];

  // Track line numbers
  if (c === '\n') {
    lineNo++;
    inLineComment = false;
    i++;
    continue;
  }

  // Line comment
  if (!inBlockComment && !inString && !inLineComment && c === '/' && src[i+1] === '/') {
    inLineComment = true;
    i += 2;
    continue;
  }
  if (inLineComment) { i++; continue; }

  // Block comment
  if (!inString && c === '/' && src[i+1] === '*') {
    inBlockComment = true;
    i += 2;
    continue;
  }
  if (inBlockComment) {
    if (c === '*' && src[i+1] === '/') { inBlockComment = false; i += 2; }
    else i++;
    continue;
  }

  // Strings
  if (!inString && (c === '"' || c === "'")) {
    inString = true;
    stringChar = c;
    i++;
    continue;
  }
  if (inString && c === stringChar && src[i-1] !== '\\') {
    inString = false;
    i++;
    continue;
  }
  if (inString) {
    if (c === '\\') i++; // skip escaped char
    i++;
    continue;
  }

  // Template literals
  if (c === '`') {
    // Enter template literal - push current depth onto stack
    templateDepthStack.push({ baseDepth: depth, line: lineNo });
    i++;
    // Now scan until we find the closing backtick (handling ${...} nesting)
    let tplDepth = 0;
    while (i < src.length) {
      const tc = src[i];
      if (tc === '\n') { lineNo++; i++; continue; }
      if (tc === '\\') { i += 2; continue; }  // escape
      if (tc === '`' && tplDepth === 0) {
        // Closing backtick
        templateDepthStack.pop();
        i++;
        break;
      }
      if (tc === '$' && src[i+1] === '{') {
        tplDepth++;
        i += 2;
        // Now we're inside ${...} inside a template - track braces
        let exprDepth = 1;
        while (i < src.length && exprDepth > 0) {
          const ec = src[i];
          if (ec === '\n') { lineNo++; i++; continue; }
          if (ec === '\\') { i += 2; continue; }
          // Handle strings inside ${...}
          if (ec === '"' || ec === "'") {
            const sq = ec; i++;
            while (i < src.length && !(src[i] === sq && src[i-1] !== '\\')) {
              if (src[i] === '\n') lineNo++;
              i++;
            }
            i++; continue;
          }
          // Nested template inside ${...}
          if (ec === '`') {
            i++;
            let innerDepth = 0;
            while (i < src.length) {
              if (src[i] === '\\') { i += 2; continue; }
              if (src[i] === '\n') { lineNo++; i++; continue; }
              if (src[i] === '`' && innerDepth === 0) { i++; break; }
              if (src[i] === '$' && src[i+1] === '{') { innerDepth++; i += 2; continue; }
              if (innerDepth > 0 && src[i] === '}') { innerDepth--; }
              i++;
            }
            continue;
          }
          if (ec === '{') { exprDepth++; depth++; }
          else if (ec === '}') {
            exprDepth--;
            depth--;
            if (exprDepth === 0) { i++; break; }
          }
          i++;
        }
        tplDepth--;
        continue;
      }
      i++;
    }
    continue;
  }

  // Braces
  if (c === '{') {
    depth++;
    i++;
    continue;
  }
  if (c === '}') {
    depth--;
    i++;
    continue;
  }

  i++;
}

console.log('Final depth:', depth, depth === 0 ? '(OK)' : '(UNBALANCED - missing ' + depth + ' closing braces)');

// Now find WHERE the imbalance starts by tracking depth per line
// Re-run and record depth at end of each line
let depth2 = 0;
let lineNo2 = 1;
let ii = 0;
const depthAtEndOfLine = { 0: 0 };
let lineStart = true;

// Simpler version: just find function declarations and report depth
// The key insight: tsc says "}" expected at end of file, meaning depth != 0 at end
// So we need to find which function has an unclosed brace

// Let's check each top-level function: find all "^function" or "^async function" patterns
// and verify they close properly
const funcMatches = [];
for (let li = 0; li < lines.length; li++) {
  const trimmed = lines[li].trimStart();
  if (trimmed.startsWith('function ') || trimmed.startsWith('async function ')) {
    // Only top-level (no leading spaces)
    if (lines[li][0] !== ' ' && lines[li][0] !== '\t') {
      funcMatches.push({ line: li + 1, name: (trimmed.match(/function\s+(\w+)/) || [])[1] || '?' });
    }
  }
}

console.log('\nTop-level functions found:', funcMatches.length);
funcMatches.forEach(f => console.log(`  Line ${f.line}: ${f.name}`));

// Now, we know depth=1 at the end - meaning there's ONE extra open brace.
// The fix is to add one "}" at the end of the file before initApp()
// But let's also determine WHICH function it is by checking the last function.
const lastFunc = funcMatches[funcMatches.length - 1];
console.log('\nLast function:', lastFunc);
console.log('\nConclusion: Need to add 1 closing "}" to main.ts');
