import Link from "next/link";
import { articles, faqs } from "@/data/content-library";
import { metadata } from "@/lib/seo";
import { getPublishedArticles, getPublishedFaqs } from "@/lib/cms";

export const generateMetadata = () => metadata("Commercial Washroom Resources", "Original CubiclePro guides covering restroom cubicles, Junior Cubicles, lockers, UMP, suspended systems and project specification.", "/resources/");
export default async function ResourcesPage() {
  const [cmsArticles,cmsFaqs]=await Promise.all([getPublishedArticles(),getPublishedFaqs()]);
  const guideItems=cmsArticles.length?cmsArticles.map((item)=>({slug:item.slug.current,title:item.title,category:item.category||"Guide",readTime:"Guide",summary:item.summary||""})):articles;
  const faqItems=cmsFaqs.length?cmsFaqs.map((item)=>({q:item.question,a:item.answer})):faqs;
  return <><header className="page-hero"><div className="container"><p className="cp-kicker">Knowledge centre</p><h1>Practical washroom specification guides.</h1><p className="lede">Original guidance for architects, contractors, procurement teams and project owners.</p></div></header><section className="cp-section cp-section-dark"><div className="container cp-article-grid">{guideItems.map((article) => <Link href={`/blog/${article.slug}/`} key={article.slug}><span>{article.category} · {article.readTime}</span><h2>{article.title}</h2><p>{article.summary}</p><b>Read guide ↗</b></Link>)}</div></section><section className="cp-section cp-faq-section"><div className="container"><header className="cp-section-head"><div><p className="cp-kicker">Frequently asked</p><h2>Start with the common questions.</h2></div><Link href="/faq/">View all questions ↗</Link></header><div className="cp-accordion">{faqItems.slice(0,5).map((item) => <details key={item.q}><summary>{item.q}<b>+</b></summary><p>{item.a}</p></details>)}</div></div></section></>;
}
