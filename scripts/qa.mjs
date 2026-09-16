import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { pageSeo } from "../data/seo.ts";
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const issues = [],
  results = [],
  errors = [];
const master = await readFile(
  "../CUBICLEPRO_FINAL_WEBSITE_MASTER_SPECIFICATION.md",
  "utf8",
).catch(() => null);
if (master) {
  const approvedRows = master
    .split("\n")
    .filter((line) => line.startsWith("| "))
    .map((line) =>
      line
        .split(/(?<!\\)\|/)
        .slice(1, -1)
        .map((cell) => cell.trim().replace(/\\\|/g, "|")),
    );
  for (const [route, copy] of Object.entries(pageSeo)) {
    const row = approvedRows.find((cells) => cells[1] === copy.title);
    if (!row || row[2] !== copy.description || row[3] !== copy.h1)
      issues.push(`${route}: SEO source differs from approved master`);
  }
}
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (response) => {
  if (
    response.status() >= 400 &&
    ["script", "stylesheet", "image"].includes(
      response.request().resourceType(),
    )
  )
    errors.push(`Asset HTTP ${response.status()}: ${response.url()}`);
});
const productSlugs = [
  "titan-black",
  "nova",
  "supernova",
  "supernova-plus",
  "base-box",
  "base-box-pro",
  "float",
  "sky-hung",
  "pro-doors",
  "junior-series",
  "modesty-panels",
  "hpl-lockers",
  "custom",
];
const routes = [
  "/",
  "/products/",
  "/materials/",
  "/hardware/",
  "/applications/",
  "/about/",
  "/warranty/",
  "/contact/",
  ...productSlugs.map((s) => `/products/${s}/`),
];
await mkdir("qa-results", { recursive: true });
for (const route of routes) {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  await page.locator("h1").waitFor();
  if (response.status() !== 200)
    issues.push(`${route}: HTTP ${response.status()}`);
  if ((await page.locator("h1").count()) !== 1)
    issues.push(`${route}: H1 count`);
  if (
    (await page.locator("h1").innerText()).replace(/\s+/g, " ").trim() !==
    pageSeo[route].h1
  )
    issues.push(`${route}: approved H1 mismatch`);
  if ((await page.title()) !== pageSeo[route].title)
    issues.push(`${route}: approved title mismatch`);
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ]) {
    if (
      (await page.locator(selector).getAttribute("content")) !==
      pageSeo[route].description
    )
      issues.push(`${route}: approved description mismatch ${selector}`);
  }
  if (
    (await page
      .locator('meta[property="og:title"]')
      .getAttribute("content")) !== pageSeo[route].title
  )
    issues.push(`${route}: Open Graph title mismatch`);
  if (route.startsWith("/products/") && route !== "/products/") {
    for (const heading of [
      "Configuration",
      "Where it fits",
      "Project confirmation",
    ]) {
      if (
        !(await page
          .getByRole("heading", { name: heading, exact: true })
          .count())
      )
        issues.push(`${route}: missing ${heading}`);
    }
    const productName = await page
      .locator('.breadcrumbs [aria-current="page"]')
      .innerText();
    const productWhatsApp = await page
      .locator('.product-ctas a[href*="wa.me"]')
      .getAttribute("href");
    if (
      !new URL(productWhatsApp).searchParams.get("text").includes(productName)
    )
      issues.push(`${route}: product WhatsApp message missing name`);
    const quote = await page
      .locator('.product-ctas a[href*="/contact/"]')
      .getAttribute("href");
    if (new URL(quote, base).searchParams.get("system") !== productName)
      issues.push(`${route}: product quote target mismatch`);
  }
  const canonical = await page
    .locator("link[rel=canonical]")
    .getAttribute("href");
  if (canonical !== `https://www.cubiclepro.in${route}`)
    issues.push(`${route}: canonical ${canonical}`);
  if (!(await page.locator("meta[name=description]").getAttribute("content")))
    issues.push(`${route}: description`);
  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  for (const s of schemas) {
    try {
      const data = JSON.parse(s);
      if (
        route === "/products/modesty-panels/" &&
        data["@type"] === "Product" &&
        data.category !== "Modesty Panels"
      )
        issues.push("Modesty family mismatch");
      if (
        route === "/products/hpl-lockers/" &&
        data["@type"] === "Product" &&
        data.category !== "HPL Lockers"
      )
        issues.push("Locker family mismatch");
    } catch {
      issues.push(`${route}: invalid schema`);
    }
  }
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs
        .filter((i) => i.loading !== "lazy" && (!i.complete || !i.naturalWidth))
        .map((i) => i.src),
    );
  if (broken.length) issues.push(`${route}: broken eager image ${broken}`);
  const links = await page
    .locator("a[href]")
    .evaluateAll((a) => a.map((x) => x.getAttribute("href")));
  for (const link of links) {
    if (link.startsWith("tel:") && link !== "tel:+918401118340")
      issues.push(`${route}: wrong telephone`);
    if (link.startsWith("mailto:") && link !== "mailto:sales@cubiclepro.in")
      issues.push(`${route}: wrong email`);
    if (
      link.includes("wa.me") &&
      !link.startsWith("https://wa.me/918401118340?text=")
    )
      issues.push(`${route}: wrong WhatsApp`);
    if (
      link.startsWith("/") &&
      !routes.includes(link.split("?")[0].split("#")[0])
    )
      issues.push(`${route}: unknown internal link ${link}`);
  }
  results.push({
    route,
    status: response.status(),
    title: await page.title(),
    canonical,
    schemas: schemas.length,
  });
}
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["tablet", 768, 1024],
  ["mobile", 390, 844],
  ["small-mobile", 360, 800],
]) {
  console.log(`Checking ${name} layouts and accessibility`);
  await page.setViewportSize({ width, height });
  for (const route of ["/", "/products/", "/products/sky-hung/", "/contact/"]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    if (
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      )
    )
      issues.push(`${name} ${route}: horizontal overflow`);
    const broken = await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src),
      );
    if (broken.length)
      issues.push(`${name} ${route}: unloaded image ${broken}`);
    await page.screenshot({
      path: `qa-results/${name}-${route.replaceAll("/", "_") || "home"}.png`,
      fullPage: true,
    });
    if (name === "desktop" || name === "mobile") {
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      for (const v of axe.violations)
        issues.push(
          `${name} ${route}: accessibility ${v.id} ${v.nodes.map((n) => n.target.join(",")).join(";")}`,
        );
    }
  }
}
await writeFile(
  "qa-results/route-report.json",
  JSON.stringify({ results, issues }, null, 2),
);
await page.setViewportSize({ width: 360, height: 800 });
for (const route of routes) {
  await page.goto(base + route, { waitUntil: "networkidle" });
  if (
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    )
  )
    issues.push(`360px ${route}: horizontal overflow`);
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(base);
await page.getByRole("button", { name: "Products" }).click();
if (
  !(await page
    .getByRole("link", { name: "Sky Hung", exact: true })
    .first()
    .isVisible())
)
  issues.push("Desktop menu does not open");
await page.keyboard.press("Escape");
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Open menu" }).click();
if (!(await page.getByRole("dialog").isVisible()))
  issues.push("Mobile menu does not open");
if (
  !(await page
    .locator(".site-header, main, #site-footer, .mobile-actions")
    .evaluateAll((els) =>
      els.every((el) => el.inert && el.getAttribute("aria-hidden") === "true"),
    ))
)
  issues.push("Mobile menu background remains accessible");
const dialog = page.getByRole("dialog");
for (const label of [
  "Request a Quote",
  "WhatsApp Us",
  "Call Now",
  "Hardware & Profiles",
]) {
  if (
    !(await dialog.getByRole("link", { name: label, exact: true }).isVisible())
  )
    issues.push(`Mobile action missing: ${label}`);
}
await dialog.getByRole("button", { name: "Close menu", exact: true }).focus();
await page.keyboard.press("Shift+Tab");
if (
  !(await dialog
    .getByRole("link", { name: "Call Now", exact: true })
    .evaluate((el) => el === document.activeElement))
)
  issues.push("Mobile reverse focus trap failed");
await page.keyboard.press("Tab");
if (
  !(await dialog
    .getByRole("button", { name: "Close menu", exact: true })
    .evaluate((el) => el === document.activeElement))
)
  issues.push("Mobile forward focus trap failed");
const menuAxe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
for (const v of menuAxe.violations)
  issues.push(`Mobile menu accessibility: ${v.id}`);
await page
  .getByRole("dialog")
  .getByRole("button", { name: "Close menu", exact: true })
  .click();
if (
  await page
    .locator("main")
    .evaluate((el) => el.inert || el.hasAttribute("aria-hidden"))
)
  issues.push("Menu background state not restored");
if (
  !(await page
    .getByRole("button", { name: "Open menu" })
    .evaluate((el) => el === document.activeElement))
)
  issues.push("Menu trigger focus not restored");
await page.getByRole("button", { name: "Open menu" }).click();
await page.keyboard.press("Escape");
if (await page.getByRole("dialog").count())
  issues.push("Mobile Escape close failed");
await page.goto(base + "/products/");
await page
  .getByRole("button", { name: "Suspended Systems", exact: true })
  .click();
if ((await page.locator(".product-card").count()) !== 2)
  issues.push("Product filter mismatch");
await page.goto(base);
await page.getByRole("button", { name: "Education", exact: true }).click();
await page.getByRole("tab", { name: /Profile/ }).click();
await page.getByRole("button", { name: "SS 304", exact: true }).click();
await page.getByRole("tab", { name: /Hardware/ }).click();
await page
  .getByRole("button", { name: "Stainless steel", exact: true })
  .click();
await page.getByRole("tab", { name: /Mounting/ }).click();
await page.getByRole("button", { name: "Ceiling-hung", exact: true }).click();
await page.getByRole("link", { name: "Discuss your selection" }).click();
await page.waitForURL("**/contact/**");
await page.waitForFunction(() =>
  document.querySelector("textarea")?.value.includes("Ceiling-hung"),
);
if (!(await page.locator("textarea").inputValue()).includes("Education"))
  issues.push("Choose Your System brief missing selection");
await page.goto(base + "/contact/?sent=1");
await page.waitForTimeout(250);
if (await page.locator(".submission-notice").count())
  issues.push("URL-only false form confirmation");
await page.goto(base + "/contact/?system=Junior%20Nova");
await page.waitForFunction(
  () => document.querySelector("select[name=system]")?.value === "Junior Nova",
);
await page.goto(base + "/contact/?system=Sky%20Hung");
if ((await page.locator("select[name=system]").inputValue()) !== "Sky Hung")
  issues.push("Product quote prefill failed");
if (await page.locator("form").evaluate((f) => f.checkValidity()))
  issues.push("Empty form unexpectedly valid");
await page.getByLabel("Name *", { exact: true }).fill("QA Test");
await page
  .getByLabel("Mobile number *", { exact: true })
  .fill("+91 90000 00000");
await page.getByLabel("Email *", { exact: true }).fill("qa@example.com");
await page.getByLabel("City *", { exact: true }).fill("Ahmedabad");
await page
  .locator('select[name="project_type"]')
  .selectOption("Corporate Offices");
await page
  .getByLabel("Message *", { exact: true })
  .fill("Local intercepted quality assurance test. No email should be sent.");
await page.locator("input[name=consent]").check();
if (!(await page.locator("form").evaluate((f) => f.checkValidity())))
  issues.push("Valid form rejected");
let submitted = false;
await page.route("https://formsubmit.co/**", async (route) => {
  const request = route.request();
  const post = request.postData() || "";
  submitted =
    request.method() === "POST" &&
    post.includes("Sky+Hung") &&
    post.includes("QA+Test") &&
    new URLSearchParams(post).get("_url") ===
      "https://www.cubiclepro.in/contact/" &&
    new URLSearchParams(post).get("_next") ===
      "https://www.cubiclepro.in/contact/?sent=1" &&
    new URLSearchParams(post).has("_honey") &&
    new URLSearchParams(post).get("_captcha") !== "false";
  await route.fulfill({
    status: 200,
    contentType: "text/html",
    body: "<h1>Local QA: form submission intercepted</h1>",
  });
});
await page.getByRole("button", { name: "Send enquiry" }).click();
await page.waitForURL("https://formsubmit.co/**");
if (!submitted) issues.push("Form POST payload failed");
await page.goto(base + "/contact/?sent=1", { waitUntil: "networkidle" });
await page.locator(".submission-notice").waitFor();
if (!(await page.locator(".submission-notice").count()))
  issues.push("Same-session form return missing");
await page.reload();
await page.waitForTimeout(250);
if (await page.locator(".submission-notice").count())
  issues.push("Form return marker not consumed");
await page.setViewportSize({ width: 1440, height: 1000 });
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(base);
const motion = await page
  .locator(".hero h1")
  .evaluate((el) => getComputedStyle(el).animationName);
if (motion !== "none") issues.push("Reduced motion not respected");
if (await page.locator(".media-reveal, .will-reveal").count())
  issues.push("Reduced motion has enhanced reveal states");
const dataSaving = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
await dataSaving.addInitScript(() => {
  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: { saveData: true },
  });
});
const savingPage = await dataSaving.newPage();
savingPage.on("pageerror", (e) => errors.push(`Data saver: ${e.message}`));
await savingPage.goto(base, { waitUntil: "networkidle" });
await savingPage.waitForFunction(() =>
  document.documentElement.classList.contains("motion-lite"),
);
if (
  !(await savingPage
    .locator("html")
    .evaluate((el) => el.classList.contains("motion-lite")))
)
  issues.push("Data saver motion not disabled");
await savingPage.evaluate(() => scrollTo(0, 400));
if (
  (await savingPage
    .locator(".hero-image")
    .evaluate((el) => el.style.getPropertyValue("--hero-depth"))) !== ""
)
  issues.push("Data saver scroll depth active");
await dataSaving.close();
const noJs = await browser.newContext({
  javaScriptEnabled: false,
  viewport: { width: 390, height: 844 },
});
const noJsPage = await noJs.newPage();
await noJsPage.goto(base);
if (
  !(await noJsPage.locator("h1").isVisible()) ||
  !(await noJsPage.locator(".product-card").first().isVisible())
)
  issues.push("No-JavaScript content hidden");
await noJs.close();
for (const [from, to] of [
  ["/hardware-profiles/", "/hardware/"],
  ["/warranty-assurance/", "/warranty/"],
  ["/request-a-quote/", "/contact/"],
]) {
  const r = await context.request.get(base + from);
  if (new URL(r.url()).pathname !== to) issues.push(`Redirect failed: ${from}`);
}
const missing = await page.goto(base + "/this-page-does-not-exist/");
if (missing.status() !== 404) issues.push("404 status incorrect");
for (const path of ["/robots.txt", "/sitemap.xml"]) {
  const r = await context.request.get(base + path);
  if (r.status() !== 200) issues.push(`${path} unavailable`);
}
issues.push(...errors.map((e) => "Browser error: " + e));
await writeFile(
  "qa-results/report.json",
  JSON.stringify(
    {
      testedAt: new Date().toISOString(),
      results,
      issues,
      form: "Local request intercepted; mailbox activation/delivery requires owner verification.",
    },
    null,
    2,
  ),
);
await browser.close();
console.log(JSON.stringify({ routes: routes.length, issues }, null, 2));
if (issues.length) process.exit(1);
