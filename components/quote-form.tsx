"use client";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { products, applications } from "@/data/products";
import { site, whatsapp } from "@/config/site";
import { Arrow } from "./ui";
export default function QuoteForm() {
  const [message, setMessage] = useState(""), [interest, setInterest] = useState(""), [sending, setSending] = useState(false), [notice, setNotice] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInterest(params.get("system") || "");
    setMessage(params.get("brief") || "");
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setNotice(""); setSending(true);
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/rfq/", { method: "POST", body: new FormData(form) });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "We could not send this enquiry.");
      setNotice("Enquiry sent. Thank you — our team will follow up using the contact details you provided.");
      form.reset(); setInterest(""); setMessage("");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "We could not send this enquiry. Please WhatsApp or call us.");
    } finally { setSending(false); }
  }
  return <form className="quote-form" onSubmit={submit}>
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="form-heading"><p className="micro">Your project brief</p><h2>Tell us about your space.</h2><p>Fields marked * are required.</p></div>
    <div className="form-grid">
      <label>Your name *<input name="name" required maxLength={120} autoComplete="name" placeholder="Your full name" /></label>
      <label>Company / organization *<input name="company" required maxLength={160} autoComplete="organization" placeholder="Company / organization" /></label>
      <label>Mobile number *<input name="mobile" type="tel" required minLength={10} maxLength={20} pattern="[+0-9 ()\-]{10,20}" autoComplete="tel" placeholder="+91" /></label>
      <label>Email *<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@company.com" /></label>
      <label>Project city *<input name="city" required maxLength={120} autoComplete="address-level2" placeholder="Project city" /></label>
      <label>Site location *<input name="project_location" required maxLength={200} placeholder="Area / site location" /></label>
      <label>Project type *<select name="project_type" required defaultValue=""><option value="" disabled>Select application</option>{applications.map(([name]) => <option key={name}>{name}</option>)}<option>Other / Not sure</option></select></label>
      <label>Approximate cubicle quantity *<input type="number" name="quantity" required min="1" max="100000" placeholder="Enter approximate quantity" /></label>
      <label>Interested system *<select name="system" required value={interest} onChange={(event) => setInterest(event.target.value)}><option value="">Choose a system or ask for guidance</option>{products.map((product) => <option key={product.slug}>{product.name}</option>)}{products.filter((product) => product.variants).map((product) => <optgroup key={product.slug} label={product.name}>{product.variants!.map((variant) => <option key={variant}>{variant}</option>)}</optgroup>)}</select></label>
      <label>Panel preference *<select name="panel" required defaultValue=""><option value="" disabled>Select preference</option><option>Compact HPL</option><option>BWP-FR High-Density Board</option><option>Not sure — please advise</option></select></label>
      <label className="full">Message *<textarea name="message" required minLength={10} maxLength={5000} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Application, site requirements, dimensions or the support you need…" /></label>
      <label className="full file-field">Drawing / BOQ (optional)<input name="drawing" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.docx,.xlsx,.dwg,.dxf" /><span>One file, up to 5 MB. PDF, JPG, PNG, WebP, DOCX, XLSX, DWG or DXF. Stored privately for enquiry handling.</span></label>
    </div>
    <label className="consent"><input type="checkbox" name="consent" required value="yes" /><span>I agree to be contacted about this enquiry and have read the <a href="#privacy">enquiry privacy notice</a>.</span></label>
    <div className="form-actions"><button className="button" type="submit" disabled={sending}>{sending ? "Sending…" : "Send enquiry"} <Arrow /></button><a href={whatsapp(interest || undefined)} target="_blank" rel="noopener noreferrer" className="text-link">Prefer WhatsApp? <Arrow diagonal /></a></div>
    {notice && <p role={notice.startsWith("Enquiry sent") ? "status" : "alert"} className={notice.startsWith("Enquiry sent") ? "submission-notice" : "form-error"}>{notice}</p>}
    <p className="fine-print">For immediate assistance, WhatsApp or call <a href={`tel:${site.tel}`}>{site.phone}</a>. Your drawing remains private and is used only to review this enquiry.</p>
  </form>;
}
