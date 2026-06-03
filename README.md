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
| Cursor | `.cursor/` | `.cursor/skills/` |
| Claude (cloud) | `.claude/` | `.claude/skills/` |
| OpenCode | `.opencode/` | `.opencode/skills/` |
| Codex | `.agents/` | `.agents/skills/` |

Each provider has a `conventional-commit` skill for creating git commits following [Conventional Commits](https://www.conventionalcommits.org/).

## Invoking the commit skill

- **Cursor**: ask to commit using the conventional-commit skill, or `/conventional-commit`
- **Claude Code**: invoke the skill when asked to commit
- **OpenCode**: `$conventional-commit` or implicit match on commit requests
- **Codex**: `$conventional-commit` or implicit match on commit requests
