import Image from "next/image";
import Link from "next/link";
import { PageHero, SectionHeading, QuoteBand, Eyebrow } from "@/components/ui";
import { metadata, PageSchema } from "@/lib/seo";
import { products } from "@/data/products";
import { hardwareGroups, profiles, supportComponents, systemComponents } from "@/data/approved-gallery";
import HardwareGradeOverview from "@/components/hardware-grade-overview";
import { hardwareGradeConfigs } from "@/data/hardware-grades";
export const generateMetadata = () => metadata(
  "Toilet Cubicle Hardware & Profiles",
  "Compare Cubiclepro Nylon PA-6, SS 304 standard hardware, SS 316 adjustable legs and optional complete SS 316 upgrades with system-specific profiles.",
  "/hardware/",
);
function Gallery({ title, src, alt, systemVisual = false }: { title: string; src: string; alt: string; systemVisual?: boolean }) {
  return <figure className="component-card"><div className={`component-image ${systemVisual ? "approved-system-component-image" : ""}`}><Image src={src} alt={alt} fill sizes={systemVisual ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 640px) 45vw, 22vw"} /></div><figcaption>{title}<span>Product Visual</span></figcaption></figure>;
}
export default function Hardware() {
  return <>
    <PageSchema name="Hardware & profiles" path="/hardware/" />
    <PageHero eyebrow="Hardware & profiles" title="The system is in the details." text="Profiles, hardware and mounting are selected together. Every component belongs to the approved configuration." path="/hardware/" />
    <section className="section container">
      <SectionHeading eyebrow="System-specific detail" title="Components mapped to the system." text="Illustrative approved component visuals are shown with generic material terminology. Final parts are set out in the approved project specification." />
      {products.filter(p => ["titan-black", "nova", "supernova", "supernova-plus", "base-box", "base-box-pro", "float", "sky-hung"].includes(p.slug)).map(p => {
        const parts = (requireSystemParts(p.slug));
        return <article className="system-component" key={p.slug}>
          <div className="system-component-title"><div><Eyebrow>{p.family}</Eyebrow><h3>{p.name}</h3><p>{p.profile} <span aria-hidden="true">·</span> {p.hardware}</p></div><Link className="text-link" href={`/products/${p.slug}/`}>System details ↗</Link></div>
          <div className="component-grid hardware-component-grid"><Gallery title="Profile / support" src={parts.profile} alt={`${p.name} profile and support overview`} systemVisual />{hardwareGradeConfigs[p.slug] ? <HardwareGradeOverview slug={p.slug} name={p.name} imageSrc={parts.hardware} /> : <Gallery title="Hardware" src={parts.hardware} alt={`${p.name} hardware overview`} systemVisual />}</div>
        </article>;
      })}
    </section>
    <section className="section surface"><div className="container">
      <SectionHeading eyebrow="Component library" title="Profile families." text="Door Stopper Channel is a profile component. The image family and selected material must remain correlated with the specified system." />
      {(["Anodised aluminium", "Black powder-coated aluminium", "Stainless steel"] as const).map(group => <div className="component-family" key={group}><h3>{group}</h3><div className="component-grid four">{profiles.filter(p => p.group === group).map(p => <Gallery key={p.src} title={p.title} src={p.src} alt={p.alt} />)}</div></div>)}
    </div></section>
    <section className="section container"><SectionHeading eyebrow="Hardware families" title="Privacy, grip and movement." text="Where shown, the indicator lock and door knob are distinct components. Internal convenience components are not presented as exterior fittings." />
      {hardwareGroups.filter((group) => group.name === "Stainless-Steel Hardware").map(group => <div className="component-family" key={group.name}><h3>{group.name}</h3><div className="component-grid">{group.items.map(([title, file]) => <Gallery key={file} title={title} src={`/images/approved/${group.folder}/${file}`} alt={`${title} in ${group.name}`} />)}</div></div>)}
    </section>
    <section className="section surface"><div className="container"><SectionHeading eyebrow="Support components" title="Mounting and support elements." text="Exact fixing, material grade and suitability are confirmed against the selected system and site conditions." /><div className="component-grid four">{supportComponents.map(item => <Gallery key={item.src} {...item} />)}</div>
      <p className="fine-print">H Type Top Rail and MS Bracket are shown as separate components. Material selection and corresponding component imagery must match the approved configuration. Floor anchor grade is project-specified.</p></div></section>
    <section className="section container"><Eyebrow>System mapping</Eyebrow><h2>Profiles and hardware, clearly stated.</h2><div className="hardware-matrix">{products.slice(0, 9).map(p => <Link href={`/products/${p.slug}/`} key={p.slug}><h3>{p.name}</h3><div><span className="micro">Profile / support</span><p>{p.profile}</p></div><div><span className="micro">Hardware</span><p>{p.hardware}</p></div><span>↗</span></Link>)}</div></section>
    <QuoteBand />
  </>;
}
function requireSystemParts(slug: string) {
  const parts = systemComponents[slug];
  if (!parts) throw new Error(`Missing approved component mapping for ${slug}`);
  return { profile: `/images/approved/${parts.profile}`, hardware: `/images/approved/${parts.hardware}` };
}
