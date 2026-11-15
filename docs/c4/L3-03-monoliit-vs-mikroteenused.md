<!-- c4-stamp commit=2d6b5c5 sources="03-monoliit-vs-mikroteenused/" -->
# L3 · 03-monoliit-vs-mikroteenused

```mermaid
C4Component
title 03 Monoliit vs mikroteenused – komponendid
Person(player, "Mängija")
Container_Boundary(app, "index.html", "HTML/CSS/JS + canvas") {
  Component(build, "Ehitaja", "DOM", "openBuilder, renderBuilder, ITEMS, 100 kulda")
  Component(battle, "Lahingujuht", "JS", "startBattle, step, endBattle, HUD, summary/lessons")
  Component(ai, "Arvuti-AI", "JS", "aiBuild, AI_STRATEGIES")
  Component(sim, "Simulatsioon", "JS, mulberry-seeme", "tickMono, tickMicro, genEvents, waveLoad")
  Component(draw, "Joonistamine", "canvas, rAF", "drawField, drawMono, drawMicro, drawChart")
}
ContainerDb(ls, "localStorage", "mvm-record")
Rel(player, build, "valib poole, ostab osi")
Rel(battle, ai, "aiBuild")
Rel(battle, sim, "tick* laine kaupa")
Rel(battle, draw, "drawChart")
Rel(battle, ls, "saveRecord")
UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")
```

- Detailid: `DOKUMENTATSIOON.md` (andmestruktuurid, mudel, funktsioonide teatmik, laiendamine); mängureeglid: `JUHEND.md`.
- Determinism: sama seemne ja ehitusega lahing kordub täpselt; 30 lainet, SLA 300 ms.
- Otsused: Markdown-dokid ainult viitena; persoon = Mängija.
