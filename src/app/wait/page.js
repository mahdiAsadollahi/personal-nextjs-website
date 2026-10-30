"use client";

import { useEffect, useRef } from "react";
import {
  RiQuillPenFill,
  RiToolsLine,
  RiMailSendLine,
  RiRefreshLine,
  RiGithubFill,
  RiInstagramLine,
  RiTelegramFill,
  RiMailLine,
} from "react-icons/ri";

const toPersian = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
const pad2 = (n) => (n < 10 ? "0" + n : String(n));

export default function WaitPage() {
  const rootRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const progressFillRef = useRef(null);
  const progressPercentRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const root = rootRef.current;
    const blobs = root ? root.querySelectorAll("[data-blob]") : [];
    let rafBlobs;

    if (blobs.length && !reduceMotion) {
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
          )}% ${r3.toFixed(1)}% ${(100 - r3).toFixed(1)}% / ${r2.toFixed(
            1
          )}% ${(100 - r2).toFixed(1)}% ${r4.toFixed(1)}% ${(100 - r4).toFixed(
            1
          )}%`;
        });
        rafBlobs = requestAnimationFrame(animateBlobs);
      };
      rafBlobs = requestAnimationFrame(animateBlobs);
    }

    const DURATION = 8 * 60 * 60 * 1000;
    const start = Date.now() - DURATION / 2;
    const end = start + DURATION;

    const updateCountdown = () => {
      const now = Date.now();
      const remaining = end - now;

      if (remaining <= 0) {
        if (hoursRef.current) hoursRef.current.textContent = "۰۰";
        if (minutesRef.current) minutesRef.current.textContent = "۰۰";
        if (secondsRef.current) secondsRef.current.textContent = "۰۰";
        if (progressFillRef.current)
          progressFillRef.current.style.width = "100%";
        if (progressPercentRef.current)
          progressPercentRef.current.textContent = "۱۰۰٪";
        return;
      }

      const totalSeconds = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (hoursRef.current)
        hoursRef.current.textContent = toPersian(pad2(hours));
      if (minutesRef.current)
        minutesRef.current.textContent = toPersian(pad2(minutes));
      if (secondsRef.current)
        secondsRef.current.textContent = toPersian(pad2(seconds));

      const elapsed = now - start;
      const progress = Math.max(0, Math.min(100, (elapsed / DURATION) * 100));
      if (progressFillRef.current)
        progressFillRef.current.style.width = progress.toFixed(1) + "%";
      if (progressPercentRef.current)
        progressPercentRef.current.textContent =
          toPersian(Math.round(progress)) + "٪";
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => {
      cancelAnimationFrame(rafBlobs);
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <span
          data-blob
          data-speed="1.5"
          data-range="30"
          data-phase="0"
          className="pointer-events-none absolute h-105 w-105 -top-25 right-[5%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--violet-soft),var(--violet)_70%)] opacity-[0.50] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="2.2"
          data-range="40"
          data-phase="2.1"
          className="pointer-events-none absolute h-95 w-95 -bottom-30 left-[5%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--pink-soft),var(--pink)_70%)] opacity-[0.45] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="1.8"
          data-range="34"
          data-phase="4.3"
          className="pointer-events-none absolute h-70 w-70 top-[30%] left-[12%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--cyan-soft),var(--cyan)_70%)] opacity-[0.38] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="1.2"
          data-range="38"
          data-phase="1.2"
          className="pointer-events-none absolute h-60 w-60 bottom-[20%] right-[15%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--amber-soft),var(--amber)_70%)] opacity-[0.35] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
        />
      </div>

      <header className="relative z-10 flex items-center justify-between gap-4 px-6 py-6 max-[520px]:px-4 max-[520px]:py-4">
        <a
          href="/"
          className="inline-flex items-center gap-2.5 text-base font-bold tracking-[-0.01em] text-ink no-underline hover:no-underline"
        >
          <span className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-[11px] bg-[conic-gradient(from_210deg_at_30%_30%,#7c3aed,#ec4899_40%,#f59e0b_70%,#06b6d4_100%)] text-base text-white shadow-[0_4px_12px_rgba(124,58,237,0.22)]">
            <RiQuillPenFill />
          </span>
          <span>مهدی اسداللهی</span>
        </a>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/72 py-1.5 pe-2.5 ps-3.5 text-[0.82rem] font-medium text-ink-2 shadow-[0_1px_2px_rgba(20,20,26,0.04)] backdrop-blur-sm max-[520px]:py-1.25 max-[520px]:ps-2 max-[520px]:pe-2.5 max-[520px]:text-[0.72rem]">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-amber shadow-[0_0_0_4px_rgba(245,158,11,0.18)] animate-[pulse_2s_ease-in-out_infinite]"
          />
          در حال بروزرسانی
        </span>
      </header>

      <main className="relative z-1 flex flex-1 items-center justify-center px-6 pt-6 pb-16">
        <div className="w-full max-w-180 text-center">
          <div className="relative mx-auto mb-8 inline-grid h-30 w-30 place-items-center rounded-[34px] bg-[linear-gradient(135deg,#7c3aed,#ec4899_55%,#f59e0b_100%)] text-white shadow-[0_20px_50px_rgba(124,58,237,0.28),0_8px_20px_rgba(236,72,153,0.20)] animate-[heroFloat_6s_ease-in-out_infinite] max-[520px]:h-24 max-[520px]:w-24 max-[520px]:rounded-[28px]">
            <RiToolsLine className="text-[3rem] max-[520px]:text-[2.4rem]" />
            <span
              aria-hidden="true"
              className="absolute -inset-3.5 rounded-[44px] border-2 border-dashed border-violet/25 animate-[spin_24s_linear_infinite]"
            />
            <span
              aria-hidden="true"
              className="absolute -top-1.5 -inset-e-1.5 h-5 w-5 rounded-full border-[3px] border-bg bg-emerald"
            />
          </div>

          <h1 className="mb-4 text-[clamp(2rem,5.5vw,3.4rem)] font-extrabold leading-[1.2] tracking-tight text-ink">
            داریم یه چیز{" "}
            <span className="bg-[linear-gradient(100deg,#7c3aed_0%,#ec4899_55%,#f59e0b_100%)] bg-size-[200%_100%] bg-clip-text text-transparent animate-[gradShift_6s_ease-in-out_infinite]">
              تازه
            </span>{" "}
            می‌سازیم
          </h1>

          <p className="mx-auto mb-12 max-w-130 text-[clamp(0.95rem,1.4vw,1.08rem)] leading-[2.05] text-ink-2">
            سایت در حال بروزرسانیه تا تجربهٔ بهتری برات بسازیم. یه‌کم صبر کن.
          </p>

          <div
            role="timer"
            aria-label="زمان باقی‌مانده"
            className="mb-12 flex flex-wrap items-center justify-center gap-3 max-[520px]:gap-2"
          >
            <div className="min-w-19.5 rounded-[20px] border border-border bg-surface px-2.5 pt-3.5 pb-2.5 shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)] max-[520px]:min-w-15.5 max-[520px]:px-1.5 max-[520px]:pt-2.5 max-[520px]:pb-2">
              <div
                ref={hoursRef}
                className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold leading-none tracking-[-0.02em] text-ink tabular-nums"
              >
                ۰۰
              </div>
              <div className="mt-1.5 text-[0.74rem] font-medium text-ink-3">
                ساعت
              </div>
            </div>
            <span
              aria-hidden="true"
              className="self-center pb-3 text-[1.6rem] font-extrabold leading-none text-ink-3 opacity-50 max-[520px]:pb-2 max-[520px]:text-[1.2rem]"
            >
              :
            </span>
            <div className="min-w-19.5 rounded-[20px] border border-border bg-surface px-2.5 pt-3.5 pb-2.5 shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)] max-[520px]:min-w-15.5 max-[520px]:px-1.5 max-[520px]:pt-2.5 max-[520px]:pb-2">
              <div
                ref={minutesRef}
                className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold leading-none tracking-[-0.02em] text-ink tabular-nums"
              >
                ۰۰
              </div>
              <div className="mt-1.5 text-[0.74rem] font-medium text-ink-3">
                دقیقه
              </div>
            </div>
            <span
              aria-hidden="true"
              className="self-center pb-3 text-[1.6rem] font-extrabold leading-none text-ink-3 opacity-50 max-[520px]:pb-2 max-[520px]:text-[1.2rem]"
            >
              :
            </span>
            <div className="min-w-19.5 rounded-[20px] border border-border bg-surface px-2.5 pt-3.5 pb-2.5 shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)] max-[520px]:min-w-15.5 max-[520px]:px-1.5 max-[520px]:pt-2.5 max-[520px]:pb-2">
              <div
                ref={secondsRef}
                className="text-[clamp(1.6rem,3.2vw,2.1rem)] font-extrabold leading-none tracking-[-0.02em] text-ink tabular-nums"
              >
                ۰۰
              </div>
              <div className="mt-1.5 text-[0.74rem] font-medium text-ink-3">
                ثانیه
              </div>
            </div>
          </div>

          <div className="mx-auto mb-12 w-full max-w-105">
            <div className="mb-2 flex items-center justify-between text-[0.8rem] font-medium text-ink-2">
              <span>پیشرفت بروزرسانی</span>
              <span ref={progressPercentRef} className="font-bold text-violet">
                ۰٪
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={0}
              className="relative h-2.5 overflow-hidden rounded-full border border-border bg-surface-2"
            >
              <div
                ref={progressFillRef}
                className="h-full w-0 rounded-full bg-[linear-gradient(90deg,#7c3aed,#ec4899_50%,#f59e0b)] bg-size-[200%_100%] transition-[width] duration-1000 ease-[cubic-bezier(.2,.7,.3,1)] animate-[progressShift_3s_ease-in-out_infinite]"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-[520px]:flex-col">
            <a
              href="mailto:mhdiasadollahi@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-transparent bg-ink px-5 py-3 text-[0.92rem] font-medium leading-none text-white shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] transition-all hover:-translate-y-px hover:bg-black hover:no-underline hover:shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)]"
            >
              <RiMailSendLine className="text-[1.05rem]" />
              <span>تماس با ما</span>
            </a>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border-strong bg-surface px-5 py-3 text-[0.92rem] font-medium leading-none text-ink transition-all hover:-translate-y-px hover:border-ink hover:bg-surface-2"
            >
              <RiRefreshLine className="text-[1.05rem]" />
              <span>دوباره بررسی کن</span>
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="me-1 text-[0.8rem] text-ink-3">
              ما رو دنبال کن:
            </span>
            <a
              href="https://github.com/mahdiAsadollahi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="گیت‌هاب"
              title="GitHub"
              className="inline-grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 no-underline transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet hover:no-underline"
            >
              <RiGithubFill />
            </a>
            <a
              href="https://instagram.com/mhdiasadollahi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام"
              title="Instagram"
              className="inline-grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 no-underline transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet hover:no-underline"
            >
              <RiInstagramLine />
            </a>
            <a
              href="https://t.me/MhdiAsadollahi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تلگرام"
              title="Telegram"
              className="inline-grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 no-underline transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet hover:no-underline"
            >
              <RiTelegramFill />
            </a>
            <a
              href="mailto:mhdiasadollahi@gmail.com"
              aria-label="ایمیل"
              title="Email"
              className="inline-grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 no-underline transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet hover:no-underline"
            >
              <RiMailLine />
            </a>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 p-5 text-[0.82rem] text-ink-3">
        <span>مهدی اسداللهی — ساخته‌شده با</span>
        <span aria-label="عشق" className="text-[#e25555]">
          ❤️
        </span>
      </footer>
    </div>
  );
}
