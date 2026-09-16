export type Product = {
  slug: string;
  name: string;
  family: string;
  profile: string;
  hardware: string;
  character: string;
  description: string;
  mounting: string;
  detail: string;
  related: string[];
  variants?: string[];
};
export const products: Product[] = [
  {
    slug: "titan-black",
    name: "Titan Black",
    family: "Main / Aluminium Series",
    profile: "Black powder-coated aluminium",
    hardware: "Nylon",
    character: "A bold architectural expression.",
    description:
      "Dual-tone panels, black powder-coated aluminium profiles and nylon hardware create a strong, considered washroom expression.",
    mounting: "Confirmed against the approved layout",
    detail:
      "The black profile system gives each panel a defined edge. A practical aluminium configuration with a distinctive architectural character.",
    related: ["nova"],
  },
  {
    slug: "nova",
    name: "Nova",
    family: "Main / Aluminium Series",
    profile: "Anodised aluminium",
    hardware: "SS 316",
    character: "Clean lines. Dependable character.",
    description:
      "A clean commercial cubicle system combining anodised aluminium profiles with SS 316 hardware.",
    mounting: "Confirmed against the approved layout",
    detail:
      "A restrained profile language supports coordinated commercial interiors. Final panel selection and site interfaces are reviewed with the project requirement.",
    related: ["titan-black"],
  },
  {
    slug: "supernova",
    name: "Supernova",
    family: "Stainless Series",
    profile: "SS 304",
    hardware: "SS 316",
    character: "Strength in every line.",
    description:
      "A stainless-steel cubicle system with SS 304 profile/support construction and SS 316 hardware.",
    mounting: "Confirmed against the approved layout",
    detail:
      "A refined stainless-steel system family, with the profile and hardware grades clearly distinguished in the approved specification.",
    related: ["supernova-plus"],
  },
  {
    slug: "supernova-plus",
    name: "Supernova+",
    family: "Stainless Series",
    profile: "SS 316",
    hardware: "SS 316",
    character: "A premium stainless expression.",
    description:
      "The premium stainless-steel option, combining SS 316 profiles/supports with SS 316 hardware.",
    mounting: "Confirmed against the approved layout",
    detail:
      "Stainless steel defines both the support system and hardware. The final material grade, finish and configuration remain tied to the approved requirement.",
    related: ["supernova"],
  },
  {
    slug: "base-box",
    name: "Base Box",
    family: "Box-Up Series",
    profile: "SS 304 shoe-box",
    hardware: "SS 316",
    character: "Grounded. Without the clutter.",
    description:
      "SS 304 shoe-box support with no legs and no top rail, paired with SS 316 hardware.",
    mounting: "No legs / No top rail",
    detail:
      "The shoe-box base creates an ordered elevation. This system has no separate legs and no top rail; dimensions and fixing details are confirmed project-wise.",
    related: ["base-box-pro"],
  },
  {
    slug: "base-box-pro",
    name: "Base Box Pro",
    family: "Box-Up Series",
    profile: "SS 304 shoe-box + rail",
    hardware: "SS 316",
    character: "A base line. A defined top line.",
    description:
      "SS 304 shoe-box support with a top rail, paired with SS 316 hardware.",
    mounting: "Top rail support",
    detail:
      "The shoe-box base and top rail create two clear architectural lines. The support arrangement is coordinated with the layout and approved detail.",
    related: ["base-box"],
  },
  {
    slug: "float",
    name: "Float",
    family: "Suspended Systems",
    profile: "Square top rail",
    hardware: "SS 316",
    character: "An open floor. A lighter expression.",
    description:
      "A wall-to-wall floating cubicle system defined by a square top rail, SS 316 hardware and a clean floor gap.",
    mounting: "Wall-to-wall floating",
    detail:
      "Float is supported wall-to-wall through its square top rail. The site wall interfaces and final fixing arrangement are confirmed before specification.",
    related: ["sky-hung"],
  },
  {
    slug: "sky-hung",
    name: "Sky Hung",
    family: "Suspended Systems",
    profile: "Ceiling-hung box-up",
    hardware: "SS 316",
    character: "Suspended above the everyday.",
    description:
      "A ceiling-hung box-up cubicle system with SS 316 hardware and a clear, leg-free floor.",
    mounting: "Ceiling mounted / leg-free floor",
    detail:
      "The support arrangement is coordinated from the ceiling. Final feasibility and fixing details are subject to site and structural coordination.",
    related: ["float"],
  },
  {
    slug: "pro-doors",
    name: "Pro Doors",
    family: "Doors and Custom",
    profile: "Project-specific frame",
    hardware: "Selected by application",
    character: "The right door for the opening.",
    description:
      "Performance partition doors for defined washroom and interior applications, with a project-specific frame.",
    mounting: "Project-specific",
    detail:
      "The frame, hardware and panel are selected together for the application. Performance requirements are confirmed through the approved specification.",
    related: ["custom"],
  },
  {
    slug: "junior-series",
    name: "Junior Series",
    family: "Junior Series",
    profile: "Variant and project-specific",
    hardware: "Coordinated to the approved variant",
    character: "Small users. Thoughtful spaces.",
    description:
      "Child-friendly privacy with shaped profiles, practical proportions and configurations for the intended age group.",
    mounting: "Age-group and site-specific",
    detail:
      "Panel height, profile arrangement and hardware are confirmed for the intended age group and site. Adult-system specifications are not automatically assigned to Junior variants.",
    related: ["titan-black", "nova", "supernova", "base-box", "custom"],
    variants: [
      "Junior Nova",
      "Junior Supernova",
      "Junior Base Box",
      "Junior Titan Black",
      "Junior Custom",
    ],
  },
  {
    slug: "modesty-panels",
    name: "Modesty Panels",
    family: "Modesty Panels",
    profile: "Compact HPL panel",
    hardware: "SS wall clamps",
    character: "Privacy with a designed edge.",
    description:
      "Compact HPL urinal privacy panels with stainless-steel wall clamps, multiple reference shapes and custom profiles where required.",
    mounting: "Wall-mounted",
    detail:
      "Reference size: approximately 1200 mm height × 450 mm width. Final dimensions and fixing details are confirmed project-wise.",
    related: ["custom"],
    variants: [
      "CP AERO",
      "CP TAPER",
      "CP WAVE",
      "CP SLANT",
      "CP SOFT",
      "CP LEAN",
      "CP FLOW",
      "CP SWEEP",
      "CP DOME",
    ],
  },
  {
    slug: "hpl-lockers",
    name: "HPL Lockers",
    family: "HPL Lockers",
    profile: "HPL door system",
    hardware: "Selected locking option",
    character: "Storage that belongs to the space.",
    description:
      "Coordinated HPL lockers in single-tier, multi-tier and custom-bank layouts for commercial environments.",
    mounting: "Approved locker schedule",
    detail:
      "HPL doors, internal layouts and suitable locking options are coordinated against the approved locker schedule and room dimensions.",
    related: ["custom", "modesty-panels"],
    variants: ["Single-tier", "Multi-tier", "Custom banks"],
  },
  {
    slug: "custom",
    name: "Custom",
    family: "Doors and Custom",
    profile: "Site-led configuration",
    hardware: "As specified",
    character: "Built around the requirement.",
    description:
      "A site-led washroom configuration developed around intended use, site conditions and the approved detail.",
    mounting: "As specified",
    detail:
      "When the scope moves beyond a standard layout, Cubiclepro coordinates the system around site interfaces and the approved project requirements.",
    related: ["pro-doors"],
  },
];
export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
export const imageFor = (slug: string) => `/images/products/${slug}.webp`;
const productImageAlts: Record<string, string> = {
  "titan-black":
    "Titan Black concept visual: dual-tone cubicle panels framed by black profiles",
  nova: "Nova concept visual: light cubicle panels with slim aluminium profiles and door fittings",
  supernova:
    "Supernova concept visual: dark blue cubicle doors with metallic supports and fittings",
  "supernova-plus":
    "Supernova+ concept visual: dark blue cubicle doors with metallic supports and fittings",
  "base-box":
    "Base Box concept visual: cubicles with shoe-box base support, no legs and no top rail",
  "base-box-pro":
    "Base Box Pro concept visual: cubicles with shoe-box base support and a top rail",
  float:
    "Float concept visual: wall-to-wall cubicles with a square top rail and open floor gap",
  "sky-hung":
    "Sky Hung concept visual: ceiling-supported cubicles with a leg-free floor",
  "pro-doors":
    "Pro Doors concept visual: framed partition doors in a commercial interior",
  "junior-series":
    "Junior Series concept visual: child-height privacy cubicles with shaped blue panels",
  "modesty-panels":
    "Modesty Panels concept visual: wall-mounted privacy panels between urinals",
  "hpl-lockers":
    "HPL Lockers concept visual: single-tier and multi-tier storage banks",
  custom:
    "Custom concept visual: partition doors arranged for an interior opening",
};
export const imageAltFor = (slug: string) => productImageAlts[slug];
export const applications = [
  [
    "Corporate Offices",
    "Coordinated cubicles and partitions for workplace washrooms and fit-outs.",
  ],
  [
    "Education",
    "Age-aware privacy, Junior Series options, modesty panels and lockers.",
  ],
  [
    "Healthcare",
    "Privacy systems and coordinated washroom scope matched to approved requirements.",
  ],
  [
    "Hospitality",
    "Architectural cubicles, shower partitions, cladding and integrated storage.",
  ],
  [
    "Retail",
    "Considered washroom systems for customer and staff environments.",
  ],
  [
    "Public Facilities",
    "Site-led privacy systems planned around usage and access requirements.",
  ],
  [
    "Industrial",
    "Practical partitions, changing-room scope and lockers where specified.",
  ],
  [
    "Fit-Out Projects",
    "Measured coordination with floor levels, walls, ceilings and programme.",
  ],
];
export const scope = [
  "Toilet Cubicles",
  "Washroom Partitions",
  "Shower Cubicles",
  "Modesty Panels",
  "HPL Lockers",
  "Washroom Cladding",
  "Pro Doors",
  "Accessories",
  "Customized Systems",
];
export const workflow = [
  ["Understand", "Review scope, intended use and design direction."],
  ["Measure", "Confirm openings, floor levels and site interfaces."],
  ["Specify", "Agree the system, hardware, panel and layout."],
  ["Supply", "Coordinate production, checking and dispatch."],
  ["Install", "Align, fix, inspect and hand over the agreed scope."],
];
