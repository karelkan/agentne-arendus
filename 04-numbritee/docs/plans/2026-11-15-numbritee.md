# Numbritee: spetsifikatsioon

- **Kuupäev:** 2026-11-15
- **Staatus:** kinnitatud
- **Kaust:** 04-numbritee

## Mida ja miks
Brauserimäng NxN ruudustikul (N = 5–8). Mängija tõmbab ühe katkematu tee, mis läbib numbrid 1…K kasvavas järjekorras ja külastab iga ruutu täpselt ühe korra. Tee liigub ainult üles, alla, vasakule ja paremale. Mäng loeb aega ja tagasivõtteid. Õppeprojekt endale: agentse arenduse töövoo harjutamine.

## Eesmärgid
1. Mängija saab valida ruudustiku suuruse 5–8 ja alustada uut mängu.
2. Igal genereeritud mängul on vähemalt üks lahendus.
3. Mängija saab hiire või puutega (ka mobiilis) tõmmata tee ja seda samm-sammult tagasi võtta.
4. Mäng tunneb võidu ise ära ning näitab aega, tagasivõtete ja vihjete arvu.
5. Projekt on ehitatud agentse arenduse töövoo järgi: spec → plaan → kood → kontroll AC-de vastu.

## Non-goals
Projekt teadlikult **ei** tee järgmist:
- Edetabel ega serveripool (backend puudub)
- Kasutajakontod ega sisselogimine
- Päevamäng ega tulemuse jagamine
- Vihje ei arvesta alternatiivseid lahendusi: „õige“ on ainult generaatori tee
- Klaviatuuriga mängimine
- Pooleli mängu taastamine pärast lehe sulgemist või uuesti laadimist

## Nõuded

### Funktsionaalsed
| ID | Nõue | Prioriteet |
|---|---|---|
| F1 | Lehe avamisel genereeritakse kohe mäng vaikimisi suurusega N=6. Mängija valib suuruse N = 5–8. „Uus mäng“ genereerib uue mängu. | Peab |
| F2 | Generaator loob juhusliku tee, mis läbib kõik ruudud, ja paigutab selle peale numbrid 1…K. K sõltub suurusest: N=5→6, 6→9, 7→12, 8→15. 1 on tee alguses, K lõpus. Numbrid 2…K−1 jaotatakse tee peale ühtlaselt, igaüks juhusliku nihkega. Naabernumbrite vahe tee peal on vähemalt 2 sammu. | Peab |
| F3 | Tee algab ruudust „1“ ja seda pikendatakse ainult naaberruutu, mida pole veel külastatud. Tee algolek on [ruut 1], pikkus 0. Tee pikkus = sammude arv = ruutude arv tees miinus 1. Käik = tee pikendamine ühe ruudu võrra. | Peab |
| F4 | Numbriga ruutu saab astuda ainult siis, kui see on järjekorras järgmine number. Ruudust K ei saa teed edasi pikendada. | Peab |
| F5 | Tee tõmbamine töötab hiire ja puutega ainult lohistades (klõpse ei ole). Kui lohistamisel jäävad sündmuste vahele ruudud samas reas või veerus, lisatakse need järjest F3/F4 reeglite järgi. Diagonaalset hüpet ignoreeritakse. Lohistamine tee eelviimasele ruudule eemaldab viimase sammu ja loeb tagasivõtteks. | Peab |
| F6 | „Tagasi“ eemaldab tee viimase sammu. Tagasivõtete arv kuvatakse. Kui tee pikkus on 0, ei tee „Tagasi“ midagi ega suurenda loendurit. | Peab |
| F7 | Taimer käivitub esimesest käigust ja peatub võiduga | Peab |
| F8 | Võit = kõik N² ruutu on läbitud ja tee lõpeb ruudus K. Kuvatakse aeg, tagasivõtted ja vihjed, edasised käigud on blokeeritud. | Peab |
| F9 | Vihje ilmub ainult nupuvajutusel: järgmine õige ruut (generaatori tee järgi) vilgub ~1,5 s. Viimane õige ruut = mängija tee ja generaatori tee pikima ühise alguse viimane ruut. Kui mängija tee on sellest pikem, lõigatakse see selle ruuduni ilma tagasivõtete trahvita ja seejärel vilgub järgmine ruut. Vihje käivitab taimeri, kui see veel ei käi. Võidu järel on vihjenupp blokeeritud. Vihjete arv kuvatakse. | Peab |
| F10 | „Alusta uuesti“ tühjendab sama mängu tee, taimeri ja loendurid. „Alusta uuesti“ ja „Uus mäng“ töötavad ka võidu järel ja eemaldavad käikude blokeeringu. | Peab |
| F11 | Parim aeg iga N kohta salvestatakse localStorage'isse, aga ainult vihjeteta võidust. Kui localStorage pole kättesaadav, töötab mäng ilma selleta. | Võiks |
| F12 | Ruudustiku kohal on alati nähtav reeglitekst (1–2 lauset): ühenda numbrid järjekorras ja läbi iga ruut täpselt üks kord | Peab |

### Mittefunktsionaalsed
| ID | Nõue | Prioriteet |
|---|---|---|
| M1 | Mäng on üks HTML-fail (HTML, CSS ja JS), ilma sõltuvuste ja build-sammuta. Mänguloogika on plokis `<script id="logic">`. Testid on eraldi failis `test.mjs`, mis loeb selle ploki sisse ja käivitub käsuga `node test.mjs` ilma npm-sõltuvusteta. | Peab |
| M2 | Töötab Chrome'i viimases stabiilses versioonis arvutis ja DevToolsi mobiiliemulatsioonis | Peab |
| M3 | Ruudustik mahub 375 px laiusele ekraanile ilma horisontaalse kerimiseta. Tõmbamine ei keri lehte. | Peab |
| M4 | Generaatori funktsioon loob N=8 korral mängu alla 1 s. Mõõdetakse automaattestis (Node, arendaja arvuti) 100 järjestikuse mängu maksimumajana. | Peab |
| M5 | Ekraani pööramine või akna suuruse muutmine ei muuda tee, taimeri ega loendurite seisu. Ruudustik mahub ekraanile ka rõhtpaigutuses. | Peab |

## Vastuvõtukriteeriumid
- **AC1 → F1:** Kui valin N=7 ja vajutan „Uus mäng“, siis kuvatakse 7×7 ruudustik numbritega 1…12. Iga vajutus genereerib uue mängu (uus generaatori kutse) ning taimer ja loendurid on nullis.
- **AC2 → F2, M4:** Kui genereerin iga N kohta 100 mängu, siis igal mängul on tee, mis läbib kõik ruudud ja numbrid kasvavas järjekorras, naabernumbrite vahe tee peal on vähemalt 2 sammu ning iga mäng genereeritakse alla 1 s.
- **AC3 → F3:** Kui proovin minna diagonaalis, kaugemale kui naaberruutu või juba külastatud ruutu (v.a eelviimane teeruut, vt AC13), siis teed ei pikendata.
- **AC4 → F4:** Kui järgmine number on 3 ja proovin astuda ruutu „4“, siis teed ei pikendata. Kui tee on jõudnud ruutu K ja läbimata ruute on alles, siis teed edasi ei pikendata.
- **AC5 → F5, M3:** Kui avan mängu 375 px laiusel ekraanil ja lohistan sõrmega üle ruutude, siis tee pikeneb ja leht ei kerita.
- **AC6 → F6:** Kui tee pikkus on 5 sammu ja vajutan „Tagasi“ kaks korda, siis tee pikkus on 3 ja kuvatakse „Tagasivõtted: 2“. Kui tee pikkus on 0, ei muuda „Tagasi“ midagi.
- **AC7 → F7:** Kui mäng on laetud, näitab taimer 0:00. Esimese tee pikendamisega taimer käivitub ja võiduga peatub.
- **AC8 → F8:** Kui läbin kõik ruudud ja lõpetan ruudus K, siis kuvatakse võiduteade aja, tagasivõtete ja vihjete arvuga ning edasised käigud on blokeeritud.
- **AC9 → F9:** Kui vajutan „Vihje“, siis järgmine õige ruut vilgub ~1,5 s ja vihjete loendur suureneb 1 võrra. Ilma nupuvajutuseta vihjet ei näidata.
- **AC10 → F9:** Kui tee on generaatori teest kõrvale läinud ja vajutan „Vihje“, siis tee lõigatakse viimase õige ruuduni ja tagasivõtete loendur ei muutu.
- **AC11 → F10:** „Alusta uuesti“ jätab numbrid samaks ja tühjendab tee, taimeri ja loendurid. Pärast võitu saab mõlema nupuga uuesti mängida.
- **AC12 → F11:** Kui võidan mängu N=6 ilma vihjeteta senisest parema ajaga, siis on pärast lehe uuesti laadimist näha uus parim aeg. Vihjega võit parimat aega ei muuda.
- **AC13 → F5, F6:** Kui lohistan tee viimasest ruudust eelviimasele, siis tee lüheneb 1 sammu võrra ja tagasivõtete loendur suureneb 1 võrra.
- **AC14 → F1, F12:** Kui avan lehe esimest korda, siis näen kohe 6×6 mängu ja reeglitekst on nähtav ilma ühtegi nuppu vajutamata.
- **AC15 → M5:** Kui tee on pooleli ja pööran ekraani (DevToolsis portree ↔ rõhtpaigutus), siis tee, taimer ja loendurid jäävad samaks ning ruudustik mahub ekraanile ilma kerimiseta.

## Valmis-definitsioon
- [ ] Kõik vastuvõtukriteeriumid on käsitsi või testiga kontrollitud (AC5 võib kontrollida DevToolsi mobiiliemulatsiooniga)
- [ ] Generaatori ja käigureeglite loogikal on automaattestid, mis lähevad läbi
- [ ] Kood ja dokumendid on commititud

## Avatud küsimused ja riskid
- **Mitu lahendust:** vihje võib lõigata mängija õige, aga generaatori teest erineva tee. See piirang on teadlikult aktsepteeritud (vt Non-goals).
