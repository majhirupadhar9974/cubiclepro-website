export const site = {
  name: "Cubiclepro Washroom Solutions",
  domain: "www.cubiclepro.in",
  url: "https://www.cubiclepro.in",
  phone: "+91 84011 18340",
  tel: "+918401118340",
  email: "info@cubiclepro.in",
  salesEmail: "sales@cubiclepro.in",
  gstin: "24AAXFC1344A1ZS",
  msmeNumber: "UDYAM-GJ-01-0703239",
  technicalPhone: "+91 99247 31671",
  technicalTel: "+919924731671",
  latitude: 22.9729829,
  longitude: 72.5135779,
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=22.9729829%2C72.5135779",
  mapsPlaceUrl:
    "https://www.google.com/maps/place/CubiclePro+Washroom+Solutions/@22.9729829,72.511003,17z/data=!3m1!4b1!4m6!3m5!1s0x395e9b9d7b2e8613:0x4efd6f8d438c9d8f!8m2!3d22.9729829!4d72.5135779!16s%2Fg%2F11z_jg0s57?entry=ttu&g_ep=EgoyMDI2MTExNy4wIKXMDSoASAFQAw%3D%3D",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=CubiclePro%20Washroom%20Solutions%2C%20Ahmedabad&z=17&output=embed",
  address:
    "Shop No. 02, Hasnain Complex, In Mohammedi Park, Behind Canal, Fatehwadi, Ahmedabad – 380055, Gujarat, India.",
  tagline: "Smart spaces. Solid solutions.",
};
export const specification =
  "Final material grade, panel thickness, hardware and configuration are confirmed against the approved project specification.";
export const thickness =
  "Other suitable thicknesses available depending on project requirement and approved specification.";
export const finishes = "Colours and finishes are finalized project-wise.";
export function whatsapp(product?: string) {
  const message = product
    ? `Hello Cubiclepro, I am interested in the ${product} system. I would like to discuss a project requirement.`
    : "Hello Cubiclepro, I would like to discuss a commercial washroom requirement.";
  return `https://wa.me/918401118340?text=${encodeURIComponent(message)}`;
}
export function technicalWhatsapp(subject?: string) {
  const message = subject
    ? `Hello Cubiclepro technical team, I would like to discuss ${subject}.`
    : "Hello Cubiclepro technical team, I would like to discuss drawings, profiles, hardware or a site-interface requirement.";
  return `https://wa.me/919924731671?text=${encodeURIComponent(message)}`;
}
