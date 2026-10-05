"use client";

import { useEffect, useState } from "react";
import { useClient, useCurrentUser } from "sanity";
import styles from "./admin-dashboard.module.css";

type DashboardData = {
  publishedProducts: number;
  drafts: number;
  locations: number;
  articles: number;
  recent: Array<{ _id: string; _type: string; label?: string; _updatedAt: string }>;
};

const emptyData: DashboardData = { publishedProducts: 0, drafts: 0, locations: 0, articles: 0, recent: [] };

const sections = [
  ["Homepage", "Hero, featured content and CTAs", "/admin/structure/homepage;homepage"],
  ["Products", "Systems, specifications and order", "/admin/structure/product"],
  ["Applications", "Industry guidance and images", "/admin/structure/industry"],
  ["Locations", "City content and SEO", "/admin/structure/locationPage"],
  ["Blog & Guides", "Articles and related products", "/admin/structure/article"],
  ["FAQs", "Questions, answers and ordering", "/admin/structure/faq"],
] as const;

const quickActions = [
  ["Add Product", "/admin/intent/create/template=product;type=product"],
  ["Upload Approved Image", "/admin/intent/create/template=approvedAsset;type=approvedAsset"],
  ["New Location", "/admin/intent/create/template=locationPage;type=locationPage"],
  ["Write Article", "/admin/intent/create/template=article;type=article"],
] as const;

export default function AdminDashboard() {
  const client = useClient({ apiVersion: "2026-10-04" });
  const currentUser = useCurrentUser();
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    client.fetch<DashboardData>(`{
      "publishedProducts": count(*[_type == "product" && publicationStatus == "published"]),
      "drafts": count(*[_id in path("drafts.**")]),
      "locations": count(*[_type == "locationPage" && publicationStatus == "published"]),
      "articles": count(*[_type == "article" && publicationStatus == "published"]),
      "recent": *[_type in ["product", "homepage", "page", "industry", "locationPage", "article", "faq"]] | order(_updatedAt desc)[0...4]{
        _id, _type, "label": coalesce(name, title, city, question), _updatedAt
      }
    }`).then((result) => {
      if (active) setData(result);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [client]);

  const firstName = currentUser?.name?.split(" ")[0] || "Admin";

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <div>
          <p className={styles.eyebrow}>CubiclePro Admin</p>
          <h1>Good to see you, {firstName}.</h1>
          <p>Manage products, content and SEO without changing code.</p>
        </div>
        <div className={styles.topActions}>
          <a className={styles.secondaryButton} href="https://www.cubiclepro.in/">Preview website ↗</a>
          <a className={styles.secondaryButton} href="/admin/account">Account &amp; logout</a>
          <a className={styles.primaryButton} href="/admin/structure">Review content</a>
        </div>
      </header>

      <section className={styles.metrics} aria-label="Website summary">
        <Metric label="Published products" value={data.publishedProducts} note="Approved and live" loading={loading} />
        <Metric label="Draft changes" value={data.drafts} note="Not yet published" loading={loading} />
        <Metric label="Live locations" value={data.locations} note="Published city pages" loading={loading} />
        <Metric label="Published guides" value={data.articles} note="Live knowledge content" loading={loading} />
      </section>

      <section className={styles.mainGrid}>
        <article className={`${styles.panel} ${styles.contentPanel}`}>
          <PanelHeading eyebrow="Content control" title="Website sections" href="/admin/structure" />
          <div className={styles.sectionGrid}>
            {sections.map(([title, copy, href]) => (
              <a href={href} key={title} className={styles.sectionCard}>
                <i aria-hidden="true" />
                <span><strong>{title}</strong><small>{copy}</small></span>
                <b aria-hidden="true">→</b>
              </a>
            ))}
          </div>
        </article>

        <aside className={`${styles.panel} ${styles.quickPanel}`}>
          <PanelHeading eyebrow="Start here" title="Quick actions" />
          <div className={styles.quickList}>
            {quickActions.map(([label, href], index) => (
              <a href={href} key={label} className={index === 0 ? styles.quickPrimary : ""}>
                <span>{label}</span><b aria-hidden="true">→</b>
              </a>
            ))}
          </div>
        </aside>

        <article className={`${styles.panel} ${styles.seoPanel}`}>
          <PanelHeading eyebrow="Search readiness" title="SEO health" />
          <div className={styles.seoRows}>
            <StatusRow label="Sitemap" value="Live" tone="good" />
            <StatusRow label="Canonical URLs" value="Configured" tone="good" />
            <StatusRow label="Robots access" value="Allowed" tone="good" />
            <StatusRow label="Google Search Console" value="Connect later" tone="pending" />
          </div>
        </article>

        <article className={`${styles.panel} ${styles.revisionsPanel}`}>
          <PanelHeading eyebrow="Audit trail" title="Recent revisions" />
          <div className={styles.revisionList}>
            {loading ? <p>Loading revisions…</p> : data.recent.length ? data.recent.map((item) => (
              <div key={item._id}>
                <span><strong>{item.label || item._type}</strong><small>{new Date(item._updatedAt).toLocaleString("en-IN")}</small></span>
                <a href={`/admin/structure/${item._type};${item._id.replace(/^drafts\./, "")}`}>Open</a>
              </div>
            )) : <p>No CMS revisions yet. Existing approved website content remains unchanged.</p>}
          </div>
        </article>
      </section>

      <footer className={styles.securityNote}>
        <strong>Security:</strong> administrator access requires an invited account and mandatory two-factor authentication through the configured identity provider.
      </footer>
    </main>
  );
}

function Metric({ label, value, note, loading }: { label: string; value: number; note: string; loading: boolean }) {
  return <article className={styles.metricCard}><span>{label}</span><strong>{loading ? "—" : value}</strong><small>{note}</small></article>;
}

function PanelHeading({ eyebrow, title, href }: { eyebrow: string; title: string; href?: string }) {
  return <div className={styles.panelHeading}><div><span>{eyebrow}</span><h2>{title}</h2></div>{href ? <a href={href}>View all →</a> : null}</div>;
}

function StatusRow({ label, value, tone }: { label: string; value: string; tone: "good" | "pending" }) {
  return <div className={styles.statusRow}><span><i className={tone === "good" ? styles.good : styles.pending} />{label}</span><strong>{value}</strong></div>;
}
