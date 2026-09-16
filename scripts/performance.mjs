import { chromium } from "@playwright/test";
import { writeFile, mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();
const cdp = await context.newCDPSession(page);
await cdp.send("Network.enable");
await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
await cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 100,
  downloadThroughput: 200000,
  uploadThroughput: 93750,
});
await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await page.addInitScript(() => {
  window.__metrics = { lcp: 0, cls: 0, longTasks: 0, shifts: [] };
  new PerformanceObserver((l) =>
    l.getEntries().forEach((e) => (window.__metrics.lcp = e.startTime)),
  ).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) =>
    l.getEntries().forEach((e) => {
      if (!e.hadRecentInput) {
        window.__metrics.cls += e.value;
        window.__metrics.shifts.push({
          value: e.value,
          time: e.startTime,
          sources: e.sources.map((source) => ({
            element: source.node?.className || source.node?.nodeName,
            previous: source.previousRect.toJSON(),
            current: source.currentRect.toJSON(),
          })),
        });
      }
    }),
  ).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((l) =>
    l
      .getEntries()
      .forEach(
        (e) => (window.__metrics.longTasks += Math.max(0, e.duration - 50)),
      ),
  ).observe({ type: "longtask", buffered: true });
});
await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const metrics = await page.evaluate(() => ({
  ...window.__metrics,
  resources: performance.getEntriesByType("resource").map((r) => ({
    name: r.name.split("/").pop(),
    bytes: r.transferSize,
    duration: r.duration,
    type: r.initiatorType,
  })),
}));
await mkdir("qa-results", { recursive: true });
await writeFile(
  "qa-results/performance.json",
  JSON.stringify(
    {
      environment:
        "Local production, Edge headless, mobile 390px DPR2, CPU 4x slowdown, network 1.6Mbps and 100ms latency. Laboratory estimate; not field Core Web Vitals.",
      ...metrics,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      lcp_ms: metrics.lcp,
      cls: metrics.cls,
      blocking_ms: metrics.longTasks,
      totalTransfer: metrics.resources.reduce((n, r) => n + r.bytes, 0),
      jsTransfer: metrics.resources
        .filter((r) => r.type === "script")
        .reduce((n, r) => n + r.bytes, 0),
    },
    null,
    2,
  ),
);
await browser.close();
