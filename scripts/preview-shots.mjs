import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const issues = [];
await mkdir("qa-results", { recursive: true });
for (const [name, width, height] of [
  ["desktop", 1440, 960],
  ["tablet", 768, 1024],
  ["mobile", 390, 844],
  ["small-mobile", 360, 800],
]) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await page.screenshot({ path: `qa-results/${name}-hero.png` });
  if (!(await page.locator(".hero-caption").isVisible()))
    issues.push(`${name}: concept label hidden`);
  if (width <= 600) {
    const caption = await page.locator(".hero-caption").boundingBox();
    const actions = await page.locator(".mobile-actions").boundingBox();
    if (!caption || !actions || caption.y + caption.height > actions.y)
      issues.push(`${name}: concept label obscured by action bar`);
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    for (const violation of axe.violations)
      issues.push(`${name}: ${violation.id}`);
  }
  await page.locator(".product-grid").first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(750);
  await page.screenshot({ path: `qa-results/${name}-products-section.png` });
  for (const [label, route] of [
    ["sky-hung", "/products/sky-hung/"],
    ["contact", "/contact/"],
  ]) {
    await page.goto("http://127.0.0.1:3000" + route, {
      waitUntil: "networkidle",
    });
    await page.screenshot({ path: `qa-results/${name}-${label}-top.png` });
  }
  await context.close();
}
await browser.close();
await writeFile(
  "qa-results/visual-report.json",
  JSON.stringify(
    {
      testedAt: new Date().toISOString(),
      widths: [1440, 768, 390, 360],
      issues,
    },
    null,
    2,
  ),
);
console.log(JSON.stringify({ visualIssues: issues }, null, 2));
if (issues.length) process.exitCode = 1;
