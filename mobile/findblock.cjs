/**
 * Find the unclosed brace by testing each top-level function independently.
 * We add a fake "}" at various positions and see if the error moves.
 */
const {transformSync} = require('./node_modules/esbuild');
const fs = require('fs');
const src = fs.readFileSync('src/main.ts', 'utf8');
const lines = src.split('\n');

// Find all top-level function start lines
const funcLines = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if ((line.startsWith('function ') || line.startsWith('async function ')) && line.includes('{')) {
    funcLines.push(i + 1); // 1-indexed
  }
}
funcLines.push(lines.length + 1); // sentinel

console.log('Found', funcLines.length - 1, 'top-level functions');

// Test the file with an extra "}" inserted at each function boundary
// If adding "}" BEFORE function N makes the error disappear, then function N-1 is unclosed.
function testWithExtraClose(afterLine) {
  const modified = [
    ...lines.slice(0, afterLine),
    '}', // extra closing brace
    ...lines.slice(afterLine),
  ].join('\n');
  
  try {
    transformSync(modified, {loader: 'ts', target: 'esnext', logLevel: 'silent'});
    return true;
  } catch(e) {
    return false;
  }
}

// We need a baseline - where exactly in the file does the problem start?
// Test inserting "}" at each function boundary
for (let i = 0; i < funcLines.length - 1; i++) {
  const insertAfter = funcLines[i] - 1; // insert before this function
  const result = testWithExtraClose(insertAfter);
  const name = (lines[funcLines[i] - 1].match(/function\s+(\w+)/) || ['', '?'])[1];
  console.log(`Insert } before line ${funcLines[i]} (before ${name}): ${result ? 'FIXES ERROR' : 'still broken'}`);
  if (result) {
    console.log('\n>>> The unclosed block is in the function BEFORE line', funcLines[i]);
    if (i > 0) {
      const prevName = (lines[funcLines[i-1] - 1].match(/function\s+(\w+)/) || ['', '?'])[1];
      console.log('>>> That function is:', prevName, 'starting at line', funcLines[i-1]);
    }
    break;
  }
}
