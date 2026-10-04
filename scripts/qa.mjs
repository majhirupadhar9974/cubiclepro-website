import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { products } from "../data/products.ts";
import { industries, locations } from "../data/site-content.ts";
import { juniorAgeBands, lockerTiers, modestyShapes } from "../data/approved-gallery.ts";
import { solutions } from "../data/solutions.ts";

const base=process.env.QA_BASE_URL||"http://127.0.0.1:3000";
const browser=await chromium.launch({headless:true,channel:"msedge"});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();
const issues=[]; const errors=[];
page.on("pageerror",(error)=>errors.push(error.message));
page.on("response",(response)=>{if(response.status()>=400&&!response.url().includes("/_vercel/")&&["script","stylesheet","image"].includes(response.request().resourceType()))errors.push(`Asset ${response.status()}: ${response.url()}`);});
const articleSlugs=["BLOG_LIBRARY_PART_1.md","BLOG_LIBRARY_PART_2.md"].flatMap((file)=>[...readFileSync(new URL(`../content/${file}`,import.meta.url),"utf8").matchAll(/\*\*Slug:\*\*\s*([^\n]+)/g)].map((match)=>match[1].replaceAll("`","").trim()));
const routes=["/","/products/","/materials/","/hardware/","/applications/","/resources/","/faq/","/about/","/warranty/","/contact/","/technical-enquiry/","/locations/",...solutions.map((x)=>`/solutions/${x.slug}/`),...products.map((x)=>`/products/${x.slug}/`),...juniorAgeBands.map((x)=>`/products/junior-series/${x.age}/`),...lockerTiers.map((x)=>`/products/hpl-lockers/${x.slug}/`),...modestyShapes.map((x)=>`/products/modesty-panels/${x.slug}/`),...articleSlugs.map((slug)=>`/blog/${slug}/`),...industries.map((x)=>`/industries/${x.slug}/`),...locations.filter((x)=>x.indexable).map((x)=>`/locations/${x.slug}/`)];
await mkdir("qa-results",{recursive:true});
for(const route of routes){
  const response=await page.goto(base+route,{waitUntil:"networkidle"});
  if(!response||response.status()!==200)issues.push(`${route}: HTTP ${response?.status()||"no response"}`);
  if(await page.locator("h1").count()!==1)issues.push(`${route}: expected one H1`);
  const canonicalLocator=page.locator('link[rel="canonical"]');
  const canonical=await canonicalLocator.count()?await canonicalLocator.getAttribute("href"):null;
  if(canonical!==`https://www.cubiclepro.in${route}`)issues.push(`${route}: canonical ${canonical||"missing"}`);
  const descriptionLocator=page.locator('meta[name="description"]');
  if(!await descriptionLocator.count()||!(await descriptionLocator.getAttribute("content")))issues.push(`${route}: missing description`);
  const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();
  for(const schema of schemas){try{JSON.parse(schema)}catch{issues.push(`${route}: invalid schema`)}}
  const broken=await page.locator("img").evaluateAll((images)=>images.filter((image)=>image.loading!=="lazy"&&(!image.complete||!image.naturalWidth)).map((image)=>image.src));
  if(broken.length)issues.push(`${route}: broken image ${broken.join(", ")}`);
}
for(const [name,width,height] of [["desktop",1440,1000],["tablet",768,1024],["mobile",390,844],["small-mobile",360,800]]){
  await page.setViewportSize({width,height});
  for(const route of ["/","/products/","/applications/","/industries/corporate-offices/","/products/titan-black/","/products/junior-series/","/products/hpl-lockers/","/products/hpl-lockers/z-type/","/products/modesty-panels/","/warranty/","/technical-enquiry/","/contact/"]){
    await page.goto(base+route,{waitUntil:"networkidle"});
    await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise((resolve)=>setTimeout(resolve,40))}scrollTo(0,0)});
    await page.waitForTimeout(800);
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))issues.push(`${name} ${route}: horizontal overflow`);
    await page.screenshot({path:`qa-results/final-${name}-${route.replaceAll("/","_")||"home"}.png`,fullPage:true});
    if(name==="desktop"||name==="mobile"){const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze();for(const violation of result.violations)issues.push(`${name} ${route}: accessibility ${violation.id} — ${violation.nodes.map((node)=>node.target.join(" ")).join("; ")}`)}
  }
}
await page.setViewportSize({width:1440,height:1000});
await page.goto(base);
const productRail=page.getByRole("region",{name:"Restroom cubicle systems"});
const beforeRail=await productRail.evaluate((element)=>element.scrollLeft);
await page.getByRole("button",{name:"View next Restroom cubicle systems"}).click();
await page.waitForTimeout(600);
const afterRail=await productRail.evaluate((element)=>element.scrollLeft);
if(afterRail<=beforeRail)issues.push("Product rail next arrow did not move the slider");
await page.goto(base+"/warranty/");
for(const text of ["YEAR HPL BOARD WARRANTY","YEAR HARDWARE & CRAFTSMANSHIP"]){if(!(await page.getByText(text,{exact:true}).count()))issues.push(`Warranty label missing: ${text}`)}
await page.goto(base+"/technical-enquiry/");
const technicalWhatsApp=await page.getByRole("link",{name:/WhatsApp technical enquiry/}).getAttribute("href");
if(!technicalWhatsApp?.startsWith("https://wa.me/919924731671?text="))issues.push("Technical WhatsApp target failed");
await page.goto(base+"/products/hpl-lockers/");
await page.locator("a.variant-visual").first().click();
await page.waitForLoadState("networkidle");
if(!page.url().includes("/products/hpl-lockers/tier-1/"))issues.push("Locker card did not open its detail page");
await page.getByRole("button",{name:/Open full image/}).click();
if(!(await page.locator("dialog.image-lightbox").evaluate((dialog)=>dialog.open)))issues.push("Full-image lightbox did not open");
await page.getByRole("button",{name:"Close full image"}).click();
await page.goto(base+"/products/junior-series/");
await page.locator("a.variant-visual").first().click();
await page.waitForLoadState("networkidle");
if(!page.url().includes("/products/junior-series/below-5-years/"))issues.push("Junior card did not open its detail page");
await page.goto(base);
await page.getByRole("button",{name:/Products/}).click();
if(!(await page.getByRole("link",{name:/Titan Black/}).first().isVisible()))issues.push("Desktop product menu failed");
await page.setViewportSize({width:390,height:844});
await page.goto(base);
await page.getByRole("button",{name:"Open menu"}).click();
if(!(await page.getByRole("dialog").isVisible()))issues.push("Mobile menu failed");
for(const name of ["Request a Quote","Sales WhatsApp","Technical WhatsApp","Call Now","Technical enquiry"]){if(!(await page.getByRole("dialog").getByRole("link",{name,exact:true}).isVisible()))issues.push(`Mobile action missing: ${name}`)}
await page.goto(base+"/contact/?system=Sky%20Hung");
await page.waitForFunction(()=>document.querySelector('select[name="system"]')?.value==="Sky Hung");
if(await page.locator('select[name="system"]').inputValue()!=="Sky Hung")issues.push("Quote prefill failed");
const whatsApp=await page.locator('a[href^="https://wa.me/918401118340"]').first().getAttribute("href");
if(!whatsApp?.startsWith("https://wa.me/918401118340?text="))issues.push("WhatsApp target failed");
const contactTechnicalWhatsApp=await page.locator('a[href^="https://wa.me/919924731671"]').first().getAttribute("href");
if(!contactTechnicalWhatsApp?.startsWith("https://wa.me/919924731671?text="))issues.push("Contact technical WhatsApp target failed");
const technicalLinks=await page.locator('a[href="tel:+919924731671"]').count();
if(!technicalLinks)issues.push("Technical phone missing");
const infoLinks=await page.locator('a[href="mailto:info@cubiclepro.in"]').count();
if(!infoLinks)issues.push("Info email missing");
await page.emulateMedia({reducedMotion:"reduce"}); await page.goto(base);
const duration=await page.locator(".cp-hero-slide").first().evaluate((element)=>getComputedStyle(element).transitionDuration);
if(duration!=="0s")issues.push("Reduced motion transition remains active");
issues.push(...errors.map((error)=>`Browser error: ${error}`));
await writeFile("qa-results/final-report.json",JSON.stringify({testedAt:new Date().toISOString(),routes:routes.length,issues},null,2));
await browser.close();
console.log(JSON.stringify({routes:routes.length,issues},null,2));
if(issues.length)process.exit(1);
