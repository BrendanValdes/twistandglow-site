import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";

const services = [
  "Face Painting",
  "UV Glow Face Painting",
  "Festival and Event Face Painting",
  "Corporate Activations",
  "Brand Activations",
  "Glitter Bar",
  "Temporary Body Art",
  "Entertainment and Specialty Acts",
];

const cities = [
  "Las Vegas",
  "Henderson",
  "North Las Vegas",
  "Summerlin",
  "Centennial Hills",
  "Boulder City",
];

export function Footer() {
  return (
    <footer className="relative" style={{ background: "#0d0d0f", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <img src={logo.url} alt="Twist and Glow" className="h-[60px] w-[60px] rounded-full object-cover" style={{ boxShadow: "0 0 22px rgba(255,45,139,0.3)" }} />
            <p className="mt-4 text-sm text-white/55 max-w-[220px] leading-relaxed">
              Bringing color to every celebration across Las Vegas.
            </p>
          </div>

          <div>
            <p className="label-caps label-caps-lime mb-5">Services</p>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps label-caps-orange mb-5">Service Area</p>
            <ul className="space-y-2.5">
              {cities.map((c) => (
                <li key={c} className="text-sm text-white/70">{c}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps label-caps-purple mb-5">Contact</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="tel:5803405452" className="hover:text-white">580.340.5452</a></li>
              <li><a href="mailto:twist.and.glow.facepainting@gmail.com" className="hover:text-white">twist.and.glow.facepainting@gmail.com</a></li>
              <li className="text-white/50 pt-2">We respond within 24 hours.</li>
            </ul>

            <p className="label-caps label-caps-purple mt-8 mb-4">Find Us</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/_twist.and.glow_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.tiktok.com/@twist..glow?_r=1&_t=ZT-976Xj2JUH0A"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="footer-social"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 3h-2.7v13.2a2.7 2.7 0 1 1-2.7-2.7c.28 0 .54.04.79.12V10.8a5.7 5.7 0 1 0 4.61 5.6V8.86a6.8 6.8 0 0 0 4.05 1.3V7.4a4.1 4.1 0 0 1-4.05-4.4z"/>
                </svg>
              </a>
            </div>
            <style>{`
              .footer-social {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: 999px;
                color: var(--cyan, #00e5ff);
                border: 1px solid rgba(0,229,255,0.4);
                background: rgba(255,255,255,0.03);
                filter: drop-shadow(0 0 5px rgba(0,229,255,0.35));
                transition: all 0.2s ease;
              }
              .footer-social:hover {
                color: #ff2d8b;
                border-color: rgba(255,45,139,0.7);
                filter: drop-shadow(0 0 8px rgba(255,45,139,0.55));
              }
            `}</style>
          </div>
        </div>

        <hr className="divider-glow-cool mt-14" />
        <p className="text-center text-xs text-white/40 mt-8 tracking-wide">
          © {new Date().getFullYear()} Twist and Glow LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
