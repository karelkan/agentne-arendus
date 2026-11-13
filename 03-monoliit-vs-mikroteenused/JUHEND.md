# Mängujuhend: Monoliit vs Mikroteenused

## Mis mäng see on?

Mängus on kaks tarkvaraarhitektuuri, mis peavad kasutajate päringutele vastu pidama ja samal ajal vastasega võistlema.

- 🗼 **Monoliit (Barad-dûr)** on üks suur rakendus. Kõik on ühes protsessis ja kasutab üht jagatud andmebaasi.
- 🧙 **Mikroteenused (Sõpruskond)** on neli eraldi teenust, mis suhtlevad üle võrgu: Gateway → Auth → Core → DB. Igaüht saab skaleerida ja uuendada eraldi.

Sina ehitad ühe poole, arvuti teise. Lahing toimub ise. Sinu otsused tehakse ehitusfaasis, enne lahingu algust.

## Kuidas võita

Mõlemal poolel on alguses **1000 elu**. Iga laine järel:

- **ründab** sind vastane iga päringuga, mille ta edukalt teenindas. Mida kiiremini ta vastas, seda valusam on löök;
- **kahjustab** sind iga päring, mida sa ise ei suutnud teenindada.

Lahing lõpeb, kui ühe poole elud saavad otsa või kui 30 lainet on läbi. Siis võidab see, kellel on rohkem elusid alles.

Kokkuvõttes võidab see, kes teenindab palju päringuid, vastab kiiresti ja kukub harva.

## Mängu sammud

### 1. Vali pool

Klõpsa kas Monoliidi või Mikroteenuste kaardil. Arvuti juhib teist poolt. Kaardi all näed oma senist võitude ja kaotuste ajalugu.

### 2. Ehita oma süsteem

Sul on **100 kulda** 🪙. Põhikomplekt on tasuta:

- monoliidil 1 torn (maht 160) ja jagatud andmebaas (maht 220);
- mikroteenustel 1 eksemplar igast teenusest (Gateway 200, Auth 150, Core 110, DB 120).

Osta nuppudega **+** ja **−** täiendusi. Paremal olev eelvaade näitab jooksvalt:

- **Max läbilase** näitab, mitu päringut süsteem laines maksimaalselt teenindab;
- **Pudelikael** näitab mikroteenustel, milline teenus piirab kogu ahelat;
- **Baaslatentsus** on vastuse aeg väikese koormuse korral;
- **Deploy** näitab monoliidil, kas uuendamine tähendab seisakut.

**Seeme** määrab, millised sündmused tulevad ja kuidas arvuti oma armee ehitab. 🎲 annab uue juhusliku seemne. Sama seemnega saad sama lahingut proovida mõne teise ehitusega.

Vajuta **Alusta lahingut ⚔️**.

### 3. Jälgi lahingut

| Ekraani osa | Mida näitab |
|---|---|
| Ülemised ribad | Mõlema poole elud. Riba all on viimase laine näitajad: ✔ teenindatud, ✖ ebaõnnestunud, ⏱ latentsus. |
| Bänner | Selle laine sündmus |
| Lahinguväli vasakul | Monoliidi tornid. Silm põleb, kui torn töötab. 💤 tähendab, et torn on maas (number näitab, mitu lainet veel). 🔧 tähendab deploy'd ja ⛓️ andmebaasilukku. Riba torni all on stabiilsus. |
| Lahinguväli paremal | Mikroteenuste eksemplarid veergudena. Punane vilkuv serv tähendab ülekoormust, hall 💤 kukkunud eksemplari ja 🦅 autoscaler'i lisatud eksemplari. ✂️ on võrgust ära lõigatud teenus. |
| Nooled | Teenindatud päringud, mis lendavad vastast ründama |
| Punased sädemed | Ebaõnnestunud päringud |
| Graafik | Elud, teenindatud päringud (koos koormusega), latentsus (koos SLA joonega) või ebaõnnestumised. Kollane vöönd tähistab Musta reedet. |
| Logi | Kõik, mis juhtus, lainehaaval. Uusim on üleval. |

**Nupud:** ⏸/▶ paus, **1× 2× 4×** kiirus, ⏭ arvutab lahingu kohe lõpuni.

### 4. Loe kokkuvõtet

Lõpus näed tabelit: elud, teenindatud ja ebaõnnestunud päringud, edukuse protsent, keskmine latentsus ja seisakud. Lisaks näed, **miks** päringud ebaõnnestusid, näiteks ülekoormuse, krahhi, deploy, andmebaasiluku, latentsuse, võrgu jagunemise või kaskaadi tõttu.

**Õppetunnid** selgitavad, mis kummagi poole juures töötas ja mis mitte.

Seejärel saad valida:

- **Sama seemnega uuesti** kordab täpselt sama lahingut;
- **Muuda ehitust** viib tagasi ehitusse, kus seeme jääb samaks;
- **Uus lahing** alustab uue seemnega.

## Lahingu kulg

- **Koormus** algab umbes 130 päringust laines ja kasvab umbes 330-ni.
- **Deploy** toimub lainetes 6, 12, 18 ja 24. Mõlemad pooled paigaldavad uue versiooni ning 30% tõenäosusega on selles viga.
- **Must reede** on lainetes 20–21 ja koormus on siis kahekordne. Tavaliselt otsustab see lahingu.
- **Juhuslikud sündmused** tulevad alates 3. lainest ligikaudu igas kolmandas laines.

| Sündmus | Mis juhtub monoliidiga | Mis juhtub mikroteenustega |
|---|---|---|
| 🦇 Nazgûlide DDoS | Koormus +70% | Koormus +70% |
| 🔥 Balrog ärkab | Jagatud andmebaas lukus 1–3 lainet ja kogu torn ootab | Lukus ainult üks andmebaas (−40% mahust 2 laineks) |
| ✂️ Võrgu jagunemine | Ei mõjuta | Üks teenus lõigatakse 2 laineks ära (maht 30%, service mesh'iga 75%) |
| 🧪 Sarumani mäluleke | Kõik tornid kaotavad 40 stabiilsust (Silmaga 15) | Üks eksemplar kaotab 60 tervist |
| 🍺 Hobbitide pidu | Koormus −40% | Koormus −40% |
| 📦 Deploy | Ühe torniga kaob 60% mahust. Mitme torniga uueneb üks torn korraga. | Uueneb üks teenus. Kui sellel on üks eksemplar, jääb alles pool mahust. |

## Strateegianõuanded

### Monoliidina

- **Toores jõud on lihtne.** Mordori ahjud annavad 10 kulla eest +70 mahtu kogu süsteemile. Mikroteenustel tuleb sama tulemuse saamiseks tõsta mitut ahela lüli.
- **Ära unusta andmebaasi.** Jagatud andmebaas on teine lagi. Kui arvutusmaht on sellest suurem, läheb raha raisku.
- **Teine torn (25 kulda) on kallis, aga kaitseb kolme asja eest:** deploy ilma seisakuta, krahh ei pane kõike seisma ja Mustal reedel on rohkem varu.
- **Sauroni Silm** lühendab krahhi järgset seisakut 3 lainelt 2-le ja leevendab mälulekkeid.
- Monoliidi trump on **latentsus**. Kui torn ei ole ülekoormatud, lööb ta vastast tugevamalt.

### Mikroteenustena

- **Ahel on nii tugev kui nõrgim lüli.** Jälgi eelvaates pudelikaela. Kui ostad Core'i ja DB-d, saab Gateway (200) peagi kitsaskohaks.
- **Kaks eksemplari igast kriitilisest teenusest.** Ühe eksemplariga teenus on väike single point of failure.
- **Circuit breaker** takistab üht kukkunud teenust kogu ahelat kaasa tõmbamast.
- **Retry + backoff** päästab osa ebaõnnestunud päringutest. Ilma selleta kordavad kliendid pimesi ja tekitavad retry-tormi.
- **Autoscaler** on Musta reede vastu parim relv, sest lisab pudelikaelale kuni 3 eksemplari. Igaüks jõuab kohale ühe laine viivitusega.
- **Järjekord** puhverdab koormuse tippe, aga lisab ootamise tõttu latentsust.
- **Service mesh** aitab ainult võrgu jagunemise korral ja lisab igale hüppele 2 ms.
- Mikroteenuste nõrkus on **latentsus**: iga hüpe lisab aega. Kui teenused on ülekoormatud, ületavad päringud kiiresti 300 ms SLA.

## Arvuti strateegiad

Arvuti valib seemne põhjal ühe kolmest strateegiast.

| Monoliit | Mikroteenused |
|---|---|
| **Jõuline torn**: palju CPU-d | **Vastupidav**: circuit breaker, retry, mesh |
| **Kaks torni**: teine koopia + tasakaal | **Skaleeruv**: autoscaler, järjekord |
| **Tasakaalukas**: kõike veidi | **Toores jõud**: ainult eksemplarid |

Arvuti strateegia ja ehitus on lahingu alguses logis näha.
