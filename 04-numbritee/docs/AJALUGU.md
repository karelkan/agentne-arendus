# Numbritee: loomise ajalugu

Mäng valmis 15.–16. novembril 2026 agentse arenduse töövoo järgi: **spec → ülevaatus → plaan → kood → kontroll**.

## 1. Spec intervjuuga

- Kõigepealt tehti skill `spec-interview`. Agent küsib teemade kaupa: mida ja miks, eesmärgid, non-goals, nõuded, vastuvõtukriteeriumid, valmis-definitsioon. Ettepanekud koostab agent, inimene kinnitab või parandab.
- Idee: NxN ruudustik (N = 5–8), üks tee läbib kõik ruudud ja ühendab numbrid järjekorras, mäng loeb aega ja tagasivõtteid. Igal mängul peab olema lahendus. Selleks genereeritakse kõigepealt tee ja numbrid paigutatakse selle peale.
- Tulemus: 11 funktsionaalset ja 4 mittefunktsionaalset nõuet, 12 vastuvõtukriteeriumi (AC).

## 2. Speci ülevaatus

- Skill `spec-review` käivitas paralleelselt kolm ülevaatajat: lihtsustaja, ehitaja ja kasutaja. C4 kaardi eksperte polnud, sest koodi ja L3 kaarti veel polnud.
- Kindlad leiud rakendati kohe (nt tee algoleku definitsioon, „K-st edasi ei saa“, M4 mõõdetavus). Eriarvamused ja ulatuse küsimused otsustas inimene: vihje lõikab teed, kontrollitakse ainult Chrome'is, tee tõmmatakse ainult lohistades, reeglitekst on alati nähtav, klaviatuur on non-goal.
- Muudatusi oli 18 kohas. Lõpuks oli AC-sid 15.

## 3. Plaan ja kood

- Plaan: 11 sammu, iga samm on eraldi commit. Üks HTML-fail kahe plokiga: `script#logic` (puhas loogika ilma DOM-ita) ja `script#ui`. `test.mjs` laeb loogikaploki `node:vm` abil, npm-i pole vaja.
- Sammud 1–5 (loogika) tehti testidega ükshaaval: generaator (maokujuline tee + *backbite*-segamine, N=8 keskmiselt 0,5 ms), reeglid, lohistamine, vihje. Kokku 23 testi.
- Sammud 6–10 (UI) tehti korraga ja kontrolliti headless Chrome'i ekraanipiltide ja simuleeritud lohistamisega.

## 4. Mis teel juhtus

- Kolm korda kukkus test läbi testi enda vea tõttu, mitte koodi tõttu. vm-kontekstil on oma `RangeError` ja `Array` klass, mistõttu klassi järgi võrdlemine ei tööta. Ühe testi kommentaaris oli vale ruudustiku joonis.
- Headless Chrome ei luba nii kitsast akent, seega lõikas ta 375 px pildi ära. 375 px kontrolliti iframe'i kaudu.
- Rõhtpaigutuses olid read eri kõrgusega, sest puudus `grid-template-rows`.
- C4 L3 kaardil pani `test.mjs` kast nooled teiste kastide kohale. Testid jäid diagrammilt välja ja on kirjas täpis.

## 5. Seis

- Valmis: kõik funktsioonid, 23 automaattesti, README, C4 kaardid L1–L3.
- Ootel: AC5 (lohistamine sõrmega) ja AC15 (seis jääb pööramisel alles). Need kontrollitakse päris telefonis pärast GitHubi avaldamist.
