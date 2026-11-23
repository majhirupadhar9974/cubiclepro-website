import Image from "next/image";

import { hardwareGradeConfigs, hardwareUpgradeNote } from "@/data/hardware-grades";

export default function HardwareGradeOverview({ slug, name, imageSrc }: { slug: string; name: string; imageSrc: string }) {
  const config = hardwareGradeConfigs[slug];
  if (!config) return null;

  return (
    <>
      <figure className="component-card hardware-photo-card">
        <div className="component-image approved-system-component-image">
          <Image src={imageSrc} alt={`${name} hardware component overview`} fill sizes="(max-width: 760px) 100vw, 50vw" />
        </div>
        <figcaption>Hardware components <span>Actual component view</span></figcaption>
      </figure>
      <article className="component-card hardware-grade-overview">
        <div className="hardware-grade-heading">
          <span>Standard configuration</span>
          <h3>{name} hardware grades</h3>
          <p>{config.summary}</p>
        </div>
        <dl>
          {config.components.map(([component, grade]) => <div key={component}><dt>{component}</dt><dd>{grade}</dd></div>)}
        </dl>
        <p className="hardware-upgrade-note"><strong>Custom upgrade</strong>{hardwareUpgradeNote}</p>
        <footer>Hardware specification <span>Product Standard</span></footer>
      </article>
    </>
  );
}
