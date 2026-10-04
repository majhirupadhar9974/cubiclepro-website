import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export const metadata = { title: "CubiclePro Admin", robots: { index: false, follow: false, nocache: true } };
export default async function StudioRedirect({ params }: { params: Promise<{ tool?: string[] }> }) {
  const { tool = [] } = await params;
  redirect(`/admin/${tool.join("/")}`);
}
