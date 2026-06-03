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

## AI agent resources

| Provider | Directory | Skills path |
|----------|-----------|-------------|
| Canonical (committed) | `.ai/` | `.ai/skills/` |
| Cursor (generated) | `.cursor/` | `.cursor/skills/` → `.ai/skills/` |
| Claude (generated) | `.claude/` | `.claude/skills/` → `.ai/skills/` |
| OpenCode (generated) | `.opencode/` | `.opencode/skills/` → `.ai/skills/` |
| Codex (generated) | `.agents/` | `.agents/skills/` → `.ai/skills/` |

Shared skills live under `.ai/skills/`. Provider directories are gitignored and recreated locally:

```bash
npm run ai-agent-setup
```

This symlinks every skill under `.ai/skills/` into each provider’s `skills/` folder (e.g. `conventional-commit` for [Conventional Commits](https://www.conventionalcommits.org/)).
