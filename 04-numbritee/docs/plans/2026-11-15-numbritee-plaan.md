# Numbritee: implementatsiooniplaan

- **Kuupäev:** 2026-11-15
- **Spec:** [2026-11-15-numbritee.md](2026-11-15-numbritee.md)
- **Failid:** `04-numbritee/index.html` (mäng), `04-numbritee/test.mjs` (testid)

## Arhitektuur

`index.html` sisaldab kahte skriptiplokki:

1. `<script id="logic">`: **puhas loogika**, ilma DOM-i viideteta. Kõik funktsioonid saavad oleku sisendiks ja tagastavad uue oleku. Juhuslikkus tuleb parameetrina `rng` (vaikimisi `Math.random`), et testid saaksid kasutada kindla seemnega generaatorit.
2. `<script id="ui">`: joonistamine, Pointer Events, taimer, localStorage. Kutsub loogikafunktsioone.

`test.mjs` loeb `index.html` faili, võtab välja `<script id="logic">` sisu, käivitab selle `node:vm` kontekstis ja testib funktsioone `node:assert` abil. Käivitamine: `node test.mjs`. npm-sõltuvusi ei ole (M1).

### Andmemudel

- Ruut = indeks `i = rida * N + veerg`.
- `puzzle = { N, K, solution: number[], numbers: Map<ruut, number> }`. `solution` on generaatori tee (N² ruutu).
- `state = { puzzle, path: number[], undos, hints, won, startedAt }`. `path[0]` on alati ruut „1“ (F3).

### Generaator (F2, M4)

1. Alusta maokujulisest teest (rida vasakult paremale, järgmine paremalt vasakule).
2. Tee N²·20 juhuslikku **backbite**-sammu. Vali juhuslikult tee algus või lõpp. Lõpu `e` puhul vali selle juhuslik naaber `v = path[j]`, mis pole tees `e` kõrval. Uus tee = `path[0..j] + reverse(path[j+1..])`, seega serv `v–path[j+1]` kaob ja tekib serv `v–e`. Algus on peegelpilt. Tee jääb alati kehtivaks, iga samm on O(N²) ja N=8 korral võtab kogu generaator millisekundeid.
3. Lõpus pööra tee juhuslikult ümber, et ruut „1“ ei oleks alati samas otsas.
4. Numbrid: 1 → `solution[0]`, K → `solution[N²−1]`. Numbrid 2…K−1 → indeksid `round(j · (N²−1)/(K−1)) + nihe`, kus nihe on juhuslik vahemikus ±⌊samm/3⌋. Kontrolli, et naabernumbrite vahe on vähemalt 2.

## Sammud

Iga samm lõpeb sellega, et `node test.mjs` läheb läbi. Pärast iga sammu tuleb commit.

| # | Samm | Spec | AC | Kontroll |
|---|---|---|---|---|
| 1 | Skelett: `index.html` kahe tühja skriptiplokiga, `test.mjs` koos plokki laadimise ja ühe näidistestiga | M1 | – | `node test.mjs` |
| 2 | `generatePuzzle(N, rng)`: backbite-tee ja numbrite paigutus, K tabeli järgi | F2, M4 | AC2 | test: 100 mängu iga N kohta. Tee on täielik, naabrid on külgnevad, numbrid kasvavad, vahe on ≥ 2, max aeg on < 1 s |
| 3 | Reeglid: `newState`, `canExtend`, `extend`, `undo`, `isWon`. K-st edasi ei saa. | F3, F4, F6, F8 | AC3, AC4, AC6, AC8 | testid: diagonaal, hüpe, külastatud ruut, vale number, K enne lõppu, tagasivõtt tühjal teel, võit |
| 4 | Lohistamise loogika: `dragTo(state, ruut)`. Ruut on eelviimane → undo. Sama rea või veeru vahe → lisa vaheruudud järjest. Diagonaal → ignoreeri. | F5, F6 | AC13 | testid: tagasi lohistamine suurendab `undos`, rea vahe täidetakse, diagonaal ei muuda teed |
| 5 | Vihje: `hint(state)` → `{ state, target }`. Pikim ühine algus `solution`-iga, lõikamine ilma trahvita, `hints++`. Võidu järel ei tee midagi. | F9 | AC10 (+ loogika osa AC9) | testid: õigel teel lõikamist pole, kõrvalekalde korral lõigatakse, `undos` ei muutu |
| 6 | UI: ruudustik (CSS grid, `min(92vw, 92vh)`), numbrid, tee joon, suuruse valik (vaikimisi 6), „Uus mäng“, „Alusta uuesti“, „Tagasi“, reeglitekst, loendurid | F1, F10, F12, M3, M5 | AC1, AC11, AC14, AC15 | käsitsi: Chrome + DevTools 375 px, pööramine |
| 7 | Pointer Events: `pointerdown/move/up`, `elementFromPoint`, `touch-action: none` ruudustikul (leht ei keri) | F5, M2, M3 | AC5 | käsitsi: DevToolsi mobiiliemulatsioon |
| 8 | Taimer (käivitub esimesest käigust või vihjest) ja võiduteade (aeg, tagasivõtted, vihjed), käikude blokeering | F7, F8 | AC7, AC8 | käsitsi + loogika test sammust 3 |
| 9 | Vihje UI: nupp, `target` vilgub 1,5 s (CSS animatsioon), loendur | F9 | AC9 | käsitsi |
| 10 | Parim aeg: localStorage `numbritee.best.<N>`, ainult siis kui `hints === 0`, `try/catch` ümber | F11 | AC12 | käsitsi: võit → lehe uuesti laadimine |
| 11 | README (käivitamine, testid, reeglid) ja DoD kontroll: kõik AC-d läbi, linnukesed tabelisse allpool | – | kõik | – |

## AC kontrolli tabel

Täidetud 2026-11-15. „Suitsutest“ = headless Chrome, sünteetilised Pointer Events (`elementFromPoint` + `dragTo`), mitte päris puude.

| AC | Kuidas kontrolliti | Tulemus |
|---|---|---|
| AC2, AC3, AC4, AC6, AC8, AC10, AC13 | `node test.mjs` (23 testi) | ✅ |
| AC1 | suitsutest: suuruse vahetus → N=8, 64 ruutu, 15 numbrit | ✅ |
| AC7 | ekraanipilt: 0:00 laadimisel; suitsutest: taimer käivitub esimesest käigust, võit peatab | ✅ |
| AC8 (UI) | suitsutest: võidupaneel aja, tagasivõtete ja vihjetega | ✅ |
| AC9 | suitsutest: 1 ruut vilgub, vihjete loendur 1 | ✅ |
| AC11 | suitsutest: „Alusta uuesti“ pärast võitu → sama mäng, uus võit | ✅ |
| AC12 | suitsutest: vihjega võit ei salvesta, vihjeta võit salvestab localStorage'isse; käsitsi: parim aeg jääb alles pärast lehe uuesti laadimist (2026-11-16) | ✅ |
| AC14 | ekraanipilt: kohe 6×6 mäng ja reeglitekst | ✅ |
| AC5 | ekraanipilt 375 px: mahub, ei keri horisontaalselt; suitsutest: lohistamine pikendab teed | ⏳ päris puudega kontrollimata. Kontrollitakse pärast GitHubi avaldamist päris telefonis. |
| AC15 | ekraanipilt 667×375: rõhtpaigutus mahub | ⏳ seisu säilimist pööramisel kontrollimata. Kontrollitakse pärast GitHubi avaldamist päris telefonis. |

## Riskid

- **Pointer Events mobiilis:** `pointermove` sündmus tuleb puudutuse algusruudust. Ruut leitakse `document.elementFromPoint(x, y)` abil, mitte `event.target` järgi.
- **Backbite ühtlus:** väike sammude arv jätab tee maokujuliseks. Kui N²·20 sammust ei piisa, suurenda arvu (M4 jätab selleks palju varu).
