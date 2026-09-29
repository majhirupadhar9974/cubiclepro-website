export type MainCategory = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  href: string;
  image?: string;
  alt?: string;
};

const approved = (path: string) => `/images/approved/${path}`;

export const mainCategories: MainCategory[] = [
  {
    slug: "restroom-cubicles",
    name: "Restroom Cubicles",
    shortName: "Restroom Cubicles",
    description: "Eight system directions for commercial washroom requirements.",
    href: "/products/",
    image: approved("cubicle-systems/supernova-plus/supernova-plus-main.jpg"),
    alt: "Restroom cubicle system visual with blue panels and stainless-steel profiles",
  },
  {
    slug: "ump",
    name: "Urinal Modesty Panels",
    shortName: "UMP",
    description: "Nine reference shapes with custom sizes and shapes on requirement.",
    href: "/products/modesty-panels/",
    image: approved("urinal-modesty-panels/urinal-modesty-panels-main.jpg"),
    alt: "Urinal modesty panel system visual",
  },
  {
    slug: "junior-cubicles",
    name: "Junior Cubicles",
    shortName: "Junior Cubicles",
    description: "Age-group records with separately approved images and dimensions.",
    href: "/products/junior-series/",
    image: approved("junior-series/junior-5-10-years-main.jpg"),
    alt: "Age-specific Junior Cubicle system visual",
  },
  {
    slug: "lockers",
    name: "HPL Lockers",
    shortName: "Lockers",
    description: "Tier 1 to Tier 5 and Z-Type configuration records.",
    href: "/products/hpl-lockers/",
    image: approved("hpl-lockers/locker-tier-3-main.jpg"),
    alt: "Tier 3 HPL locker configuration visual",
  },
  {
    slug: "shower-cubicles",
    name: "Shower Cubicles",
    shortName: "Shower Cubicles",
    description: "Wet-area enclosures coordinated to the approved project requirement.",
    href: "/products/shower-cubicles/",
    image: approved("shower-cubicles/shower-cubicle-main.jpg"),
    alt: "Approved Shower Cubicle product visual",
  },
  {
    slug: "changing-room-cubicles",
    name: "Changing Room Cubicles",
    shortName: "Changing Room",
    description: "Privacy and circulation planned around the changing-room layout.",
    href: "/products/changing-room-cubicles/",
    image: approved("changing-room-cubicles/changingroom-cubicle-main.jpg"),
    alt: "Approved Changing Room Cubicle product visual",
  },
  {
    slug: "cladding-washbasin-storage",
    name: "Cladding & Washbasin Storage",
    shortName: "Cladding & Storage",
    description: "A project-led, text-first scope until approved product imagery is available.",
    href: "/solutions/washroom-cladding/",
  },
  {
    slug: "accessories",
    name: "Accessories",
    shortName: "Accessories",
    description: "Profiles, hardware and construction components mapped to the selected system.",
    href: "/hardware/",
    image: approved("cubicle-systems/supernova-plus/supernova-plus-ss316-hardware-overview.jpg"),
    alt: "Stainless-steel cubicle hardware overview",
  },
];

export const heroCategories = mainCategories.filter((category) => category.image);

export type Industry = {
  slug: string;
  name: string;
  kicker: string;
  description: string;
  considerations: string[];
  image: string;
};

export const industries: Industry[] = [
  {
    slug: "corporate-offices",
    name: "Corporate Offices",
    kicker: "Workplace washrooms",
    description: "Coordinate privacy, finish intent, cleaning access and daily user flow without over-specifying the system before the site is understood.",
    considerations: ["Visitor and staff usage", "Fit-out interfaces", "Maintenance access"],
    image: approved("cubicle-systems/nova/nova-main.jpg"),
  },
  {
    slug: "education",
    name: "Education",
    kicker: "Schools and campuses",
    description: "Match cubicle scale, privacy and hardware to the intended age group, while keeping adult and junior records clearly separated.",
    considerations: ["Age-group dimensions", "Supervision and privacy", "Locker planning"],
    image: approved("junior-series/junior-5-10-years-main.jpg"),
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    kicker: "Care environments",
    description: "Review access, circulation, cleaning routines and approved material requirements before confirming a cubicle or partition system.",
    considerations: ["Access requirements", "Cleaning workflow", "Site coordination"],
    image: approved("cubicle-systems/supernova/supernova-main.jpg"),
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    kicker: "Guest-facing spaces",
    description: "Balance architectural expression with practical maintenance, wet-area interfaces and a consistent hardware schedule.",
    considerations: ["Guest experience", "Wet-area detailing", "Finish coordination"],
    image: approved("shower-cubicles/shower-cubicle-main.jpg"),
  },
  {
    slug: "airports-transit",
    name: "Airports & Transit",
    kicker: "High-use public facilities",
    description: "Plan for clear circulation, maintainable components and project-approved systems suited to sustained public use.",
    considerations: ["High-use planning", "Maintenance access", "Wayfinding interfaces"],
    image: approved("cubicle-systems/base-box-pro/base-box-pro-main.jpg"),
  },
  {
    slug: "industrial-facilities",
    name: "Industrial Facilities",
    kicker: "Factories and workplaces",
    description: "Coordinate practical partitions, changing-room cubicles and locker configurations around shift patterns and site conditions.",
    considerations: ["Changing-room flow", "Locker configuration", "Installation interfaces"],
    image: approved("hpl-lockers/locker-tier-4-main.jpg"),
  },
  {
    slug: "retail-public-spaces",
    name: "Retail & Public Spaces",
    kicker: "Customer facilities",
    description: "Select a system after reviewing user mix, cleaning access, privacy and the architectural direction of the public space.",
    considerations: ["User mix", "Privacy planning", "Durable interfaces"],
    image: approved("cubicle-systems/titan-black/titan-black-main.jpg"),
  },
  {
    slug: "sports-wellness",
    name: "Sports & Wellness",
    kicker: "Gyms, clubs and recreation",
    description: "Bring shower cubicles, changing-room privacy and lockers into one coordinated requirement rather than treating them as isolated items.",
    considerations: ["Wet and dry zones", "Changing privacy", "Storage capacity"],
    image: approved("changing-room-cubicles/changingroom-cubicle-main.jpg"),
  },
];

export const faqs = [
  {
    q: "Which CubiclePro system should I select for a commercial washroom?",
    a: "Start with the application, expected usage, mounting condition and approved material requirement. CubiclePro can then compare suitable profile, hardware and support configurations without treating the recommendation as engineering certification.",
    tags: ["general", "selection"],
  },
  {
    q: "Can cubicle dimensions and configurations be customised?",
    a: "Yes. Custom dimensions, layout, privacy, hardware and configuration can be reviewed for each applicable product, subject to site conditions, technical feasibility and the approved project specification.",
    tags: ["general", "custom"],
  },
  {
    q: "What is the difference between Supernova and Supernova+?",
    a: "Supernova uses SS 304 profiles or supports with SS 316 hardware. Supernova+ uses SS 316 profiles or supports with SS 316 hardware. Their images, specifications and metadata remain separate.",
    tags: ["restroom", "stainless"],
  },
  {
    q: "Are Junior Cubicles organised by product series?",
    a: "No. Junior Cubicles are organised by approved age-group records: Below 5 Years, 5-10 Years, 11-14 Years and 15 Years & Above. Dimensions are shown only where verified for that exact age group.",
    tags: ["junior"],
  },
  {
    q: "What UMP shapes are available?",
    a: "The approved Urinal Modesty Panel shapes are CP AERO, CP TAPER, CP WAVE, CP SLANT, CP SOFT, CP LEAN, CP FLOW, CP SWEEP and CP DOME. The reference size is 1200 mm by 450 mm; custom sizes and shapes can be discussed.",
    tags: ["ump"],
  },
  {
    q: "Which HPL locker configurations are listed?",
    a: "The approved records are Tier 1, Tier 2, Tier 3, Tier 4, Tier 5 and Z-Type. Each configuration uses its own approved image. Thickness and dimensions remain project- or configuration-specific until verified.",
    tags: ["lockers"],
  },
  {
    q: "What information is required for a quotation?",
    a: "Share the company, project city, site location, project type, approximate cubicle quantity, interested system, panel preference and message. A drawing or BOQ may be uploaded privately when the form service is configured.",
    tags: ["enquiry"],
  },
  {
    q: "Does CubiclePro provide technical enquiry support?",
    a: "Yes. Use the dedicated technical enquiry route for drawings, system compatibility, profiles, hardware or site-interface questions. Final advice remains tied to the approved project information.",
    tags: ["technical"],
  },
  {
    q: "What warranty applies?",
    a: "CubiclePro provides one-year warranty cover on hardware, profiles and installation workmanship, subject to normal usage and CubiclePro warranty conditions. Panel warranty follows the approved material grade and the respective manufacturer terms.",
    tags: ["warranty"],
  },
  {
    q: "Are colours and finishes selected online?",
    a: "No. The website does not provide a shade selector or visualizer. Colours and finishes are finalized project-wise against the approved specification.",
    tags: ["finishes"],
  },
];

export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  sections: { heading: string; body: string }[];
  related: string[];
};

export const articles: Article[] = [
  {
    slug: "how-to-compare-commercial-toilet-cubicle-systems",
    title: "How to compare commercial toilet cubicle systems",
    summary: "A practical framework for comparing mounting, profiles, hardware, application and site interfaces before requesting a quotation.",
    category: "Specification guide",
    readTime: "6 min read",
    related: ["titan-black", "supernova-plus", "sky-hung"],
    sections: [
      { heading: "Begin with the space", body: "The right comparison starts with user flow, floor and ceiling conditions, wall interfaces, cleaning access and the intended architectural expression. A product name alone is not a complete specification." },
      { heading: "Compare the construction language", body: "Review the profile or support family, hardware family and mounting arrangement separately. This avoids transferring a grade or component from one system to another." },
      { heading: "Confirm before approval", body: "Final panel grade, thickness, hardware, dimensions and configuration should be recorded in the approved project specification before supply." },
    ],
  },
  {
    slug: "washroom-planning-for-airports-and-transit-facilities",
    title: "Washroom planning for airports and transit facilities",
    summary: "Key questions for high-use washrooms: circulation, maintainable components, privacy, cleaning access and installation interfaces.",
    category: "Applications",
    readTime: "5 min read",
    related: ["base-box-pro", "supernova", "modesty-panels"],
    sections: [
      { heading: "Plan for sustained use", body: "Transit washrooms need a clear maintenance strategy, accessible circulation and components that can be reviewed or replaced without disrupting more of the space than necessary." },
      { heading: "Keep choices traceable", body: "Profiles, hardware, panels and mounting should be recorded as separate decisions so procurement and site teams understand exactly what has been approved." },
      { heading: "Use enquiry context", body: "Include the site location, expected quantity, mounting constraints and available drawings when requesting guidance." },
    ],
  },
  {
    slug: "junior-cubicle-age-groups-and-dimensions",
    title: "Junior Cubicles: age groups and verified dimensions",
    summary: "Why Junior Cubicles are organised by age-band records rather than adult product-series names.",
    category: "Junior Cubicles",
    readTime: "5 min read",
    related: ["junior-series"],
    sections: [
      { heading: "Age group is the primary record", body: "Below 5 Years, 5-10 Years, 11-14 Years and 15 Years & Above are separate records with separate approved images. Adult system names are not used as Junior product variants." },
      { heading: "Do not copy dimensions", body: "Dimensions belong to their exact approved age group. The 15 Years & Above record remains unverified until its original source confirms every required value." },
      { heading: "Custom remains controlled", body: "Custom dimensions, privacy, hardware and layout can be discussed, subject to technical approval and the intended site." },
    ],
  },
  {
    slug: "hpl-locker-tier-guide",
    title: "HPL locker configurations: a tier-by-tier guide",
    summary: "Understand Tier 1 to Tier 5 and Z-Type records without assuming one global thickness or dimension.",
    category: "Lockers",
    readTime: "5 min read",
    related: ["hpl-lockers"],
    sections: [
      { heading: "Choose configuration before detail", body: "The number and arrangement of compartments affects user access, internal planning and the overall bank layout. Start by selecting the appropriate configuration record." },
      { heading: "Thickness is not universal", body: "Locker panel thickness is project- or application-specific unless an approved technical source locks the value for the selected configuration." },
      { heading: "Coordinate the room", body: "Confirm bank dimensions, circulation, locking, plinth or support conditions and access requirements against the approved locker schedule." },
    ],
  },
  {
    slug: "urinal-modesty-panel-shape-selection",
    title: "Selecting an Urinal Modesty Panel shape",
    summary: "How shape, reference dimensions, wall clamps and custom requirements come together in a UMP enquiry.",
    category: "UMP",
    readTime: "4 min read",
    related: ["modesty-panels"],
    sections: [
      { heading: "Start with the nine approved shapes", body: "CP AERO, CP TAPER, CP WAVE, CP SLANT, CP SOFT, CP LEAN, CP FLOW, CP SWEEP and CP DOME are maintained as item-level records." },
      { heading: "Use the reference dimension correctly", body: "The approved reference is 1200 mm by 450 mm. Final sizes and custom shapes are confirmed against the requirement." },
      { heading: "Keep the fixing description accurate", body: "The approved public material expression is HPL with stainless-steel clamps. A clamp grade is not published unless verified." },
    ],
  },
  {
    slug: "floating-vs-ceiling-hung-cubicles",
    title: "Floating vs ceiling-hung cubicle systems",
    summary: "A clear comparison of wall-to-wall floating and ceiling-hung planning without inventing structural performance claims.",
    category: "System comparison",
    readTime: "5 min read",
    related: ["float", "sky-hung"],
    sections: [
      { heading: "Different support conditions", body: "Flot is a wall-to-wall floating system. Sky Hung coordinates support from the ceiling and keeps the floor free of legs. The visual result may be similar at floor level, but the interfaces are not interchangeable." },
      { heading: "Site feasibility matters", body: "Wall and ceiling conditions, spans, services and access must be reviewed before a suspended system is approved." },
      { heading: "Keep the enquiry specific", body: "Share dimensions and drawings so the support approach can be discussed against the actual site rather than a generic assumption." },
    ],
  },
];

const locationGroups = {
  Gujarat: ["Ahmedabad", "Gandhinagar", "Sanand", "Changodar", "Bavla", "Vadodara", "Surat", "Vapi", "Valsad", "Navsari", "Bharuch", "Ankleshwar", "Dahej", "Rajkot", "Morbi", "Jamnagar", "Bhavnagar", "Anand", "Nadiad", "Mehsana", "Kalol", "Gandhidham", "Kandla", "Mundra", "Junagadh"],
  Maharashtra: ["Pune", "Mumbai", "Navi Mumbai", "Thane", "Nashik", "Nagpur", "Chhatrapati Sambhajinagar", "Kolhapur"],
  "South India": ["Hyderabad", "Bengaluru", "Chennai"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Bhiwadi"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  Other: ["Delhi NCR", "Goa"],
} as const;

const indexable = new Set(["Ahmedabad", "Hyderabad", "Bengaluru", "Chennai", "Mumbai", "Pune", "Delhi NCR", "Surat", "Vadodara"]);
const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const locations = Object.entries(locationGroups).flatMap(([region, cities]) =>
  cities.map((city) => ({
    city,
    slug: slugify(city),
    region,
    indexable: indexable.has(city),
    focus:
      city === "Hyderabad"
        ? "A priority South India enquiry market for offices, education, healthcare, hospitality and large fit-out requirements."
        : city === "Ahmedabad"
          ? "The home-market enquiry route for commercial, institutional, industrial and fit-out washroom requirements."
          : city === "Mumbai" || city === "Delhi NCR"
            ? "A major urban enquiry market where project scale, access, programme and site interfaces should be shared early."
            : city === "Bengaluru" || city === "Chennai" || city === "Pune"
              ? "A priority commercial and institutional enquiry market with emphasis on clear specification and site coordination."
              : city === "Surat" || city === "Vadodara"
                ? "A priority Gujarat enquiry market for commercial, industrial, education and hospitality requirements."
                : "A roadmap location. Publication remains noindex until differentiated local content and service relevance are approved.",
  })),
);

export const locationBySlug = (slug: string) => locations.find((location) => location.slug === slug);

