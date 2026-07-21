import { Instagram } from "lucide-react";

export function SocialIcons({ size = 18, className = "" }: { size?: number; className?: string }) {
  const box = size + 22;
  return (
    <div className={`flex gap-3 ${className}`}>
      <a
        href="https://www.instagram.com/_twist.and.glow_"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="social-neon"
        style={{ width: box, height: box }}
      >
        <Instagram size={size} />
      </a>
      <a
        href="https://www.tiktok.com/@twist..glow"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok"
        className="social-neon"
        style={{ width: box, height: box }}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.5 3h-2.7v13.2a2.7 2.7 0 1 1-2.7-2.7c.28 0 .54.04.79.12V10.8a5.7 5.7 0 1 0 4.61 5.6V8.86a6.8 6.8 0 0 0 4.05 1.3V7.4a4.1 4.1 0 0 1-4.05-4.4z" />
        </svg>
      </a>
      <style>{`
        .social-neon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
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
  );
}