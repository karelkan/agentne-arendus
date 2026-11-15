<!-- c4-stamp commit=e57f8fe sources="NN-*/README.md NN-*/ (failide lisandumine/kadumine)" -->
# L2 · Konteinerid

```mermaid
C4Container
title agentne-arendus – konteinerid
System_Boundary(b1, "01 Trips-traps-trull") {
  Container(ttt, "index.html", "HTML/CSS/JS, brauser", "mängulaud + arvutivastane")
}
System_Boundary(b2, "02 Veeleidja") {
  Container(vl, "index.html", "HTML/CSS/JS + canvas", "editor, priority flood, visualiseerimine")
  ContainerDb(vldb, "localStorage", "veeleidja-map", "viimane kaart")
}
System_Boundary(b3, "03 Monoliit vs mikroteenused") {
  Container(mvm, "index.html", "HTML/CSS/JS + canvas", "ehitus, simulatsioon, lahinguväli")
  ContainerDb(mvmdb, "localStorage", "mvm-record", "võitude/kaotuste ajalugu")
}
System_Boundary(b4, "04 Numbritee") {
  Container(nt, "index.html", "HTML/CSS/JS + SVG", "generaator, reeglid, vihje, lohistamine")
  ContainerDb(ntdb, "localStorage", "numbritee.best.N", "parim aeg suuruse kohta")
}
Rel(vl, vldb, "salvestab/taastab", "JSON")
Rel(mvm, mvmdb, "salvestab/taastab", "JSON")
Rel(nt, ntdb, "salvestab/loeb", "ms")
```

- Kõik on üks fail, ilma raamistiku, build-sammu ja serverita; käivitus = ava `index.html`. 04 `test.mjs` (Node) on arendaja testid, mitte konteiner.
- Kõik toetavad tumedat teemat.
- 03 dokumentatsioon (`JUHEND.md`, `DOKUMENTATSIOON.md`) ei ole konteiner, vt L3.
- Otsused: Markdown-dokke L2-le ei kanta.
