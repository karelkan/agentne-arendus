<!-- c4-stamp commit=2d6b5c5 sources="01-esimene-proov/" -->
# L3 · 01-esimene-proov

```mermaid
C4Component
title 01 Trips-traps-trull – komponendid
Person(player, "Mängija", "X, alustab")
Container_Boundary(app, "index.html", "HTML/CSS/JS, brauser") {
  Component(ui, "UI", "DOM", "render, onCellClick, newGame, skoor")
  Component(rules, "Reeglid", "JS", "findWinner, isFull, checkEnd, LINES")
  Component(ai, "Arvutivastane", "JS", "chooseComputerMove: random/medium/minimax")
}
Rel(player, ui, "klõpsab ruutu, valib raskuse")
Rel(ui, rules, "checkEnd")
Rel(ui, ai, "küsib O käiku")
Rel(ai, rules, "hindab seise")
```

- Olek: muutujad `board`, `gameOver`, `score` mälus; skoor kaob lehe uuesti laadimisel.
- Raskus: Lihtne = juhuslik, Keskmine = võida/blokeeri, Võitmatu = minimax.
- Välised sõltuvused: puuduvad.
- Otsused: persoon = Mängija.
