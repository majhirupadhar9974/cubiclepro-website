import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { site } from "@/config/site";

export const runtime = "nodejs";
export const maxDuration = 30;
const allowed = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/acad", "application/octet-stream"]);
const fields = ["name", "company", "mobile", "email", "city", "project_location", "project_type", "quantity", "system", "panel", "message"] as const;
const clean = (value: FormDataEntryValue | null, max = 5000) => typeof value === "string" ? value.trim().slice(0, max) : "";
async function redis(command: string, ...args: string[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("rate-limit storage unavailable");
  const response = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify([command, ...args]), cache: "no-store" });
  if (!response.ok) throw new Error("rate-limit service unavailable");
  const result = await response.json() as { result?: number };
  return Number(result.result || 0);
}
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.nextUrl.host) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 6 * 1024 * 1024) return NextResponse.json({ error: "The maximum file size is 5 MB." }, { status: 413 });
  const storageReady = !!process.env.BLOB_READ_WRITE_TOKEN;
  const mailReady = !!process.env.RESEND_API_KEY && !!process.env.RFQ_FROM_EMAIL;
  const rateReady = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!storageReady || !mailReady || !rateReady) return NextResponse.json({ error: "Online enquiries are being configured. Please WhatsApp or call Cubiclepro to send your requirement." }, { status: 503 });
  let body: FormData;
  try { body = await request.formData(); } catch { return NextResponse.json({ error: "Unable to read the enquiry. Please try again." }, { status: 400 }); }
  if (clean(body.get("website"), 200)) return NextResponse.json({ ok: true });
  const data = Object.fromEntries(fields.map((field) => [field, clean(body.get(field))])) as Record<(typeof fields)[number], string>;
  const required = ["name", "mobile", "email", "city", "project_type", "message"] as const;
  if (required.some((key) => !data[key]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || !/^[+0-9 ()-]{10,20}$/.test(data.mobile) || data.message.length < 10) return NextResponse.json({ error: "Please review the required fields and enter valid contact details." }, { status: 400 });
  if (body.get("consent") !== "yes") return NextResponse.json({ error: "Please confirm the enquiry contact consent." }, { status: 400 });
  const file = body.get("drawing");
  if (file instanceof File && file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "The maximum file size is 5 MB." }, { status: 413 });
  if (file instanceof File && file.size > 0 && (!allowed.has(file.type) || !/\.(pdf|jpe?g|png|webp|docx|xlsx|dwg|dxf)$/i.test(file.name))) return NextResponse.json({ error: "Upload a PDF, JPG, PNG, WebP, DOCX, XLSX, DWG or DXF file." }, { status: 415 });
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ip = await import("node:crypto").then(({ createHash }) => createHash("sha256").update(forwarded).digest("hex").slice(0, 32));
  try {
    const key = `cubiclepro:rfq:${ip}:${new Date().toISOString().slice(0, 13)}`;
    const count = await redis("INCR", key);
    await redis("EXPIRE", key, "3600");
    if (count > 8) return NextResponse.json({ error: "Please try again later or contact our sales team directly." }, { status: 429 });
  } catch { return NextResponse.json({ error: "Enquiry service is temporarily unavailable. Please WhatsApp or call us." }, { status: 503 }); }
  let storedPath = "No file attached";
  try {
    if (file instanceof File && file.size > 0) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-100);
      const blob = await put(`rfq/${new Date().toISOString().slice(0, 7)}/${randomUUID()}-${safeName}`, file, { access: "private", addRandomSuffix: true, contentType: file.type || "application/octet-stream" });
      storedPath = blob.pathname;
    }
    const text = fields.map((key) => `${key}: ${data[key] || "Not provided"}`).join("\n");
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.RFQ_FROM_EMAIL, to: [site.email], reply_to: data.email, subject: `Website RFQ — ${data.system || data.project_type} — ${data.city}`, text: `${text}\n\nPrivate drawing path: ${storedPath}\n\nConsent: yes` }) });
    if (!response.ok) throw new Error("mail service rejected RFQ");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We could not complete the enquiry. Please WhatsApp or call us; no success has been recorded." }, { status: 502 });
  }
}
