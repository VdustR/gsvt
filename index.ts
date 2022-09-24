import cac from "cac";
import gitSemverTags from "git-semver-tags";
import simpleGit from "simple-git";
import { promisify } from "util";

const asyncGitSemverTags = promisify(gitSemverTags);

const cli = cac();

const semverTagRegex = /^v\d+\.\d+\.\d+$/g;

type VersionStartWithV = `v${number}.${number}.${number}`;

function parseVersion(
  versionString: VersionStartWithV
): [number, number, number] {
  const [major, minor, patch] = versionString.substring(1).split(".");
  return [Number(major), Number(minor), Number(patch)];
}

function patch(version: VersionStartWithV): VersionStartWithV {
  const [major, minor, patch] = parseVersion(version);
  return `v${major}.${minor}.${patch + 1}`;
}

function minor(version: VersionStartWithV): VersionStartWithV {
  const [major, minor] = parseVersion(version);
  return `v${major}.${minor + 1}.0`;
}

function major(version: VersionStartWithV): VersionStartWithV {
  const [major] = parseVersion(version);
  return `v${major + 1}.0.0`;
}

function minorOnly(version: VersionStartWithV): `v${number}.${number}` {
  const [major, minor] = parseVersion(version);
  return `v${major}.${minor}`;
}

function majorOnly(version: VersionStartWithV): `v${number}` {
  const [major, minor] = parseVersion(version);
  return `v${major}`;
}

type ValidInput = "patch" | "minor" | "major" | VersionStartWithV;

function isVersionStartWithV(input: unknown): input is VersionStartWithV {
  if (typeof input !== "string") return false;
  return semverTagRegex.test(input);
}

function isValidInput(input: string): input is ValidInput {
  if (typeof input !== "string") return false;
  return (
    input === "patch" ||
    input === "minor" ||
    input === "major" ||
    isVersionStartWithV(input)
  );
}

cli
  .command("[tag]", "Add semver tags to the current commit")
  .action(async (input = "patch") => {
    if (!isValidInput(input))
      throw new Error(
        `Invalid input: ${input}, expected: patch, minor, major or semver version like 'v1.2.3'`
      );
    const existsTags = (await asyncGitSemverTags()).flatMap((tag) => {
      return tag.match(semverTagRegex) ? [tag as VersionStartWithV] : [];
    });
    const latestTag = existsTags[0] || "v0.0.0";
    const nextTag =
      input === "patch"
        ? patch(latestTag)
        : input === "minor"
        ? minor(latestTag)
        : input === "major"
        ? major(latestTag)
        : input;
    console.log("nextTag tag:", nextTag);
    const git = simpleGit();
    git.addTag(nextTag);
    git.addTag(minorOnly(nextTag));
    git.addTag(majorOnly(nextTag));
  });

cli.parse();
