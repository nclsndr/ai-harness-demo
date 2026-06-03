# AI harness

Canonical skills live in `.ai/skills/`. Provider dirs (`.agents`, `.claude`, `.cursor`, `.opencode`) are gitignored and symlinked from there.

## Setup

```bash
npm install
npm run ai-agent-setup
```

Re-run after pulling skill changes or if provider folders are missing. Idempotent.

## Rules

- Edit skills only in `.ai/skills/<name>/SKILL.md`, then `npm run ai-agent-setup`.
- Do not edit or commit generated provider directories.
- Skills: `conventional-commit` ([Conventional Commits](https://www.conventionalcommits.org/)).

Build details: [README.md > AI agent resources](./README.md).
