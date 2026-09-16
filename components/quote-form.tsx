"use client";
import { useEffect, useState } from "react";
import { products, applications } from "@/data/products";
import { site, whatsapp } from "@/config/site";
import { Arrow } from "./ui";
const returnKey = "cubiclepro:quote-return";
export default function QuoteForm() {
  const [message, setMessage] = useState(""),
    [interest, setInterest] = useState(""),
    [submitted, setSubmitted] = useState(false),
    [sent, setSent] = useState(false);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    try {
      const started = Number(sessionStorage.getItem(returnKey));
      setSent(
        p.get("sent") === "1" &&
          started > 0 &&
          Date.now() - started < 30 * 60 * 1000,
      );
      sessionStorage.removeItem(returnKey);
    } catch {
      setSent(false);
    }
    setInterest(p.get("system") || "");
    setMessage(p.get("brief") || "");
  }, []);
  const endpoint =
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
    `https://formsubmit.co/${site.email}`;
  return (
    <form
      className="quote-form"
      action={endpoint}
      method="POST"
      onSubmit={() => {
        try {
          sessionStorage.setItem(returnKey, String(Date.now()));
        } catch {
          /* Direct contact remains available when storage is blocked. */
        }
        setSubmitted(true);
      }}
    >
      <input
        type="hidden"
        name="_subject"
        value="Cubiclepro website — new project enquiry"
      />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={`${site.url}/contact/?sent=1`} />
      <input type="hidden" name="_url" value={`${site.url}/contact/`} />
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave empty
          <input name="_honey" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-heading">
        {sent && (
          <p role="status" className="submission-notice">
            You have returned from form verification. This page cannot confirm
            email delivery. You can also contact us on WhatsApp to continue the
            discussion.
          </p>
        )}
        <p className="micro">Your project brief</p>
        <h2>Tell us about your space.</h2>
        <p>Fields marked * are required.</p>
      </div>
      <div className="form-grid">
        <label>
          Name *
          <input
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your full name"
          />
        </label>
        <label>
          Company
          <input
            name="company"
            maxLength={160}
            autoComplete="organization"
            placeholder="Company / organization"
          />
        </label>
        <label>
          Mobile number *
          <input
            name="mobile"
            type="tel"
            required
            minLength={10}
            maxLength={20}
            pattern="[+0-9 ()\-]{10,20}"
            autoComplete="tel"
            placeholder="+91"
          />
        </label>
        <label>
          Email *
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@company.com"
          />
        </label>
        <label>
          City *
          <input
            name="city"
            required
            maxLength={120}
            autoComplete="address-level2"
            placeholder="Project city"
          />
        </label>
        <label>
          Project location
          <input
            name="project_location"
            maxLength={200}
            placeholder="Area / site location"
          />
        </label>
        <label>
          Project type *
          <select name="project_type" required defaultValue="">
            <option value="" disabled>
              Select application
            </option>
            {applications.map(([n]) => (
              <option key={n}>{n}</option>
            ))}
            <option>Other / Not sure</option>
          </select>
        </label>
        <label>
          Approximate cubicle quantity
          <input
            type="number"
            name="quantity"
            min="1"
            max="100000"
            placeholder="If known"
          />
        </label>
        <label>
          Interested system
          <select
            name="system"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">Not sure — help me specify</option>
            {products.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
            {products
              .filter((p) => p.variants)
              .map((p) => (
                <optgroup key={p.slug} label={p.name}>
                  {p.variants!.map((variant) => (
                    <option key={variant}>{variant}</option>
                  ))}
                </optgroup>
              ))}
          </select>
        </label>
        <label>
          Panel preference
          <select name="panel" defaultValue="Not sure">
            <option>Not sure</option>
            <option>Compact HPL</option>
            <option>BWP-FR High-Density Board</option>
          </select>
        </label>
        <label className="full">
          Message *
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Application, site requirements, dimensions or the support you need…"
          />
        </label>
      </div>
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          required
          value="Agreed to enquiry contact"
        />
        <span>
          I agree to be contacted about this enquiry and have read the{" "}
          <a href="#privacy">enquiry privacy notice</a>.
        </span>
      </label>
      <div className="form-actions">
        <button className="button" type="submit">
          Send enquiry <Arrow />
        </button>
        <a
          href={whatsapp(interest || undefined)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Prefer WhatsApp? <Arrow diagonal />
        </a>
      </div>
      {submitted && (
        <p role="status" className="fine-print">
          Continue through the secure form verification. If it does not open,
          you can reach us on WhatsApp.
        </p>
      )}
      <p className="fine-print">
        Your enquiry opens a secure form verification before delivery. For an
        immediate alternative, WhatsApp or call {site.phone}.
      </p>
    </form>
  );
}
