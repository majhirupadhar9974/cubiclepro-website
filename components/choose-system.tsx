"use client";
import { useState } from "react";
import Link from "next/link";
import { Arrow } from "./ui";
const steps = [
  {
    name: "Application",
    question: "Start with the space.",
    text: "Who uses the washroom, and how it is used, shapes the conversation.",
    options: [
      "Commercial washroom",
      "Education",
      "Workplace",
      "Hospitality",
      "Healthcare",
      "Public facility",
    ],
  },
  {
    name: "Profile",
    question: "Define the architectural line.",
    text: "The profile gives the system its structure and visual character.",
    options: [
      "Powder-coated aluminium",
      "Anodised aluminium",
      "SS 304",
      "SS 316",
    ],
  },
  {
    name: "Hardware",
    question: "Consider the daily details.",
    text: "Hardware and profile are coordinated as one approved system.",
    options: ["Nylon", "Stainless steel"],
  },
  {
    name: "Mounting",
    question: "Connect the system to the site.",
    text: "Walls, floor levels and ceiling interfaces inform the final mounting arrangement.",
    options: [
      "Leg-supported",
      "Shoe-box",
      "Floating",
      "Wall-to-wall",
      "Ceiling-hung",
    ],
  },
];
export default function ChooseSystem() {
  const [active, setActive] = useState(0),
    [selected, setSelected] = useState<Record<string, string>>({});
  const step = steps[active];
  return (
    <div className="selector reveal">
      <div
        className="selector-tabs"
        role="tablist"
        aria-label="System selection steps"
      >
        {steps.map((s, i) => (
          <button
            role="tab"
            id={`step-${i}`}
            aria-selected={i === active}
            aria-controls="selector-panel"
            tabIndex={i === active ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const n = (active + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                setActive(n);
                document.getElementById(`step-${n}`)?.focus();
              }
            }}
            onClick={() => setActive(i)}
            key={s.name}
          >
            <span>0{i + 1}</span>
            {s.name}
            <Arrow diagonal />
          </button>
        ))}
      </div>
      <div
        className="selector-content"
        id="selector-panel"
        role="tabpanel"
        aria-labelledby={`step-${active}`}
      >
        <div key={active} className="selector-transition">
          <p className="micro">0{active + 1} / 04</p>
          <h3>{step.question}</h3>
          <p>{step.text}</p>
          <div className="selector-options">
            {step.options.map((o) => (
              <button
                aria-pressed={selected[step.name] === o}
                key={o}
                onClick={() => setSelected({ ...selected, [step.name]: o })}
              >
                {o}
                {selected[step.name] === o && <span>✓</span>}
              </button>
            ))}
          </div>
          <div className="selector-bottom">
            <p className="fine-print">
              Final details are confirmed against site dimensions and the
              approved specification.
            </p>
            {active < 3 ? (
              <button
                className="text-link"
                onClick={() => setActive(active + 1)}
              >
                Next consideration <Arrow />
              </button>
            ) : (
              <Link
                className="text-link"
                href={`/contact/?brief=${encodeURIComponent(
                  Object.entries(selected)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join("; "),
                )}`}
              >
                Discuss your selection <Arrow />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
