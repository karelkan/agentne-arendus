<!-- c4-stamp commit=2d6b5c5 sources="README.md claude.md NN-*/" -->
# L1 · Süsteemikontekst

```mermaid
C4Context
title agentne-arendus – süsteemikontekst
Person(player, "Mängija")
System(ttt, "01 Trips-traps-trull", "X/O arvuti vastu, 3 raskusastet")
System(mvm, "03 Monoliit vs mikroteenused", "arhitektuurilahingu simulatsioon")
Person(user, "Kasutaja")
System(vl, "02 Veeleidja", "vihmavee kogus kõrguskaardil")
Rel(player, ttt, "mängib")
Rel(player, mvm, "ehitab poole, vaatab lahingut")
Rel(user, vl, "joonistab kaardi, jälgib algoritmi")
UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")
```

- Repo: Industry62 agentse arenduse koolitus; iga proovitöö = eraldi kaust `NN-nimi/` oma README-ga.
- Proovitööd on omavahel sõltumatud; ühe töö kallal töötades ära muuda teiste kaustu.
- Välised süsteemid: puuduvad (serverit, API-sid ega CDN-e pole).
- Otsused: persoon igal tööl oma rolliga (01, 03 Mängija; 02 Kasutaja).
