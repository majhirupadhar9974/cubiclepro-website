const root = "/images/approved/";
export const profileGroups = [
  { name: "Anodised aluminium", folder: "accessories/profiles/anodised-aluminium", prefix: "anodised-aluminium", files: ["u-channel-profile", "door-stopper-channel", "f-channel-profile", "top-rail-profile"] },
  { name: "Black powder-coated aluminium", folder: "accessories/profiles/black-powder-coated-aluminium", prefix: "black-powder-coated", files: ["u-channel-profile", "door-stopper-channel", "f-channel-profile", "top-rail-profile"] },
  { name: "Stainless steel", folder: "accessories/profiles/stainless-steel", prefix: "ss", files: ["u-channel-profile", "door-stopper-channel", "f-channel-profile", "top-rail-profile"] },
];
const profileTitle: Record<string, string> = { "u-channel-profile": "U Channel", "door-stopper-channel": "Door Stopper Channel", "f-channel-profile": "F Channel", "top-rail-profile": "Top Rail" };
export const profiles = profileGroups.flatMap((group) => group.files.map((file) => ({
  title: profileTitle[file], group: group.name,
  src: `${root}${group.folder}/${group.prefix}-${file}.${file === "top-rail-profile" && group.name === "Stainless steel" ? "png" : "jpg"}`,
  alt: `${profileTitle[file]} profile visual in ${group.name}`,
})));
export const hardwareGroups = [
  { name: "Black Nylon", folder: "accessories/hardware/black-nylon", items: [
    ["Lockset with Indicator", "black-nylon-lockset-with-indicator.jpg"], ["Door Knob", "black-nylon-door-knob.jpg"], ["Hinges", "black-nylon-hinge.jpg"], ["Legs", "black-nylon-leg.jpg"], ["Coat Hook", "black-nylon-coat-hook.png"],
  ] },
  { name: "Stainless-Steel Hardware", folder: "accessories/hardware/stainless-steel", items: [
    ["Lock Set with Indicator — Side 1", "ss-lock-set-with-indicator-side-1.jpg"], ["Lock Set with Indicator — Side 2", "ss-lock-set-with-indicator-side-2.jpg"], ["Door Knob", "ss-door-knob.jpg"], ["Hinges", "ss-hinge.jpg"], ["Legs", "ss-leg.jpg"], ["Coat Hook", "ss-coat-hook.jpg"],
  ] },
];
export const supportComponents = [
  { title: "H Type Top Rail", src: `${root}accessories/components/h-type-top-rail.jpg`, alt: "H Type Top Rail component visual" },
  { title: "MS Bracket", src: `${root}accessories/components/ms-bracket.jpg`, alt: "MS Bracket component visual" },
  { title: "SS Shoe Box", src: `${root}accessories/components/ss-shoe-box.png`, alt: "Stainless-steel shoe-box support component visual" },
  { title: "Floor Anchor", src: `${root}accessories/components/floor-anchor.png`, alt: "Floor anchor component visual; grade is project-specified" },
];
export const systemComponents: Record<string, { profile: string; hardware: string }> = {
  "titan-black": { profile: "cubicle-systems/titan-black/titan-black-black-powder-coated-profile-overview.jpg", hardware: "cubicle-systems/titan-black/titan-black-black-nylon-hardware-overview.jpg" },
  nova: { profile: "cubicle-systems/nova/nova-anodised-aluminium-profile-overview.jpg", hardware: "cubicle-systems/nova/nova-ss316-hardware-overview.jpg" },
  supernova: { profile: "cubicle-systems/supernova/supernova-ss304-profile-overview.jpg", hardware: "cubicle-systems/supernova/supernova-ss316-hardware-overview.jpg" },
  "supernova-plus": { profile: "cubicle-systems/supernova-plus/supernova-plus-ss316-profile-overview.jpg", hardware: "cubicle-systems/supernova-plus/supernova-plus-ss316-hardware-overview.jpg" },
  "base-box": { profile: "cubicle-systems/base-box/base-box-ss304-profile-overview.jpg", hardware: "cubicle-systems/base-box/base-box-ss316-hardware-overview.jpg" },
  "base-box-pro": { profile: "cubicle-systems/base-box-pro/base-box-pro-ss304-profile-overview.jpg", hardware: "cubicle-systems/base-box-pro/base-box-pro-ss316-hardware-overview.jpg" },
  float: { profile: "cubicle-systems/flot/flot-profile-overview.jpg", hardware: "cubicle-systems/flot/flot-ss316-hardware-overview.jpg" },
  "sky-hung": { profile: "cubicle-systems/sky-hung/sky-hung-profile-overview.jpg", hardware: "cubicle-systems/sky-hung/sky-hung-ss316-hardware-overview.jpg" },
};
export const juniorAgeBands = [
  {
    name: "LittleSteps",
    subtitle: "Child-friendly cubicle for the early years",
    age: "below-5-years",
    ageLabel: "Up to 5 years",
    src: `${root}junior-series/junior-below-5-years-main.jpg`,
    summary: "A low-height cubicle designed around early-years proportions, appropriate privacy and practical adult supervision.",
    introduction: "LittleSteps by CubiclePro is designed for children up to 5 years of age. Its low-height configuration creates an approachable washroom environment while allowing practical adult supervision where required.",
    suitableFor: "Preschools, play schools, daycare centres, nursery sections, kindergarten washrooms, early-learning centres and junior school washrooms",
    profileSystem: "Box Up profile and hardware system",
    features: ["Low-height junior configuration", "12 mm HPL compact panels", "890 mm door height", "1200 mm divider height", "150 mm bottom gap", "Child-scaled proportions", "Customisable to approved site requirements"],
    measurements: [["Overall", "H 1500 × W 820 × D 1550 mm"], ["Door", "H 890 × W 750 mm"], ["Gap", "150 mm"], ["Divider", "H 1200 mm"]],
  },
  {
    name: "Explorer",
    subtitle: "Primary-school cubicle for growing independence",
    age: "5-10-years",
    ageLabel: "5-10 years",
    src: `${root}junior-series/junior-5-10-years-main.jpg`,
    summary: "Child-scaled doors and dividers for primary-school users, balancing privacy, comfortable access and practical supervision.",
    introduction: "Explorer by CubiclePro is designed for children 5 to 10 years of age. Its proportions support primary-school users with a practical balance of privacy, comfortable access and clear supervision.",
    suitableFor: "Primary schools, junior schools, educational campuses, activity centres, learning facilities and school washroom blocks",
    profileSystem: "Supernova profile and hardware system",
    features: ["Primary-school configuration", "12 mm HPL compact panels", "1300 mm door height", "1550 mm divider height", "150 mm bottom gap", "Balanced privacy and supervision", "Customisable to approved site requirements"],
    measurements: [["Overall", "H 1980 × W 910 × D 1550 mm"], ["Door", "H 1300 × W 610 mm"], ["Gap", "150 mm"], ["Divider", "H 1550 mm"]],
  },
  {
    name: "Horizon",
    subtitle: "Higher-privacy cubicle for the middle-school years",
    age: "11-14-years",
    ageLabel: "11-14 years",
    src: `${root}junior-series/junior-11-14-years-main.jpg`,
    summary: "A higher-privacy junior configuration with taller doors and dividers for middle-school users.",
    introduction: "Horizon by CubiclePro is designed for children 11 to 14 years of age. Taller door and divider proportions create stronger privacy while retaining an age-appropriate junior format.",
    suitableFor: "Middle schools, junior secondary schools, educational campuses, institutional washroom blocks, learning centres and school activity facilities",
    profileSystem: "Same approved profile and hardware system as Explorer",
    features: ["Higher-privacy junior configuration", "12 mm HPL compact panels", "1550 mm door height", "1550 mm divider height", "150 mm bottom gap", "Coordinated Junior range construction", "Customisable to approved site requirements"],
    measurements: [["Overall", "H 1980 × W 910 × D 1550 mm"], ["Door", "H 1550 × W 610 mm"], ["Gap", "150 mm"], ["Divider", "H 1550 mm"]],
  },
  {
    name: "Youth",
    subtitle: "Full-privacy cubicle for senior students",
    age: "15-years-and-above",
    ageLabel: "15 years and above",
    src: `${root}junior-series/junior-15-years-and-above-main.jpg`,
    summary: "A full-privacy configuration for senior students, colleges, universities and education campuses.",
    introduction: "Youth by CubiclePro is designed for students 15 years and above, with a full-privacy layout suited to senior schools, colleges, universities and other education spaces.",
    suitableFor: "Senior secondary schools, higher secondary schools, colleges, universities, education campuses and institutional washroom blocks",
    profileSystem: "Aluminium or stainless-steel profile option with SS 316 hardware",
    features: ["Full-privacy configuration", "12 mm HPL compact panels", "Aluminium profile option", "Stainless-steel profile option", "SS 316 hardware", "100-150 mm bottom clearance*", "Customisable to approved site requirements"],
    measurements: [["Cubicle", "W 900 × D 1500-1800 mm*"], ["Door", "W 600 mm"], ["Height", "1995-2003 mm*"], ["Gap", "100-150 mm*"]],
  },
];
export const lockerTiers = [
  { name: "Tier 1 Locker", slug: "tier-1", module: "1-door module", arrangement: "One full-height locker per column", subtitle: "Full-height storage with maximum space per user", usefulFor: "Users who need uninterrupted storage for clothing, bags, uniforms, personal belongings or larger equipment.", planning: "No fixed standard size. Confirm available site dimensions, user storage needs, locker quantity, bank width, circulation and the approved layout.", features: ["1 locker per column", "Full-height personal storage", "Optional hanger rod", "Custom-built to project dimensions"], applications: ["Corporate offices", "Gyms and fitness centres", "Factories", "Staff changing rooms", "Hospitals", "Clubs", "Education", "Sports facilities"] },
  { name: "Tier 2 Locker", slug: "tier-2", module: "2-door module", arrangement: "Two independent lockers per column", subtitle: "Balanced storage space and user capacity", usefulFor: "Facilities that need practical everyday personal storage while accommodating more users within the available area.", planning: "No fixed standard size. Confirm user count, storage type, locking option, available wall space and the approved locker layout.", features: ["2 lockers per column", "Efficient vertical space use", "Individual locksets", "Hanger rod where required", "Custom-built dimensions"], applications: ["Corporate offices", "Gyms", "Hospitals", "Educational institutions", "Staff changing areas", "Factories", "Clubs", "Commercial facilities"] },
  { name: "Tier 3 Locker", slug: "tier-3", module: "3-door module", arrangement: "Three independent lockers per column", subtitle: "Balanced storage for higher user capacity", usefulFor: "Busy commercial, institutional and changing-room environments where everyday personal storage and efficient space use are equally important.", planning: "Overall width, height, depth, compartment sizing and column count are finalised against the site dimensions and approved layout.", features: ["3 lockers per column", "Balanced storage and user density", "Individual locksets", "Custom-built dimensions"], applications: ["Schools and colleges", "Corporate offices", "Gyms", "Hospitals", "Staff facilities", "Factories", "Clubs", "Commercial changing rooms"] },
  { name: "Tier 4 Locker", slug: "tier-4", module: "4-door module", arrangement: "Four individual lockers per column", subtitle: "High-capacity storage for busy facilities", usefulFor: "Projects that need secure storage for everyday personal belongings and a higher user count within the available vertical space.", planning: "There is no standard size. Confirm site dimensions, required users, wall space, storage requirement and the approved project layout.", features: ["4 lockers per column", "Higher user capacity", "Individual locksets", "Custom-built dimensions"], applications: ["Educational institutions", "Factories", "Employee facilities", "Gyms", "Hospitals", "Commercial buildings", "Public facilities", "High-occupancy changing areas"] },
  { name: "Tier 5 Locker", slug: "tier-5", module: "5-door module", arrangement: "Five individual lockers per column", subtitle: "Maximum user capacity from available space", usefulFor: "Projects where accommodating more users is the priority and each person needs secure storage for smaller belongings.", planning: "Compartment size and overall bank dimensions are custom-manufactured around the available space, required user capacity and approved layout.", features: ["5 lockers per column", "Maximum standard-tier density", "Individual locksets", "Custom-built dimensions"], applications: ["Schools and colleges", "Factories", "Offices", "Training centres", "Public facilities", "Staff areas", "High-occupancy institutions", "Compact changing areas"] },
  { name: "Z-Type Locker", slug: "z-type", module: "Interlocking module", arrangement: "Two interlocking Z-shaped lockers per column", subtitle: "Tall personal storage in a space-efficient layout", usefulFor: "Changing facilities where garments, uniforms, bags or longer personal items need taller storage without moving to one full-height column per user.", planning: "Confirm garment length, user count, available dimensions, handed arrangement, locking option, internal proportions and the approved layout.", features: ["2 interlocking lockers per column", "Z-shaped tall storage profile", "Optional hanger rod", "Individual locksets", "Custom-built dimensions"], applications: ["Corporate changing rooms", "Gyms and fitness centres", "Factories", "Hospitals", "Staff locker rooms", "Sports facilities", "Clubs", "Hospitality staff areas", "Educational institutions"] },
].map((item) => ({
  ...item,
  specifications: [["Door", "9 mm HPL Compact Panel"], ["Side and back panels", "3 mm HPL Compact Board"], ["Top, bottom and base", "9 mm HPL Compact Board"], ["Hardware", "Aluminium + stainless steel"], ["Hinges", "Stainless steel"], ["Supporting frame", "Aluminium interlocking frame"], ["Dimensions", "Custom-built as per site dimensions and client requirements"]],
  src: `${root}hpl-lockers/locker-${item.slug}-main.jpg`,
  alt: `${item.name} HPL locker ${item.module.toLowerCase()} product visual`,
}));
export const modestyShapeImage = `${root}urinal-modesty-panels/urinal-modesty-panel-shapes.png`;
export const modestyShapes = ["CP AERO", "CP TAPER", "CP WAVE", "CP SLANT", "CP SOFT", "CP LEAN", "CP FLOW", "CP SWEEP", "CP DOME"].map((name) => ({
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
  src: modestyShapeImage,
  alt: `${name} Urinal Modesty Panel reference shape within the approved nine-shape library`,
}));
