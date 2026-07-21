import { useEffect, useRef, useState } from "react";
import { Citrus } from "lucide-react";
import { ServicePills, StepHeader, type ServiceName } from "./ServicePillsStep";
import { sendQuoteRequest } from "@/lib/email/send-quote";

export function BookingModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [variant, setVariant] = useState<"default" | "lemon">("default");
  const [step, setStep] = useState<1 | 2>(1);
  const [services, setServices] = useState<ServiceName[]>([]);
  const [step1Data, setStep1Data] = useState<Record<string, string>>({});
  const cardRef = useRef<HTMLDivElement>(null);
  const toggleService = (s: ServiceName) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-no-booking-modal]")) return;

      const explicit = target.closest("[data-open-booking-modal]");
      if (explicit) {
        if (explicit.closest("[data-no-booking-modal]")) return;
        e.preventDefault();
        e.stopPropagation();
        setSent(false);
        setStep(1);
        setServices([]);
        setVariant(
          (explicit as HTMLElement).closest("[data-lemon-twist]") ? "lemon" : "default"
        );
        setOpen(true);
        return;
      }

      const allowed = /\b(book|inquire|contact|get a quote)\b/i;
      const btn = target.closest("button, a, [role='button']");
      if (btn && allowed.test(btn.textContent || "")) {
        if (btn.closest("[data-no-booking-modal]")) return;
        e.preventDefault();
        e.stopPropagation();
        setSent(false);
        setStep(1);
        setServices([]);
        setVariant(
          (btn as HTMLElement).closest("[data-lemon-twist]") ? "lemon" : "default"
        );
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);


  useEffect(() => {
    if (!open) return;
    // Always start scrolled to the top so the first field is visible
    requestAnimationFrame(() => {
      if (cardRef.current) cardRef.current.scrollTop = 0;
    });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  // global cursor + hover zoom for every image
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      img { cursor: pointer; transition: transform 0.3s ease; }
      img:hover { transform: scale(1.05); }
      img[data-no-hover-zoom] { transition: none; }
      img[data-no-hover-zoom]:hover { transform: none; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);


  if (!open) return null;

  return (
    <div
      className="booking-modal-overlay fixed inset-0 z-[200] flex items-start md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={() => setOpen(false)}
    >
      <div
        ref={cardRef}
        className="booking-modal-card relative w-full max-w-lg"
        style={{
          background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,45,139,0.5)",
          boxShadow: "0 0 20px rgba(255,45,139,0.15)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "16px",
          padding: "28px",
          overflowY: "auto",
          maxHeight: "90vh",
          WebkitOverflowScrolling: "touch",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, #ff2d8b, #ff8a3d, #00e5ff)",
          }}
        />
        <button
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-white text-xl hover:opacity-80"
          style={{ background: "transparent", border: "none" }}
        >×</button>

        <h2 className="font-display text-2xl md:text-3xl text-white pr-8">Get a Quote from Twist &amp; Glow</h2>
        {variant === "lemon" && (
          <div
            className="mt-2 inline-flex items-center gap-2"
            style={{
              color: "#ffd60a",
              textShadow: "0 0 10px rgba(255,214,10,0.85), 0 0 18px rgba(255,214,10,0.45)",
            }}
          >
            <Citrus
              size={16}
              color="#ffd60a"
              fill="#ffd60a"
              style={{ filter: "drop-shadow(0 0 6px rgba(255,214,10,0.9))" }}
            />
            <span
              className="font-semibold uppercase"
              style={{ fontSize: 12, letterSpacing: "0.22em" }}
            >
              Lemon Twist Show
            </span>
          </div>
        )}

        {sent ? (
          <p className="text-white py-8 text-center">We got it. Expect a reply within 24 hours.</p>
        ) : step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const obj: Record<string, string> = {};
              fd.forEach((v, k) => { obj[k] = String(v); });
              setStep1Data(obj);
              setStep(2);
            }}
            className="mt-5"
            key="step1"
            style={{ animation: "bmStepIn 0.3s ease both" }}
          >
            <style>{`
              .booking-modal-form .bm-input {
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 8px;
                color: #fff;
                font-size: 14px;
                padding: 14px;
                width: 100%;
                transition: border-color 0.2s, box-shadow 0.2s;
              }
              .booking-modal-form .bm-input:focus {
                outline: none;
                border-color: #ff2d8b;
                box-shadow: 0 0 0 3px rgba(255,45,139,0.2);
              }
              .booking-modal-form .bm-input::placeholder { color: rgba(255,255,255,0.45); }
              .booking-modal-form .bm-btn {
                background: #ff2d8b;
                color: #fff;
                font-weight: 700;
                font-size: 16px;
                border-radius: 8px;
                width: 100%;
                padding: 14px 18px;
                transition: filter 0.2s ease, box-shadow 0.3s ease;
              }
              .booking-modal-form .bm-btn:hover {
                filter: brightness(1.1);
                box-shadow: 0 0 30px rgba(255,45,139,0.6);
              }
              @keyframes bmStepIn {
                from { opacity: 0; transform: translateY(6px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <StepHeader step={1} total={2} />
            <div className="booking-modal-form grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BmField label="Full Name" required className="sm:col-span-2">
                <input name="name" required className="bm-input" />
              </BmField>
              <BmField label="Email" required>
                <input name="email" required type="email" className="bm-input" />
              </BmField>
              <BmField label="Phone" required>
                <input name="phone" required type="tel" className="bm-input" />
              </BmField>
              <BmField label="Event Date" required className="sm:col-span-2">
                <input name="eventDate" required type="date" className="bm-input" />
              </BmField>
              <BmField label="Event Start Time" required>
                <input name="startTime" required type="time" className="bm-input" />
              </BmField>
              <BmField label="Event Duration (hours)" required>
                <input name="duration" required type="number" min={1} step="0.5" className="bm-input" />
              </BmField>
              <BmField label="Event Location" required className="sm:col-span-2">
                <input name="location" required className="bm-input" />
              </BmField>
              <BmField label="Event Type" required>
                <select name="eventType" required defaultValue="" className="bm-input">
                  <option value="" disabled>Select one</option>
                  <option>Corporate or Brand Activation</option>
                  <option>Festival or Large Event</option>
                  <option>Birthday Party</option>
                  <option>Other</option>
                </select>
              </BmField>
              <BmField label="Estimated Number of Guests" required>
                <input name="guests" required type="number" min={1} className="bm-input" />
              </BmField>
              <BmField label="Tell Us About Your Event" required className="sm:col-span-2">
                <textarea name="details" required rows={4} className="bm-input resize-y" />
              </BmField>
              <button type="submit" className="bm-btn sm:col-span-2">Continue</button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendQuoteRequest({
                ...step1Data,
                services: services.join(", "),
                source: variant === "lemon" ? "Service Card Modal (Lemon Twist)" : "Service Card Modal",
              });
              setSent(true);
            }}
            className="mt-5"
            key="step2"
            style={{ animation: "bmStepIn 0.3s ease both" }}
          >
            <div className="booking-modal-form">
              <StepHeader step={2} total={2} onBack={() => setStep(1)} />
              <h3 className="font-display text-xl md:text-2xl text-white">
                What services are you <span className="holo-text">interested in?</span>
              </h3>
              <p className="mt-1.5 text-white/60 text-sm">Select all that apply.</p>
              <div className="mt-5">
                <ServicePills selected={services} onToggle={toggleService} />
              </div>
              <input type="hidden" name="services" value={services.join(", ")} />
              <button type="submit" className="bm-btn mt-7">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function BmField({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-xs tracking-wide uppercase text-white/55 mb-2">
        {label}
        {required && <span style={{ color: "var(--pink)" }}> *</span>}
      </span>
      {children}
    </label>
  );
}
