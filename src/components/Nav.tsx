import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  useEffect(() => {
    if (open) {
      setRendered(true);
      // next frame, trigger slide-in
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else if (rendered) {
      setVisible(false);
      const t = setTimeout(() => setRendered(false), 260);
      return () => clearTimeout(t);
    }
  }, [open]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/face-painting", label: "Face Painting" },
    { to: "/corporate-events", label: "Corporate Events" },
    { to: "/gallery", label: "Gallery" },
  ] as const;

  const overlay = rendered && (
    <div className="lg:hidden mobile-menu-root" aria-hidden={!visible}>
      <div
        className="mobile-menu-backdrop"
        data-visible={visible ? "true" : "false"}
        onClick={() => setOpen(false)}
      />
      <div
        className="mobile-menu-panel"
        data-visible={visible ? "true" : "false"}
        role="dialog"
        aria-modal="true"
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="mobile-menu-close"
        >
          <X size={20} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="mobile-menu-brand">
          <img
            src={logo.url}
            alt="Twist and Glow"
            className="rounded-full object-cover"
            style={{ width: 72, height: 72, boxShadow: "0 0 22px rgba(255,45,139,0.45)" }}
          />
          <span className="block font-display tracking-wide whitespace-nowrap" style={{ marginTop: 12, fontSize: "1.25rem" }}>
            Twist <span className="text-[var(--pink)]">&</span> Glow
          </span>
        </div>

        <nav className="mobile-menu-nav">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="mobile-menu-link"
            >
              {l.label}
            </Link>
          ))}

          <div className="mobile-menu-ctas">
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="btn-pink mobile-menu-cta"
            >
              Get a Quote
            </Link>
            <a
              href="tel:5803405452"
              onClick={() => setOpen(false)}
              className="btn-outline-pink mobile-menu-cta mobile-menu-cta-outline"
            >
              <Phone size={16} style={{ marginRight: 8 }} />
              Call Us
            </a>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(10,10,12,0.85)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="container-x flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Twist and Glow" className="h-12 w-12 rounded-full object-cover" style={{ boxShadow: "0 0 18px rgba(255,45,139,0.35)" }} />
          <span className="block font-display text-base sm:text-lg tracking-wide whitespace-nowrap">Twist <span className="text-[var(--pink)]">&</span> Glow</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 lg:gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[13px] tracking-wide text-white/80 hover:text-white transition-colors whitespace-nowrap"
              activeProps={{ style: { color: "#fff" } }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:5803405452"
            className="text-[13px] tracking-wide text-white/80 hover:text-white transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
          >
            <Phone size={13} />
            Call Us
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/book" className="btn-pink hidden sm:inline-flex" style={{ padding: "0.55rem 1.1rem", fontSize: "0.85rem" }}>
            Get a Quote
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 relative z-[60]"
          >
            <span className={`h-px w-5 bg-white transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-white transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </header>
  );
}
