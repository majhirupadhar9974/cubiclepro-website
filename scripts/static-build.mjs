import { spawnSync } from "node:child_process";
import { cp, access, rm } from "node:fs/promises";
import path from "node:path";
import { normalizeStaticSegments } from "./normalize-static.mjs";
const result = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  { stdio: "inherit", env: { ...process.env, STATIC_EXPORT: "1" } },
);
if (result.status) process.exit(result.status);
await access(".next-static/index.html");
const output = path.resolve("out");
if (path.dirname(output) !== process.cwd() || path.basename(output) !== "out") {
  throw new Error(
    "Refusing to replace a build directory outside this workspace",
  );
}
// Replace only the generated export so obsolete public chunks cannot survive a rebuild.
await rm(output, { recursive: true, force: true });
await cp(".next-static", output, { recursive: true });
await normalizeStaticSegments("out");
const audit = spawnSync(process.execPath, ["scripts/audit.mjs"], {
  stdio: "inherit",
});
process.exit(audit.status || 0);
