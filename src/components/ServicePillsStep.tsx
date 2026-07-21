import { ArrowLeft } from "lucide-react";

export const SERVICE_OPTIONS = [
  "Face Painting",
  "UV Glow Face Painting",
  "Glitter Bar",
  "Body Art",
  "Party Entertainment",
  "Brand Activation",
] as const;

export type ServiceName = (typeof SERVICE_OPTIONS)[number];

export function ServicePills({
  selected,
  onToggle,
}: {
  selected: ServiceName[];
  onToggle: (s: ServiceName) => void;
}) {
  return (
    <>
      <style>{`
        .svc-pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .svc-pill:hover {
          border-color: rgba(255,45,139,0.55);
          color: #fff;
        }
        .svc-pill[data-on="true"] {
          background: rgba(255,45,139,0.18);
          border-color: #ff2d8b;
          color: #fff;
          box-shadow: 0 0 18px rgba(255,45,139,0.55), inset 0 0 10px rgba(255,45,139,0.25);
          text-shadow: 0 0 8px rgba(255,45,139,0.6);
        }
      `}</style>
      <div className="flex flex-wrap gap-2.5">
        {SERVICE_OPTIONS.map((s) => {
          const on = selected.includes(s);
          return (
            <button
              key={s}
              type="button"
              className="svc-pill"
              data-on={on}
              aria-pressed={on}
              onClick={() => onToggle(s)}
            >
              {s}
            </button>
          );
        })}
      </div>
    </>
  );
}

export function StepHeader({
  step,
  total,
  onBack,
}: {
  step: number;
  total: number;
  onBack?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between mb-4"
      style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}
    >
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
          style={{ background: "transparent", border: "none", padding: 0, fontSize: 11, letterSpacing: "0.18em" }}
          aria-label="Back"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
      ) : (
        <span />
      )}
      <span style={{ color: "var(--cyan)", textShadow: "0 0 10px rgba(0,229,255,0.5)" }}>
        Step {step} of {total}
      </span>
    </div>
  );
}