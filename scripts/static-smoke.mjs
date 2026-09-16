import { createServer } from "node:http";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = path.resolve("out");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
};
const server = createServer(async (req, res) => {
  try {
    const requested = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = path.resolve(root, `.${requested}`);
    if (file !== root && !file.startsWith(root + path.sep))
      throw new Error("Invalid path");
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    res.setHeader(
      "Content-Type",
      types[path.extname(file)] || "application/octet-stream",
    );
    res.end(await readFile(file));
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const issues = [];
page.on("pageerror", (error) => issues.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400)
    issues.push(`${response.status()} ${response.url()}`);
});
const { results } = JSON.parse(
  await readFile("qa-results/route-report.json", "utf8"),
);
try {
  for (const { route } of results) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    if ((await page.locator("h1").count()) !== 1) issues.push(`${route}: H1`);
    await page.locator("img").evaluateAll((images) =>
      images.forEach((img) => {
        img.loading = "eager";
      }),
    );
    await page.waitForFunction(() =>
      [...document.images].every((img) => img.complete),
    );
    const broken = await page
      .locator("img")
      .evaluateAll((images) =>
        images.filter((img) => !img.naturalWidth).map((img) => img.src),
      );
    if (broken.length) issues.push(`${route}: images ${broken.join(", ")}`);
  }
  await page.goto(base + "/products/");
  await page.evaluate(() => {
    window.__staticNavigationSentinel = true;
  });
  await page.locator('.product-card a[href="/products/titan-black/"]').click();
  await page.waitForURL("**/products/titan-black/");
  if (!(await page.evaluate(() => window.__staticNavigationSentinel)))
    issues.push("Static navigation fell back to full reload");
  await page.goto(base + "/products/");
  await page
    .getByRole("button", { name: "Suspended Systems", exact: true })
    .click();
  if ((await page.locator(".product-card").count()) !== 2)
    issues.push("Static filter hydration");
  await page.goto(base + "/contact/?system=Sky%20Hung");
  if ((await page.locator("select[name=system]").inputValue()) !== "Sky Hung")
    issues.push("Static query prefill");
  await writeFile(
    "qa-results/static-report.json",
    JSON.stringify(
      { testedAt: new Date().toISOString(), routes: results.length, issues },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({ staticRoutes: results.length, issues }, null, 2),
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
if (issues.length) process.exitCode = 1;
