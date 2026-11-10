# 02 – Veeleidja

Rakendus töötab brauseris ja leiab kõrguskaardilt, kuhu jääb vihmavesi seisma ning kui palju seda kokku on. Ülesanne pärineb 1989. aasta üleliidulisest programmeerijate olümpiaadist. See on brauseriversioon minu 2021. aasta Pythoni lahendusest (`AdvPython/main.py`).

## Käivitamine

Ava `index.html` brauseris. Serverit ega paigaldust pole vaja.

## Funktsioonid

- **Kaardi suurus:** laius × kõrgus vahemikus 3–100 lahtrit. Ruudu küljepikkust saab muuta 6–48 px. Suuruse muutmisel jääb olemasolev joonis alles.
- **Editor:**
  - kolm tööriista: kõrguse joonistamine, tõstmine +1 ja langetamine −1;
  - pintsli suurus 1, 3×3 või 5×5;
  - paremklõps või Alt+klõps võtab lahtri kõrguse pintslisse;
  - klahvid 0–9 valivad kõrgusnupu.
- **Näidised:**
  - `veekaart.txt` (20×20), kus vett on 217 ühikut;
  - `veekaart orig.txt` (16×16), kus vett on 137 ühikut;
  - juhuslik maastik;
  - kauss.
- **Fail:**
  - salvestamine ja avamine `.txt` failina, kaardi võib ka aknasse lohistada;
  - vorming on sama nagu Pythoni versioonil: üks kaardi rida faili rea kohta, kõrgused 0–99 tühikutega eraldatud;
  - viimane kaart jääb ka brauserisse meelde.
- **Samm-sammult jälgimine:**
  - nupud *Samm* (või tühik), *Esita* koos kiirusega, *Lõpuni* ja *Tagasi editorisse*;
  - punane raam näitab praegust lahtrit, oranž äsja järjekorda lisatud naabreid, kollane kõiki järjekorras ootavaid lahtreid;
  - number lahtril näitab, mitmendana see järjekorrast välja võetakse;
  - hall lahter on veel uurimata;
  - logi seletab iga sammu juures, mida algoritm otsustas.
- **Tulemus:**
  - maa on värvitud topokaardi värvides: roheline, kollane, pruun, valge;
  - vesi on värvitud sügavuse järgi helesinisest tumesiniseni;
  - kõrgusjooned eraldavad kõrgusvööndeid;
  - kursori all oleva lahtri kohta näidatakse kõrgust, veepinda ja sügavust.

## Algoritm

Kasutatud on prioriteedijärjekorraga BFS-i (*priority flood*):

1. Kõik servalahtrid lähevad järjekorda, sest serva kaudu voolab vesi kaardilt ära.
2. Järjekorrast võetakse alati **madalaim** lahter. Selle tase on madalaim müür, mis ümbritseb veel uurimata ala.
3. Iga uurimata naaber, mis on müürist madalam, täitub veega müüri kõrguseni. Kõrgem naaber muutub ise uueks müüriks.

Iga lahtrit töödeldakse üks kord, seega on keerukus O(N log N). Rekursiooni pole, nii et ka 100×100 kaart töötab.

Vana rekursiivne DFS-lahendus tegi 20×20 kaardil umbes miljon `check_cell` kutset. Juba 60×60 kaardil jooksis see Pythoni rekursioonipiiri (1000) vastu. Uus lahendus teeb kaardi iga lahtri kohta ühe sammu.

## Tehnika

Üks fail: HTML, CSS ja puhas JavaScript canvas'ega, ilma raamistiketa. Toetab tumedat teemat. Brauseri konsoolis saab tulemust kontrollida: `Veeleidja.solve("9 9 9\n9 1 9\n9 9 9")` tagastab `8`.
