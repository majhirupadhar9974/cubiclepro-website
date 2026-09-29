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
  { name: "Below 5 years", age: "below-5-years", src: `${root}junior-series/junior-below-5-years-main.jpg`, summary: "A low-height privacy arrangement for early-years environments, with approachable proportions and clear adult supervision zones.", suitableFor: "Pre-schools, early-learning centres and kindergarten washrooms", measurements: [["Overall", "H 1500 × W 820 × D 1550 mm"], ["Door", "H 890 × W 750 mm"], ["Gap", "150 mm"], ["Divider", "H 1200 mm"]] },
  { name: "5–10 years", age: "5-10-years", src: `${root}junior-series/junior-5-10-years-main.jpg`, summary: "Child-scaled doors and dividers for primary-school users, coordinated around privacy, access and easy supervision.", suitableFor: "Primary schools and education facilities", measurements: [["Overall", "H 1980 × W 910 × D 1550 mm"], ["Door", "H 1300 × W 610 mm"], ["Gap", "150 mm"], ["Divider", "H 1550 mm"]] },
  { name: "11–14 years", age: "11-14-years", src: `${root}junior-series/junior-11-14-years-main.jpg`, summary: "A higher-privacy junior configuration for middle-school age groups, with dimensions retained only from the approved record.", suitableFor: "Middle schools and institutional washrooms", measurements: [["Overall", "H 1980 × W 910 × D 1550 mm"], ["Door", "H 1550 × W 610 mm"], ["Gap", "150 mm"], ["Divider", "H 1550 mm"]] },
  { name: "15 years and above", age: "15-years-and-above", src: `${root}junior-series/junior-15-years-and-above-main.jpg`, summary: "A full-privacy education configuration for older students. Exact dimensions are confirmed from the approved project schedule.", suitableFor: "Senior schools, colleges and education campuses", measurements: null },
];
export const lockerTiers = [
  { name: "Tier 1", slug: "tier-1", module: "1-door module", arrangement: "One locker door per column", usefulFor: "Users who need the maximum vertical internal space for garments, bags or personal equipment.", planning: "Confirm the required bank width, clear internal height, locking option and room circulation during enquiry." },
  { name: "Tier 2", slug: "tier-2", module: "2-door module", arrangement: "Two locker doors per column", usefulFor: "Shared workplaces, schools and changing areas that need a balance between capacity and usable compartment height.", planning: "Confirm expected user count, storage type, locking option and bank dimensions during enquiry." },
  { name: "Tier 3", slug: "tier-3", module: "3-door module", arrangement: "Three locker doors per column", usefulFor: "Compact personal storage where each user needs a smaller dedicated compartment.", planning: "Confirm the items to be stored, user reach range, quantity and room layout during enquiry." },
  { name: "Tier 4", slug: "tier-4", module: "4-door module", arrangement: "Four locker doors per column", usefulFor: "High-capacity personal-item storage in staff, education, sports and institutional environments.", planning: "Confirm user profile, compartment access, locking choice and required quantity during enquiry." },
  { name: "Tier 5", slug: "tier-5", module: "5-door module", arrangement: "Five locker doors per column", usefulFor: "Maximum compartment count where storage items are compact and individual access is the priority.", planning: "Confirm compartment purpose, accessible reach requirements, locking choice and total bank size during enquiry." },
  { name: "Z-Type", slug: "z-type", module: "Interlocking module", arrangement: "Interlocking full-height storage profile", usefulFor: "Changing facilities where hanging space and a separate lower storage zone are useful within a compact bank.", planning: "Confirm garment length, storage needs, handed arrangement, locking option and bank dimensions during enquiry." },
].map((item) => ({
  ...item,
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
