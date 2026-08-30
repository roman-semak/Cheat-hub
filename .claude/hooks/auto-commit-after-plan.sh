#!/usr/bin/env bash
# Stop hook: after Claude finishes executing an approved plan, commit all
# changes and push them to origin on the current branch.
#
# Fires on every Stop, but only acts when BOTH are true:
#   1. the working tree has uncommitted changes
#   2. the session transcript contains an approved ExitPlanMode we have not
#      already committed for (tracked in <git-dir>/claude-auto-plan-commit)
#
# Any failure is swallowed (exit 0) so it never blocks the turn.

set -uo pipefail

input=$(cat)

json_get() { printf '%s' "$input" | /usr/bin/jq -r "$1 // empty" 2>/dev/null; }

transcript=$(json_get '.transcript_path')
cwd=$(json_get '.cwd')
[ -n "$cwd" ] || cwd="${CLAUDE_PROJECT_DIR:-$PWD}"

cd "$cwd" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

# 1. anything to commit?
[ -n "$(git status --porcelain 2>/dev/null)" ] || exit 0

# 2. an approved plan we haven't handled yet?
[ -n "$transcript" ] && [ -f "$transcript" ] || exit 0

last_approved=$(/usr/bin/jq -rs '
  [ .[]
    | select((.message.content | type) == "array")
    | .message.content[]
    | select(.type == "tool_result" and (.tool_use_id != null))
    | select(((.content // "") | tostring) | test("User has approved your plan"))
    | .tool_use_id
  ] | last // empty
' "$transcript" 2>/dev/null)

[ -n "$last_approved" ] || exit 0

git_dir=$(git rev-parse --git-dir 2>/dev/null) || exit 0
state="$git_dir/claude-auto-plan-commit"
[ -f "$state" ] && [ "$(cat "$state" 2>/dev/null)" = "$last_approved" ] && exit 0

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
[ -n "$branch" ] && [ "$branch" != "HEAD" ] || exit 0

files=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')

git add -A 2>/dev/null || exit 0
git commit -m "auto: commit after plan execution ($files file(s))" \
           -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>" \
           >/dev/null 2>&1 || exit 0

printf '%s' "$last_approved" > "$state"

msg="Auto-committed $files file(s) after plan execution on '$branch'."
if git remote get-url origin >/dev/null 2>&1; then
  if push_out=$(git push origin "HEAD:$branch" 2>&1); then
    msg="$msg Pushed to origin/$branch."
  else
    msg="$msg Push to origin/$branch FAILED: $(printf '%s' "$push_out" | tail -1)"
  fi
fi

printf '{"systemMessage": %s}\n' "$(printf '%s' "$msg" | /usr/bin/jq -Rs .)"
exit 0
