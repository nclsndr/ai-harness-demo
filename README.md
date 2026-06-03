# ai-harness

Experiment comparing how AI agent tooling is organized across providers in the same repository.

## TypeScript (tsgo)

Uses [@typescript/native-preview](https://www.npmjs.com/package/@typescript/native-preview) (`tsgo`) as the compiler.

```bash
npm install
npm run typecheck
npm run build
npm start
```

## Provider layout

| Provider | Directory | Skills path |
|----------|-----------|-------------|
| Canonical | `.ai/` | `.ai/skills/` |
| Cursor | `.cursor/` | `.cursor/skills/` → `.ai/skills/` |
| Claude (cloud) | `.claude/` | `.claude/skills/` → `.ai/skills/` |
| OpenCode | `.opencode/` | `.opencode/skills/` → `.ai/skills/` |
| Codex | `.agents/` | `.agents/skills/` → `.ai/skills/` |

Shared skills live under `.ai/skills/`. Each provider’s `skills/<name>` is a symlink to the canonical copy (e.g. `conventional-commit` for [Conventional Commits](https://www.conventionalcommits.org/)).

## Invoking the commit skill

- **Cursor**: ask to commit using the conventional-commit skill, or `/conventional-commit`
- **Claude Code**: invoke the skill when asked to commit
- **OpenCode**: `$conventional-commit` or implicit match on commit requests
- **Codex**: `$conventional-commit` or implicit match on commit requests
