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
  image: string;
  imageAlt: string;
};
const approved = (path: string) => `/images/approved/${path}`;
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
    image: approved("cubicle-systems/titan-black/titan-black-main.jpg"),
    imageAlt: "Titan Black product visual with dual-tone cubicle panels and black aluminium profiles",
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
    image: approved("cubicle-systems/nova/nova-main.jpg"),
    imageAlt: "Nova product visual with anodised aluminium cubicle profiles",
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
    image: approved("cubicle-systems/supernova/supernova-main.jpg"),
    imageAlt: "Supernova product visual with stainless-steel cubicle construction",
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
    image: approved("cubicle-systems/supernova-plus/supernova-plus-main.jpg"),
    imageAlt: "Supernova Plus product visual with stainless-steel cubicle construction",
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
    image: approved("cubicle-systems/base-box/base-box-main.jpg"),
    imageAlt: "Base Box product visual showing shoe-box base without legs or top rail",
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
    image: approved("cubicle-systems/base-box-pro/base-box-pro-main.jpg"),
    imageAlt: "Base Box Pro product visual showing shoe-box base and top rail support",
  },
  {
    slug: "float",
    name: "Flot",
    family: "Suspended Systems",
    profile: "Anodised aluminium; H Type Top Rail; MS Bracket",
    hardware: "SS 316",
    character: "An open floor. A lighter expression.",
    description:
      "A wall-to-wall floating cubicle system with anodised aluminium, H Type Top Rail, MS Bracket and SS 316 hardware.",
    mounting: "Wall-to-wall floating",
    detail:
      "Flot uses the support configuration stated in the approved system schedule. Site wall interfaces and final fixing arrangements are confirmed before specification.",
    related: ["sky-hung"],
    image: approved("cubicle-systems/flot/flot-main.jpg"),
    imageAlt: "Flot product visual showing a wall-to-wall floating cubicle system with clear floor gap",
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
    image: approved("cubicle-systems/sky-hung/sky-hung-main.jpg"),
    imageAlt: "Sky Hung product visual showing a ceiling-hung cubicle system with a leg-free floor",
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
    related: ["titan-black"],
    image: approved("pro-doors/pro-doors-main.jpg"),
    imageAlt: "Pro Doors product visual showing a project-specific framed door system",
  },
  {
    slug: "junior-series",
    name: "Junior Cubicles",
    family: "Age-group Cubicles",
    profile: "Age-group and project-specific",
    hardware: "Coordinated to the approved age group",
    character: "Small users. Thoughtful spaces.",
    description:
      "Child-friendly privacy with shaped profiles, practical proportions and configurations for the intended age group.",
    mounting: "Age-group and site-specific",
    detail:
      "Panel height, profile arrangement and hardware are confirmed for the intended age group and site. Adult-system specifications are not automatically assigned to Junior Cubicles.",
    related: ["titan-black", "nova", "supernova", "base-box"],
    variants: [
      "Below 5 Years",
      "5–10 Years",
      "11–14 Years",
      "15 Years & Above",
      "Custom configuration",
    ],
    image: approved("junior-series/junior-5-10-years-main.jpg"),
    imageAlt: "Junior Series product visual showing child-scaled washroom cubicles",
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
      "Reference size: approximately 900 mm height × 450 mm width. Final dimensions and fixing details are confirmed project-wise.",
    related: ["junior-series"],
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
    image: approved("urinal-modesty-panels/urinal-modesty-panels-main.jpg"),
    imageAlt: "Modesty panel product visual for urinal privacy",
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
    related: ["modesty-panels"],
    variants: ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5", "Z-Type", "Custom bank"],
    image: approved("hpl-lockers/locker-tier-1-main.jpg"),
    imageAlt: "HPL locker product visual showing a single-tier locker configuration",
  },
  {
    slug: "shower-cubicles", name: "Shower Cubicles", family: "Washroom Solutions",
    profile: "Project-specific support configuration", hardware: "Selected by approved specification",
    character: "A considered enclosure for wet-area use.",
    description: "Shower cubicles coordinated to the room layout, intended use and approved project specification.",
    mounting: "Project-specific", detail: "Panel grade, thickness, hardware and interfaces are confirmed against the approved project specification. A custom configuration can be reviewed for the project.", related: ["changing-room-cubicles"],
    image: approved("shower-cubicles/shower-cubicle-main.jpg"), imageAlt: "Shower cubicle product visual from the approved Cubiclepro asset set",
  },
  {
    slug: "changing-room-cubicles", name: "Changing Room Cubicles", family: "Washroom Solutions",
    profile: "Project-specific support configuration", hardware: "Selected by application",
    character: "Privacy and flow, planned together.",
    description: "Changing room cubicles coordinated around privacy, circulation and the project layout.",
    mounting: "Project-specific", detail: "Final dimensions, material and hardware are confirmed through the approved project detail. A custom configuration can be reviewed for the project.", related: ["shower-cubicles"],
    image: approved("changing-room-cubicles/changingroom-cubicle-main.jpg"), imageAlt: "Changing room cubicle product visual from the approved Cubiclepro asset set",
  },
];
export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
export const imageFor = (slug: string) => {
  const special: Record<string, string> = {
    hero: approved("cubicle-systems/sky-hung/sky-hung-main.jpg"),
    "shape-library": approved("urinal-modesty-panels/urinal-modesty-panel-shapes.png"),
    "junior-series": approved("junior-series/junior-5-10-years-main.jpg"),
    "hpl-lockers": approved("hpl-lockers/locker-tier-1-main.jpg"),
  };
  return special[slug] || productBySlug(slug)?.image || approved("cubicle-systems/nova/nova-main.jpg");
};
export const imageAltFor = (slug: string) =>
  productBySlug(slug)?.imageAlt || "Cubiclepro product visual";
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
