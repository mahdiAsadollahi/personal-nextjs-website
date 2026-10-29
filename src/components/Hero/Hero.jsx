"use client";

import { useEffect, useRef } from "react";
import {
  RiArrowLeftLine,
  RiBookOpenLine,
  RiPriceTag3Fill,
  RiCalendarCheckFill,
} from "react-icons/ri";

export default function Hero() {
  const visualRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const blobs = document.querySelectorAll("[data-blob]");
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

    const visual = visualRef.current;
    const image = imageRef.current;
    let targetX = 0,
      targetY = 0,
      currentX = 0,
      currentY = 0,
      rafParallax = null;
    const lerp = (a, b, n) => a + (b - a) * n;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      if (image) {
        image.style.transform = `rotate(-1deg) translate3d(${currentX.toFixed(
          2
        )}px,${currentY.toFixed(2)}px,0)`;
      }
      if (
        Math.abs(currentX - targetX) > 0.05 ||
        Math.abs(currentY - targetY) > 0.05
      ) {
        rafParallax = requestAnimationFrame(tick);
      } else {
        rafParallax = null;
      }
    };

    const ensureRaf = () => {
      if (!rafParallax) rafParallax = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!visual) return;
      const rect = visual.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px * -14;
      targetY = py * -14;
      ensureRaf();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      ensureRaf();
    };

    const hoverable = window.matchMedia("(hover: hover)").matches;
    if (visual && image && hoverable) {
      visual.addEventListener("mousemove", onMove);
      visual.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(rafBlobs);
      if (rafParallax) cancelAnimationFrame(rafParallax);
      if (visual) {
        visual.removeEventListener("mousemove", onMove);
        visual.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden pt-37.5 pb-16">
      <div className="relative z-1 mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
        <div className="grid grid-cols-1 items-center gap-16 min-[960px]:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-160">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/70 py-1.5 pe-2.5 ps-3.5 text-[0.82rem] font-medium text-ink-2 shadow-[0_1px_2px_rgba(20,20,26,0.04)] backdrop-blur-sm">
              <span className="h-1.75 w-1.75 rounded-full bg-violet shadow-[0_0_0_4px_rgba(124,58,237,0.15)] animate-[badge-pulse_2.4s_ease-in-out_infinite]" />
              وبلاگ شخصی · نسخهٔ اول
            </span>

            <h1 className="mb-6 text-[clamp(1.6rem,4vw,2.9rem)] font-extrabold leading-[1.18] tracking-[-0.02em] text-ink">
              دنیا رو از یه{" "}
              <span className="bg-[linear-gradient(100deg,#7c3aed_0%,#ec4899_45%,#f59e0b_100%)] bg-size-[200%_100%] bg-clip-text text-transparent animate-[grad-shift_8s_ease-in-out_infinite]">
                زاویهٔ دیگه
              </span>{" "}
              بخون
            </h1>

            <p className="mb-8 max-w-145 text-[clamp(1rem,1.4vw,1.1rem)] leading-[2.05] text-ink-2">
              اینا جاییه که ما با هم بلند فکر می‌کنیم. دربارهٔ اخبار روز
              می‌نویسیم — ولی از زاویه‌ای که کمتر شنیده می‌شه، تکنولوژی‌های تازه
              رو معرفی می‌کنیم و از الگوهای طراحی، معماری نرم‌افزار و تجربهٔ
              ساختن حرف می‌زنیم. یه‌کم دقیق‌تر، یه‌کم آروم‌تر.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              <a
                href="#articles"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-transparent bg-ink px-5.5 py-3 text-[0.95rem] font-medium leading-none text-white shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] transition-all hover:-translate-y-px hover:bg-black hover:no-underline hover:shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)]"
              >
                <span>آخرین مقالات</span>
                <RiArrowLeftLine />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border-strong bg-transparent px-5.5 py-3 text-[0.95rem] font-medium leading-none text-ink transition-all hover:-translate-y-px hover:border-ink hover:bg-surface hover:no-underline"
              >
                <RiBookOpenLine />
                <span>دربارهٔ این وبلاگ</span>
              </a>
            </div>

            <div className="flex max-w-130 flex-wrap gap-6 border-t border-border pt-6 max-[420px]:gap-5">
              <div>
                <div className="text-[1.5rem] font-extrabold leading-tight tracking-[-0.01em] text-ink">
                  ۲۴<span className="text-violet">+</span>
                </div>
                <div className="mt-0.5 text-[0.82rem] text-ink-3">
                  مقالهٔ منتشرشده
                </div>
              </div>
              <div>
                <div className="text-[1.5rem] font-extrabold leading-tight tracking-[-0.01em] text-ink">
                  ۶<span className="text-violet"> دسته</span>
                </div>
                <div className="mt-0.5 text-[0.82rem] text-ink-3">
                  از اخبار تا کد
                </div>
              </div>
              <div>
                <div className="text-[1.5rem] font-extrabold leading-tight tracking-[-0.01em] text-ink">
                  ۱.۲<span className="text-violet">K</span>
                </div>
                <div className="mt-0.5 text-[0.82rem] text-ink-3">
                  خوانندهٔ ماهانه
                </div>
              </div>
            </div>
          </div>

          <div
            ref={visualRef}
            id="hero-visual"
            aria-hidden="true"
            className="relative flex min-h-112.5 items-center justify-center max-[860px]:min-h-120"
          >
            <span
              data-blob
              data-speed="1.5"
              data-range="26"
              data-phase="0"
              className="pointer-events-none absolute z-0 h-80 w-[320px] -top-10 right-[6%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--violet-soft),var(--violet)_70%)] opacity-[0.72] blur-[38px] saturate-[1.35] mix-blend-multiply will-change-transform"
            />
            <span
              data-blob
              data-speed="2.5"
              data-range="42"
              data-phase="2.1"
              className="pointer-events-none absolute z-0 h-70 w-70 -bottom-5 left-[2%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--pink-soft),var(--pink)_70%)] opacity-[0.68] blur-[38px] saturate-[1.35] mix-blend-multiply will-change-transform"
            />
            <span
              data-blob
              data-speed="2"
              data-range="30"
              data-phase="4.3"
              className="pointer-events-none absolute z-0 h-60 w-60 top-[42%] left-[34%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--cyan-soft),var(--cyan)_70%)] opacity-[0.60] blur-[38px] saturate-[1.35] mix-blend-multiply will-change-transform"
            />
            <span
              data-blob
              data-speed="1.2"
              data-range="36"
              data-phase="1.2"
              className="pointer-events-none absolute z-0 h-50 w-50 top-[6%] left-[4%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--amber-soft),var(--amber)_70%)] opacity-[0.55] blur-[38px] saturate-[1.35] mix-blend-multiply will-change-transform"
            />

            <div
              ref={imageRef}
              className="relative z-[2] flex w-full max-w-140 -rotate-1 items-center justify-center transition-transform duration-300 ease-[cubic-bezier(.2,.7,.3,1)] will-change-transform max-[860px]:max-w-110"
            >
              <img
                src="/hero-image.png"
                alt="مهدی اسداللهی"
                className="block h-auto max-h-155 w-full select-none object-contain pointer-events-none drop-shadow-[0_24px_48px_rgba(20,20,26,0.14)] drop-shadow-[0_4px_12px_rgba(20,20,26,0.06)]"
                draggable={false}
              />
            </div>

            <div className="absolute bottom-[8%] right-0 z-3 flex items-center gap-2.5 rounded-[14px] border border-border bg-white/94 px-3.5 py-3 shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)] backdrop-blur-md animate-[float-soft_14s_ease-in-out_infinite_-3s] will-change-transform max-[860px]:bottom-[4%] max-[860px]:right-0 max-[520px]:px-3 max-[520px]:py-2.5">
              <span className="grid h-8.5 w-8.5 shrink-0 place-items-center rounded-[10px] bg-[linear-gradient(135deg,#7c3aed,#a78bfa)] text-base text-white max-[520px]:h-7.5 max-[520px]:w-7.5 max-[520px]:text-[0.9rem]">
                <RiPriceTag3Fill />
              </span>
              <div>
                <div className="text-[0.8rem] font-bold leading-tight text-ink max-[520px]:text-[0.74rem]">
                  ۶ دسته‌بندی
                </div>
                <div className="mt-0.5 text-[0.7rem] text-ink-3 max-[520px]:text-[0.66rem]">
                  از اخبار تا کد
                </div>
              </div>
            </div>

            <div className="absolute top-[10%] left-0 z-3 flex items-center gap-2.5 rounded-[14px] border border-border bg-white/94 px-3.5 py-3 shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)] backdrop-blur-md animate-[float-soft_14s_ease-in-out_infinite_-7s] will-change-transform max-[860px]:top-[4%] max-[860px]:left-0 max-[520px]:px-3 max-[520px]:py-2.5">
              <span className="grid h-8.5 w-8.5 shrink-0 place-items-center rounded-[10px] bg-[linear-gradient(135deg,#f59e0b,#d97706)] text-base text-white max-[520px]:h-7.5 max-[520px]:w-7.5 max-[520px]:text-[0.9rem]">
                <RiCalendarCheckFill />
              </span>
              <div>
                <div className="text-[0.8rem] font-bold leading-tight text-ink max-[520px]:text-[0.74rem]">
                  هر هفته
                </div>
                <div className="mt-0.5 text-[0.7rem] text-ink-3 max-[520px]:text-[0.66rem]">
                  یه مقالهٔ تازه
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
