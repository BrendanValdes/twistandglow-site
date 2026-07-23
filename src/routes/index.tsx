import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, Fragment } from "react";
import { Phone, Brush, Zap, Ticket, Briefcase, Megaphone, Sparkles, PenTool, Star, Palette, Smile, Droplets, Instagram, ArrowRight, ChevronDown, ArrowLeft } from "lucide-react";
import { ServicePills, type ServiceName } from "@/components/ServicePillsStep";

import { useReveal } from "@/hooks/use-reveal";
import heroPoster from "@/assets/hero-poster.jpg";
import corporate from "@/assets/corporate.jpg";
import family from "@/assets/family.jpg";
import bigevents from "@/assets/bigevents.jpg";
import uv1 from "@/assets/uv1.jpg";
import uv2 from "@/assets/uv2.jpg";
import posterFestival from "@/assets/poster-festival.jpg";
import img7593b from "@/assets/img7593b.jpg";
import img7588b from "@/assets/img7588b.jpg";
import specialty from "@/assets/specialty.jpg";
import character from "@/assets/character.jpg";
import img7531 from "@/assets/img7531.jpg";
import img7534 from "@/assets/img7534.jpg";
import img7535 from "@/assets/img7535.jpg";
import img7541 from "@/assets/img7541.jpg";
import img7542 from "@/assets/img7542.jpg";
import img7543 from "@/assets/img7543.jpg";

import img7553 from "@/assets/img7553.jpg";
import img7560 from "@/assets/img7560.jpg";
import img7563 from "@/assets/img7563.jpg";
import img7582 from "@/assets/img7582.jpg";
import img7584 from "@/assets/img7584.jpg";
import img7585 from "@/assets/img7585.jpg";
import img7586 from "@/assets/img7586.jpg";
import img7588 from "@/assets/img7588.jpg";
import img7589 from "@/assets/img7589.jpg";
import img7590 from "@/assets/img7590.jpg";
import img7591 from "@/assets/img7591.jpg";
import img7592 from "@/assets/img7592.jpg";
import img7593 from "@/assets/img7593.jpg";
import img7594 from "@/assets/img7594.jpg";

const heroSlides = [
  { src: img7593b, pos: "top" },
  { src: img7588b, pos: "center" },
  { src: img7542, pos: "center" },
  { src: img7543, pos: "center" },
];
const SLIDE_MS = 5000;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Twist and Glow | Las Vegas Face Painting and Event Entertainment" },
      { name: "description", content: "Face painting, UV glow art, and interactive entertainment for corporate activations, festivals, and parties across Las Vegas." },
      { property: "og:title", content: "Twist and Glow | Las Vegas Face Painting and Event Entertainment" },
      { property: "og:description", content: "Bringing color to every celebration. Trusted by brands, festivals, and families across Las Vegas." },
      { property: "og:image", content: heroPoster },
      { property: "twitter:image", content: heroPoster },
    ],
  }),
  component: Index,
});

const bands = [
  { n: "01", t: "Face Painting", d: "Smiles from the first brushstroke to the last face in line.", img: img7535, side: "left" as const, pos: "center center", Icon: Brush },
  { n: "02", t: "UV Glow Face Painting", d: "Neon reactive art built for blacklight rooms, night events, and anything that needs to stop a crowd.", img: img7531, side: "right" as const, pos: "center center", Icon: Zap },
  { n: "03", t: "Festival and Event Face Painting", d: "High-volume fast lines for outdoor events, fairs, and multi-day festivals.", img: img7534, side: "left" as const, pos: "center center", Icon: Ticket },
  { n: "04", t: "Corporate Activations", d: "Branded face art and interactive experiences that make your guests the content.", img: img7553, side: "right" as const, pos: "50% 70%", Icon: Briefcase },
  { n: "05", t: "Brand Activations", d: "Custom designs around your campaign, product launch, or event theme.", img: img7582, side: "left" as const, pos: "center center", Icon: Megaphone },
  { n: "06", t: "Glitter Bar", d: "Self-serve or artist-led glitter stations that guests line up for.", img: img7560, side: "right" as const, pos: "center center", Icon: Sparkles },
  { n: "07", t: "Temporary Body Art", d: "Detailed body painting for editorial looks, events, and festivals.", img: img7563, side: "left" as const, pos: "center center", Icon: PenTool },
  { n: "08", t: "Entertainment and Specialty Acts", d: "Performers, character entertainers, stilt walkers, and specialty acts through our sister company The Lemon Twist Show.", img: img7543, side: "right" as const, pos: "center top", Icon: Star },

];

const stats = [
  { label: "FESTIVALS AND CONVENTIONS", desc: "Multi-day outdoor events and fairgrounds" },
  { label: "BRAND ACTIVATIONS ON THE STRIP", desc: "Corporate and experiential marketing events" },
  { label: "HUNDREDS OF FACES PER EVENT", desc: "High-volume artist teams built for big crowds" },
];

function Index() {
  useReveal();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    date: "",
    type: "",
    startTime: "",
    duration: "",
    location: "",
    guests: "",
    details: "",
  });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [services, setServices] = useState<ServiceName[]>([]);
  const toggleService = (s: ServiceName) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  const [sent, setSent] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero-section relative min-h-screen flex items-center overflow-hidden" style={{ minHeight: "100vh" }}>
        <style>{`
          @keyframes kb-in  { from { transform: scale(1);    } to { transform: scale(1.08); } }
          @keyframes kb-out { from { transform: scale(1.08); } to { transform: scale(1);    } }
        `}</style>
        <div className="absolute inset-0 bg-black" style={{ zIndex: 0 }}>
          {heroSlides.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectPosition: s.pos,
                opacity: i === slide ? 1 : 0,
                transition: "opacity 1000ms ease-in-out",
                animation: i === slide ? `${i % 2 === 0 ? "kb-in" : "kb-out"} 5000ms linear forwards` : "none",
                transformOrigin: "center center",
                willChange: "opacity, transform",
              }}
              loading={i === 0 ? "eager" : "lazy"}
              data-no-hover-zoom

            />
          ))}
        </div>

        <div className="hero-mobile-overlay" aria-hidden="true" />

        <div className="container-x relative py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center w-full" style={{ zIndex: 60 }}>

          <div className="reveal max-w-xl">
            <div
              className="hero-text-wrap"
              style={{
                paddingRight: "0",
                width: "100%",
              }}
            >
              <p className="label-caps text-center">Las Vegas Face Painting and Event Entertainment</p>
              <h1 className="hero-headline mt-5 font-display text-[48px] sm:text-[72px] md:text-[96px] text-center" style={{ fontWeight: 800, lineHeight: 1.05, whiteSpace: "normal", textAlign: "center", width: "max-content", position: "relative", left: "50%", transform: "translateX(-50%)" }}>
                <span style={{ whiteSpace: "nowrap" }}>Bringing <span className="holo-text">Color</span> to</span><br /><span style={{ whiteSpace: "nowrap" }}>Every Celebration</span>
              </h1>







              <p className="hero-subheadline mt-6 text-lg text-white/75 leading-relaxed max-w-lg text-center mx-auto">
                Face painting, UV glow art, and interactive entertainment for corporate activations, festivals, and unforgettable parties across Las Vegas.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step === 1) {
                  setStep(2);
                } else if (step === 2) {
                  setStep(3);
                } else {
                  setSent(true);
                  void import("@/lib/email/send-quote").then(({ sendQuoteRequest }) =>
                    sendQuoteRequest({
                      name: form.name,
                      contact: form.contact,
                      email: form.contact.includes("@") ? form.contact : "",
                      phone: form.contact.includes("@") ? "" : form.contact,
                      eventDate: form.date,
                      eventType: form.type,
                      startTime: form.startTime,
                      duration: form.duration,
                      location: form.location,
                      guests: form.guests,
                      details: form.details,
                      services: services.join(", "),
                      source: "Hero Quote Form",
                    })
                  );
                }
              }}
              className="mt-8 hero-quote-form relative" data-no-booking-modal
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,45,139,0.5)",
                boxShadow: "0 0 20px rgba(255,45,139,0.15)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: "16px",
                padding: "28px",
                overflow: "hidden",
              }}
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
              <style>{`
                .hero-quote-form .input-dark {
                  background: rgba(255,255,255,0.06);
                  border: 1px solid rgba(255,255,255,0.12);
                  border-radius: 8px;
                  color: #fff;
                  font-size: 14px;
                  padding: 14px;
                  transition: border-color 0.2s, box-shadow 0.2s;
                }
                .hero-quote-form .input-dark:focus {
                  outline: none;
                  border-color: #ff2d8b;
                  box-shadow: 0 0 0 3px rgba(255,45,139,0.2);
                }
                .hero-quote-form .btn-quote {
                  background: #ff2d8b;
                  color: #fff;
                  font-weight: 700;
                  font-size: 16px;
                  border-radius: 8px;
                  width: 100%;
                  padding: 14px 18px;
                  transition: filter 0.2s ease, box-shadow 0.3s ease;
                  box-shadow: 0 0 0 0 rgba(255,45,139,0);
                }
                .hero-quote-form .btn-quote:hover {
                  filter: brightness(1.1);
                  animation: heroQuotePulse 1.4s ease-in-out infinite;
                }
                @keyframes heroQuotePulse {
                  0%,100% { box-shadow: 0 0 20px rgba(255,45,139,0.4); }
                  50%    { box-shadow: 0 0 40px rgba(255,45,139,0.8); }
                }
              `}</style>
              {sent ? (
                <p className="text-white py-6 text-center">We got it. Expect a reply within 24 hours.</p>
              ) : (
                <>
                  <div
                    className="flex items-center justify-between mb-3"
                    style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}
                  >
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((step - 1) as 1 | 2)}
                        className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
                        style={{ background: "transparent", border: "none", padding: 0, fontSize: 11, letterSpacing: "0.18em" }}
                        aria-label="Back"
                      >
                        <ArrowLeft size={14} />
                        <span>Back</span>
                      </button>
                    ) : <span />}
                    <span style={{ color: "var(--cyan)", textShadow: "0 0 10px rgba(0,229,255,0.5)" }}>
                      Step {step} of 3
                    </span>
                  </div>
                  <div
                    key={step}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    style={{ animation: "heroStepIn 0.35s ease both" }}
                  >
                    {step === 1 ? (
                      <>
                        <input required placeholder="Name" className="input-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <input required placeholder="Email or Phone" className="input-dark" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                        <input required type="date" className="input-dark" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                        <select required className="input-dark" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                          <option value="" disabled>Event Type</option>
                          <option>Corporate or Brand Activation</option>
                          <option>Festival or Large Event</option>
                          <option>Birthday Party</option>
                          <option>Other</option>
                        </select>
                        <button type="submit" className="btn-quote sm:col-span-2">Get a Quote</button>
                      </>
                    ) : step === 2 ? (
                      <>
                        <input
                          required
                          type={form.startTime ? "time" : "text"}
                          placeholder="Start Time"
                          className="input-dark"
                          value={form.startTime}
                          onFocus={(e) => { e.currentTarget.type = "time"; }}
                          onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = "text"; }}
                          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                        />
                        <input required type="number" min={1} step="0.5" placeholder="Event Duration (hours)" className="input-dark" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                        <input required placeholder="Event Location" className="input-dark sm:col-span-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                        <input required type="number" min={1} placeholder="Estimated Number of Guests" className="input-dark sm:col-span-2" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
                        <textarea required rows={3} placeholder="Tell Us About Your Event" className="input-dark sm:col-span-2 resize-y" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
                        <button type="submit" className="btn-quote sm:col-span-2">Next</button>
                      </>
                    ) : (
                      <div className="sm:col-span-2">
                        <h3 className="font-display text-white text-xl">
                          What services are you <span className="holo-text">interested in?</span>
                        </h3>
                        <p className="mt-1.5 text-white/60 text-sm">Select all that apply.</p>
                        <div className="mt-5">
                          <ServicePills selected={services} onToggle={toggleService} />
                        </div>
                        <input type="hidden" name="services" value={services.join(", ")} />
                        <button type="submit" className="btn-quote mt-6">Submit</button>
                      </div>
                    )}
                  </div>
                  <style>{`
                    @keyframes heroStepIn {
                      from { opacity: 0; transform: translateY(6px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>
                </>
              )}
            </form>

            <div className="mt-4 flex justify-center">
              <a
                href="tel:5803405452"
                className="hero-call-btn inline-flex items-center gap-2"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 8,
                  padding: "12px 28px",
                  color: "#fff",
                  fontSize: 15,
                  background: "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                <Phone size={16} />
                <span>Call Us</span>
              </a>
            </div>
            <style>{`
              .hero-call-btn:hover {
                border-color: #ff2d8b !important;
                color: #ff2d8b !important;
                box-shadow: 0 0 18px rgba(255,45,139,0.35);
              }
            `}</style>




            <p className="mt-4 text-[12px] text-white/45 leading-relaxed text-center">
              Serving Las Vegas, Henderson, North Las Vegas, Summerlin, Centennial Hills, Boulder City, and surrounding areas.
            </p>
          </div>
        </div>
        <div className="hero-radial-overlay" style={{ position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none", background: "radial-gradient(ellipse 65% 85% at 35% 55%, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,0.55) 100%)" }} />
      </section>

      <hr className="divider-glow-warm" />

      {/* TWO PATHS */}
      <section className="section">
        <div className="container-x">
          <p className="label-caps label-caps-orange text-center reveal">Who We Work With</p>
          <div className="mt-10 grid grid-cols-2 gap-6 two-paths-grid">
            {[
              { img: corporate, label: "Corporate Events and Brand Activations", h: "Built for Big Stages", b: "Trusted for brand activations, conventions, festivals, and large scale events. Professional artists, fast high volume lines, and crowd stopping visuals that put your brand in every photo.", btn: "Plan an Activation", to: "/book", style: "pink" as const },
              { img: family, label: "Birthday Parties and Family Celebrations", h: "Magic for Every Age", b: "Birthday parties, school events, and family celebrations with designs kids never want to wash off.", btn: "Quote a Party", to: "/book", style: "cyan" as const },


            ].map((c) => (
              <div key={c.h} className="reveal two-paths-card relative rounded-2xl overflow-hidden group" style={{ height: 520 }}>
                <img src={c.img} alt={c.h} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,15,0.2) 0%, rgba(13,13,15,0.55) 55%, rgba(13,13,15,0.95) 100%)" }} />
                <div className="absolute inset-0 p-7 md:p-9 flex flex-col justify-end">
                  <p className={`label-caps ${c.style === "cyan" ? "" : "label-caps-pink"}`}>{c.label}</p>
                  <h3 className="mt-3 font-display text-3xl md:text-4xl text-white">{c.h}</h3>
                  <p className="mt-3 text-white/80 max-w-md">{c.b}</p>
                  <Link to={c.to} className={`mt-6 self-start ${c.style === "cyan" ? "btn-outline-cyan" : "btn-outline-pink"}`}>{c.btn}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider-glow-cool" />

      {/* SERVICES */}
      <section className="section">
        <style>{`
          .service-band .service-band-img { transition: transform 0.3s ease; }
          .service-band:hover .service-band-img { transform: scale(1.05); }
        `}</style>

        <div className="container-x">
          <p className="label-caps label-caps-lime reveal what-we-do-label">What We Do</p>
          <h2 className="reveal mt-3 font-display text-4xl md:text-5xl max-w-2xl what-we-do-h2">Every Event. Every Canvas.</h2>
          <div className="mt-12 space-y-6 md:space-y-8">
            {bands.map((b) => {
              const textRight = b.side === "right";
              const divider = b.n === "04" ? (
                <div
                  key="divider-corporate"
                  className="reveal w-full flex items-center justify-center text-center px-6 corp-divider"
                  style={{
                    height: 140,
                    background: "#0d0d0f",
                    borderTop: "1px solid transparent",
                    borderBottom: "1px solid transparent",
                    borderImage: "linear-gradient(90deg, var(--pink), #ff8a3d, var(--cyan)) 1",
                  }}
                >
                  <div>
                    <p style={{ color: "var(--pink)", fontSize: 12, letterSpacing: 4, fontWeight: 600, textTransform: "uppercase" }}>
                      We Also Work With Businesses
                    </p>
                    <h3 className="font-display mt-3" style={{ fontSize: 32, color: "#fff", lineHeight: 1.15 }}>
                      Corporate Clients, Brands, and Large-Scale Events
                    </h3>
                    <p className="mt-3 mx-auto" style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", maxWidth: 720, lineHeight: 1.5 }}>
                      Trusted by event planners, marketing teams, and organizations across Las Vegas for activations, festivals, and branded experiences.
                    </p>
                  </div>
                </div>
              ) : null;
              return (
                <Fragment key={b.n}>
                  {divider}
                <div
                  data-open-booking-modal
                  className="reveal relative w-full overflow-hidden rounded-2xl service-band group"
                  style={{ border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}
                >
                  <div className="relative h-[420px] md:h-[600px]">
                    <img
                      src={b.img}
                      alt={b.t}
                      className="absolute inset-0 w-full h-full object-cover service-band-img"
                      style={{ objectPosition: b.pos }}
                      loading="lazy"
                      data-no-hover-zoom
                    />

                    {/* Desktop directional gradient */}
                    <div
                      className={`absolute inset-0 hidden md:block ${textRight ? "band-overlay-desktop-right" : "band-overlay-desktop"}`}
                      style={{
                        background: textRight
                          ? "linear-gradient(270deg, rgba(13,13,15,0.78) 0%, rgba(13,13,15,0.65) 33%, rgba(13,13,15,0.15) 66%, rgba(13,13,15,0) 100%)"
                          : "linear-gradient(90deg, rgba(13,13,15,0.78) 0%, rgba(13,13,15,0.65) 33%, rgba(13,13,15,0.15) 66%, rgba(13,13,15,0) 100%)",
                      }}
                    />
                    {/* Mobile centered overlay */}
                    <div
                      className="absolute inset-0 md:hidden"
                      style={{ background: "linear-gradient(180deg, rgba(13,13,15,0.35) 0%, rgba(13,13,15,0.7) 55%, rgba(13,13,15,0.85) 100%)" }}
                    />

                    <div className={`absolute inset-0 flex items-center ${textRight ? "md:justify-end" : "md:justify-start"} justify-center md:px-12 px-6`}>
                      <div className="max-w-md md:text-left text-center">
                        {b.n === "01" ? (
                          <>
                            <div className="flex md:justify-start justify-center items-center gap-3" style={{ marginBottom: 14 }}>
                              <span
                                className="inline-flex items-center justify-center rounded-full"
                                style={{
                                  width: 56,
                                  height: 56,
                                  background: "radial-gradient(circle at 30% 30%, rgba(255,45,139,0.35), rgba(0,229,255,0.18) 60%, transparent 75%)",
                                  border: "1px solid rgba(255,45,139,0.55)",
                                  boxShadow: "0 0 24px rgba(255,45,139,0.55), inset 0 0 14px rgba(0,229,255,0.25)",
                                }}
                              >
                                <b.Icon size={26} color="#fff" style={{ filter: "drop-shadow(0 0 6px rgba(255,45,139,0.9))" }} />
                              </span>
                              <span
                                className="text-[11px] font-semibold tracking-[0.28em] uppercase"
                                style={{ color: "var(--cyan)", textShadow: "0 0 10px rgba(0,229,255,0.55)" }}
                              >
                                Signature Service
                              </span>
                            </div>

                             <p
                               className="text-sm font-semibold tracking-[0.18em] uppercase"
                               style={{ color: "var(--pink)", textShadow: "0 0 14px rgba(255,45,139,0.7)" }}
                             >
                               {b.n} The Craft
                             </p>
                            <h3 className="mt-2 font-display text-white text-[30px] md:text-[40px] leading-[1.05] tracking-tight">{b.t}</h3>
                            <div
                              className="mt-4 h-px w-24 md:w-32 mx-auto md:mx-0"
                              style={{ background: "linear-gradient(90deg, var(--pink), var(--cyan), transparent)", boxShadow: "0 0 12px rgba(0,229,255,0.6)" }}
                            />
                            <p className="mt-5 text-white/80 text-[15px] md:text-[17px] leading-relaxed">{b.d}</p>
                            <ul className="mt-5 space-y-3 text-white/80 text-[14px] md:text-[15px] md:text-left text-left inline-block md:block">
                              {[
                                { Icon: Palette, color: "var(--pink)", glow: "rgba(255,45,139,0.85)", text: "Hand painted, skin safe, hypoallergenic pigments" },
                                { Icon: Smile, color: "var(--cyan)", glow: "rgba(0,229,255,0.85)", text: "Fast lines for kids' parties and family events" },
                                { Icon: Droplets, color: "#9b6cff", glow: "rgba(155,108,255,0.85)", text: "Waterproof designs available for pool parties" },
                              ].map(({ Icon, color, glow, text }) => (
                                <li key={text} className="flex items-start gap-3">
                                  <span
                                    aria-hidden
                                    className="inline-flex items-center justify-center rounded-full shrink-0"
                                    style={{
                                      width: 28,
                                      height: 28,
                                      marginTop: 1,
                                      background: "rgba(255,255,255,0.04)",
                                      border: `1px solid ${color}`,
                                      boxShadow: `0 0 12px ${glow}, inset 0 0 6px rgba(255,255,255,0.05)`,
                                    }}
                                  >
                                    <Icon size={14} color={color} style={{ filter: `drop-shadow(0 0 4px ${glow})` }} />
                                  </span>
                                  <span className="leading-snug pt-1">{text}</span>
                                </li>
                              ))}
                            </ul>
                            <div data-no-booking-modal className="mt-6 flex md:justify-start justify-center">
                              <Link
                                to="/face-painting"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                className="learn-more-link inline-flex items-center gap-2"
                              >
                                <span>Learn More</span>
                                <ArrowRight size={14} className="learn-more-arrow" />
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={`flex ${textRight ? "md:justify-start" : "md:justify-start"} justify-center`} style={{ marginBottom: 12 }}>
                              <b.Icon size={32} color="#ff2d8b" fill={b.Icon === Star ? "#ff2d8b" : "none"} style={{ filter: "drop-shadow(0 0 8px rgba(255,45,139,0.6))" }} />
                            </div>

                            <p
                              className="text-sm font-semibold tracking-[0.18em] uppercase"
                              style={{ color: "var(--pink)", textShadow: "0 0 14px rgba(255,45,139,0.7)" }}
                            >
                              {b.n}
                            </p>
                            <h3 className="mt-3 font-display text-white text-[28px] md:text-[36px] leading-tight">{b.t}</h3>
                            <p className="mt-4 text-white/75 text-[15px] md:text-base leading-relaxed">{b.d}</p>
                            <div
                              className="mt-5 h-px w-32 md:w-40 mx-auto md:mx-0"
                              style={{ background: "linear-gradient(90deg, var(--pink), var(--cyan), transparent)", boxShadow: "0 0 12px rgba(0,229,255,0.6)" }}
                            />
                            {b.n === "05" ? (
                              <div className="mt-5 flex md:justify-start justify-center">
                                <span
                                  className="inline-flex items-center gap-2 rounded-full"
                                  style={{
                                    padding: "6px 12px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(0,229,255,0.45)",
                                    boxShadow: "0 0 14px rgba(0,229,255,0.35), inset 0 0 8px rgba(255,45,139,0.12)",
                                  }}
                                >
                                  <Sparkles
                                    size={12}
                                    color="var(--cyan)"
                                    style={{ filter: "drop-shadow(0 0 4px rgba(0,229,255,0.9))" }}
                                  />
                                  <span
                                    className="text-[11px] font-semibold tracking-[0.22em] uppercase"
                                    style={{ color: "#fff", textShadow: "0 0 10px rgba(0,229,255,0.55)" }}
                                  >
                                    Experiential Marketing
                                  </span>
                                </span>
                              </div>
                            ) : null}
                            {b.n === "04" ? (
                              <div data-no-booking-modal className="mt-5 flex md:justify-start justify-center">
                                <Link
                                  to="/corporate-events"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  className="learn-more-link inline-flex items-center gap-2"
                                >
                                  <span>Learn More</span>
                                  <ArrowRight size={14} className="learn-more-arrow" />
                                </Link>
                              </div>
                            ) : null}
                            {b.n === "08" ? (
                              <div className="mt-6 flex md:justify-start justify-center">
                                <button
                                  type="button"
                                  data-open-booking-modal
                                  data-lemon-twist
                                  className="inline-flex items-center gap-2 rounded-full uppercase font-semibold"
                                  style={{
                                    padding: "12px 22px",
                                    fontSize: 13,
                                    letterSpacing: "0.18em",
                                    color: "#ffd60a",
                                    border: "1px solid #ffd60a",
                                    background: "transparent",
                                    boxShadow:
                                      "0 0 18px rgba(255,214,10,0.35), inset 0 0 10px rgba(255,214,10,0.08)",
                                    textShadow: "0 0 10px rgba(255,214,10,0.7)",
                                    transition: "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
                                  }}
                                >
                                  Quote Lemon Twist Show
                                </button>
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="divider-glow-warm" />

      {/* GLOW SHOWCASE */}
      <section className="section relative" style={{ background: "linear-gradient(180deg, #0a0a0c 0%, #101014 100%)" }}>
        <div className="container-x text-center">
          <p className="label-caps label-caps-purple reveal">UV Glow Art</p>
          <h2 className="reveal mt-3 font-display text-4xl md:text-5xl">Art That <span className="holo-text">Glows</span></h2>
          <p className="reveal mt-5 text-white/70 max-w-2xl mx-auto leading-relaxed">
            UV reactive face and body art designed for blacklight venues, night events, and festival environments. Every piece is built to photograph, perform, and stop people in their tracks.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            {[uv1, uv2].map((img, i) => (
              <div key={i} className="reveal img-glow uv-tile rounded-2xl overflow-hidden" style={{ height: 400 }}>
                <img src={img} alt="UV glow body art" className="w-full h-full object-cover" />
              </div>

            ))}
          </div>
          <div className="reveal mt-10 flex justify-center">
            <Link to="/book" className="btn-pink">Get a Quote</Link>
          </div>

        </div>
      </section>

      <hr className="divider-glow-cool" />

      {/* BIG EVENTS */}
      <section className="section">
        <div className="container-x grid grid-cols-2 gap-12 items-center bigevents-top-grid">
          <div className="reveal rounded-2xl overflow-hidden img-glow" style={{ boxShadow: "0 0 30px -10px rgba(255,45,139,0.4)" }}>
            <img src={bigevents} alt="Large scale event production" className="bigevents-img w-full h-[520px] object-cover" />
          </div>

          <div>
            <p className="label-caps label-caps-orange reveal">Large Scale Events</p>
            <h2 className="reveal mt-3 font-display text-4xl md:text-5xl leading-tight">We Know How to Run a Big Room</h2>
            <p className="reveal mt-5 text-white/75 leading-relaxed">
              From brand activations on the Las Vegas Strip to multi stage festivals, we bring the artists, the speed, and the professionalism that corporate events require. Our team handles high guest volume without sacrificing quality on a single face.
            </p>
            <div className="mt-10 space-y-6 bigevents-stats">
              {stats.map((s) => (
                <div key={s.label} className="reveal">
                  <p className="font-display holo-text text-[28px] leading-tight">{s.label}</p>
                  <p className="text-white/65 text-[14px] tracking-wide mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-x mt-16 grid grid-cols-2 gap-5 bigevents-photo-grid">
          {[specialty, character].map((img, i) => (
            <div key={i} className="reveal rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,45,139,0.4)", boxShadow: "0 0 24px -10px rgba(255,45,139,0.5)" }}>
              <img src={img} alt="Entertainment" className="bigevents-photo w-full h-[260px] object-cover" style={{ objectPosition: i === 1 ? "center 15%" : "center center" }} />
            </div>
          ))}
        </div>

      </section>

      <hr className="divider-glow-warm" />

      {/* FINAL CTA */}
      <section className="section final-cta text-center">
        <div className="container-x">
          <h2 className="reveal font-display text-4xl md:text-5xl max-w-3xl mx-auto leading-tight">
            Let us make your event <span className="holo-text">impossible to forget.</span>
          </h2>
          <div className="reveal cta-buttons mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/book" className="btn-pink">Get a Quote</Link>
            <a href="tel:5803405452" className="btn-outline-cyan">Call Us</a>
          </div>

          <p className="reveal mt-6 text-sm text-white/55">
            <a href="tel:5803405452" className="hover:text-white">580.340.5452</a> &nbsp;·&nbsp; <a href="mailto:twist.and.glow.facepainting@gmail.com" className="underline hover:text-white">twist.and.glow.facepainting@gmail.com</a>

          </p>

          <div className="reveal mt-6 flex justify-center gap-4">
            <a
              href="https://www.instagram.com/_twist.and.glow_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-neon"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@twist..glow?_r=1&_t=ZT-976Xj2JUH0A"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="social-neon"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.5 3h-2.7v13.2a2.7 2.7 0 1 1-2.7-2.7c.28 0 .54.04.79.12V10.8a5.7 5.7 0 1 0 4.61 5.6V8.86a6.8 6.8 0 0 0 4.05 1.3V7.4a4.1 4.1 0 0 1-4.05-4.4z"/>
              </svg>
            </a>
          </div>
          <style>{`
            .social-neon {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 40px;
              height: 40px;
              border-radius: 999px;
              color: var(--cyan, #00e5ff);
              border: 1px solid rgba(0,229,255,0.45);
              background: rgba(255,255,255,0.03);
              filter: drop-shadow(0 0 6px rgba(0,229,255,0.45));
              transition: all 0.2s ease;
            }
            .social-neon:hover {
              color: #ff2d8b;
              border-color: rgba(255,45,139,0.7);
              filter: drop-shadow(0 0 10px rgba(255,45,139,0.6));
              transform: translateY(-1px);
            }
          `}</style>
        </div>
      </section>

      <hr className="divider-glow-cool" />

      {/* FAQ */}
      <FaqSection />
    </div>
  );
}

const FAQS: { q: string; a: string }[] = [
  { q: "Are your paints safe?", a: "Yes! We use professional, skin safe, water based face paints from trusted brands." },
  { q: "Is there a minimum age?", a: "No. We paint willing guests of all ages. For safety, we may decline painting very young or wiggly children." },
  { q: "Will the paint stain?", a: "Most designs wash off easily with soap and water. Some highly pigmented colors may leave a temporary tint on certain skin types." },
  { q: "What do you need from me?", a: "Just a small shaded area and access to guests. We bring everything else." },
  { q: "How many guests can you paint?", a: "Our artists average 12 to 15 faces per hour, depending on design complexity and guest cooperation." },
  { q: "Can you accommodate large events?", a: "Absolutely! We can provide multiple artists for festivals, corporate events, schools, and high volume activations." },
  { q: "Are you insured?", a: "Yes. We carry liability insurance and can provide a certificate upon request." },
  { q: "Do you offer corporate services?", a: "Yes! In addition to private parties, we provide face painting, glow art, and interactive entertainment for corporate events, brand activations, festivals, and community events." },
  { q: "Do adults get painted too?", a: "Of course! Face painting isn't just for kids. We love creating designs for teens and adults as well." },
  { q: "Do you offer UV glow face painting?", a: "Yes! Glow face painting is one of our specialties and is perfect for nightlife events, festivals, parties, and brand activations." },
  { q: "How far do you travel?", a: "We serve Las Vegas, Henderson, North Las Vegas, Summerlin, Boulder City, and surrounding areas." },
  { q: "How do I book?", a: "Simply submit a quote request through our website and we'll get back to you with availability and pricing." },
  { q: "Can you match my event theme?", a: "Absolutely! From princesses and superheroes to sports, holidays, and custom event themes, we can create designs to match your celebration." },
];

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container-x max-w-3xl mx-auto">
        <div className="text-center">
          <p className="reveal label-caps label-caps-pink justify-center" style={{ display: "inline-flex" }}>FAQ</p>
          <h2 className="reveal mt-5 font-display text-4xl md:text-5xl leading-tight">
            Questions, <span className="holo-text">Answered</span>
          </h2>
        </div>

        <div className="reveal mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={item.q}
                className="rounded-xl overflow-hidden"
                style={{
                  background: isOpen
                    ? "linear-gradient(180deg, rgba(255,45,139,0.06), rgba(0,229,255,0.04))"
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isOpen ? "rgba(255,45,139,0.55)" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: isOpen
                    ? "0 0 24px -6px rgba(255,45,139,0.45), inset 0 0 18px rgba(0,229,255,0.08)"
                    : "none",
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5"
                  style={{ background: "transparent", border: "none", color: "#fff" }}
                >
                  <span
                    className="font-display text-[17px] md:text-[19px]"
                    style={{
                      color: "#fff",
                      textShadow: isOpen ? "0 0 12px rgba(255,45,139,0.45)" : "none",
                      transition: "text-shadow 0.25s ease",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 inline-flex items-center justify-center rounded-full"
                    style={{
                      width: 32,
                      height: 32,
                      border: `1px solid ${isOpen ? "var(--cyan)" : "rgba(255,255,255,0.18)"}`,
                      color: isOpen ? "var(--cyan)" : "#fff",
                      background: "rgba(255,255,255,0.03)",
                      boxShadow: isOpen ? "0 0 14px rgba(0,229,255,0.55)" : "none",
                      transform: `rotate(${isOpen ? 180 : 0}deg)`,
                      transition: "transform 0.3s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p className="px-5 md:px-6 pb-5 -mt-1 text-white/75 leading-relaxed text-[15px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
