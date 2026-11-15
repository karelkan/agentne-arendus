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

const isAdjacent = (N, a, b) =>
  Math.abs(Math.floor(a / N) - Math.floor(b / N)) + Math.abs((a % N) - (b % N)) === 1;

test('AC2: 100 mängu iga N kohta – tee läbib kõik ruudud, numbrid kasvavad, vahe ≥ 2, < 1 s', () => {
  for (const N of [5, 6, 7, 8]) {
    const M = N * N, K = Logic.kFor(N);
    const rng = Logic.seededRng(1000 + N);
    let maxMs = 0;
    for (let g = 0; g < 100; g++) {
      const t0 = performance.now();
      const p = Logic.generatePuzzle(N, rng);
      maxMs = Math.max(maxMs, performance.now() - t0);

      assert.equal(p.solution.length, M, `N=${N}: tee pikkus`);
      assert.equal(new Set(p.solution).size, M, `N=${N}: iga ruut täpselt üks kord`);
      for (let i = 1; i < M; i++) {
        assert.ok(isAdjacent(N, p.solution[i - 1], p.solution[i]), `N=${N}: sammud ${i - 1}→${i} pole naabrid`);
      }
      // [...] kopeerib vm-konteksti massiivi selle konteksti massiiviks (deepEqual võrdleb prototüüpe).
      const seq = [...p.solution.map((c) => p.numberAt[c]).filter(Boolean)];
      assert.deepEqual(seq, Array.from({ length: K }, (_, k) => k + 1), `N=${N}: numbrid 1…K järjekorras`);
      assert.equal(p.numberAt[p.solution[0]], 1, `N=${N}: 1 on tee alguses`);
      assert.equal(p.numberAt[p.solution[M - 1]], K, `N=${N}: K on tee lõpus`);
      for (let n = 2; n <= K; n++) {
        assert.ok(p.numberPos[n] - p.numberPos[n - 1] >= 2, `N=${N}: numbrite ${n - 1} ja ${n} vahe < 2`);
      }
    }
    assert.ok(maxMs < 1000, `N=${N}: aeglaseim mäng ${maxMs.toFixed(1)} ms`);
  }
});

test('Generaator annab erinevaid mänge (pole alati maokujuline tee)', () => {
  const rng = Logic.seededRng(42);
  const seen = new Set();
  for (let g = 0; g < 100; g++) seen.add(Logic.generatePuzzle(6, rng).solution.join(','));
  assert.ok(seen.size >= 95, `100 mängust ainult ${seen.size} erinevat`);
});

test('Sama seeme → sama mäng', () => {
  const a = Logic.generatePuzzle(7, Logic.seededRng(7));
  const b = Logic.generatePuzzle(7, Logic.seededRng(7));
  assert.deepEqual(a.solution, b.solution);
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
