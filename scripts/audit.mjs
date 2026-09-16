import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
const forbidden = [
  "Stylam",
  "Action TESA",
  "ActionTesa",
  "BOILO",
  "Superfit",
  "Superfit Industries",
];
const issues = [];
let count = 0;
async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const file = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(file);
      continue;
    }
    if (forbidden.some((s) => file.toLowerCase().includes(s.toLowerCase())))
      issues.push(`${file}: filename`);
    if (
      /\.(html|js|json|txt|xml|css|svg|map|rsc|meta|body|webp|png|jpe?g|ico|woff2?)$/i.test(
        file,
      )
    ) {
      count++;
      const buffer = await readFile(file);
      let text = buffer.toString("utf8") + buffer.toString("utf16le");
      if (/\.(webp|png|jpe?g)$/i.test(file)) {
        const metadata = await sharp(buffer).metadata();
        text += Object.values(metadata)
          .filter(Buffer.isBuffer)
          .map((value) => value.toString("utf8") + value.toString("utf16le"))
          .join("\n");
      }
      for (const word of forbidden)
        if (text.toLowerCase().includes(word.toLowerCase()))
          issues.push(`${file}: ${word}`);
    }
  }
}
for (const dir of [
  "public",
  ".next/server/app",
  ".next/static",
  ".next-static",
  "out",
])
  await walk(dir);
if (issues.length) {
  console.error("PUBLIC CONTENT AUDIT FAILED\n" + issues.join("\n"));
  process.exit(1);
}
console.log(
  `PUBLIC CONTENT AUDIT PASS — zero prohibited names across ${count} public output files.`,
);
