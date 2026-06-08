/**
 * Binary search for the line that introduces the unclosed brace.
 * We test progressively smaller halves of the file until we find the exact function.
 */
const {transformSync} = require('./node_modules/esbuild');
const fs = require('fs');
const src = fs.readFileSync('src/main.ts', 'utf8');
const lines = src.split('\n');

function testLines(endLine) {
  const testSrc = lines.slice(0, endLine).join('\n');
  try {
    transformSync(testSrc, {loader: 'ts', target: 'esnext'});
    return true; // OK
  } catch(e) {
    return false; // Error
  }
}

// Binary search: find the first line where introducing the content causes an EOF error
// at the very end of the snippet (not in the middle)
console.log('Binary searching for the line that opens an unclosed block...\n');

// First confirm full file fails
console.log('Full file (3086 lines) parses OK?', testLines(3086));

// Find the last line where the file is valid
let lo = 0, hi = lines.length;
while (lo < hi - 1) {
  const mid = Math.floor((lo + hi) / 2);
  if (testLines(mid)) {
    lo = mid;
  } else {
    hi = mid;
  }
}

console.log('File is valid up to line:', lo);
console.log('Error introduced at line:', lo + 1);
console.log('');
console.log('Lines around the problem:');
for (let i = Math.max(0, lo - 3); i <= Math.min(lines.length - 1, lo + 5); i++) {
  console.log(`  ${i + 1}: ${lines[i]}`);
}
