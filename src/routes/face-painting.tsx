import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Brush, Zap } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import heroImg from "@/assets/img7535.jpg.asset.json";

export const Route = createFileRoute("/face-painting")({
  head: () => ({
    meta: [
      { title: "Face Painting | Twist and Glow Las Vegas" },
      { name: "description", content: "Premium face painting in Las Vegas for parties, festivals, and events. Skin-safe pigments, UV glow designs, and waterproof art for pool parties." },
      { property: "og:title", content: "Face Painting | Twist and Glow Las Vegas" },
      { property: "og:description", content: "Premium face painting in Las Vegas for parties, festivals, and events. Skin-safe pigments, UV glow designs, and waterproof art." },
      { property: "og:image", content: heroImg.url },
      { property: "twitter:image", content: heroImg.url },
    ],
  }),
  component: FacePaintingPage,
});

function FacePaintingPage() {
  useReveal();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: "70vh" }}>
        <img
          src={heroImg.url}
          alt="Face painting in Las Vegas"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,13,15,0.82) 0%, rgba(13,13,15,0.88) 60%, rgba(13,13,15,0.99) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 85% at 30% 50%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 55%, transparent 90%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(255,45,139,0.22), transparent 70%)",
          }}
        />
        <div className="container-x relative py-24 md:py-32 fp-hero-block" style={{ zIndex: 10 }}>
          <p className="reveal label-caps label-caps-pink fp-hero-eyebrow">The Craft</p>
          <h1
            className="reveal mt-5 font-display fp-hero-headline"
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 800,
              lineHeight: 1.05,
              textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 0 40px rgba(255,45,139,0.35)",
            }}
          >
            Face <span className="holo-text">Painting</span>
          </h1>
          <p
            className="reveal mt-6 max-w-2xl text-lg text-white/90 leading-relaxed fp-hero-desc"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
          >
            Hand painted, skin safe, hypoallergenic pigments. Detailed designs that hold up
            from the first photo to the last guest in line, built for parties, festivals,
            and any event that deserves to look unforgettable.
          </p>
          <div className="reveal mt-8 flex justify-center fp-hero-cta">
            <Link to="/book" className="btn-pink">Get a Quote</Link>
          </div>
        </div>
      </section>

      <hr className="divider-glow-warm" />

      {/* DETAILS */}
      <section className="section fp-details-section">
        <div className="container-x grid md:grid-cols-2 gap-8 fp-cards-grid">
          <div className="reveal card-glow p-8 md:p-10 fp-detail-card" data-open-booking-modal role="button" tabIndex={0} style={{ cursor: "pointer" }}>
            <Brush size={28} style={{ color: "var(--pink)" }} />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">Classic Face Painting</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Birthdays, school events, family celebrations, and brand activations.
              Fast lines, bold detail, and designs kids beg to keep on for days.
            </p>
          </div>

          <div className="reveal card-glow card-glow-cyan p-8 md:p-10 fp-detail-card" data-open-booking-modal role="button" tabIndex={0} style={{ cursor: "pointer" }}>
            <Zap size={28} style={{ color: "var(--cyan)" }} />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">UV Glow Designs</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Neon-reactive art built for blacklight rooms, nightlife, and after-dark events.
              Crowd-stopping visuals that turn every guest into content.
            </p>
          </div>
        </div>

        <div className="container-x mt-10 flex justify-center fp-waterproof-wrap">
          <div
            className="reveal inline-flex items-center gap-3 rounded-full px-5 py-3"
            data-open-booking-modal
            role="button"
            tabIndex={0}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(0,229,255,0.45)",
              boxShadow: "0 0 18px -4px rgba(0,229,255,0.45)",
              cursor: "pointer",
            }}
          >
            <Droplets
              size={16}
              style={{
                color: "var(--cyan)",
                filter: "drop-shadow(0 0 6px var(--cyan))",
              }}
            />
            <span
              className="uppercase font-semibold"
              style={{ fontSize: 12, letterSpacing: "3px", color: "var(--cyan)" }}
            >
              Waterproof designs available for pool parties
            </span>
          </div>
        </div>
      </section>

      <hr className="divider-glow-cool" />

      {/* CTA */}
      <section className="section fp-cta-section">
        <div className="container-x text-center">
          <p className="reveal label-caps label-caps-pink justify-center fp-cta-eyebrow" style={{ display: "inline-flex" }}>Ready When You Are</p>
          <h2 className="reveal mt-5 font-display text-4xl md:text-5xl fp-cta-headline">Book your <span className="holo-text">date</span></h2>
          <p className="reveal mt-5 max-w-xl mx-auto text-white/70 fp-cta-desc">
            Tell us about your event and we'll respond within 24 hours.
          </p>
          <div className="reveal mt-8">
            <Link to="/book" className="btn-pink">Get a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
