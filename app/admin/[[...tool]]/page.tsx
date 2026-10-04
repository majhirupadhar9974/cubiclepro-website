import StudioClient from "@/components/studio-client";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "CubiclePro Admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  const cmsConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  const mandatoryMfaVerified = process.env.ADMIN_MFA_ENFORCED === "1";

  if (!cmsConfigured || !mandatoryMfaVerified) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#11181b", color: "#fff", fontFamily: "Arial, sans-serif" }}>
        <section style={{ width: "min(100%, 620px)", padding: 32, border: "1px solid #374145", borderRadius: 18, background: "#172024" }}>
          <p style={{ color: "#e99972", textTransform: "uppercase", letterSpacing: ".14em", fontSize: 11, fontWeight: 800 }}>CubiclePro Admin</p>
          <h1 style={{ fontSize: 38, margin: "14px 0" }}>Secure setup in progress.</h1>
          <p style={{ color: "#b8c0c2", lineHeight: 1.7 }}>The administration area remains locked until the private content project, authorized users and mandatory two-factor authentication are configured and verified.</p>
          <a href="/" style={{ display: "inline-block", marginTop: 18, color: "#fff", background: "#a34b2b", padding: "12px 16px", borderRadius: 9, textDecoration: "none", fontWeight: 700 }}>Return to website</a>
        </section>
      </main>
    );
  }

  return <StudioClient />;
}
