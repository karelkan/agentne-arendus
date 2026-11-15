// Numbritee loogika testid. Käivitamine: node test.mjs (npm-sõltuvusi pole).
// Loeb index.html-ist <script id="logic"> ploki ja käivitab selle node:vm kontekstis.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const html = readFileSync(fileURLToPath(new URL('./index.html', import.meta.url)), 'utf8');
const match = html.match(/<script id="logic">([\s\S]*?)<\/script>/);
if (!match) throw new Error('index.html-ist ei leitud <script id="logic"> plokki');
const Logic = vm.runInNewContext(match[1], {}, { filename: 'index.html#logic' });

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

// --- Testid ---

test('K sõltub N-ist tabeli järgi (F2)', () => {
  assert.deepEqual([5, 6, 7, 8].map(Logic.kFor), [6, 9, 12, 15]);
});

test('N väljaspool 5–8 annab vea', () => {
  // vm-kontekstil on oma RangeError klass, seega võrdleme nime järgi.
  assert.throws(() => Logic.kFor(4), { name: 'RangeError' });
  assert.throws(() => Logic.kFor(9), { name: 'RangeError' });
});

// --- Käivitaja ---

let failed = 0;
for (const { name, fn } of tests) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (err) {
    failed++;
    console.log(`✗ ${name}\n  ${err.message.split('\n').join('\n  ')}`);
  }
}
console.log(`\n${tests.length - failed}/${tests.length} testi läbis`);
process.exitCode = failed ? 1 : 0;
