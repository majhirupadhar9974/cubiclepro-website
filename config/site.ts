export const site = {
  name: "Cubiclepro Washroom Solutions",
  domain: "www.cubiclepro.in",
  url: "https://www.cubiclepro.in",
  phone: "+91 84011 18340",
  tel: "+918401118340",
  email: "sales@cubiclepro.in",
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
