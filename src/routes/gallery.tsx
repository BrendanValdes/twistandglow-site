import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { SocialIcons } from "@/components/SocialIcons";
import corporate from "@/assets/corporate.jpg.asset.json";
import family from "@/assets/family.jpg.asset.json";
import bigevents from "@/assets/bigevents.jpg.asset.json";
import uv1 from "@/assets/uv1.jpg.asset.json";
import uv2 from "@/assets/uv2.jpg.asset.json";
import specialty from "@/assets/specialty.jpg.asset.json";
import character from "@/assets/character.jpg.asset.json";
import kids from "@/assets/kids.jpg.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import img7534 from "@/assets/img7534.jpg.asset.json";
import img7536 from "@/assets/img7536.jpg.asset.json";
import img7540 from "@/assets/img7540.jpg.asset.json";
import img7546 from "@/assets/img7546.jpg.asset.json";
import img7564 from "@/assets/img7564.jpg.asset.json";
import img7569 from "@/assets/img7569.jpg.asset.json";
import img7571 from "@/assets/img7571.jpg.asset.json";
import img7579 from "@/assets/img7579.jpg.asset.json";
import img7532 from "@/assets/img7532.jpg.asset.json";
import img7584 from "@/assets/img7584.jpg.asset.json";
import img7585 from "@/assets/img7585.jpg.asset.json";
import img7586 from "@/assets/img7586.jpg.asset.json";
import img7588 from "@/assets/img7588.jpg.asset.json";
import img7589 from "@/assets/img7589.jpg.asset.json";
import img7590 from "@/assets/img7590.jpg.asset.json";
import img7591 from "@/assets/img7591.jpg.asset.json";
import img7592 from "@/assets/img7592.jpg.asset.json";
import img7593 from "@/assets/img7593.jpg.asset.json";
import img7594 from "@/assets/img7594.jpg.asset.json";
import vidBellagio from "@/assets/vid-bellagio.mp4.asset.json";
import vidFestival from "@/assets/vid-festival.mp4.asset.json";
import vidMagic from "@/assets/vid-magic.mp4.asset.json";
import vidRosesArm from "@/assets/vid-uvroses-arm.mp4.asset.json";
import vidCrown from "@/assets/vid-crown-girl.mp4.asset.json";
import vidCat from "@/assets/vid-uvcat.mp4.asset.json";
import vidRosesBody from "@/assets/vid-uvroses-body.mp4.asset.json";
import posterBellagio from "@/assets/poster-bellagio.jpg.asset.json";
import posterFestival from "@/assets/poster-festival.jpg.asset.json";
import posterMagic from "@/assets/poster-magic.jpg.asset.json";
import posterRosesArm from "@/assets/poster-uvroses-arm.jpg.asset.json";
import posterCrown from "@/assets/poster-crown-girl.jpg.asset.json";
import posterCat from "@/assets/poster-uvcat.jpg.asset.json";
import posterRosesBody from "@/assets/poster-uvroses-body.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Twist and Glow Las Vegas" },
      { name: "description", content: "Face painting, UV glow art, body art, and live entertainment across Las Vegas." },
      { property: "og:title", content: "Gallery | Twist and Glow" },
      { property: "og:description", content: "Face painting, UV glow art, body art, and live entertainment across Las Vegas." },
      { property: "og:image", content: uv1.url },
    ],
  }),
  component: GalleryPage,
});

type Cat = "Face Painting" | "Corporate" | "Parties" | "Other";
type Item = { src: string; cat: Cat; alt: string; video?: string };

const rawItems: Item[] = [
  { src: posterBellagio.url, video: vidBellagio.url, cat: "Corporate", alt: "Miraculous Strip activation in front of the Bellagio with ladybug performers" },
  { src: posterFestival.url, video: vidFestival.url, cat: "Corporate", alt: "Artist face painting a guest at a night festival glow booth" },
  { src: posterMagic.url, video: vidMagic.url, cat: "Parties", alt: "Performers and balloons promo — More than Face Painting Magic" },
  { src: posterRosesArm.url, video: vidRosesArm.url, cat: "Face Painting", alt: "UV neon roses forearm body art under blacklight" },
  { src: posterCrown.url, video: vidCrown.url, cat: "Face Painting", alt: "Young girl with blue and white crown face paint" },
  { src: posterCat.url, video: vidCat.url, cat: "Face Painting", alt: "UV neon cat face paint glowing under blacklight" },
  { src: posterRosesBody.url, video: vidRosesBody.url, cat: "Face Painting", alt: "UV neon roses body art closeup under blacklight" },

  { src: img7584.url, cat: "Face Painting", alt: "UV sugar skull close-up with blue feather headpiece" },
  { src: img7586.url, cat: "Face Painting", alt: "Sugar skull performer in black sequin outfit, purple smoke" },
  { src: img7589.url, cat: "Face Painting", alt: "UV sugar skull holding a candle with butterfly crown" },
  { src: img7593.url, cat: "Face Painting", alt: "Sugar skull face with full geometric tribal body paint" },
  { src: img7592.url, cat: "Face Painting", alt: "UV sugar skull reaching up under purple glow" },
  { src: img7588.url, cat: "Face Painting", alt: "Two sugar skull performers side by side in blue and purple smoke" },
  { src: img7585.url, cat: "Face Painting", alt: "Three-quarter sugar skull portrait with butterfly crown" },
  { src: img7594.url, cat: "Face Painting", alt: "Side profile sugar skull with feathered rose in blue smoke" },
  { src: img7590.url, cat: "Face Painting", alt: "Dramatic red smoke sugar skull portrait looking up" },
  { src: img7591.url, cat: "Face Painting", alt: "Two stage performers with skull face paint, one high kick" },
  { src: corporate.url, cat: "Corporate", alt: "Miraculous brand activation on the Las Vegas Strip" },
  { src: bigevents.url, cat: "Parties", alt: "Full event production with performers" },
  { src: specialty.url, cat: "Parties", alt: "Specialty acts at a Las Vegas event" },
  { src: character.url, cat: "Parties", alt: "Character performer at a celebration" },
  { src: img7540.url, cat: "Parties", alt: "Performer in neon bodysuit with silk fans" },
  { src: heroPoster.url, cat: "Face Painting", alt: "UV sugar skull face and body art" },
  { src: uv1.url, cat: "Face Painting", alt: "UV reactive forearm florals" },
  { src: uv2.url, cat: "Face Painting", alt: "UV reactive chest piece" },
  { src: img7532.url, cat: "Face Painting", alt: "UV reactive chest florals under blacklight" },
  { src: img7579.url, cat: "Face Painting", alt: "Full-face UV cat with neon swirls" },
  { src: img7569.url, cat: "Face Painting", alt: "UV neon floral leg art in glow installation" },
  { src: img7571.url, cat: "Face Painting", alt: "UV shoulder floral being painted" },
  { src: img7534.url, cat: "Face Painting", alt: "Pink cherry blossom glitter floral eye" },
  { src: img7536.url, cat: "Face Painting", alt: "Blue swirl wave eye design" },
  { src: img7546.url, cat: "Face Painting", alt: "Blue floral glitter eye with rainbow hair" },
  { src: img7564.url, cat: "Face Painting", alt: "Gold glitter eye with floral clusters" },
  { src: family.url, cat: "Face Painting", alt: "Pink and black butterfly face paint with glitter" },
  { src: kids.url, cat: "Face Painting", alt: "Kids face painting collection" },
];

// Interleave videos through the photo set so they're scattered, not clustered at top.
const items: Item[] = (() => {
  const videos = rawItems.filter((i) => i.video);
  const photos = rawItems.filter((i) => !i.video);
  const spacing = Math.max(1, Math.floor(photos.length / (videos.length + 1)));
  const out: Item[] = [...photos];
  videos.forEach((v, i) => {
    const idx = Math.min(out.length, spacing * (i + 1) + i);
    out.splice(idx, 0, v);
  });
  return out;
})();

const filters = ["All", "Face Painting", "Corporate", "Parties"] as const;

function InlineVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
    />
  );
}

function MasonryTile({
  itemKey,
  onHeight,
  children,
}: {
  itemKey: string;
  onHeight: (key: string, h: number) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) onHeight(itemKey, e.contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [itemKey, onHeight]);
  return <div ref={ref}>{children}</div>;
}

function GalleryPage() {
  useReveal();
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [colCount, setColCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setColCount(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const filtered = useMemo(() => active === "All" ? items : items.filter((i) => i.cat === active), [active]);

  const columns = useMemo(() => {
    const cols: number[][] = Array.from({ length: colCount }, () => []);
    const colH = new Array(colCount).fill(0);
    filtered.forEach((item, idx) => {
      let mi = 0;
      for (let i = 1; i < colCount; i++) if (colH[i] < colH[mi]) mi = i;
      cols[mi].push(idx);
      colH[mi] += heights[item.src] ?? 400;
    });
    return cols;
  }, [filtered, heights, colCount]);

  const reportHeight = useCallback((key: string, h: number) => {
    setHeights((prev) => (Math.abs((prev[key] ?? 0) - h) < 2 ? prev : { ...prev, [key]: h }));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? null : (o + 1) % filtered.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? null : (o - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, filtered.length]);

  const current = open !== null ? filtered[open] : null;

  return (
    <div className="section">
      <div className="container-x">
        <p className="label-caps reveal">Portfolio</p>
        <h1 className="reveal mt-3 font-display text-5xl md:text-6xl">The <span className="holo-text">Work</span></h1>
        <p className="reveal mt-5 text-white/70 max-w-2xl text-lg">
          Face painting, UV glow art, body art, and live entertainment across Las Vegas.
        </p>

        <SocialIcons className="reveal mt-6" />

        <div className="reveal gallery-filters mt-10 flex flex-wrap justify-center gap-3">
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="px-5 rounded-full text-sm transition-all inline-flex items-center justify-center"
                style={{
                  height: 40,
                  background: isActive ? "var(--pink)" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#0d0d0f" : "rgba(255,255,255,0.85)",
                  border: `1px solid ${isActive ? "var(--pink)" : "rgba(255,255,255,0.12)"}`,
                  boxShadow: isActive ? "0 0 24px rgba(255,45,139,0.55), inset 0 0 0 1px rgba(255,255,255,0.12)" : "none",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="gallery-grid mt-12 flex gap-5 items-start" data-no-booking-modal>
          {columns.map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 flex flex-col gap-5">
              {col.map((idx) => {
                const item = filtered[idx];
                return (
                  <MasonryTile key={item.src + idx} itemKey={item.src} onHeight={reportHeight}>
                    <button
                      type="button"
                      onClick={() => setOpen(idx)}
                      className="block w-full overflow-hidden rounded-2xl img-glow group relative"
                      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {item.video ? (
                        <>
                          <InlineVideo src={item.video} poster={item.src} alt={item.alt} />
                          <span
                            aria-hidden
                            className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
                            style={{ background: "rgba(0,0,0,0.55)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(6px)" }}
                          >
                            ▶ VIDEO
                          </span>
                        </>
                      ) : (
                        <img src={item.src} alt={item.alt} className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                      )}
                    </button>
                  </MasonryTile>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {open !== null && current && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" data-lightbox-overlay data-no-booking-modal onClick={() => setOpen(null)}>
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full border border-white/20 text-white text-xl hover:bg-white/10 inline-flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); setOpen(null); }}
            aria-label="Close"
          >×</button>
          <button
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 text-white text-2xl hover:bg-white/10 inline-flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); setOpen((o) => (o === null ? null : (o - 1 + filtered.length) % filtered.length)); }}
            aria-label="Previous"
          >‹</button>
          {current.video ? (
            <video
              src={current.video}
              poster={current.src}
              controls
              autoPlay
              loop
              playsInline
              className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img src={current.src} alt={current.alt} className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
          )}
          <button
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 text-white text-2xl hover:bg-white/10 inline-flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); setOpen((o) => (o === null ? null : (o + 1) % filtered.length)); }}
            aria-label="Next"
          >›</button>
        </div>
      )}
    </div>
  );
}
