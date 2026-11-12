# Vendored skills

These skills are vendored from a third-party repository, not written for this
project. They are checked in (rather than installed via `/plugin`) because the
remote Claude Code container is ephemeral — a user-level install under
`~/.claude/` would not survive the session.

| | |
|---|---|
| Source | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| Plugin | `ui-ux-pro-max` v2.13.0 |
| Commit | `f3ac195224eac1eb0dfe1a3059c2a6add78ffbe3` (2026-09-03) |
| License | MIT — see `LICENSE.ui-ux-pro-max` |

Skills: `ui-ux-pro-max`, `ui-styling`, `design`, `design-system`, `brand`,
`slides`, `banner-design`.

## Updating

Re-copy the upstream `.claude/skills/` directory and bump the commit above:

```sh
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill /tmp/uiux
rm -rf .claude/skills && cp -a /tmp/uiux/.claude/skills .claude/skills
cp /tmp/uiux/LICENSE .claude/skills/LICENSE.ui-ux-pro-max
```

## Notes

- `ui-ux-pro-max/scripts/search.py` needs only the Python 3 standard library.
- `ui-styling/scripts/` has its own `requirements.txt`; install it only if you
  use that skill's canvas rendering.
- `design` references external image-generation APIs (Gemini, Atlas Cloud,
  MuAPI) that require your own API keys. Nothing here calls them unprompted.
