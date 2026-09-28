import StudioClient from "@/components/studio-client";
export const dynamic = "force-dynamic";
export const metadata = { title: "Cubiclepro CMS", robots: { index: false, follow: false } };
export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return <main style={{ maxWidth: 760, margin: "12vh auto", padding: 24, fontFamily: "sans-serif" }}>
    <h1>Website CMS setup required</h1>
    <p>The editing studio is ready, but it is not connected to a Cubiclepro Sanity project yet. Configure the project ID and dataset in the existing Vercel project, then invite authorized editors in Sanity.</p>
    <p>This page does not publish or collect content until the project is connected.</p>
  </main>;
  return <StudioClient />;
}
