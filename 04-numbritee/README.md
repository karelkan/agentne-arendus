# 04 – Numbritee

Brauserimäng NxN ruudustikul (N = 5–8). Tõmba ruudust 1 alates üks katkematu tee, mis ühendab numbrid kasvavas järjekorras ja läbib iga ruudu täpselt ühe korra. Mäng loeb aega, tagasivõtteid ja vihjeid.

## Käivitamine

Ava `index.html` brauseris. Serverit, paigaldust ega build-sammu pole vaja.

## Reeglid

- Tee algab ruudust **1** ja liigub ainult üles, alla, vasakule ja paremale.
- Numbriga ruutu saab astuda ainult järjekorras (1 → 2 → 3 …). Viimasest numbrist edasi ei saa.
- Võit: kõik ruudud on läbitud ja tee lõpeb viimases numbris.
- Lohista tee otsast. Lohistamine eelmisele ruudule või nupp **Tagasi** eemaldab viimase sammu (loetakse tagasivõtteks).
- **Vihje** vilgutab järgmist õiget ruutu. Kui tee on lahendusest kõrvale läinud, lõigatakse see viimase õige ruuduni ilma tagasivõtete trahvita.
- **Alusta uuesti** tühjendab sama mängu tee. **Uus mäng** või suuruse vahetus genereerib uue mängu.
- Parim aeg salvestatakse iga suuruse kohta brauserisse, aga ainult vihjeteta võidust.

## Testid

```
node test.mjs
```

Testid loevad `index.html`-ist ploki `<script id="logic">` (puhas mänguloogika ilma DOM-ita) ja kontrollivad generaatorit, reegleid, lohistamist ja vihjet. npm-sõltuvusi pole.

## Kuidas see töötab

- **Generaator:** alustab maokujulisest teest läbi kõigi ruutude ja segab seda juhuslike *backbite*-sammudega. Tee jääb alati kehtivaks, seega on igal mängul lahendus. Numbrid paigutatakse selle tee peale ühtlaselt, juhusliku nihkega.
- **Olek** on muutumatu objekt. Iga käik (`extend`, `undo`, `dragTo`, `hint`) tagastab uue oleku. UI plokk `<script id="ui">` ainult joonistab ja kuulab sündmusi.

## Dokumendid

- Spetsifikatsioon: [docs/plans/2026-11-15-numbritee.md](docs/plans/2026-11-15-numbritee.md)
- Implementatsiooniplaan: [docs/plans/2026-11-15-numbritee-plaan.md](docs/plans/2026-11-15-numbritee-plaan.md)
