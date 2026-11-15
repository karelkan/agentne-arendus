<!-- c4-stamp commit=2d6b5c5 sources="02-veeleidja/" -->
# L3 · 02-veeleidja

```mermaid
C4Component
title 02 Veeleidja – komponendid
Person(user, "Kasutaja")
Container_Boundary(app, "index.html", "HTML/CSS/JS + canvas") {
  Component(ed, "Editor", "pointer/klahvid", "editAt, setBrush, swatches, suurus")
  Component(io, "Kaardi I/O", "JS", "parseMap, mapToText, loadFile, SAMPLES, randomTerrain, bowl")
  Component(sim, "Priority flood", "JS, MinHeap", "simInit, simStep → vesi, total")
  Component(view, "Visualiseerimine", "canvas", "render, legend, hover, logi, tick")
}
ContainerDb(ls, "localStorage", "veeleidja-map")
Rel(user, ed, "joonistab")
Rel(ed, view, "joonistab uuesti")
Rel(io, ls, "save/restore")
Rel(view, sim, "samm/esita/lõpuni")
```

- Failivorming: üks kaardirida faili rea kohta, kõrgused 0–99 tühikuga; max 100×100.
- Algoritm O(N log N), ilma rekursioonita; olekuks globaalsed `W`, `H`, `grid`.
- Test konsoolist: `Veeleidja.solve("9 9 9\n9 1 9\n9 9 9")` → 8.
- Otsused: persoon = Kasutaja.
