# 03 – Monoliit vs Mikroteenused

Brauseris töötav arhitektuurisõda Keskmaa kujundites. Monoliit on Barad-dûr, üks torn, mis valitseb kõiki. Mikroteenused on Sõpruskond, kus igaühel on oma ülesanne. Sina ehitad ühe poole, arvuti teise, ja lahing simuleeritakse automaatselt. Mäng näitab, millal on kummagi arhitektuuri tugevused ja nõrkused tähtsad.

## Käivitamine

Ava `index.html` brauseris. Serverit ega paigaldust pole vaja.

## Mängu käik

1. **Vali pool.** Kas Monoliit või Mikroteenused, arvuti juhib teist poolt.
2. **Ehita.** Sul on 100 kulda. Põhikomplekt on tasuta, selle peale ostad täiendusi.
3. **Lahing.** Kestab kuni 30 koormuslainet. Mõlemad pooled saavad sama koormuse ja samad sündmused.
   - Iga teenindatud päring lööb vastast. Mida kiirem vastus, seda tugevam löök.
   - Iga ebaõnnestunud päring kahjustab sind ennast.
   - Kaotab see, kelle elud saavad otsa. Kui 30 lainet saab läbi, võidab see, kellel on rohkem elusid alles.
4. **Kokkuvõte.** Statistika, ebaõnnestumised põhjuste kaupa ja õppetunnid, miks lahing nii läks.

## Ehitusosad

| Monoliit | Tähendus | Mikroteenused | Tähendus |
|---|---|---|---|
| 🌋 Mordori ahjud | CPU, vertikaalne skaleerimine | 🧙 Gateway-võlur | API gateway eksemplar |
| 🏰 Barad-dûri võlvid | Suurem jagatud andmebaas | 🪓 Auth-päkapikk | Autentimisteenus |
| 🔮 Palantíri vahemälu | Cache | 💍 Sõrmuseteenus | Äriloogika |
| ⛓️ Raudmüürid | Kõvendamine | 🌳 Ent-andmebaas | Database per service |
| 🗼 Musta Värava garnison | Koormusjaotur + teine koopia | 🧝 Haldja-vahemälu | Hajutatud cache |
| 👁️ Sauroni Silm | Monitooring | 🧺 Hobbiti-järjekord | Sõnumijärjekord |
| | | 🔥 Gondori tulukesed | Circuit breaker |
| | | 🏹 Legolase täpsus | Retry + backoff |
| | | 🕸️ Haldjate võrk | Service mesh |
| | | 🦅 Kotkaste autoscaler | Autoskaleerimine |

## Sündmused

| Sündmus | Monoliit | Mikroteenused |
|---|---|---|
| 📦 Deploy (lained 6, 12, 18, 24) | Ühe koopiaga hooldusaken: 60% mahust kaob. Mitme koopiaga rolling deploy. Viga tabab kõike. | Puudutab ainult üht teenust, ka viga |
| ⚔️ Must reede (lained 20–21) | Koormus kahekordistub. Vertikaalsel skaleerimisel on lagi. | Autoscaler ja järjekord aitavad |
| 🦇 Nazgûlide DDoS | Koormus kasvab 70% | Sama |
| 🔥 Balrog (andmebaasilukk) | Jagatud andmebaas lukus, kogu torn ootab | Lukus ainult üks andmebaas, maht −40% |
| ✂️ Võrgu jagunemine | Peaaegu ei mõjuta | Teenus lõigatakse ära. Service mesh suunab ümber. |
| 🧪 Mäluleke | Tabab kõiki koopiaid | Tabab üht eksemplari |
| 🍺 Hobbitide pidu | Koormus langeb 40% | Sama |

## Simulatsiooni mudel

- **Latentsus** kasvab, kui koormus läheneb mahule. Üle 300 ms (SLA) aeglased päringud loetakse osaliselt ebaõnnestunuks.
  - Monoliidi kutsed on protsessisisesed ja kiired.
  - Mikroteenustel lisandub iga võrguhüppe latentsus.
- **Monoliidi stabiilsus** langeb ülekoormusel. Kokku kukkunud torn on 3 lainet maas, Sauroni Silmaga 2.
- **Mikroteenuse eksemplar** kukub eraldi ja käivitub järgmises laines uuesti.
  - Kaskaad: ilma circuit breaker'ita jäävad ülesvoolu teenused ootama ja kukuvad kaasa.
  - Retry-torm: ilma backoff'ita tekitavad pimesi kordused järgmises laines lisakoormust.
- **Seeme** määrab sündmused, koormuse ja arvuti ehituse. Sama seemne ja ehitusega lahing kordub täpselt.

## Juhtimine

- ⏸ / ▶ peatab lahingu või jätkab seda.
- 1×, 2× ja 4× muudavad kiirust.
- ⏭ simuleerib lahingu kohe lõpuni.
- Graafikul saab valida, kas näidata elusid, teenindatud päringuid, latentsust või ebaõnnestumisi.
- Võitude ja kaotuste ajalugu jääb brauserisse meelde.

## Tehnika

Üks fail: HTML, CSS ja puhas JavaScript ilma raamistiketa. Lahinguväli ja graafik on joonistatud canvas'ele. Toetab ka tumedat teemat.
