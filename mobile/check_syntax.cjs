const fs = require('fs');
const src = fs.readFileSync('src/main.ts', 'utf8');

// Count backticks (naive)
let backtickCount = 0;
for (let i = 0; i < src.length; i++) {
  if (src[i] === '`') backtickCount++;
}
console.log('Backtick count:', backtickCount, backtickCount % 2 === 0 ? '(EVEN - OK)' : '(ODD - PROBLEM!)');

// Count braces (naive, outside strings)
let braces = 0;
let inString = false;
let stringChar = '';
for (let i = 0; i < src.length; i++) {
  const c = src[i];
  if (!inString && (c === '"' || c === "'" || c === '`')) {
    inString = true; stringChar = c;
  } else if (inString && c === stringChar && src[i-1] !== '\\') {
    inString = false;
  } else if (!inString) {
    if (c === '{') braces++;
    else if (c === '}') braces--;
  }
}
console.log('Brace balance:', braces, braces === 0 ? '(OK)' : '(UNBALANCED!)');

// Check for null bytes or weird chars
let suspicious = [];
for (let i = 0; i < src.length; i++) {
  const code = src.charCodeAt(i);
  if (code === 0 || (code > 127 && code < 160)) {
    suspicious.push({ index: i, code, context: src.slice(Math.max(0, i-10), i+10) });
  }
}
if (suspicious.length > 0) {
  console.log('Suspicious chars found:', suspicious.length);
  suspicious.slice(0, 5).forEach(s => console.log('  at', s.index, 'code', s.code, 'context:', JSON.stringify(s.context)));
} else {
  console.log('No suspicious chars found');
}

// Check for incomplete template literals - find last backtick and what surrounds it
const lines = src.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('`') && !line.trim().startsWith('//')) {
    const count = (line.match(/`/g) || []).length;
    if (count % 2 !== 0) {
      console.log(`Line ${idx + 1} has odd backtick count (${count}):`, line.trim().slice(0, 80));
    }
  }
});
