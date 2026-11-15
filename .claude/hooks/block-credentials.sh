#!/bin/bash
# PreToolUse hook: blokeerib iga tööriista kutse, mis üritab lugeda credentials-faili
# (nt config/staging.credentials). Exit 2 => Claude Code keelab kutse ja näitab stderr-i.
input=$(cat)

# Kontrollime ainult välju, mis viitavad failiteedele või käskudele
# (Read/Edit/Write/NotebookEdit: file_path/notebook_path, Grep/Glob: path/pattern, Bash: command).
targets=$(printf '%s' "$input" | jq -r '
  .tool_input // {} |
  [.file_path, .notebook_path, .path, .pattern, .glob, .command] |
  map(select(type == "string")) | .[]')

if printf '%s' "$targets" | grep -qiE 'credentials'; then
  echo "Reading credentials files is blocked by project policy." >&2
  exit 2
fi

exit 0
