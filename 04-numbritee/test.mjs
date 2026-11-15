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

// Käsitsi koostatud 5×5 mäng. Lahendus on maokujuline (rida 0 →, rida 1 ←, …).
// Ruutude indeksid:     Numbrid:
//  0  1  2  3  4        1  .  2  .  .
//  5  6  7  8  9        .  .  4  .  3
// 10 11 12 13 14        .  .  .  .  .
// 15 16 17 18 19        .  .  .  .  5
// 20 21 22 23 24        .  .  .  .  6
function snakePuzzle() {
  const N = 5, K = 6;
  const solution = [0, 1, 2, 3, 4, 9, 8, 7, 6, 5, 10, 11, 12, 13, 14, 19, 18, 17, 16, 15, 20, 21, 22, 23, 24];
  const numberPos = [undefined, 0, 2, 5, 7, 15, 24];
  const numberAt = new Array(N * N).fill(0);
  for (let n = 1; n <= K; n++) numberAt[solution[numberPos[n]]] = n;
  return { N, K, solution, numberAt, numberPos };
}
const walk = (state, cells) => cells.reduce(Logic.extend, state);

test('Algolek: tee = [ruut 1], pikkus 0, loendurid nullis (F3)', () => {
  const s = Logic.newState(snakePuzzle());
  assert.deepEqual([...s.path], [0]);
  assert.equal(s.undos, 0);
  assert.equal(s.started, false);
});

test('AC3: diagonaal, hüpe ja külastatud ruut ei pikenda teed', () => {
  const s = walk(Logic.newState(snakePuzzle()), [1]); // tee 0 → 1
  assert.equal(Logic.extend(s, 7), s, 'diagonaal 1 → 7');
  assert.equal(Logic.extend(s, 3), s, 'hüpe 1 → 3');
  assert.equal(Logic.extend(s, 0), s, 'külastatud ruut 0');
  assert.equal(Logic.extend(s, 13), s, 'kaugel olev ruut 13');
  assert.equal(Logic.extend(s, 2).path.length, 3, 'õige naaber 2 on lubatud');
});

test('AC4: kui järgmine on 3, ei saa astuda ruutu „4“', () => {
  const s = walk(Logic.newState(snakePuzzle()), [1, 2]); // jõudsime numbrini 2
  assert.equal(s.reached, 2);
  assert.equal(Logic.extend(s, 7), s, 'ruut 7 on number 4');
  const ok = Logic.extend(s, 3);
  assert.equal(ok.path.length, 4, 'numbrita ruut 3 on lubatud');
});

test('AC4: ruudust K ei saa edasi, kui läbimata ruute on alles', () => {
  const p = snakePuzzle();
  const s = walk(Logic.newState(p), [...p.solution.slice(1, 16), 24]); // …19 (5) → 24 (6 = K)
  assert.equal(Logic.tail(s), 24);
  assert.equal(s.reached, 6);
  assert.equal(s.won, false);
  assert.equal(Logic.extend(s, 23), s);
});

test('AC6: 5 sammu, 2× tagasi → 3 sammu, tagasivõtted 2; tühjal teel tagasi ei tee midagi', () => {
  let s = walk(Logic.newState(snakePuzzle()), [1, 2, 3, 4, 9]);
  assert.equal(s.path.length - 1, 5);
  s = Logic.undo(Logic.undo(s));
  assert.equal(s.path.length - 1, 3);
  assert.equal(s.undos, 2);
  const empty = Logic.newState(snakePuzzle());
  assert.equal(Logic.undo(empty), empty);
});

test('Tagasivõtt numbriga ruudult vähendab reached-väärtust', () => {
  let s = walk(Logic.newState(snakePuzzle()), [1, 2, 3, 4, 9]); // 9 = number 3
  assert.equal(s.reached, 3);
  s = Logic.undo(s);
  assert.equal(s.reached, 2);
  assert.equal(Logic.extend(s, 9).reached, 3, 'number 3 on jälle lubatud');
});

test('AC8: kogu lahendus läbitud → võit, edasised käigud ja tagasivõtt on blokeeritud', () => {
  const p = snakePuzzle();
  const s = walk(Logic.newState(p), p.solution.slice(1));
  assert.equal(s.won, true);
  assert.equal(Logic.undo(s), s);
  assert.equal(Logic.extend(s, 23), s);
});

test('Võit genereeritud mängus N=5…8, kui käia lahendus läbi', () => {
  for (const N of [5, 6, 7, 8]) {
    const p = Logic.generatePuzzle(N, Logic.seededRng(N));
    assert.equal(walk(Logic.newState(p), p.solution.slice(1)).won, true, `N=${N}`);
  }
});

test('Esimene käik märgib mängu alustatuks (F7); restart tühjendab (F10)', () => {
  const s = walk(Logic.newState(snakePuzzle()), [1, 2]);
  assert.equal(s.started, true);
  const r = Logic.restart(Logic.undo(s));
  assert.deepEqual([...r.path], [0]);
  assert.equal(r.undos, 0);
  assert.equal(r.started, false);
  assert.equal(r.puzzle, s.puzzle, 'numbrid jäävad samaks');
});

test('AC13: lohistamine eelviimasele ruudule lühendab teed 1 võrra ja loeb tagasivõtteks', () => {
  const s = Logic.dragTo(walk(Logic.newState(snakePuzzle()), [1, 2, 3]), 2);
  assert.deepEqual([...s.path], [0, 1, 2]);
  assert.equal(s.undos, 1);
});

test('Lohistamine kaks ruutu tagasi = kaks tagasivõttu', () => {
  const s = Logic.dragTo(walk(Logic.newState(snakePuzzle()), [1, 2, 3]), 1);
  assert.deepEqual([...s.path], [0, 1]);
  assert.equal(s.undos, 2);
});

test('Vahele jäänud ruudud samas reas või veerus lisatakse järjest (F5)', () => {
  const s = Logic.dragTo(Logic.newState(snakePuzzle()), 3);
  assert.deepEqual([...s.path], [0, 1, 2, 3]);
  assert.equal(s.reached, 2);
  const down = Logic.dragTo(walk(Logic.newState(snakePuzzle()), [1]), 21);
  assert.deepEqual([...down.path], [0, 1, 6, 11, 16, 21]);
});

test('Lohistamine peatub esimese keelatud sammu ees', () => {
  // tee 0→1→2 (number 2), alla veerus: 7 on number 4 → keelatud kohe
  const s = walk(Logic.newState(snakePuzzle()), [1, 2]);
  assert.equal(Logic.dragTo(s, 17), s);
  // tee 0→1, paremale ruuduni 4: 2 (number 2), 3, 4 lubatud
  assert.deepEqual([...Logic.dragTo(walk(Logic.newState(snakePuzzle()), [1]), 4).path], [0, 1, 2, 3, 4]);
});

test('Diagonaalne hüpe ja sama ruut ei muuda olekut; võidu järel lohistamine ei tööta', () => {
  const s = walk(Logic.newState(snakePuzzle()), [1]);
  assert.equal(Logic.dragTo(s, 7), s, 'diagonaal');
  assert.equal(Logic.dragTo(s, 13), s, 'muu hüpe');
  assert.equal(Logic.dragTo(s, 1), s, 'sama ruut');
  const p = snakePuzzle();
  const won = walk(Logic.newState(p), p.solution.slice(1));
  assert.equal(Logic.dragTo(won, 23), won);
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
