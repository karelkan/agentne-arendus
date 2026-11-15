#!/bin/bash
# PreToolUse hook: lisab iga tööriista kutse eraldi logifaili (.claude/tool-logs/<tööriist>.log)
input=$(cat)
dir="${CLAUDE_PROJECT_DIR:-.}/.claude/tool-logs"
mkdir -p "$dir"
tool=$(printf '%s' "$input" | jq -j '.tool_name // "unknown"' | tr -c 'A-Za-z0-9_.-' '_')
printf '%s\t%s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$(printf '%s' "$input" | jq -c '.tool_input')" >> "$dir/$tool.log"
exit 0
