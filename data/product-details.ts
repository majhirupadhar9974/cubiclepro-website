export type ProductDetail = {
  introduction: string[];
  features: string[];
  dimensions: [string, string, string][];
  sections: { heading: string; body: string; items?: string[] }[];
  applications: string[];
  prerequisites?: string[];
  cta: string;
};

const standardDimensions: [string, string, string][] = [
  ["Cubicle width", "900 mm", "1500 mm accessible"],
  ["Door width", "600 mm", "900 mm accessible"],
  ["Cubicle depth", "1500-1800 mm*", "1500-1800 mm* accessible"],
  ["Total height from floor", "1995-2003 mm*", "1995-2003 mm* accessible"],
  ["Bottom gap from floor", "100-150 mm*", "100-150 mm* accessible"],
];

const compactPanel = "Available in 12 mm and 18 mm HPL compact panels, selected according to project requirements, site conditions and application needs. The black-core panels are specified for dependable resistance to moisture, impact, scratches, stains, chemicals and everyday wear.";
const commonApplications = ["Corporate offices", "Shopping malls", "Educational institutions", "Hospitals and healthcare facilities", "Hotels and hospitality projects", "Airports and transport facilities", "Public washrooms", "Commercial buildings", "Institutional projects"];

export const productDetails: Record<string, ProductDetail> = {
  "titan-black": {
    introduction: [
      "Titan Black by CubiclePro is a floor-mounted restroom cubicle system for commercial and institutional washrooms that need dependable performance, easy maintenance and practical project value. Its top-rail-supported structure and adjustable Nylon PA-6 legs provide 100-150 mm bottom clearance for a stable, flexible installation.",
      "Nylon Polyamide Grade 6 hardware and black powder-coated aluminium profiles combine durable everyday performance with a distinctive architectural expression for high-traffic washrooms.",
    ],
    features: ["Floor-mounted cubicle system", "12 mm and 18 mm compact-panel options", "Black powder-coated aluminium profiles", "Nylon Polyamide Grade 6 hardware", "Adjustable floor-mounted legs", "100-150 mm bottom clearance*", "Lightweight and easy to maintain", "Impact-resistant nylon components", "Project-wise colours, textures and patterns", "Customisable to site and project requirements"],
    dimensions: standardDimensions,
    sections: [
      { heading: "HPL compact panels", body: compactPanel },
      { heading: "Doors and pilasters", body: "Doors use the selected compact-panel specification and Titan Black hardware. Pilasters use the same panel construction with a thumb-turn lock and occupancy indicator. A black powder-coated aluminium door-stopper profile with anti-noise rubber lining provides the closing surface, while adjustable Nylon PA-6 legs provide support and clearance." },
      { heading: "Dividers", body: "Intermediate dividers use the same compact-panel specification and are connected with black powder-coated aluminium profiles. Panel sizes can be customised against the site layout and approved drawings." },
      { heading: "Black powder-coated aluminium profiles", body: "The coordinated profile family defines the system's black architectural line.", items: ["Top Rail Profile", "F-Channel", "U-Channel", "Door Stopper Profile"] },
      { heading: "Nylon PA-6 hardware", body: "The system hardware is coordinated as one approved family.", items: ["Adjustable legs", "Self-closing hinges", "Internal coat hook", "Door knob", "Thumb-turn lock with occupancy indicator", "Anti-noise rubber padding", "SS 304 screws", "Nylon PA-6 expandable wall plugs"] },
    ],
    applications: ["Corporate offices", "Shopping malls", "Educational institutions", "Hospitals and healthcare facilities", "Factories and industrial facilities", "Public washrooms", "Commercial buildings", "Transport facilities", "Institutional projects"],
    cta: "Share your washroom layout, site requirements and design direction for a customised Titan Black proposal.",
  },
  nova: {
    introduction: [
      "Nova by CubiclePro is a floor-mounted restroom cubicle system for commercial washrooms that require a clean appearance, dependable performance and practical value. Its anodised aluminium top rail and adjustable legs provide 100-150 mm bottom clearance for a stable, refined installation.",
      "SS 316 grade hardware and anodised aluminium profiles support everyday use in high-traffic commercial washrooms while retaining a light, coordinated architectural expression.",
    ],
    features: ["Floor-mounted cubicle system", "12 mm and 18 mm compact-panel options", "Anodised aluminium profile system", "SS 316 grade hardware", "Adjustable floor-mounted legs", "100-150 mm bottom clearance*", "Project-wise colours, textures and patterns", "Suitable for high-traffic commercial washrooms", "Customisable to site and project requirements"],
    dimensions: standardDimensions,
    sections: [
      { heading: "HPL compact panels", body: compactPanel },
      { heading: "Doors and pilasters", body: "Doors use the selected compact-panel specification with SS 316 hardware. Pilasters use the same panel construction with a thumb-turn lock and occupancy indicator. An anodised aluminium door-stopper profile with rubber lining reduces closing noise, while adjustable legs provide support and clearance." },
      { heading: "Dividers", body: "Intermediate dividers use the same compact-panel specification and are connected with anodised aluminium profiles. Panel sizes can be customised against the approved layout and drawings." },
      { heading: "Anodised aluminium profiles", body: "Nova uses anodised aluminium throughout its approved profile family.", items: ["Top Rail Profile", "F-Channel", "U-Channel", "Door Stopper Profile"] },
      { heading: "SS 316 hardware", body: "The door and support hardware is coordinated for the selected Nova configuration.", items: ["Adjustable legs", "Hinges", "Internal coat hook", "Door knob", "Thumb-turn lock with occupancy indicator"] },
    ],
    applications: commonApplications,
    cta: "Share your layout and project requirements for a customised Nova cubicle proposal.",
  },
  supernova: {
    introduction: [
      "Supernova by CubiclePro is a premium floor-mounted restroom cubicle system for projects where refined aesthetics, smooth functionality and durable construction are equally important. A rectangular stainless-steel top rail and adjustable legs provide 100-150 mm bottom clearance.",
      "Its flush-aligned door design creates a seamless front elevation. SS 304 profiles and SS 316 hardware are kept clearly distinguished in the approved specification.",
    ],
    features: ["Premium floor-mounted system", "Flush-aligned door design", "12 mm and 18 mm HPL compact-panel options", "SS 304 profiles", "SS 316 hardware", "Adjustable floor-mounted legs", "100-150 mm bottom clearance*", "Easy-to-maintain surfaces", "Project-wise colours, textures and patterns", "Customisable to project requirements"],
    dimensions: standardDimensions,
    sections: [
      { heading: "HPL compact panels", body: compactPanel },
      { heading: "Doors, pilasters and dividers", body: "Doors follow the selected compact-panel thickness and a flush-aligned closing configuration. Pilasters use the same panel construction with SS 316 locking and support hardware. Adjustable stainless-steel pedestal legs provide floor support. Dividers are connected through SS 304 profiles and can be customised to the approved layout." },
      { heading: "SS 304 profiles", body: "Supernova uses SS 304 profile components for its stainless-steel structural expression.", items: ["Rectangular Top Rail", "F-Channel", "U-Channel", "Door Stopper Profile"] },
      { heading: "SS 316 hardware", body: "The hardware schedule remains exclusive to Supernova.", items: ["Adjustable pedestal legs", "Spring-loaded hinges", "Internal coat hook", "Door knob", "Thumb-turn lock with occupancy indicator", "Anti-noise rubber lining", "SS 304 screws", "Nylon PA-6 expandable wall plugs"] },
    ],
    applications: commonApplications,
    cta: "Share your layout, interior direction and project requirements for a customised Supernova proposal.",
  },
  "supernova-plus": {
    introduction: [
      "Supernova+ by CubiclePro is a premium floor-mounted restroom cubicle system for projects that demand refined appearance, durable construction and upgraded stainless-steel detailing. A flush-aligned door design, rectangular SS 316 top rail and adjustable legs create a precise installation.",
      "SS 316 profiles and SS 316 hardware are used throughout the approved system, with 100-150 mm bottom clearance and project-wise panel selection.",
    ],
    features: ["Premium floor-mounted system", "Flush-aligned door design", "12 mm and 18 mm compact-panel options", "SS 316 profiles", "SS 316 hardware", "Adjustable floor-mounted legs", "100-150 mm bottom clearance*", "Premium stainless-steel expression", "Suitable for high-traffic and moisture-prone environments", "Customisable to project requirements"],
    dimensions: standardDimensions,
    sections: [
      { heading: "HPL compact panels", body: compactPanel },
      { heading: "Doors, pilasters and dividers", body: "Doors follow a flush-aligned configuration. Pilasters use the same compact-panel construction with SS 316 locking and support components. Adjustable stainless-steel pedestal legs provide support, and dividers connect through SS 316 profiles against the approved layout." },
      { heading: "SS 316 profiles", body: "Supernova+ uses SS 316 throughout its approved profile system.", items: ["Rectangular Top Rail", "F-Channel", "U-Channel", "Door Stopper Profile"] },
      { heading: "SS 316 hardware", body: "The complete visible and internal hardware family remains mapped to Supernova+.", items: ["Adjustable pedestal legs", "Spring-loaded hinges", "Internal coat hook", "Door knob", "Thumb-turn lock with occupancy indicator", "Anti-noise rubber lining", "Stainless-steel screws", "Nylon PA-6 expandable wall plugs"] },
    ],
    applications: commonApplications,
    cta: "Share your washroom layout and project requirements for a customised Supernova+ proposal.",
  },
  "base-box": {
    introduction: [
      "Base Box by CubiclePro is a premium floor-mounted restroom cubicle system with a distinctive box-type support beneath the pilasters. The shoe-box base gives the elevation a strong, visually ordered lower line without separate legs.",
      "The approved Base Box configuration has no top rail. SS 304 shoe-box and profile components combine with SS 316 hardware for a clean, floor-supported architectural expression.",
    ],
    features: ["Premium floor-mounted system", "SS 304 shoe-box support beneath pilasters", "No separate legs", "No top rail", "12 mm and 18 mm compact-panel options", "SS 304 profile system", "SS 316 hardware", "100-150 mm bottom clearance*", "Project-wise colours, textures and patterns", "Customisable to site and project requirements"],
    dimensions: standardDimensions.map((row) => row[0] === "Total height from floor" ? [row[0], "1840 mm", "1840 mm accessible"] : row),
    sections: [
      { heading: "HPL compact panels", body: compactPanel },
      { heading: "Doors and pilasters", body: "Doors use the selected compact-panel specification with SS 316 hardware. Pilasters use the same panel construction and the characteristic SS 304 box-type floor-support arrangement, giving Base Box its structural and visual identity." },
      { heading: "Dividers", body: "Intermediate dividers use the same compact-panel specification and connect through stainless-steel U-Channels. Dimensions are customised against the approved layout and drawings." },
      { heading: "SS 304 profiles and support", body: "Base Box uses a shoe-box floor support without separate legs or a top rail.", items: ["SS 304 shoe-box support", "F-Channel", "U-Channel"] },
      { heading: "SS 316 hardware", body: "Hardware is coordinated to the selected Base Box configuration.", items: ["Box-type floor-support components", "Hinges", "Internal coat hook", "Door knob", "Thumb-turn lock with occupancy indicator", "Anti-noise rubber lining", "Stainless-steel screws", "Nylon PA-6 expandable wall plugs"] },
    ],
    applications: commonApplications,
    cta: "Share your washroom layout and project requirements for a customised Base Box proposal.",
  },
  "base-box-pro": {
    introduction: [
      "Base Box Pro by CubiclePro is a premium floor-mounted restroom cubicle system for projects requiring strong base support, clean detailing and a defined architectural finish. Its box-type support beneath the pilasters is combined with a square stainless-steel top rail.",
      "SS 304 profiles, SS 316 hardware and the shoe-box floor-support arrangement create a stable system for premium commercial and institutional environments.",
    ],
    features: ["Premium floor-mounted system", "Box-type support beneath pilasters", "Square stainless-steel top rail", "12 mm and 18 mm compact-panel options", "SS 304 profiles", "SS 316 hardware", "100-150 mm bottom clearance*", "Clean structured appearance", "Project-wise colours, textures and patterns", "Customisable to site and project requirements"],
    dimensions: standardDimensions.map((row) => row[0] === "Total height from floor" ? [row[0], "1840 mm", "1840 mm accessible"] : row),
    sections: [
      { heading: "HPL compact panels", body: compactPanel },
      { heading: "Doors and pilasters", body: "Doors use the selected compact-panel specification with SS 316 hardware. Pilasters use the same panel construction and are supported by the characteristic box-type floor-support arrangement." },
      { heading: "Dividers", body: "Intermediate dividers use the same panel specification and connect through stainless-steel profiles. Dimensions are customised against the approved layout." },
      { heading: "SS 304 profiles and support", body: "The square top rail distinguishes Base Box Pro from Base Box.", items: ["Square Top Rail", "F-Channel", "U-Channel", "Box-type floor-support components"] },
      { heading: "SS 316 hardware", body: "Hardware is coordinated to the approved Base Box Pro schedule.", items: ["Hinges", "Internal coat hook", "Door knob", "Thumb-turn lock with occupancy indicator", "Anti-noise rubber lining", "Stainless-steel screws", "Nylon PA-6 expandable wall plugs"] },
    ],
    applications: commonApplications,
    cta: "Share your washroom layout and design direction for a customised Base Box Pro proposal.",
  },
  float: {
    introduction: [
      "Float by CubiclePro is a premium free-floor restroom cubicle system designed to create a clean, open and visually lightweight environment. Wall-supported construction keeps the floor free from cubicle hardware and creates the floating expression.",
      "The system uses 12 mm or 18 mm HPL compact panels, powder-coated aluminium profiles, an H-Type top rail and SS 316 hardware. Suitability depends on verified structural wall support on both sides.",
    ],
    features: ["Free-floor restroom cubicle system", "No cubicle hardware touching the floor", "12 mm and 18 mm compact-panel options", "Powder-coated aluminium profiles", "H-Type top rail", "SS 316 hardware", "Clear floor area", "Easier cleaning and maintenance", "Project-wise colours, textures and patterns", "Customisable to site and project requirements"],
    dimensions: standardDimensions,
    sections: [
      { heading: "HPL compact panels", body: compactPanel },
      { heading: "Wall-supported construction", body: "Doors use the selected compact-panel specification with SS 316 hardware. Pilasters form part of the wall-supported free-floor system. Dividers connect to the support structure through the required profiles and are customised to the approved layout." },
      { heading: "Powder-coated aluminium profiles", body: "The approved Float construction uses an H-Type top rail and coordinated aluminium profiles.", items: ["H-Type Top Rail", "F-Channel", "U-Channel", "Door Stopper Profile with anti-noise rubber lining"] },
      { heading: "SS 316 hardware", body: "The hardware schedule supports daily movement and privacy.", items: ["Spring-loaded hinges", "Internal coat hook", "Door knob", "Thumb-turn lock with occupancy indicator", "Anti-noise rubber padding", "Stainless-steel screws", "Nylon PA-6 expandable wall plugs"] },
    ],
    applications: ["Premium corporate offices", "Hotels and hospitality projects", "Shopping malls", "Premium commercial buildings", "Airports and transport facilities", "Public washrooms", "Design-focused institutional projects", "Modern architectural interiors"],
    prerequisites: ["Suitable structural walls or support conditions on both sides", "Wall and fixing conditions verified before approval", "Final support arrangement coordinated to the actual site structure and layout"],
    cta: "Share the washroom layout, wall conditions and design requirement for a customised Float proposal.",
  },
  "sky-hung": {
    introduction: [
      "Sky Hung by CubiclePro is a premium ceiling-hung restroom cubicle system for projects where open floor space, refined aesthetics and easier floor maintenance are important. The structure is suspended from the ceiling or approved structural support, keeping the floor free from cubicle hardware.",
      "The system uses 12 mm or 18 mm HPL compact panels, SS 304 profiles, SS 316 hardware, ceiling-mounted SS shoe-box support and an aluminium H-Type top rail where required by the approved configuration.",
    ],
    features: ["Ceiling-hung restroom cubicle system", "Leg-free floor", "12 mm and 18 mm compact-panel options", "SS 304 profiles", "SS 316 hardware", "Ceiling-mounted SS shoe-box support", "Anchor fixing to approved structural support", "Aluminium H-Type top rail where required", "Project-wise colours, textures and patterns", "Customisable to project requirements"],
    dimensions: [["Cubicle width", "900 mm", "1500 mm accessible"], ["Door width", "600 mm", "900 mm accessible"], ["Cubicle depth", "1500-1800 mm*", "1500-1800 mm* accessible"], ["Total height from floor", "2400 mm", "2400 mm accessible"], ["Bottom clearance", "100-150 mm*", "100-150 mm* accessible"]],
    sections: [
      { heading: "HPL compact panels", body: compactPanel },
      { heading: "Suspended construction", body: "Doors use the selected compact-panel specification with SS 316 hardware. Pilasters are supported through an SS shoe-box and anchor-fixing arrangement at the ceiling or structural support. Dividers connect through stainless-steel profiles against the approved layout." },
      { heading: "Profiles and ceiling support", body: "The exact fixing arrangement varies with ceiling height, structural support and layout.", items: ["SS 304 F-Channel", "SS 304 U-Channel", "SS 304 Door Stopper Profile", "Aluminium H-Type Top Rail where required", "SS Shoe Box support", "Ceiling anchor fixing"] },
      { heading: "SS 316 hardware", body: "Hardware remains mapped to the approved Sky Hung configuration.", items: ["Spring-loaded hinges", "Internal coat hook", "Door knob", "Thumb-turn lock with occupancy indicator", "Required ceiling-support hardware", "Anti-noise rubber padding", "Stainless-steel screws", "Nylon PA-6 expandable wall plugs"] },
    ],
    applications: ["Premium corporate offices", "Hotels and hospitality projects", "Shopping malls", "Airports and transport facilities", "Premium commercial buildings", "Public washrooms", "Institutional projects", "High-traffic washroom environments"],
    prerequisites: ["Plan installation before the false ceiling is completed", "Provide suitable structural support above the cubicle system", "Verify support conditions on both sides", "Check ceiling and fixing conditions before installation", "Coordinate the final support arrangement to the actual structure and layout"],
    cta: "Share the layout, ceiling details and structural-support information for a customised Sky Hung review.",
  },
  "pro-doors": {
    introduction: [
      "Pro Doors by CubiclePro is a retrofit solution for existing brick-built restroom cubicles that need a durable modern door upgrade without replacing the complete partition structure.",
      "A 12 mm HPL compact door, powder-coated aluminium D-shaped wall poles and Nylon PA-6 hardware create a dry-installation solution for renovation projects where faster installation and minimal disruption are important.",
    ],
    features: ["For existing brick restroom cubicles", "Retrofit without complete partition replacement", "12 mm HPL compact-panel doors", "Powder-coated aluminium D-shaped wall poles", "Nylon PA-6 hardware", "Three-hinge mounting", "Inward-opening only", "Left- or right-opening option", "100-150 mm bottom clearance*", "Customisable to site and project requirements"],
    dimensions: [["Door width", "600-750 mm*", "900 mm accessible"], ["Total height from ground", "1980 mm / 2100 mm*", "1980 mm / 2100 mm* accessible"], ["Bottom gap from floor", "100-150 mm*", "100-150 mm* accessible"]],
    sections: [
      { heading: "12 mm HPL compact door", body: "The approved Pro Doors configuration uses a 12 mm black-core HPL compact panel selected for restroom applications and dependable resistance to moisture, impact, scratches, stains, chemicals and everyday wear." },
      { heading: "Wall-mounted support", body: "Powder-coated D-shaped aluminium poles fix to the existing brick wall and create the secure mounting structure. The substrate, existing finish, fixing zone and concealed services must be verified before approval." },
      { heading: "Door installation", body: "Each door uses three self-closing hinges and opens inward. Left-hand or right-hand opening is selected according to the existing cubicle layout, WC clearance and circulation." },
      { heading: "Powder-coated aluminium components", body: "The support components are coordinated with the selected project finish.", items: ["D-shaped wall-mounted poles", "Matching aluminium support components", "Nylon PA-6 end caps"] },
      { heading: "Nylon PA-6 hardware", body: "The final approved Pro Doors hardware is fixed, not a generic application-selected family.", items: ["Three self-closing hinges", "Internal coat hook", "Door knob", "Latch lock with privacy indicator", "Stainless-steel screws", "Nylon PA-6 expandable wall plugs", "Required fixing components"] },
    ],
    applications: ["Existing brick restroom cubicles", "Washroom renovation projects", "Corporate offices", "Educational institutions", "Hospitals and healthcare facilities", "Factories and industrial buildings", "Public washrooms", "Commercial buildings", "Institutional facilities"],
    prerequisites: ["Measure width, height, wall thickness and diagonal alignment", "Check that the opening is plumb and square", "Verify the masonry or substrate and concealed services", "Confirm inward swing, WC clearance and left- or right-hand opening"],
    cta: "Share existing opening dimensions and site photographs for a customised Pro Doors review.",
  },
};

