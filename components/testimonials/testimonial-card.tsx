"use client";

import Image from "next/image";

export type Testimonial = {
  id: number;
  number: string; // e.g. "01"
  quote: string;
  name: string;
  role?: string;
  location?: string;
  project?: string;
  media?: { src: string; alt: string };
};

export default function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article
      data-ts="card"
      className="relative w-[78vw] md:w-[52vw] lg:w-[40vw] xl:w-[34vw] min-w-[320px] max-w-[720px] aspect-[4/5] bg-[#0f0f10] text-white border border-white/8 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Background media (subtle, dark) */}
      <div className="absolute inset-0 opacity-[0.85]">
        {item.media ? (
          <Image
            src={item.media.src}
            alt={item.media.alt}
            fill
            data-ts="media"
            className="object-cover will-change-transform"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={false}
            onLoadingComplete={() => {
              // Avoid import cycle by using global if available; safe no-op otherwise
              try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const anyWin = window as any;
                if (anyWin?.ScrollTrigger?.refresh)
                  anyWin.ScrollTrigger.refresh();
              } catch {}
            }}
          />
        ) : (
          <div
            data-ts="media"
            className="absolute inset-0 bg-[linear-gradient(130deg,#1b1b1b,40%,#0e0e0f)]"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.55),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.6),transparent_45%)]" />
      </div>

      {/* Top index */}
      <div className="absolute top-5 left-6 text-[11px] tracking-widest text-white/70 select-none">
        {item.number}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
        <blockquote className="text-lg md:text-2xl leading-relaxed max-w-[88%]">
          {item.quote}
        </blockquote>
        <div className="mt-6 text-sm text-white/80">
          <div className="font-medium">{item.name}</div>
          {item.role && <div className="opacity-70">{item.role}</div>}
          {item.location && <div className="opacity-60">{item.location}</div>}
          {item.project && (
            <div className="mt-2 inline-block text-[10px] tracking-widest uppercase px-3 py-1 rounded-sm bg-white/5 border border-white/10">
              {item.project}
            </div>
          )}
        </div>
      </div>

      {/* Edge vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]" />
    </article>
  );
}
