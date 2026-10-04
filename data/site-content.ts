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
    description: "Cladding, washbasin counters and storage coordinated to the room, services and approved material schedule.",
    href: "/solutions/washbasin-counters-storage/",
    image: approved("cladding-washbasin-storage/washbasin-storage-reference.png"),
    alt: "Washbasin counter, storage and wall-cladding reference visual",
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
  considerations: { title: string; body: string }[];
  image: string;
};

export const industries: Industry[] = [
  {
    slug: "corporate-offices",
    name: "Corporate Offices",
    kicker: "Workplace washrooms",
    description: "Coordinate privacy, finish intent, cleaning access and daily user flow without over-specifying the system before the site is understood.",
    considerations: [
      { title: "Visitor and staff usage", body: "Estimate peak occupancy, staff strength and visitor movement so cubicle quantity, privacy and circulation are appropriate for the workplace." },
      { title: "Fit-out interfaces", body: "Coordinate finished floor levels, wall finishes, ceiling services, plumbing points and door clearances with the interior fit-out programme." },
      { title: "Maintenance access", body: "Keep cleaning routes, replaceable hardware and service access practical for the facility team without compromising the architectural finish." },
    ],
    image: approved("cubicle-systems/nova/nova-main.jpg"),
  },
  {
    slug: "education",
    name: "Education",
    kicker: "Schools and campuses",
    description: "Match cubicle scale, privacy and hardware to the intended age group, while keeping adult and junior records clearly separated.",
    considerations: [
      { title: "Age-group dimensions", body: "Select the LittleSteps, Explorer, Horizon or Youth record by intended age group; do not scale an adult cubicle by assumption." },
      { title: "Supervision and privacy", body: "Balance privacy with the supervision policy of the school, and review door height, divider height, gap and hardware accordingly." },
      { title: "Locker planning", body: "Confirm student count, bag size, timetable pattern and available wall length before choosing the locker module and bank arrangement." },
    ],
    image: approved("junior-series/junior-5-10-years-main.jpg"),
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    kicker: "Care environments",
    description: "Review access, circulation, cleaning routines and approved material requirements before confirming a cubicle or partition system.",
    considerations: [
      { title: "Access requirements", body: "Review accessible layouts, door operation, circulation and assistance needs with the project consultant and applicable local requirements." },
      { title: "Cleaning workflow", body: "Choose details that support frequent cleaning, clear floor access and practical replacement of high-contact hardware." },
      { title: "Site coordination", body: "Coordinate clinical services, plumbing, wall backing, floor levels and infection-control requirements before final approval." },
    ],
    image: approved("cubicle-systems/supernova/supernova-main.jpg"),
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    kicker: "Guest-facing spaces",
    description: "Balance architectural expression with practical maintenance, wet-area interfaces and a consistent hardware schedule.",
    considerations: [
      { title: "Guest experience", body: "Align privacy, door operation, sight-line control and finish quality with the service level expected in the property." },
      { title: "Wet-area detailing", body: "Coordinate shower zones, floor slopes, waterproofing interfaces, ventilation and cleaning access before finalising supports." },
      { title: "Finish coordination", body: "Confirm panel, profile and hardware finishes against the approved interior palette instead of relying on screen colours." },
    ],
    image: approved("shower-cubicles/shower-cubicle-main.jpg"),
  },
  {
    slug: "airports-transit",
    name: "Airports & Transit",
    kicker: "High-use public facilities",
    description: "Plan for clear circulation, maintainable components and project-approved systems suited to sustained public use.",
    considerations: [
      { title: "High-use planning", body: "Use passenger footfall, peak-hour demand and cleaning cycles to plan quantity, circulation and maintainable cubicle configurations." },
      { title: "Maintenance access", body: "Plan replaceable components and service access so individual repairs can be handled with minimal disruption to the facility." },
      { title: "Wayfinding interfaces", body: "Coordinate accessible cubicles, family facilities, signage and entrance sight lines with the terminal planning team." },
    ],
    image: approved("cubicle-systems/base-box-pro/base-box-pro-main.jpg"),
  },
  {
    slug: "industrial-facilities",
    name: "Industrial Facilities",
    kicker: "Factories and workplaces",
    description: "Coordinate practical partitions, changing-room cubicles and locker configurations around shift patterns and site conditions.",
    considerations: [
      { title: "Changing-room flow", body: "Map shift change, clean and dirty routes, showers and changing privacy so workforce movement remains practical." },
      { title: "Locker configuration", body: "Select locker capacity from uniform, PPE, bag and personal-storage needs rather than door count alone." },
      { title: "Installation interfaces", body: "Check floor condition, wall backing, drainage, ventilation and work permits before approving the installation sequence." },
    ],
    image: approved("hpl-lockers/locker-tier-4-main.jpg"),
  },
  {
    slug: "retail-public-spaces",
    name: "Retail & Public Spaces",
    kicker: "Customer facilities",
    description: "Select a system after reviewing user mix, cleaning access, privacy and the architectural direction of the public space.",
    considerations: [
      { title: "User mix", body: "Plan for customers, staff, children, older users and accessible needs according to the actual facility profile." },
      { title: "Privacy planning", body: "Review entrances, sight lines, urinal screening and door clearances so public circulation does not reduce privacy." },
      { title: "Durable interfaces", body: "Coordinate supports and high-contact hardware for the expected usage while retaining easy cleaning and replacement access." },
    ],
    image: approved("cubicle-systems/titan-black/titan-black-main.jpg"),
  },
  {
    slug: "sports-wellness",
    name: "Sports & Wellness",
    kicker: "Gyms, clubs and recreation",
    description: "Bring shower cubicles, changing-room privacy and lockers into one coordinated requirement rather than treating them as isolated items.",
    considerations: [
      { title: "Wet and dry zones", body: "Separate shower traffic from dry changing and storage areas, with floor drainage and ventilation coordinated early." },
      { title: "Changing privacy", body: "Match cubicle type, door operation and sight-line protection to the club, pool, gym or stadium user journey." },
      { title: "Storage capacity", body: "Confirm member volume, peak sessions, garment size and dwell time before selecting locker tiers or Z-Type modules." },
    ],
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
    a: "The approved Urinal Modesty Panel shapes are CP AERO, CP TAPER, CP WAVE, CP SLANT, CP SOFT, CP LEAN, CP FLOW, CP SWEEP and CP DOME. The reference size is approximately 900 mm height by 450 mm width; final sizes and custom shapes are confirmed project-wise.",
    tags: ["ump"],
  },
  {
    q: "Which HPL locker configurations are listed?",
    a: "The listed configurations are Tier 1 through Tier 5 and Z-Type. Tier 1 is a 1-door module, Tier 2 is a 2-door module and the same pattern continues through Tier 5. Z-Type is an interlocking module. Final dimensions are confirmed against the locker schedule.",
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
      { heading: "Use the reference dimension correctly", body: "The reference size is approximately 900 mm height by 450 mm width. Final sizes and custom shapes are confirmed against the requirement." },
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
      { heading: "Different support conditions", body: "Float is a wall-to-wall floating system. Sky Hung coordinates support from the ceiling and keeps the floor free of legs. The visual result may be similar at floor level, but the interfaces are not interchangeable." },
      { heading: "Site feasibility matters", body: "Wall and ceiling conditions, spans, services and access must be reviewed before a suspended system is approved." },
      { heading: "Keep the enquiry specific", body: "Share dimensions and drawings so the support approach can be discussed against the actual site rather than a generic assumption." },
    ],
  },
  {
    slug: "site-measurement-checklist-for-toilet-cubicles",
    title: "Site-measurement checklist for toilet cubicles",
    summary: "The essential opening, floor, wall, ceiling and access information to collect before a cubicle system is detailed.",
    category: "Site coordination",
    readTime: "7 min read",
    related: ["titan-black", "nova", "supernova", "supernova-plus", "base-box", "base-box-pro", "float", "sky-hung"],
    sections: [
      { heading: "Record the complete room", body: "Measure the room width, depth, finished floor level, wall build-up, door swing constraints and any service zones. A single overall dimension rarely describes all the interfaces that affect a cubicle layout." },
      { heading: "Check levels and fixing zones", body: "Note floor variation, skirting, wall finishes, ceiling levels and the location of concealed services. Suspended and wall-supported systems require the relevant support condition to be reviewed before approval." },
      { heading: "Share drawings with context", body: "Mark the intended cubicle count, accessible requirements, entrance position and any cleaning or circulation constraint. Final manufacture should follow the approved drawing and specification, not an informal site note." },
    ],
  },
  {
    slug: "planning-hpl-lockers-for-schools-workplaces-and-gyms",
    title: "Planning HPL lockers for schools, workplaces and gyms",
    summary: "How user needs, compartment count, locking, circulation and room layout shape a practical locker schedule.",
    category: "Lockers",
    readTime: "7 min read",
    related: ["hpl-lockers"],
    sections: [
      { heading: "Match the module to what users store", body: "A 1-door module offers the greatest vertical space in each column, while 2-door through 5-door modules increase the compartment count. Z-Type uses an interlocking arrangement for a different balance of hanging and compact storage." },
      { heading: "Plan access before capacity", body: "Confirm aisle width, bench position, door opening, accessible reach and the way users enter or leave the room. A high locker count is not useful if circulation and access are compromised." },
      { heading: "Confirm the schedule", body: "Record the module, quantity, bank dimensions, locking option, base condition and internal arrangement. Final dimensions and construction are confirmed against the approved locker schedule." },
    ],
  },
  {
    slug: "aluminium-vs-stainless-steel-cubicle-profiles",
    title: "Aluminium vs stainless-steel cubicle profiles",
    summary: "A specification-led comparison of architectural expression, system family and hardware coordination.",
    category: "Profiles & hardware",
    readTime: "6 min read",
    related: ["titan-black", "nova", "supernova", "supernova-plus"],
    sections: [
      { heading: "Keep appearance and grade separate", body: "Black powder-coated aluminium, anodised aluminium, SS 304 and SS 316 each belong to a defined CubiclePro system. The visual direction does not replace the need to record the actual profile and support specification." },
      { heading: "Coordinate the full system", body: "Profile or support material, hardware grade, panel selection and mounting arrangement must be read together. A property or grade from one product family should not be assumed for another." },
      { heading: "Use the application as the filter", body: "Consider user load, cleaning routine, wet-area exposure, architectural intent and the approved project requirement before selecting a system family." },
    ],
  },
  {
    slug: "commercial-washroom-rfq-information-guide",
    title: "What to include in a commercial washroom RFQ",
    summary: "A concise RFQ guide for contractors, architects, procurement teams and project owners.",
    category: "Quotation guide",
    readTime: "5 min read",
    related: ["pro-doors", "shower-cubicles", "changing-room-cubicles", "junior-series", "modesty-panels", "hpl-lockers"],
    sections: [
      { heading: "Describe the project", body: "Share the project city, building type, current stage, approximate quantity and intended programme. State whether the enquiry is for supply only or includes installation coordination." },
      { heading: "Attach usable information", body: "A dimensioned layout, BOQ, elevation or marked photograph helps clarify the requirement. Sensitive documents should be shared only through the approved private enquiry route." },
      { heading: "Separate preferences from approvals", body: "List preferred products, material and hardware where known, but identify items that still need technical review. The final grade, thickness, configuration and finish are confirmed in the approved project specification." },
    ],
  },
];

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

type LocationSeed = {
  city: string;
  region: string;
  focus: string;
  sectors: readonly string[];
};

const locationSeeds: readonly LocationSeed[] = [
  { city: "Ahmedabad", region: "Gujarat", focus: "Commercial, institutional, industrial and fit-out washroom requirements can be reviewed with the site scope and project programme.", sectors: ["Corporate offices and fit-outs", "Education and institutions", "Healthcare facilities", "Industrial workplaces"] },
  { city: "Gandhinagar", region: "Gujarat", focus: "Public, institutional, education and office projects can compare cubicle, partition, privacy and storage requirements through one enquiry route.", sectors: ["Government and public buildings", "Education campuses", "Corporate offices", "Healthcare facilities"] },
  { city: "Sanand", region: "Gujarat", focus: "Industrial and workplace washroom requirements can be coordinated around shifts, changing facilities, lockers and practical maintenance access.", sectors: ["Automotive and manufacturing", "Industrial workplaces", "Staff changing facilities", "Warehousing and logistics"] },
  { city: "Changodar", region: "Gujarat", focus: "Factory, warehouse and workplace projects can combine restroom cubicles, changing privacy, showers and locker planning in one defined scope.", sectors: ["Factories and production units", "Warehouses", "Staff facilities", "Commercial workplaces"] },
  { city: "Bavla", region: "Gujarat", focus: "Industrial, logistics and institutional projects can begin with quantity, site conditions and the intended washroom or changing-room use.", sectors: ["Industrial facilities", "Logistics workplaces", "Education facilities", "Healthcare and public use"] },
  { city: "Vadodara", region: "Gujarat", focus: "Industrial, corporate, education and healthcare projects can compare system construction, mounting and maintenance requirements.", sectors: ["Industrial facilities", "Corporate offices", "Education campuses", "Healthcare facilities"] },
  { city: "Surat", region: "Gujarat", focus: "Commercial, textile, hospitality and institutional washrooms can be planned around user flow, finish intent and maintainable components.", sectors: ["Textile and commercial facilities", "Corporate offices", "Hospitality and retail", "Education and healthcare"] },
  { city: "Vapi", region: "Gujarat", focus: "Industrial and workforce facilities can coordinate toilet cubicles, showers, changing rooms and lockers around operational use.", sectors: ["Industrial workplaces", "Manufacturing facilities", "Staff changing rooms", "Commercial support spaces"] },
  { city: "Valsad", region: "Gujarat", focus: "Institutional, healthcare, hospitality and industrial washroom enquiries can be reviewed against the site layout and approved specification.", sectors: ["Education", "Healthcare", "Hospitality", "Industrial facilities"] },
  { city: "Navsari", region: "Gujarat", focus: "Education, healthcare, retail and hospitality projects can compare restroom cubicle and partition options without assuming one standard configuration.", sectors: ["Education facilities", "Healthcare facilities", "Retail spaces", "Hospitality projects"] },
  { city: "Bharuch", region: "Gujarat", focus: "Industrial and commercial projects can plan high-use washrooms, staff changing areas and locker capacity from verified site information.", sectors: ["Industrial facilities", "Staff amenities", "Corporate offices", "Healthcare and education"] },
  { city: "Ankleshwar", region: "Gujarat", focus: "Workforce washrooms and changing facilities can be coordinated around shifts, storage, cleaning access and durable interfaces.", sectors: ["Industrial workplaces", "Changing-room facilities", "HPL locker areas", "Commercial support buildings"] },
  { city: "Dahej", region: "Gujarat", focus: "Large industrial and workforce requirements can bring cubicles, showers, changing privacy and lockers into one project-specific schedule.", sectors: ["Industrial sites", "Workforce amenities", "Changing and shower areas", "Storage and lockers"] },
  { city: "Rajkot", region: "Gujarat", focus: "Manufacturing, commercial, education and healthcare projects can select cubicle systems according to user load and site interfaces.", sectors: ["Manufacturing facilities", "Commercial offices", "Education", "Healthcare"] },
  { city: "Morbi", region: "Gujarat", focus: "Manufacturing and commercial facilities can plan practical washroom partitions, staff amenities and coordinated locker requirements.", sectors: ["Manufacturing facilities", "Industrial workplaces", "Commercial offices", "Hospitality and retail"] },
  { city: "Jamnagar", region: "Gujarat", focus: "Industrial, commercial and institutional requirements can be reviewed for cubicles, privacy panels, changing rooms and storage.", sectors: ["Industrial facilities", "Commercial projects", "Education", "Hospitality"] },
  { city: "Bhavnagar", region: "Gujarat", focus: "Industrial, education, healthcare and public-facility washrooms can be specified around real users and maintenance routines.", sectors: ["Industrial facilities", "Education", "Healthcare", "Public buildings"] },
  { city: "Anand", region: "Gujarat", focus: "Education, healthcare, commercial and hospitality projects can compare age-aware, accessible and general washroom requirements.", sectors: ["Education campuses", "Healthcare", "Commercial spaces", "Hospitality"] },
  { city: "Nadiad", region: "Gujarat", focus: "Institutional and public-facing projects can coordinate restroom cubicles, UMPs, lockers and accessible layout requirements.", sectors: ["Education", "Healthcare", "Commercial buildings", "Public facilities"] },
  { city: "Mehsana", region: "Gujarat", focus: "Industrial, education, healthcare and commercial projects can define material, mounting and installation requirements early.", sectors: ["Industrial facilities", "Education", "Healthcare", "Commercial projects"] },
  { city: "Kalol", region: "Gujarat", focus: "Industrial and institutional enquiries can be developed around staff use, site conditions, cleaning and project-specific dimensions.", sectors: ["Industrial workplaces", "Staff facilities", "Education", "Public-use buildings"] },
  { city: "Gandhidham", region: "Gujarat", focus: "Logistics, industrial, hospitality and commercial facilities can coordinate high-use washrooms, changing areas and lockers.", sectors: ["Logistics facilities", "Industrial workplaces", "Hospitality", "Commercial buildings"] },
  { city: "Kandla", region: "Gujarat", focus: "Port-linked, logistics and industrial workplaces can plan staff washrooms, changing privacy, showers and locker storage.", sectors: ["Port and logistics facilities", "Industrial workplaces", "Staff amenities", "Transit support spaces"] },
  { city: "Mundra", region: "Gujarat", focus: "Port, logistics and industrial projects can define commercial washroom and workforce amenity requirements from the operating context.", sectors: ["Port facilities", "Logistics workplaces", "Industrial sites", "Staff changing areas"] },
  { city: "Junagadh", region: "Gujarat", focus: "Education, healthcare, hospitality and public-building washroom requirements can be reviewed through a clear project enquiry.", sectors: ["Education", "Healthcare", "Hospitality", "Public facilities"] },
  { city: "Pune", region: "Maharashtra", focus: "Corporate, technology, education and industrial projects can compare cubicle systems with clear site and programme information.", sectors: ["Corporate and technology offices", "Education campuses", "Industrial facilities", "Healthcare and hospitality"] },
  { city: "Mumbai", region: "Maharashtra", focus: "Dense commercial, hospitality, retail and transit projects should share access, phasing and site-interface constraints early.", sectors: ["Corporate offices", "Hospitality and retail", "Healthcare", "Airports and transit"] },
  { city: "Navi Mumbai", region: "Maharashtra", focus: "Corporate, industrial, logistics and healthcare facilities can coordinate cubicles, partitions and storage around project scale.", sectors: ["Corporate campuses", "Industrial facilities", "Logistics workplaces", "Healthcare"] },
  { city: "Thane", region: "Maharashtra", focus: "Corporate, retail, education and healthcare projects can compare practical washroom systems and custom configurations.", sectors: ["Corporate offices", "Retail and public spaces", "Education", "Healthcare"] },
  { city: "Nashik", region: "Maharashtra", focus: "Industrial, education, healthcare and hospitality requirements can be specified according to use, cleaning and site conditions.", sectors: ["Industrial facilities", "Education", "Healthcare", "Hospitality"] },
  { city: "Nagpur", region: "Maharashtra", focus: "Commercial, public, transit, education and healthcare projects can define high-use washroom requirements without generic assumptions.", sectors: ["Commercial buildings", "Public and transit facilities", "Education", "Healthcare"] },
  { city: "Chhatrapati Sambhajinagar", region: "Maharashtra", focus: "Industrial, hospitality, education and healthcare projects can coordinate restroom, changing and locker requirements.", sectors: ["Industrial facilities", "Hospitality", "Education", "Healthcare"] },
  { city: "Kolhapur", region: "Maharashtra", focus: "Industrial, education, healthcare and hospitality facilities can compare cubicle systems and supporting washroom scope.", sectors: ["Industrial workplaces", "Education", "Healthcare", "Hospitality"] },
  { city: "Hyderabad", region: "South India", focus: "Corporate, technology, healthcare, pharma and hospitality projects can define system, material and installation requirements early.", sectors: ["Corporate and technology campuses", "Healthcare and pharma", "Education", "Hospitality and fit-outs"] },
  { city: "Bengaluru", region: "South India", focus: "Technology, corporate, education and healthcare facilities can coordinate commercial washroom systems around daily use and fit-out interfaces.", sectors: ["Technology and corporate offices", "Education campuses", "Healthcare", "Hospitality and wellness"] },
  { city: "Chennai", region: "South India", focus: "Industrial, corporate, healthcare and education projects can compare material, mounting and maintenance requirements.", sectors: ["Industrial facilities", "Corporate and technology offices", "Healthcare", "Education"] },
  { city: "Jaipur", region: "Rajasthan", focus: "Hospitality, retail, corporate and education projects can balance architectural expression with practical maintenance.", sectors: ["Hospitality", "Retail and public spaces", "Corporate offices", "Education"] },
  { city: "Udaipur", region: "Rajasthan", focus: "Hospitality, education and healthcare washrooms can coordinate privacy, wet-area interfaces and maintainable details.", sectors: ["Hotels and hospitality", "Education", "Healthcare", "Public-facing facilities"] },
  { city: "Jodhpur", region: "Rajasthan", focus: "Hospitality, public, education and healthcare projects can compare cubicle, privacy and storage requirements.", sectors: ["Hospitality", "Public buildings", "Education", "Healthcare"] },
  { city: "Kota", region: "Rajasthan", focus: "Education, hostel, healthcare and public-facility requirements can include age-aware cubicles, showers and lockers.", sectors: ["Education campuses", "Hostels", "Healthcare", "Public facilities"] },
  { city: "Bhiwadi", region: "Rajasthan", focus: "Industrial, logistics and workforce facilities can coordinate restroom cubicles, changing areas, showers and locker capacity.", sectors: ["Industrial facilities", "Logistics workplaces", "Staff changing areas", "Corporate support spaces"] },
  { city: "Indore", region: "Madhya Pradesh", focus: "Corporate, commercial, education and healthcare projects can define washroom systems around users, access and maintenance.", sectors: ["Corporate and commercial buildings", "Education", "Healthcare", "Hospitality"] },
  { city: "Bhopal", region: "Madhya Pradesh", focus: "Government, public, education and healthcare projects can coordinate accessible, high-use and staff washroom requirements.", sectors: ["Government and public buildings", "Education", "Healthcare", "Corporate offices"] },
  { city: "Jabalpur", region: "Madhya Pradesh", focus: "Public, education, healthcare and commercial facilities can plan cubicles, privacy panels and lockers from verified site details.", sectors: ["Public facilities", "Education", "Healthcare", "Commercial buildings"] },
  { city: "Gwalior", region: "Madhya Pradesh", focus: "Education, healthcare, hospitality and public-building requirements can compare suitable commercial washroom systems.", sectors: ["Education", "Healthcare", "Hospitality", "Public buildings"] },
  { city: "Delhi NCR", region: "Other", focus: "Large corporate, public, hospitality and transit projects should share scale, access, phasing and site-interface requirements early.", sectors: ["Corporate offices", "Government and public buildings", "Hospitality and retail", "Airports and transit"] },
  { city: "Goa", region: "Other", focus: "Hospitality, leisure, retail and public-facing projects can coordinate cubicles, showers, changing privacy and lockers.", sectors: ["Hotels and resorts", "Leisure and wellness", "Retail and restaurants", "Public-facing facilities"] },
] as const;

export const locations = locationSeeds.map((item) => ({
  ...item,
  slug: slugify(item.city),
  indexable: true,
}));

export const locationBySlug = (slug: string) => locations.find((location) => location.slug === slug);

