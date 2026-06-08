const fs = require('fs');
const code = fs.readFileSync('src/main.ts', 'utf8');

// Proper parser for: strings, template literals with ${...} expressions
// Returns line of any unclosed template literal
let i = 0;
const len = code.length;

function getLine(pos) {
  return code.slice(0, pos).split('\n').length;
}

function parseString(quote) {
  i++; // skip opening quote
  while (i < len) {
    const c = code[i];
    if (c === '\\') { i += 2; continue; }
    if (c === quote) { i++; return; }
    i++;
  }
  console.log(`Unclosed string '${quote}' reaching EOF`);
}

// Stack of template literal start positions
const tmplStack = [];
// Stack of brace depths per template expression level
const exprBraceStack = [];
let braceDepth = 0;

function parseTemplateLiteral() {
  const startPos = i;
  i++; // skip opening backtick
  tmplStack.push(startPos);
  
  while (i < len) {
    const c = code[i];
    if (c === '\\') { i += 2; continue; }
    if (c === '`') {
      // closing this template
      tmplStack.pop();
      i++;
      return;
    }
    if (c === '$' && code[i+1] === '{') {
      // start of expression
      i += 2; // skip ${
      exprBraceStack.push(braceDepth);
      braceDepth = 1;
      parseExpression();
      braceDepth = exprBraceStack.pop();
      continue;
    }
    i++;
  }
  console.log(`Unclosed template literal started at line ${getLine(startPos)}`);
}

function parseExpression() {
  // Parse until matching } at braceDepth 0
  while (i < len) {
    const c = code[i];
    if (c === '"' || c === "'") { parseString(c); continue; }
    if (c === '`') { parseTemplateLiteral(); continue; }
    if (c === '{') { braceDepth++; i++; continue; }
    if (c === '}') {
      braceDepth--;
      if (braceDepth === 0) { i++; return; }
      i++;
      continue;
    }
    if (c === '/' && code[i+1] === '/') {
      while (i < len && code[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && code[i+1] === '*') {
      i += 2;
      while (i < len && !(code[i] === '*' && code[i+1] === '/')) i++;
      i += 2;
      continue;
    }
    i++;
  }
  console.log('Unclosed expression ${...}');
}

// Main parse loop
while (i < len) {
  const c = code[i];
  if (c === '"' || c === "'") { parseString(c); continue; }
  if (c === '`') { parseTemplateLiteral(); continue; }
  if (c === '/' && code[i+1] === '/') {
    while (i < len && code[i] !== '\n') i++;
    continue;
  }
  if (c === '/' && code[i+1] === '*') {
    i += 2;
    while (i < len && !(code[i] === '*' && code[i+1] === '/')) i++;
    i += 2;
    continue;
  }
  i++;
}

if (tmplStack.length === 0) {
  console.log('All template literals properly closed!');
} else {
  console.log(`${tmplStack.length} unclosed template literals`);
  tmplStack.forEach(pos => console.log(` - opened at line ${getLine(pos)}`));
}
