import { readdir, copyFile } from "node:fs/promises";
import path from "node:path";

// Next 16.3.5's exporter flattens POSIX segment separators but leaves Windows
// separators nested. Emit the identical dot-separated names its browser router
// requests. Preserve source files; Linux exports already have the correct names.
export async function normalizeStaticSegments(root = "out") {
  let copied = 0;
  async function visit(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await visit(file);
      } else {
        const parts = path.relative(root, file).split(path.sep);
        const marker = parts.findIndex((part) => part.startsWith("__next."));
        if (marker >= 0 && marker < parts.length - 1 && file.endsWith(".txt")) {
          const target = path.join(
            root,
            ...parts.slice(0, marker),
            parts.slice(marker).join("."),
          );
          await copyFile(file, target);
          copied++;
        }
      }
    }
  }
  await visit(root);
  console.log(
    `Static router compatibility: ${copied} segment filenames normalized.`,
  );
}
