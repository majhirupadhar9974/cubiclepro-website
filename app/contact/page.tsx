import { PageHero, Eyebrow, Arrow } from "@/components/ui";
import QuoteForm from "@/components/quote-form";
import { site, technicalWhatsapp, whatsapp } from "@/config/site";
import { metadata, PageSchema } from "@/lib/seo";
import { getSiteSettings } from "@/lib/cms";
export const generateMetadata = () =>
  metadata(
    "Request a Toilet Cubicle Quote",
    "Share your commercial washroom requirement. Call or WhatsApp +91 84011 18340 or email info@cubiclepro.in.",
    "/contact/",
  );
export default async function Contact() {
  const settings=await getSiteSettings();
  const salesPhone=settings?.primaryPhone||site.phone;
  const technicalPhone=settings?.technicalPhone||site.technicalPhone;
  const salesTel=`+${salesPhone.replace(/\D/g,"")}`;
  const technicalTel=`+${technicalPhone.replace(/\D/g,"")}`;
  const salesWhatsApp=settings?.primaryPhone?`https://wa.me/${salesPhone.replace(/\D/g,"")}?text=${encodeURIComponent("Hello Cubiclepro, I would like to discuss a commercial washroom requirement.")}`:whatsapp();
  const technicalWhatsApp=settings?.technicalPhone?`https://wa.me/${technicalPhone.replace(/\D/g,"")}?text=${encodeURIComponent("Hello Cubiclepro technical team, I would like to discuss a technical washroom requirement.")}`:technicalWhatsapp("a technical washroom requirement");
  return (
    <>
      <PageSchema name="Request a quote" path="/contact/" type="ContactPage" />
      <PageHero
        eyebrow="Contact / Request a quote"
        title="Let’s build better washroom spaces."
        text="Share the application, location and system direction. We’ll help coordinate the next specification step."
        path="/contact/"
      />
      <section className="section container contact-layout">
        <aside className="contact-info">
          <Eyebrow>Talk to Cubiclepro</Eyebrow>
          <h2>
            A clear brief.
            <br />A practical conversation.
          </h2>
          <a className="contact-phone" href={`tel:${salesTel}`}>
            {salesPhone}
          </a>
          <span className="micro">Sales / WhatsApp</span>
          <a className="contact-phone" href={`tel:${technicalTel}`}>
            {technicalPhone}
          </a>
          <span className="micro">Technical enquiries</span>
          <a href={`mailto:${settings?.primaryEmail||site.email}`}>{settings?.primaryEmail||site.email}</a>
          <a href={`mailto:${settings?.salesEmail||site.salesEmail}`}>{settings?.salesEmail||site.salesEmail}</a>
          <a
            href={salesWhatsApp}
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us <Arrow diagonal />
          </a>
          <a
            href={technicalWhatsApp}
            className="button button-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Technical WhatsApp <Arrow diagonal />
          </a>
          <div className="address-block">
            <p className="micro">Find us</p>
            <address>{site.address}</address>
          </div>
          <p className="micro">Supply · Installation · Coordination</p>
        </aside>
        <QuoteForm />
      </section>
      <section id="privacy" className="container section-top-none privacy-note">
        <h2>Enquiry privacy</h2>
        <p>
          We use the contact and project details you submit to review and
          respond to your enquiry. If you attach a drawing or BOQ, it is stored
          in access-restricted storage for enquiry handling. Please do not
          include sensitive personal information that is not needed to assess
          the project.
        </p>
        <p>
          Website analytics and service providers may process technical usage
          data under their applicable terms. Enquiry data is sent to Cubiclepro
          for follow-up. To request access to, correction of, or deletion of
          enquiry information held by Cubiclepro, contact{" "}
          <a href={`mailto:${settings?.primaryEmail||site.email}`}>{settings?.primaryEmail||site.email}</a>.
        </p>
      </section>
    </>
  );
}
