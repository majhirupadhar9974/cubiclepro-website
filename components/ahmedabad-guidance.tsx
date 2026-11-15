import Link from "next/link";
import { site, whatsapp } from "@/config/site";
import { TechnicalWhatsAppAction } from "@/components/ui";
import styles from "./ahmedabad-guidance.module.css";

export const ahmedabadFaqs = [
  { q: "Where is CubiclePro based in Ahmedabad?", a: `Our address is ${site.address} Call ${site.phone} before visiting so we can arrange a discussion about your project.` },
  { q: "What should I share for a toilet partition quotation?", a: "Send your Ahmedabad site address, building use, cubicle quantity, floor plan and approximate dimensions. For renovation work, include photographs of the existing walls, floor and plumbing. We will discuss the product configuration and scope with you." },
  { q: "Can I discuss a project near Ahmedabad?", a: "Yes. Send the exact location for projects in Gandhinagar, Sanand, Changodar or another nearby area. Site visits, installation scope, transport and timing are agreed for the individual project before an order is confirmed." },
  { q: "Can you help with an existing masonry toilet partition?", a: "Yes. Pro Doors can be discussed for door openings in existing partitions. Share the opening width and height, wall condition and available door swing space so the door and mounting details can be reviewed." },
  { q: "Are custom sizes and coordinated lockers available?", a: "Yes. Toilet cubicles, urinal modesty panels and HPL lockers can be planned together. Dimensions, finishes, locker capacity and compatible hardware are selected around your layout and users." },
];

export default function AhmedabadGuidance() {
  return <section className={`cp-section ${styles.guidance}`}><div className="container cp-two-col">
    <div>
      <p className="cp-kicker">Ahmedabad · Gujarat</p>
      <h2>Plan your washroom with our Ahmedabad team.</h2>
      <p>CubiclePro Washroom Solutions is based in Fatehwadi, Ahmedabad. Discuss toilet partitions, restroom cubicles, urinal privacy panels and HPL lockers with our sales and technical teams.</p>
      <address>{site.address}</address>
      <p><a href={site.directionsUrl} target="_blank" rel="noopener noreferrer">Get directions to our Ahmedabad office ↗</a></p>
      <p>Call <a href={`tel:${site.tel}`}>{site.phone}</a> before visiting. Bring your layout or share drawings on WhatsApp so we can discuss the right configuration for your space.</p>
      <div className="cp-enquiry-actions">
        <a className="cp-button cp-button-accent" href={whatsapp("Ahmedabad washroom project")} target="_blank" rel="noopener noreferrer">Ahmedabad sales WhatsApp ↗</a>
        <TechnicalWhatsAppAction subject="an Ahmedabad washroom project: layout, measurements and installation" />
      </div>
    </div>
    <div className="cp-feature-stack">
      <article><span>01 · Offices & commercial interiors</span><h3>Plan privacy and circulation.</h3><p>Compare cubicle layouts around available floor space, door openings and cleaning access. Include visitor and staff washrooms in the same drawing review.</p><Link href="/products/nova/">Explore Nova cubicles ↗</Link></article>
      <article><span>02 · Schools & education</span><h3>Select around the age group.</h3><p>Discuss panel heights, supervision, privacy and door hardware with the school team. Match the Junior Cubicle range to the intended users.</p><Link href="/products/junior-series/">Explore Junior Cubicles ↗</Link></article>
      <article><span>03 · Factories & staff facilities</span><h3>Coordinate changing and storage.</h3><p>Plan locker capacity, changing space and washroom use around staff numbers and shift patterns. Share the site address and access arrangements with your enquiry.</p><Link href="/products/hpl-lockers/">Explore HPL lockers ↗</Link></article>
      <article><span>04 · Renovation</span><h3>Work with the existing openings.</h3><p>Photographs and measurements help identify usable walls, plumbing constraints and door swing clearance before selecting a replacement door or partition system.</p><Link href="/products/pro-doors/">Explore Pro Doors ↗</Link></article>
    </div>
  </div></section>;
}
