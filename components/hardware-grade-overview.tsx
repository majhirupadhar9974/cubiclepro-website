import { hardwareGradeConfigs, hardwareUpgradeNote } from "@/data/hardware-grades";

export default function HardwareGradeOverview({ slug, name }: { slug: string; name: string }) {
  const config = hardwareGradeConfigs[slug];
  if (!config) return null;

  return (
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
  );
}
