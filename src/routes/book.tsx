import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { sendQuoteRequest } from "@/lib/email/send-quote";
import { SocialIcons } from "@/components/SocialIcons";
import { ServicePills, StepHeader, type ServiceName } from "@/components/ServicePillsStep";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Get a Quote | Twist and Glow Las Vegas" },
      { name: "description", content: "Check your date and request a booking. We respond within 24 hours." },
      { property: "og:title", content: "Get a Quote | Twist and Glow" },
      { property: "og:description", content: "Check your date and request a booking. We respond within 24 hours." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [services, setServices] = useState<ServiceName[]>([]);
  const [step1Data, setStep1Data] = useState<Record<string, string>>({});
  const toggleService = (s: ServiceName) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <div className="section">
      <div className="container-x">
        <div className="max-w-[680px] mx-auto">
          <p
            className="reveal uppercase font-semibold"
            style={{ color: "var(--cyan)", fontSize: 13, letterSpacing: "4px" }}
          >
            Booking
          </p>
          <h1
            className="reveal book-headline mt-3 font-display"
            style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}
          >
            Check Your <span className="holo-text">Date</span>
          </h1>

          <p className="reveal mt-7 text-white/70" style={{ fontSize: 18, lineHeight: 1.6 }}>
            Fill out the form and we will get back to you within 24 hours.
          </p>
        </div>

        <div className="mt-14 max-w-[680px] mx-auto">
          {/* FORM */}
          <div
            className="reveal rounded-2xl p-6 md:p-10 book-form-card"
            style={{
              background: "#16161a",
              border: "1px solid var(--pink)",
              boxShadow: "0 0 36px -12px rgba(255,45,139,0.5)",
            }}
          >
            {sent ? (
              <div className="py-16 text-center">
                <p className="font-display text-3xl holo-text">We got it.</p>
                <p className="mt-4 text-white/75">Expect a reply within 24 hours.</p>
              </div>
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
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                key="step1"
                style={{ animation: "bookStepIn 0.35s ease both" }}
              >
                <div className="sm:col-span-2">
                  <StepHeader step={1} total={2} />
                </div>
                <Field label="Full Name" required>
                  <input name="name" required className="input-dark" />
                </Field>
                <Field label="Email Address" required>
                  <input name="email" required type="email" className="input-dark" />
                </Field>
                <Field label="Phone Number" required>
                  <input name="phone" required type="tel" className="input-dark" />
                </Field>
                <Field label="Event Date" required>
                  <input name="eventDate" required type="date" className="input-dark" />
                </Field>
                <Field label="Event Start Time" required>
                  <input name="startTime" required type="time" className="input-dark" />
                </Field>
                <Field label="Event Duration (hours)" required>
                  <input name="duration" required type="number" min={1} step="0.5" className="input-dark" placeholder="e.g. 2" />
                </Field>
                <Field label="Event Location" required>
                  <input name="location" required className="input-dark" placeholder="Venue or address" />
                </Field>
                <Field label="Event Type" required>
                  <select name="eventType" required defaultValue="" className="input-dark">
                    <option value="" disabled>Select one</option>
                    <option>Corporate or Brand Activation</option>
                    <option>Festival or Large Event</option>
                    <option>Birthday Party</option>
                    <option>School or Community Event</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Estimated Number of Guests" required className="sm:col-span-2">
                  <input name="guests" required type="number" min={1} className="input-dark" />
                </Field>
                <Field label="Tell Us About Your Event" required className="sm:col-span-2">
                  <textarea name="details" required rows={4} className="input-dark resize-y" />
                </Field>
                <button type="submit" className="btn-pink book-submit sm:col-span-2 w-full mt-2">Continue</button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendQuoteRequest({
                    ...step1Data,
                    services: services.join(", "),
                    source: "Booking Page",
                  });
                  setSent(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                key="step2"
                style={{ animation: "bookStepIn 0.35s ease both" }}
              >
                <StepHeader step={2} total={2} onBack={() => setStep(1)} />
                <h2 className="font-display text-2xl md:text-3xl text-white">
                  What services are you <span className="holo-text">interested in?</span>
                </h2>
                <p className="mt-2 text-white/60 text-sm">Select all that apply.</p>
                <div className="mt-6">
                  <ServicePills selected={services} onToggle={toggleService} />
                </div>
                <input type="hidden" name="services" value={services.join(", ")} />
                <button type="submit" className="btn-pink book-submit w-full mt-8">Submit</button>
              </form>
            )}
            <style>{`
              @keyframes bookStepIn {
                from { opacity: 0; transform: translateY(6px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>

          {/* CONTACT CARD */}
          <aside
            className="reveal rounded-2xl p-6 md:p-8 mt-12"
            style={{
              background: "#16161a",
              border: "1px solid rgba(0,229,255,0.4)",
              boxShadow: "0 0 30px -12px rgba(0,229,255,0.4)",
            }}
          >
            <p className="label-caps">Direct Contact</p>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs text-white/50 tracking-wide uppercase">Phone</p>
                <a href="tel:5803405452" className="font-display text-2xl text-white hover:text-[var(--pink)] transition-colors">580.340.5452</a>
              </div>
              <div>
                <p className="text-xs text-white/50 tracking-wide uppercase">Email</p>
                <a href="mailto:twist.and.glow.facepainting@gmail.com" className="text-white break-all hover:text-[var(--cyan)] transition-colors">twist.and.glow.facepainting@gmail.com</a>
              </div>
              <div>
                <p className="text-xs text-white/50 tracking-wide uppercase">Service Area</p>
                <p className="text-white/80 text-sm mt-1 leading-relaxed">
                  Las Vegas, Henderson, North Las Vegas, Summerlin, Centennial Hills, Boulder City, and surrounding areas.
                </p>
              </div>
            </div>
            <hr className="divider-glow my-7" />
            <p className="text-sm text-white/60 leading-relaxed">
              We respond within 24 hours. For same week availability call or text directly.
            </p>
            <div className="mt-6">
              <p className="text-xs text-white/50 tracking-wide uppercase mb-3">Follow Us</p>
              <SocialIcons size={16} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, children, className }: { label: string; required?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-xs tracking-wide uppercase text-white/55 mb-2">
        {label}{required && <span className="text-[var(--pink)]"> *</span>}
      </span>
      {children}
    </label>
  );
}
