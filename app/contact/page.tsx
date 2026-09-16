import { PageHero, Eyebrow, Arrow } from "@/components/ui";
import QuoteForm from "@/components/quote-form";
import { site, whatsapp } from "@/config/site";
import { metadata, PageSchema } from "@/lib/seo";
export const generateMetadata = () =>
  metadata(
    "Request a Toilet Cubicle Quote",
    "Share your commercial washroom requirement. Call or WhatsApp +91 84011 18340 or email sales@cubiclepro.in.",
    "/contact/",
  );
export default function Contact() {
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
          <a className="contact-phone" href={`tel:${site.tel}`}>
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a
            href={whatsapp()}
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us <Arrow diagonal />
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
          respond to your enquiry. The form is processed by FormSubmit to
          deliver your message to {site.email}; its service may retain
          submissions for up to 30 days. You can choose phone, email or WhatsApp
          instead. Please do not include sensitive personal information in your
          project brief.
        </p>
        <p>
          This website does not use advertising trackers or store your form
          entries in browser storage. To request access to, correction of, or
          deletion of enquiry information held by Cubiclepro, contact{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </>
  );
}
