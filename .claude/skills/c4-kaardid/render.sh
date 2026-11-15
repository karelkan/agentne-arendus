#!/bin/bash
# Renderdab C4 kaardi Mermaid-ploki SVG-pildiks samasse kausta.
# Kasutus: render.sh docs/c4/L1-kontekst.md [docs/c4/L2-konteinerid.md ...]
# Väljund: <kaart>.svg kaardi kõrval (OUT_DIR=... muudab väljundkausta).
set -euo pipefail

MMDC="@mermaid-js/mermaid-cli@12.2.0"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# Kasuta süsteemi Chrome'i, et puppeteer ei laadiks alla oma Chromiumit.
chrome="${CHROME_PATH:-}"
mac_chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -z "$chrome" ] && [ -x "$mac_chrome" ] && chrome="$mac_chrome"
pcfg=()
if [ -n "$chrome" ]; then
  printf '{"executablePath": "%s"}\n' "$chrome" > "$tmp/puppeteer.json"
  pcfg=(-p "$tmp/puppeteer.json")
  export PUPPETEER_SKIP_DOWNLOAD=1
fi

for md in "$@"; do
  name=$(basename "$md" .md)
  out="${OUT_DIR:-$(dirname "$md")}/$name.svg"
  # Võta esimene ```mermaid plokk
  awk '/^```mermaid/{f=1;next} f&&/^```/{exit} f' "$md" > "$tmp/$name.mmd"
  if [ ! -s "$tmp/$name.mmd" ]; then
    echo "VIGA: $md ei sisalda mermaid-plokki" >&2; exit 1
  fi
  npx -y "$MMDC" -q "${pcfg[@]}" -i "$tmp/$name.mmd" -o "$out" -b white
  # Kodeering: lisa XML-deklaratsioon ja asenda mitte-ASCII märgid (ä, õ, –, →) numbriliste viidetega,
  # muidu näitavad mõned vaaturid "MÃ¤ngija".
  perl -CSD -i -pe 's/([^\x00-\x7F])/sprintf("&#%d;",ord($1))/ge; s/\A/<?xml version="1.0" encoding="UTF-8"?>\n/ if $. == 1' "$out"
  echo "OK: $out"
done
