# 01 – Esimene proov: Trips-traps-trull

Brauseris töötav trips-traps-trull, kus mängid arvuti vastu.

## Käivitamine

Ava fail `index.html` brauseris (topeltklõps või `open index.html`). Serverit ega paigaldust pole vaja.

## Mängimine

- Sina oled **X** ja alustad, arvuti on **O**.
- Võidab see, kes saab esimesena kolm märki ritta (horisontaalselt, vertikaalselt või diagonaalselt).
- Kui laud saab täis ilma võitjata, on viik.
- Nupp **Uus mäng** alustab uut mängu, skoor jääb alles kuni lehe uuesti laadimiseni.

## Raskusastmed

| Tase | Arvuti käitumine |
|------|------------------|
| Lihtne | Juhuslik käik |
| Keskmine | Võidab, kui saab; blokeerib sinu võidu; muidu juhuslik |
| Võitmatu | Minimax-algoritm – parim tulemus sinu jaoks on viik |

## Tehnika

Üks fail: HTML + CSS + puhas JavaScript, ilma raamistiketa. Toetab ka tumedat teemat.
