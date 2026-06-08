const fs = require('fs');
const src = fs.readFileSync('src/main.ts', 'utf8');
const lines = src.split('\n');

// Track brace depth per line (ignoring strings/template literals for simplicity)
let depth = 0;
let inLineComment = false;
let inBlockComment = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let lineDepthChange = 0;
  
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    const next = line[j+1];
    
    if (inBlockComment) {
      if (c === '*' && next === '/') { inBlockComment = false; j++; }
      continue;
    }
    if (c === '/' && next === '/') { break; } // line comment
    if (c === '/' && next === '*') { inBlockComment = true; j++; continue; }
    // Skip strings (naive)
    if (c === '"' || c === "'" || c === '`') {
      const delim = c;
      j++;
      while (j < line.length && line[j] !== delim) {
        if (line[j] === '\\') j++;
        j++;
      }
      continue;
    }
    if (c === '{') { depth++; lineDepthChange++; }
    else if (c === '}') { depth--; lineDepthChange--; }
  }
  
  // Print lines where depth is unusually high or goes negative
  if (depth < 0) {
    console.log(`Line ${i+1} [depth=${depth}] NEGATIVE DEPTH: ${line.trim().slice(0, 80)}`);
  }
}

console.log(`\nFinal brace depth: ${depth} (should be 0)`);

// Now find the function where the imbalance starts
// Re-scan and track function opens
depth = 0;
let maxDepth = 0;
let funcStack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const prevDepth = depth;
  let inBlockCmt = false;
  
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    const next = line[j+1];
    if (inBlockCmt) { if (c === '*' && next === '/') { inBlockCmt = false; j++; } continue; }
    if (c === '/' && next === '/') break;
    if (c === '/' && next === '*') { inBlockCmt = true; j++; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const d = c; j++;
      while (j < line.length && line[j] !== d) { if (line[j] === '\\') j++; j++; }
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') depth--;
  }
  
  // Track when depth gets to specific values (look for the last +1 that never closes)
  if (depth > maxDepth) maxDepth = depth;
}

console.log('Max depth reached:', maxDepth);

// Find deepest unclosed block - scan backward from end
depth = 0;
const depthAtLine = [];
let inBC = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const c = line[j]; const next = line[j+1];
    if (inBC) { if (c === '*' && next === '/') { inBC = false; j++; } continue; }
    if (c === '/' && next === '/') break;
    if (c === '/' && next === '*') { inBC = true; j++; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const d = c; j++;
      while (j < line.length && line[j] !== d) { if (line[j] === '\\') j++; j++; }
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') depth--;
  }
  depthAtLine.push(depth);
}

// Find the first line where we reach the extra brace that never closes
// The final depth is 1, so we need to find the line where depth first reached 1 from 0
// and never went back to 0
let firstExtraAt = -1;
for (let i = depthAtLine.length - 1; i >= 0; i--) {
  if (depthAtLine[i] >= 1) firstExtraAt = i;
  else break;
}
console.log('\nThe unclosed brace block starts around line:', firstExtraAt + 1);
if (firstExtraAt >= 0) {
  const start = Math.max(0, firstExtraAt - 2);
  const end = Math.min(lines.length - 1, firstExtraAt + 5);
  for (let i = start; i <= end; i++) {
    console.log(`  Line ${i+1}: ${lines[i]}`);
  }
}
