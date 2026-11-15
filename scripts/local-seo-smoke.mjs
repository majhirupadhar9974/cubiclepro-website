import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3100';
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await mkdir('qa-results', { recursive: true });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto(`${base}/locations/ahmedabad/`);
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal((await page.title()).match(/cubiclepro/gi)?.length, 1);
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), 'https://www.cubiclepro.in/locations/ahmedabad/');
    await page.getByRole('heading', { name: 'Plan your washroom with our Ahmedabad team.' }).waitFor();
    assert.match(await page.getByRole('link', {name:'Ahmedabad sales WhatsApp'}).getAttribute('href'), /wa.me\/918401118340/);
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    assert(scripts.some(value => JSON.parse(value)['@graph']?.some(item => item['@type'] === 'LocalBusiness' && item.address.addressLocality === 'Ahmedabad')));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    await page.screenshot({path:`qa-results/ahmedabad-${width}.png`, fullPage:true});
  }
  await page.goto(`${base}/contact/?city=Ahmedabad`);
  await page.locator('input[name=city]').waitFor();
  await page.waitForFunction(() => document.querySelector('input[name=city]').value === 'Ahmedabad');
  await page.locator('input[name=city]').fill('Surat');
  assert.equal(await page.locator('input[name=city]').inputValue(), 'Surat');
  await page.goto(base);
  await page.getByRole('link',{name:'Discuss an Ahmedabad project'}).waitFor();
  assert.deepEqual(errors, []);
  console.log('PASS: desktop/mobile Ahmedabad page, title, canonical, business schema, WhatsApp, editable city prefill, homepage link, no runtime errors.');
} finally { await browser.close(); }
