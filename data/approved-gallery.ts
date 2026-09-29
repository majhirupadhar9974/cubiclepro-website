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
  { name: "Below 5 years", age: "below-5-years", src: `${root}junior-series/junior-below-5-years-main.jpg`, measurements: [["Overall", "H 1500 × W 820 × D 1550 mm"], ["Door", "H 890 × W 750 mm"], ["Gap", "150 mm"], ["Divider", "H 1200 mm"]] },
  { name: "5–10 years", age: "5-10-years", src: `${root}junior-series/junior-5-10-years-main.jpg`, measurements: [["Overall", "H 1980 × W 910 × D 1550 mm"], ["Door", "H 1300 × W 610 mm"], ["Gap", "150 mm"], ["Divider", "H 1550 mm"]] },
  { name: "11–14 years", age: "11-14-years", src: `${root}junior-series/junior-11-14-years-main.jpg`, measurements: [["Overall", "H 1980 × W 910 × D 1550 mm"], ["Door", "H 1550 × W 610 mm"], ["Gap", "150 mm"], ["Divider", "H 1550 mm"]] },
  { name: "15 years and above", age: "15-years-and-above", src: `${root}junior-series/junior-15-years-and-above-main.jpg`, measurements: null },
];
export const lockerTiers = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5", "Z-Type"].map((name, i) => ({ name, src: `${root}hpl-lockers/locker-${name.toLowerCase().replace(" ", "-")}-main.jpg`, alt: `${name} HPL locker product visual` }));
export const modestyShapeImage = `${root}urinal-modesty-panels/urinal-modesty-panel-shapes.png`;
