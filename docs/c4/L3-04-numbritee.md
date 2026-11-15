<!-- c4-stamp commit=e57f8fe sources="04-numbritee/" -->
# L3 · 04-numbritee

```mermaid
C4Component
title 04 Numbritee – komponendid
Person(player, "Mängija")
Container_Boundary(app, "index.html", "HTML/CSS/JS + SVG") {
  Component(ui, "UI", "script#ui, Pointer Events", "buildBoard, render, cellAt, taimer, nupud")
  Component(rules, "Reeglid", "script#logic", "newState, extend, undo, dragTo, isWon")
  Component(gen, "Generaator", "script#logic", "generatePuzzle, randomFullPath (backbite)")
  Component(hint, "Vihje", "script#logic", "hint: pikim ühine algus lahendusega")
}
ContainerDb(ls, "localStorage", "numbritee.best.N")
Rel(player, ui, "lohistab tee otsast")
Rel(ui, rules, "dragTo, undo")
Rel(ui, gen, "uus mäng")
Rel(ui, hint, "vihje")
Rel(ui, ls, "parim aeg")
```

- Olek: muutumatu `state` (path, reached, undos, hints, won, started); iga käik tagastab uue objekti.
- Testid: `node test.mjs` laeb DOM-ita `script#logic` ploki `node:vm`-iga (23 testi); `rng` parameetrina (`seededRng`).
- localStorage: ms, ainult vihjeteta võit; vea korral mäng töötab ilma. Välised sõltuvused: puuduvad.
- Otsused: persoon = Mängija; spec ja plaan kaustas `04-numbritee/docs/plans/`.
