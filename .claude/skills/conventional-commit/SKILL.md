---
name: conventional-commit
description: Creates git commits following Conventional Commits. Use when the user asks to commit, write a commit message, stage and commit, or organize commits before pushing.
---

# Conventional Commit (Claude Code)

Create commits that follow [Conventional Commits](https://www.conventionalcommits.org/).

## When to use

- User asks to commit, create a commit, or write a commit message
- User wants changes grouped into semantic commits
- User mentions conventional commits, commitlint, or semantic versioning

## Safety

- Only commit when the user explicitly asks
- Never update git config
- Never use destructive git commands unless explicitly requested
- Never skip hooks (`--no-verify`) unless explicitly requested
- Never commit secrets (`.env`, credentials, keys)

## Workflow

1. Run in parallel:
   - `git status`
   - `git diff` (staged + unstaged)
   - `git log -5 --oneline` (match repo style)
2. Stage in logical groups — do not use `git add .` unless the user asks
3. Draft message, commit with HEREDOC, run `git status` to verify

## Message format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

| Type | When |
|------|------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code change, not feat/fix |
| `perf` | Performance improvement |
| `test` | Tests only |
| `build` | Build system or deps |
| `ci` | CI config |
| `chore` | Maintenance, tooling |
| `revert` | Reverts a prior commit |

**Rules**

- Description: imperative, lowercase, no trailing period, ≤72 chars
- Scope: optional noun in parentheses, e.g. `feat(auth):`
- Breaking change: `!` after type/scope or `BREAKING CHANGE:` footer
- Body: explain what and why, wrap at 72 chars
- One logical change per commit

## Commit command

```bash
git commit -m "$(cat <<'EOF'
feat(scope): short imperative summary

Optional body explaining why.

EOF
)"
```

## Examples

```
feat(skills): add conventional-commit skill per provider

fix(tsconfig): set rootDir and outDir for src layout

docs(readme): document provider directory experiment

chore(deps): add @typescript/native-preview for tsgo
```
