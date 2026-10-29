"use client";

import { useEffect, useRef } from "react";
import { RiMailSendLine, RiBookOpenLine } from "react-icons/ri";

export default function CTA() {
  const cardRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const blobs = card.querySelectorAll("[data-blob]");
    let rafBlobs;
    const startTime = performance.now();

    const animateBlobs = (now) => {
      const t = (now - startTime) / 1000;
      blobs.forEach((blob, index) => {
        const speed = parseFloat(blob.dataset.speed) || 1;
        const range = parseFloat(blob.dataset.range) || 40;
        const phase = parseFloat(blob.dataset.phase) || index * 1.7;

        const x = Math.sin(t * 0.22 * speed + phase) * range;
        const y = Math.cos(t * 0.17 * speed + phase * 1.3) * range * 0.8;
        const stretch = 0.22;
        const sx = 1 + Math.sin(t * 0.13 * speed + phase * 0.9) * stretch;
        const sy = 1 + Math.cos(t * 0.13 * speed + phase * 0.9) * stretch;
        const rot = Math.sin(t * 0.05 * speed + phase * 0.6) * 22;
        const r1 = 55 + Math.sin(t * 0.11 * speed + phase) * 20;
        const r2 = 45 + Math.cos(t * 0.14 * speed + phase * 1.1) * 20;
        const r3 = 50 + Math.sin(t * 0.12 * speed + phase * 1.4) * 18;
        const r4 = 50 + Math.cos(t * 0.09 * speed + phase * 0.9) * 18;

        blob.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(
          2
        )}px,0) rotate(${rot.toFixed(2)}deg) scale(${sx.toFixed(
          3
        )},${sy.toFixed(3)})`;
        blob.style.borderRadius = `${r1.toFixed(1)}% ${(100 - r1).toFixed(
          1
        )}% ${r3.toFixed(1)}% ${(100 - r3).toFixed(1)}% / ${r2.toFixed(1)}% ${(
          100 - r2
        ).toFixed(1)}% ${r4.toFixed(1)}% ${(100 - r4).toFixed(1)}%`;
      });
      rafBlobs = requestAnimationFrame(animateBlobs);
    };
    rafBlobs = requestAnimationFrame(animateBlobs);

    return () => {
      cancelAnimationFrame(rafBlobs);
    };
  }, []);

  return (
    <section id="about" className="relative z-1 py-16">
      <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
        <div
          ref={cardRef}
          className="relative isolate flex min-h-105 items-center justify-center overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#14141a_0%,#1d1830_100%)] px-6 py-16 text-center text-white min-[960px]:px-16 min-[960px]:py-24"
        >
          <span
            data-blob
            data-speed="1.5"
            data-range="50"
            data-phase="0"
            className="pointer-events-none absolute z-0 h-115 w-115 -top-35 -right-20 rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--violet-soft),var(--violet)_70%)] opacity-[0.85] blur-[60px] saturate-150 mix-blend-screen will-change-transform"
          />
          <span
            data-blob
            data-speed="2"
            data-range="56"
            data-phase="2.4"
            className="pointer-events-none absolute z-0 h-100 w-100 -bottom-35 -left-15 rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--pink-soft),var(--pink)_70%)] opacity-[0.75] blur-[60px] saturate-150 mix-blend-screen will-change-transform"
          />
          <span
            data-blob
            data-speed="2.5"
            data-range="42"
            data-phase="4.6"
            className="pointer-events-none absolute z-0 h-85 w-85 -bottom-25 right-[28%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--cyan-soft),var(--cyan)_70%)] opacity-[0.65] blur-[60px] saturate-150 mix-blend-screen will-change-transform"
          />
          <span
            data-blob
            data-speed="1.2"
            data-range="48"
            data-phase="1.5"
            className="pointer-events-none absolute z-0 h-65 w-65 -top-15 left-[22%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--amber-soft),var(--amber)_70%)] opacity-[0.55] blur-[60px] saturate-150 mix-blend-screen will-change-transform"
          />

          <div className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000,transparent_85%)]" />

          <div className="relative z-2 flex flex-col items-center">
            <h2 className="mb-4 max-w-180 text-[clamp(1.6rem,3.6vw,2.5rem)] font-extrabold leading-[1.35] tracking-[-0.02em]">
              بیا یه چیزی بسازیم که بهش افتخار کنیم
            </h2>
            <p className="mb-8 max-w-145 text-base leading-[2.05] text-white/82">
              اگه فکر می‌کنی نوشته‌ای می‌تونه اینجا منتشر بشه، یا فقط می‌خوای
              سلام کنی و از یه ایده حرف بزنیم، خوشحال می‌شیم بشنویم.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-white px-5.5 py-3 text-[0.95rem] font-medium leading-none text-ink shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-all hover:-translate-y-px hover:bg-[#f4f4f4] hover:no-underline"
              >
                <RiMailSendLine />
                <span>ارسال پیام</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/28 bg-white/8 px-5.5 py-3 text-[0.95rem] font-medium leading-none text-white backdrop-blur-sm transition-all hover:-translate-y-px hover:border-white/55 hover:bg-white/14 hover:no-underline"
              >
                <RiBookOpenLine />
                <span>دربارهٔ این وبلاگ</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
