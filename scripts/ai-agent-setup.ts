import type { Dirent } from "node:fs";
import { readdir, mkdir, lstat, symlink } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PROVIDER_DIRS = [".agents", ".claude", ".cursor", ".opencode"] as const;

const REPO_ROOT = process.cwd();
const AI_SKILLS_DIR = join(REPO_ROOT, ".ai", "skills");

type ErrnoException = NodeJS.ErrnoException;

function isENOENT(error: unknown): error is ErrnoException {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as ErrnoException).code === "ENOENT"
  );
}

function skillSymlinkTarget(skillName: string): string {
  return join("..", "..", ".ai", "skills", skillName);
}

async function listSkillNames(): Promise<string[]> {
  const entries = await readdir(AI_SKILLS_DIR, { withFileTypes: true });
  return entries
    .filter((entry: Dirent) => entry.isDirectory() === true)
    .map((entry: Dirent) => entry.name)
    .sort();
}

async function ensureSkillSymlink(
  providerDir: string,
  skillName: string,
): Promise<void> {
  const linkPath = join(REPO_ROOT, providerDir, "skills", skillName);
  const target = skillSymlinkTarget(skillName);

  try {
    const stat = await lstat(linkPath);
    if (stat.isSymbolicLink() === true) {
      return;
    }
    throw new Error(`${linkPath} exists and is not a symlink`);
  } catch (error: unknown) {
    if (isENOENT(error) === false) {
      throw error;
    }
    await symlink(target, linkPath);
    console.log(`  ${providerDir}/skills/${skillName} -> ${target}`);
  }
}

async function setupProvider(
  providerDir: string,
  skillNames: readonly string[],
): Promise<void> {
  const skillsDir = join(REPO_ROOT, providerDir, "skills");
  await mkdir(skillsDir, { recursive: true });

  for (const skillName of skillNames) {
    await ensureSkillSymlink(providerDir, skillName);
  }
}

export async function setupAiAgents(): Promise<void> {
  const skillNames = await listSkillNames();

  if (skillNames.length === 0) {
    throw new Error(`no skills found in ${AI_SKILLS_DIR}`);
  }

  console.log(
    `Setting up ${PROVIDER_DIRS.length} providers with ${skillNames.length} skill(s)...`,
  );

  for (const providerDir of PROVIDER_DIRS) {
    console.log(providerDir);
    await setupProvider(providerDir, skillNames);
  }

  console.log("Done.");
}

const isMain =
  process.argv[1] !== undefined &&
  fileURLToPath(import.meta.url) === process.argv[1];

if (isMain === true) {
  setupAiAgents().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
