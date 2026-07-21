import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Sparkles, Ticket, Users } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import heroImg from "@/assets/img7553.jpg.asset.json";

export const Route = createFileRoute("/corporate-events")({
  head: () => ({
    meta: [
      { title: "Corporate Events | Twist and Glow Las Vegas" },
      { name: "description", content: "Brand activations, experiential marketing, festivals, and conventions in Las Vegas. High-volume artist teams built for big crowds." },
      { property: "og:title", content: "Corporate Events | Twist and Glow Las Vegas" },
      { property: "og:description", content: "Brand activations, experiential marketing, festivals, and conventions in Las Vegas." },
      { property: "og:image", content: heroImg.url },
      { property: "twitter:image", content: heroImg.url },
    ],
  }),
  component: CorporatePage,
});

function CorporatePage() {
  useReveal();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden flex items-center" style={{ minHeight: "70vh" }}>
        <img
          src={heroImg.url}
          alt="Brand activation on the Las Vegas Strip"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 70%" }}
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
              "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(0,229,255,0.2), transparent 70%)",
          }}
        />
        <div className="container-x relative py-24 md:py-32 fp-hero-block" style={{ zIndex: 10 }}>
          <p className="reveal label-caps fp-hero-eyebrow">For Brands & Producers</p>
          <h1
            className="reveal mt-5 font-display fp-hero-headline"
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 800,
              lineHeight: 1.05,
              textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 0 40px rgba(0,229,255,0.3)",
            }}
          >
            Corporate <span className="holo-text">Events</span>
          </h1>
          <p
            className="reveal mt-6 max-w-2xl text-lg text-white/90 leading-relaxed fp-hero-desc ce-hero-desc"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.85)" }}
          >
            Branded face art, interactive experiences, and crowd stopping visuals
            that put your campaign in every photo across the Las Vegas Strip and beyond.
          </p>
          <div className="reveal mt-8 flex justify-center fp-hero-cta">
            <Link to="/book" className="btn-pink">Get a Quote</Link>
          </div>
        </div>
      </section>

      <hr className="divider-glow-cool" />

      {/* DETAILS */}
      <section className="section fp-details-section">
        <div className="container-x grid md:grid-cols-2 gap-8 fp-cards-grid">
          <div className="reveal card-glow p-8 md:p-10 fp-detail-card" data-open-booking-modal role="button" tabIndex={0} style={{ cursor: "pointer" }}>
            <Briefcase size={28} style={{ color: "var(--pink)" }} />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">Brand Activations</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Custom designs around your campaign, product launch, or event theme.
              Logo paint, themed body art, and shareable moments built for social.
            </p>
          </div>

          <div className="reveal card-glow card-glow-cyan p-8 md:p-10 fp-detail-card" data-open-booking-modal role="button" tabIndex={0} style={{ cursor: "pointer" }}>
            <Ticket size={28} style={{ color: "var(--cyan)" }} />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">Festivals & Conventions</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              High-volume fast lines for outdoor festivals, fairs, and multi-day conventions
              across Las Vegas and beyond.
            </p>
          </div>

          <div className="reveal card-glow card-glow-purple p-8 md:p-10 md:col-span-2 fp-detail-card" data-open-booking-modal role="button" tabIndex={0} style={{ cursor: "pointer" }}>
            <Users size={28} style={{ color: "var(--purple)" }} />
            <h2 className="mt-5 font-display text-3xl md:text-4xl">High-Volume Artist Teams</h2>
            <p className="mt-4 text-white/75 leading-relaxed">
              Scaled teams of professional artists built for hundreds of faces per event,
              dialed in for speed, consistency, and on-brand quality across every station.
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
            <Sparkles
              size={14}
              style={{
                color: "var(--cyan)",
                filter: "drop-shadow(0 0 6px var(--cyan))",
              }}
            />
            <span
              className="uppercase font-semibold"
              style={{ fontSize: 12, letterSpacing: "3px", color: "var(--cyan)" }}
            >
              Experiential marketing built for the feed
            </span>
          </div>
        </div>
      </section>

      <hr className="divider-glow-warm" />

      {/* CTA */}
      <section className="section fp-cta-section">
        <div className="container-x text-center">
          <p className="reveal label-caps label-caps-pink justify-center fp-cta-eyebrow" style={{ display: "inline-flex" }}>Plan Your Activation</p>
          <h2 className="reveal mt-5 font-display text-4xl md:text-5xl fp-cta-headline">Let's build your <span className="holo-text">moment</span></h2>
          <p className="reveal mt-5 max-w-xl mx-auto text-white/70 fp-cta-desc">
            Share your brief and we'll respond within 24 hours with a tailored proposal.
          </p>
          <div className="reveal mt-8">
            <Link to="/book" className="btn-pink">Get a Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
