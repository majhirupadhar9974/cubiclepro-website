import Image from "next/image";
import Link from "next/link";
import { articles, faqs } from "@/data/content-library";
import { metadata } from "@/lib/seo";
import { getPublishedArticles, getPublishedFaqs } from "@/lib/cms";

const brochureUrl = "/downloads/CubiclePro-Brochure.pdf";

export const generateMetadata = () =>
  metadata(
    "Commercial Washroom Resources",
    "Download the CubiclePro product brochure and explore original guides covering restroom cubicles, Junior Cubicles, lockers, UMP, suspended systems and project specification.",
    "/resources/",
  );

export default async function ResourcesPage() {
  const [cmsArticles, cmsFaqs] = await Promise.all([
    getPublishedArticles(),
    getPublishedFaqs(),
  ]);
  const guideItems = cmsArticles.length
    ? cmsArticles.map((item) => ({
        slug: item.slug.current,
        title: item.title,
        category: item.category || "Guide",
        readTime: "Guide",
        summary: item.summary || "",
      }))
    : articles;
  const faqItems = cmsFaqs.length
    ? cmsFaqs.map((item) => ({ q: item.question, a: item.answer }))
    : faqs;

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <p className="cp-kicker">Knowledge centre</p>
          <h1>Practical washroom specification guides.</h1>
          <p className="lede">
            Download the approved catalogue or explore original guidance for
            architects, contractors, procurement teams and project owners.
          </p>
        </div>
      </header>

      <section className="cp-section cp-catalogue-section" aria-labelledby="catalogue-heading">
        <div className="container cp-catalogue-card">
          <div className="cp-catalogue-preview">
            <Image
              src="/images/resources/cubiclepro-brochure-cover.png"
              alt="Cover of the CubiclePro Washroom Solutions product brochure"
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
              priority
            />
          </div>
          <div className="cp-catalogue-copy">
            <p className="cp-kicker">Product brochure</p>
            <h2 id="catalogue-heading">CubiclePro systems, in one shareable file.</h2>
            <p>
              Review commercial washroom cubicles, Junior Cubicles, HPL
              lockers, Urinal Modesty Panels, shower and changing-room systems,
              technical essentials and enquiry details.
            </p>
            <div className="cp-catalogue-actions">
              <a className="cp-button cp-button-accent" href={brochureUrl} target="_blank" rel="noopener noreferrer">
                View brochure ↗
              </a>
              <a className="cp-button cp-button-dark-outline" href={brochureUrl} download>
                Download PDF ↓
              </a>
            </div>
            <small>Shareable PDF · approximately 6.7 MB · contact names omitted</small>
          </div>
        </div>
      </section>

      <section className="cp-section cp-section-dark">
        <div className="container cp-article-grid">
          {guideItems.map((article) => (
            <Link href={`/blog/${article.slug}/`} key={article.slug}>
              <span>{article.category} · {article.readTime}</span>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <b>Read guide ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="cp-section cp-faq-section cp-resources-faq">
        <div className="container">
          <header className="cp-section-head">
            <div>
              <p className="cp-kicker">Frequently asked</p>
              <h2>Start with the common questions.</h2>
            </div>
            <Link href="/faq/">View all questions ↗</Link>
          </header>
          <div className="cp-accordion">
            {faqItems.slice(0, 5).map((item) => (
              <details key={item.q}>
                <summary><span>{item.q}</span><b>+</b></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
