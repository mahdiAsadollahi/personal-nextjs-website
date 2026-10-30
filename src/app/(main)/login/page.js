"use client";

import { useEffect, useRef } from "react";
import { RiArrowLeftLine, RiEyeLine } from "react-icons/ri";

export default function LoginPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const main = mainRef.current;
    if (!main) return;

    const blobs = main.querySelectorAll("[data-blob]");
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
    <main
      ref={mainRef}
      className="relative z-1 flex min-h-screen items-center justify-center overflow-hidden pt-32.5 pb-16 max-[480px]:pt-27.5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <span
          data-blob
          data-speed="1.5"
          data-range="30"
          data-phase="0"
          className="pointer-events-none absolute h-85 w-85 top-[8%] right-[6%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--violet-soft),var(--violet)_70%)] opacity-[0.55] blur-[48px] saturate-[1.35] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="2.2"
          data-range="40"
          data-phase="2.1"
          className="pointer-events-none absolute h-75 w-75 bottom-[4%] left-[8%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--pink-soft),var(--pink)_70%)] opacity-[0.50] blur-[48px] saturate-[1.35] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="1.8"
          data-range="34"
          data-phase="4.3"
          className="pointer-events-none absolute h-55 w-55 top-[40%] left-[20%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--cyan-soft),var(--cyan)_70%)] opacity-[0.42] blur-[48px] saturate-[1.35] mix-blend-multiply will-change-transform"
        />
        <span
          data-blob
          data-speed="1.2"
          data-range="38"
          data-phase="1.2"
          className="pointer-events-none absolute h-50 w-50 bottom-[20%] right-[22%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--amber-soft),var(--amber)_70%)] opacity-[0.38] blur-[48px] saturate-[1.35] mix-blend-multiply will-change-transform"
        />
      </div>

      <div className="relative z-2 mx-6 w-full max-w-115 rounded-[28px] border border-border bg-surface px-8 py-12 shadow-[0_1px_3px_rgba(20,20,26,0.04),0_24px_48px_rgba(20,20,26,0.08)] max-[480px]:mx-4 max-[480px]:px-6 max-[480px]:py-8">
        <span className="mb-3 inline-flex items-center gap-2 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-violet before:h-0.5 before:w-5.5 before:rounded-sm before:bg-[linear-gradient(90deg,#7c3aed,#ec4899)] before:content-['']">
          ورود
        </span>
        <h1 className="mb-2 text-[clamp(1.5rem,3.4vw,1.9rem)] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
          خوش برگشتی
        </h1>
        <p className="mb-8 text-[0.92rem] leading-[1.95] text-ink-2">
          در رو باز کن؛ همه‌چیز همون‌جاییه که گذاشتی. نوشته‌ها، دیدگاه‌ها و
          مقاله‌های تازه
        </p>

        <form
          className="flex flex-col gap-4"
          action="/login"
          method="post"
          noValidate
        >
          <div className="flex flex-col gap-1.75">
            <label
              htmlFor="username"
              className="ps-0.5 text-[0.82rem] font-medium text-ink-2"
            >
              نام کاربری
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="نام کاربری ..."
              required
              className="w-full rounded-[10px] border border-border-strong bg-surface px-4 py-3.25 font-[inherit] text-[0.95rem] text-ink transition-[border-color,box-shadow,background-color] placeholder:text-ink-3 hover:border-[#c9c4bb] focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.75">
            <div className="flex items-baseline justify-between gap-3">
              <label
                htmlFor="password"
                className="ps-0.5 text-[0.82rem] font-medium text-ink-2"
              >
                رمز عبور
              </label>
              <a
                href="#"
                className="whitespace-nowrap text-[0.76rem] font-medium text-violet no-underline hover:underline hover:underline-offset-[3px]"
              >
                فراموش کردی؟
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="رمزتو وارد کن ..."
                required
                className="w-full rounded-[10px] border border-border-strong bg-surface px-4 py-3.25 pe-11.5 font-[inherit] text-[0.95rem] text-ink transition-[border-color,box-shadow,background-color] placeholder:text-ink-3 hover:border-[#c9c4bb] focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
              />
              <button
                type="button"
                aria-label="نمایش رمز عبور"
                tabIndex={-1}
                onClick={(e) => {
                  const btn = e.currentTarget;
                  const input = btn.parentElement.querySelector("input");
                  const isPass = input.type === "password";
                  input.type = isPass ? "text" : "password";
                  input.focus();
                }}
                className="absolute top-1/2 inset-e-1.5 grid h-8.5 w-8.5 -translate-y-1/2 place-items-center rounded-lg border-0 bg-transparent text-base text-ink-3 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                <RiEyeLine />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[10px] border border-transparent bg-violet px-5.5 py-3.5 text-[0.98rem] font-medium text-white shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] transition-all hover:-translate-y-px hover:bg-black hover:shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)]"
          >
            <span>بزن بریم</span>
            <RiArrowLeftLine />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-[0.76rem] tracking-wider text-ink-3 before:h-px before:flex-1 before:bg-border before:content-[''] after:h-px after:flex-1 after:bg-border after:content-['']">
          تازه‌واردی؟
        </div>

        <div className="text-center text-[0.9rem] text-ink-2">
          <a
            href="/register"
            className="font-medium text-violet no-underline hover:underline"
          >
            یه حساب بساز
          </a>
        </div>
      </div>
    </main>
  );
}
