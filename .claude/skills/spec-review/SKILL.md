---
name: spec-review
description: Vaatab kasutaja antud speci üle paralleelsete ülevaatajatega (lihtsustaja, ehitaja, kasutaja ning 1–2 C4 kaardi osa eksperti), rakendab need parandused, milles ülevaatajad on kindlad, näitab, kus nad on eri meelt, ja küsib ülejäänu kohta kasutajalt. Kasuta, kui kasutaja palub speci, spetsifikatsiooni või plaani üle vaadata, kriitikat või review'd.
---

# Speci ülevaatus

Eesmärk: enne ehitamist leida specist, mida saab ära jätta, mida ehitaja peaks ära arvama, mis jääb kasutaja jaoks puudu ja mis ei sobi olemasoleva koodiga. Kogu suhtlus ja speci muudatused on **eesti keeles**.

## 0. Sisend

1. Repo juur: `git rev-parse --show-toplevel`. Kõik teed on juure suhtes.
2. Spec on argumendina antud fail. Kui argumenti pole, otsi `ls [0-9][0-9]-*/docs/plans/*.md` ja küsi `AskUserQuestion` tööriistaga, millist faili vaadata (uusim esimesena, märgiga „(soovitus)“).
3. Loe spec läbi. Leia selle proovitöö kaust `NN-nimi` (speci tee või selle väli „Kaust“).
4. Muuta tohib ainult speci faili. Teiste proovitööde kaustu **ära muuda**. Koodi ära muuda.

## 1. Millist kaardi osa spec puudutab

1. Loe `docs/c4/README.md` ja seotud kaardid (`docs/c4/L2-konteinerid.md`, `docs/c4/L3-NN-nimi.md`).
2. Vali **1–2 osa**, mida spec kõige rohkem puudutab. Osa on L3 kaardi komponent (nt `Priority flood` failis `L3-02-veeleidja.md`) või L2 konteiner, kui spec puudutab mitut proovitööd.
3. Iga osa kohta leia kood, mis selle taga on (failid ja funktsioonide nimed kaardilt, `grep`).
4. Kui spec on uue proovitöö kohta ja kaarti veel pole, siis eksperte ei ole. Ütle seda ühe reaga ja jätka kolme ülevaatajaga.
5. Kui L3 kaardi tempel (`<!-- c4-stamp commit=… -->`) on koodist maas (`git diff --name-only <commit> HEAD -- NN-nimi/` ei ole tühi), ütle ekspertidele, et kood on tõe allikas ja kaart võib olla vananenud.

## 2. Ülevaatajad paralleelselt

Käivita **kõik ülevaatajad ühes sõnumis** `Agent` tööriistaga (`subagent_type: general-purpose`), et nad töötaksid samal ajal. Ülevaatajad ei näe üksteise tulemusi ega sinu arvamust. Anna neile speci tee ja allikad, mitte oma järeldusi.

Igale ülevaatajale anna:
- speci tee ja proovitöö kaust;
- tema roll ja küsimus (allpool);
- käsk **mitte midagi muuta**, ainult lugeda;
- väljundi vorming (allpool).

| Roll | Loeb | Küsimus |
|---|---|---|
| **Lihtsustaja** | spec | Mida saab ära jätta? Millised nõuded, eesmärgid või kriteeriumid on üleliigsed, dubleerivad või ei teeni ühtegi eesmärki? Mis teeks sama asja väiksemalt? |
| **Ehitaja** | spec + `NN-nimi/` kood (kui on) | Mida ma peaksin selle ehitamiseks ära arvama? Mis on ebatäpne, vastuoluline, puudu (andmevorming, vead, äärmused, mõõdetav kriteerium)? Kus spec ei klapi olemasoleva koodiga? |
| **Kasutaja** | spec | Kas see lahendab probleemi inimestele, kellele see on mõeldud? Milline teekond või juhtum on puudu (esimene kord, tühi seis, viga, katkestus, korduv kasutus, ligipääsetavus)? |
| **Ekspert: `<osa>`** (1–2 tk) | spec + selle osa kaart + selle osa kood | Kas spec sobib selle osa koodiga? Mis läheb vastuollu olemasoleva struktuuri, nimede, andmete või piirangutega? Mida spec eeldab, mida kood ei toeta? |

### Väljundi vorming (iga ülevaataja)

Kuni 8 leidu, olulisemad ees. Iga leid:

```
### L<n>: <lühike pealkiri>
- Koht: <speci jaotis või ID, nt F3, AC2, Non-goals>
- Probleem: <1–2 lauset>
- Ettepanek: <täpne muudatus specis: mis rida asendada/lisada/kustutada ja millega>
- Kindlus: kindel | ebakindel
- Põhjus: <miks kindel; viide koodile kujul fail:rida, kui on>
```

„Kindel“ tähendab: muudatus on ilmselt õige ja ei vaja kasutaja otsust (nt vastuolu specis endas, kood näitab teisiti, puuduv kriteerium „Peab“-nõudele). Kõik, mis sõltub kasutaja eelistusest, ulatusest või prioriteedist, on „ebakindel“.

Kui leide pole, kirjuta „Leide pole“.

## 3. Leidude kokkuviimine

Kogu leiud kokku ja rühmita need **koha järgi** (sama jaotis või ID). Siis jaga kolme hunnikusse:

1. **Rakenda:** leid on „kindel“ ja ükski teine ülevaataja sama koha kohta vastupidist ei ütle. Kahe ülevaataja sama ettepanek liidetakse üheks.
2. **Eriarvamused:** kaks või enam ülevaatajat ütlevad sama koha kohta vastupidist (nt lihtsustaja: „kustuta F4“, kasutaja: „F4 on puudu olev teekond, täpsusta seda“). Need ei lähe automaatselt sisse, isegi kui mõlemad on „kindlad“.
3. **Küsi:** kõik „ebakindlad“ leiud, millele pole vastuväidet.

Kontrolli „Rakenda“ hunnik ise üle: kui ettepanek muudab speci eesmärke, non-goal'e või ulatust, siis tõsta see hunnikusse „Küsi“. Ulatuse üle otsustab kasutaja.

## 4. Rakendamine

1. Tee „Rakenda“ hunniku muudatused speci faili `Edit` tööriistaga. Hoia speci malli struktuuri (vt skill `spec-interview`) ja ID-sid. Uued nõuded saavad järgmise vaba ID.
2. Kui specis on väli „Staatus: kinnitatud“, ära muuda seda, aga ütle aruandes, et spec muutus pärast kinnitamist.

## 5. Aruanne ja küsimused

Näita vestluses lühidalt:

**Rakendatud** (üks rida iga kohta): `F3: lisatud piirväärtus 0–255 (ehitaja, ekspert: Kaardi I/O)`.

**Eriarvamused**: iga kohta kohta lühike tabel:

| Ülevaataja | Ütleb | Põhjus |
|---|---|---|

ja sinu soovitus ühe lausega.

Siis küsi `AskUserQuestion` tööriistaga eriarvamused ja „Küsi“ hunnik läbi, **kuni 4 küsimust korraga**, olulisemad ees. Igal küsimusel on 2–4 varianti (ülevaatajate ettepanekud ja „jäta nii“), soovitus esimesena märgiga „(soovitus)“. Eriarvamuse küsimusse kirjuta, kes mida arvab, sest kasutaja näeb ainult küsimuse akent.

Rakenda vastused specisse. Kui küsimusi on üle 4, küsi järgmine voor. Lahtiseks jäänud punktid kirjuta speci jaotisesse „Avatud küsimused ja riskid“.

## 6. Lõpp

Raporteeri ühe-kahe reaga: mitu muudatust tehti, mitu jäi avatuks. **Ära commiti**, kui kasutaja seda ei palu.
