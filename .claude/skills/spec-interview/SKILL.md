---
name: spec-interview
description: Viib kasutajaga läbi intervjuu uue projekti alustamisel ja kirjutab tulemuse põhjal spetsifikatsiooni (mis ja miks, eesmärgid, non-goals, nõuded, vastuvõtukriteeriumid, valmis-definitsioon) faili NN-nimi/docs/plans/. Kasuta, kui kasutaja alustab uut projekti või proovitööd, palub speci, spetsifikatsiooni, nõuete kirjeldust või intervjuud.
---

# Spec-intervjuu → NN-nimi/docs/plans/

Eesmärk: enne koodi kirjutamist panna kirja, **mida** ehitame, **miks**, ja **kuidas teame, et see on valmis**. Spec on kontekst nii kasutajale kui ka AI-agentidele, seega peab see olema lühike, konkreetne ja kontrollitav. Täitesõnu ära kasuta.

Kogu suhtlus ja spec on **eesti keeles**.

## Põhireeglid

- **Üks teema korraga.** Ära küsi kõike korraga. Ühe vooru kohta esita 1–3 küsimust.
- **Küsimuse vormi vali konteksti järgi:**
  - Kui vastus on avatud („mida?“, „miks?“, „kellele?“), küsi **vabas vormis** tavalise tekstina.
  - Kui variandid on piiritletud (tehnoloogia, platvorm, prioriteet, jah/ei, non-goal kandidaatide kinnitamine), kasuta `AskUserQuestion` tööriista 2–4 variandiga. Kasutaja saab alati ka oma variandi kirjutada („Other“). Soovitatud variant on esimene, märgiga „(soovitus)“.
- **Paku, ära ainult küsi.** Kui kasutaja ei tea, paku 2–3 konkreetset ettepanekut, mille hulgast ta saab valida.
- **Peegelda.** Iga teema lõpus võta ühe-kahe reaga kokku, mida said aru, ja liigu edasi alles siis, kui kasutaja on kinnitanud või parandanud.
- **Selgita žargooni.** Kui kasutad terminit (non-goal, acceptance criteria, DoD), selgita seda esimesel korral ühe lausega ja näitega.
- **Hägusad vastused tee täpseks.** Lause „peab olema kiire“ ei ole kontrollitav. Küsi edasi: „Kui kiire? Näiteks leht laeb alla 2 sekundi?“
- Kui vastus jääb lahtiseks, ära jää selle juurde pidama: kirjuta see jaotisesse „Avatud küsimused“ ja liigu edasi.

## Töövoog

### 0. Kaust

1. Leia repo juur: `git rev-parse --show-toplevel`. Olemasolevad proovitööd leiad käsuga `ls -d [0-9][0-9]-*`.
2. Küsi (`AskUserQuestion`), kuhu spec läheb:
   - **Uus proovitöö kaust** (soovitus): paku järgmist vaba numbrit, nimi tuleb projekti nimest (nt `04-ilmajaam`). Lõplik nimi pannakse paika pärast teemat 1, kui projekt on selgem.
   - **Olemasolev kaust**: loetle olemasolevad.
3. Uut kausta ja selle `README.md` faili loo **alles lõpus** (samm 9) ja ainult kasutaja kinnitusel. Teiste proovitööde kaustu **ära muuda**.

### 1. Mida ja miks

Küsi vabas vormis:
- Mida tahad luua? Kirjelda ühe-kahe lausega.
- Miks? Mis probleemi see lahendab või mida sa sellega õpid?
- Kellele see on? Kes on kasutaja?

### 2. Eesmärgid (goals)

Selgitus: *Eesmärk on tulemus, mille projekt peab saavutama. Mida konkreetsem, seda parem.*

- Paku teema 1 põhjal 3–5 eesmärgi kandidaati. Kasutaja kinnitab, parandab või lisab.
- Iga eesmärk peab olema sõnastatud tulemusena, mitte tegevusena: „Kasutaja näeb kaardil lähimat veekogu“, mitte „Teha kaart“.

### 3. Non-goals

Selgitus: *Non-goal on asi, mida projekt teadlikult **ei tee**, kuigi keegi võiks seda eeldada. Need piiravad ulatust, et ei hakataks lisafunktsioone ehitama. Näide: „Veeleidja ei paku teekonna planeerimist.“*

- Paku 3–5 kandidaati, mis on eesmärkidega loomulikult seotud, kuid mida võiks ka ära jätta (nt kasutajakontod, mobiilirakendus, mitmekeelsus, andmebaas, autentimine, offline-režiim).
- Kasuta `AskUserQuestion` tööriista `multiSelect: true` seadistusega: „Milliseid neist me **ei** tee?“

### 4. Nõuded

- **Funktsionaalsed:** mida süsteem teeb. Iga nõue on eraldi nummerdatud rida (F1, F2, …). Tuleta need eesmärkidest ja küsi, mis on puudu.
- **Mittefunktsionaalsed:** tehnoloogia, platvorm, jõudlus, ligipääsetavus, turvalisus, välised teenused/API-d, piirangud (nt „üks HTML-fail, ilma build-sammuta“). Kus variandid on selged, kasuta valikvastuseid.
- Märgi iga nõude prioriteet: **Peab** / **Võiks**.

### 5. Vastuvõtukriteeriumid (acceptance criteria)

Selgitus: *Vastuvõtukriteeriumid on kontrollitavad laused, mille põhjal saab öelda, kas nõue on täidetud.*

- Kirjuta iga „Peab“-nõude kohta vähemalt üks kriteerium kujul **Eeldus → Tegevus → Tulemus**:
  „Kui kasutaja on kaardivaates (eeldus) ja vajutab „Leia vesi“ (tegevus), siis kuvatakse 3 lähimat veekogu koos kaugusega (tulemus).“
- Kriteerium viitab nõudele (nt `AC1 → F1`).
- Pakkumised koosta ise ja lase kasutajal need kinnitada. Ära lase neil koostada kõike nullist.

### 6. Valmis-definitsioon (Definition of Done)

Selgitus: *DoD on kontrollnimekiri, mis kehtib kogu tööle: kui kõik linnukesed on olemas, on töö valmis.*

Paku `AskUserQuestion` tööriistaga `multiSelect: true` tüüpilised punktid ja lase kasutajal valida või lisada:
- Kõik vastuvõtukriteeriumid on käsitsi või testiga läbi kontrollitud
- Automaattestid on olemas ja lähevad läbi
- `README.md` kirjeldab, mis see on ja kuidas käivitada
- Töötab sihtkeskkonnas (nt brauser, telefon)
- Kood on commititud

### 7. Avatud küsimused ja riskid

Küsi: „Mis on veel ebaselge või mis võib valesti minna?“ Lisa siia ka intervjuu käigus lahtiseks jäänud punktid.

### 8. Mustand ja kinnitus

1. Näita kogu speci mustandit vestluses (malli järgi).
2. Küsi: „Kas kirjutan faili või tahad midagi muuta?“ Paranda, kuni kasutaja kinnitab.

### 9. Kirjutamine

1. Kui kaust on uus, kinnita lõplik nimi `NN-nimi`, loo kaust ja minimaalne `NN-nimi/README.md` (pealkiri, üks lõik kirjeldust, viide specile).
2. Kirjuta spec faili `NN-nimi/docs/plans/YYYY-MM-DD-<lühinimi>.md` (kuupäev on tänane, lühinimi on väiketähtedega ja sidekriipsudega).
3. Raporteeri ühe reaga, kuhu fail tekkis. **Ära commiti**, kui kasutaja seda ei palu.

## Speci mall

```markdown
# <Projekti nimi>: spetsifikatsioon

- **Kuupäev:** YYYY-MM-DD
- **Staatus:** mustand | kinnitatud
- **Kaust:** NN-nimi

## Mida ja miks
<2–4 lauset: mida luuakse, mis probleemi see lahendab, kellele.>

## Eesmärgid
1. ...

## Non-goals
Projekt teadlikult **ei** tee järgmist:
- ...

## Nõuded

### Funktsionaalsed
| ID | Nõue | Prioriteet |
|---|---|---|
| F1 | ... | Peab |

### Mittefunktsionaalsed
| ID | Nõue | Prioriteet |
|---|---|---|
| M1 | ... | Peab |

## Vastuvõtukriteeriumid
- **AC1 → F1:** Kui ..., ja ..., siis ...

## Valmis-definitsioon
- [ ] ...

## Avatud küsimused ja riskid
- ...
```

Tühja jaotist ära jäta välja. Kirjuta sinna „–“ või „Puuduvad“, et oleks näha, et seda on arutatud.
