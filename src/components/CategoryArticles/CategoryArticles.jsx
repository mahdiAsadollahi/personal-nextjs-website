"use client";

import { useEffect, useRef } from "react";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowLeftLine,
  RiEarthLine,
  RiCpuLine,
  RiShape2Line,
  RiPaletteLine,
  RiCodeSSlashLine,
  RiQuillPenLine,
  RiArticleLine,
  RiCalendarLine,
  RiTimeLine,
  RiFireLine,
  RiEyeLine,
  RiHeartLine,
  RiBookmarkLine,
} from "react-icons/ri";

const iconMap = {
  earth: RiEarthLine,
  cpu: RiCpuLine,
  shape: RiShape2Line,
  palette: RiPaletteLine,
  code: RiCodeSSlashLine,
  quill: RiQuillPenLine,
};

const colorMap = {
  violet: { cat: "#7c3aed", soft: "#a78bfa" },
  pink: { cat: "#ec4899", soft: "#f472b6" },
  cyan: { cat: "#06b6d4", soft: "#22d3ee" },
  amber: { cat: "#f59e0b", soft: "#fbbf24" },
  emerald: { cat: "#10b981", soft: "#34d399" },
  sky: { cat: "#0ea5e9", soft: "#7dd3fc" },
};

export default function CategoryArticles({ category, articles }) {
  const rootRef = useRef(null);
  const Icon = iconMap[category.icon] || RiEarthLine;
  const palette = colorMap[category.color] || colorMap.violet;

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const root = rootRef.current;
    if (!root) return;

    const blobs = root.querySelectorAll("[data-blob]");
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

  const [titleFirst, titleLast] = (() => {
    const parts = category.title.split(" ");
    if (parts.length < 2) return [category.title, ""];
    return [parts.slice(0, -1).join(" "), parts[parts.length - 1]];
  })();

  return (
    <main
      ref={rootRef}
      style={{
        "--cat": palette.cat,
        "--cat-soft": palette.soft,
        "--cat-tint": `${palette.cat}14`,
      }}
    >
      <section className="relative overflow-hidden pt-35 pb-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <span
            data-blob
            data-speed="1.5"
            data-range="28"
            data-phase="0"
            className="pointer-events-none absolute h-85 w-85 top-10 right-[5%] rounded-full opacity-[0.48] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, var(--cat-soft), var(--cat) 70%)",
            }}
          />
          <span
            data-blob
            data-speed="2.2"
            data-range="36"
            data-phase="2.1"
            className="pointer-events-none absolute h-65 w-65 -bottom-10 left-[10%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--pink-soft),var(--pink)_70%)] opacity-[0.35] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
          />
          <span
            data-blob
            data-speed="1.8"
            data-range="30"
            data-phase="4.3"
            className="pointer-events-none absolute h-50 w-50 top-[60%] right-[40%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--cyan-soft),var(--cyan)_70%)] opacity-[0.32] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
          />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
          <div className="max-w-200">
            <nav
              aria-label="مسیر صفحه"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/72 px-3.5 py-1.5 text-[0.82rem] text-ink-3 shadow-[0_1px_2px_rgba(20,20,26,0.04)] backdrop-blur-sm"
            >
              <a
                href="/"
                className="text-ink-2 no-underline transition-colors hover:text-ink hover:no-underline"
              >
                خانه
              </a>
              <RiArrowLeftSLine className="text-[0.9rem] text-ink-3" />
              <a
                href="/#categories"
                className="text-ink-2 no-underline transition-colors hover:text-ink hover:no-underline"
              >
                دسته‌بندی‌ها
              </a>
              <RiArrowLeftSLine className="text-[0.9rem] text-ink-3" />
              <span className="font-medium text-ink">{category.title}</span>
            </nav>

            <span
              aria-hidden="true"
              className="mb-6 inline-grid h-15 w-15 place-items-center rounded-[18px] text-[1.6rem] text-white shadow-[0_12px_28px_var(--cat-tint)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--cat), var(--cat-soft))",
              }}
            >
              <Icon />
            </span>

            <h1 className="mb-4 text-[clamp(1.9rem,4.4vw,3rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-ink">
              {titleFirst}{" "}
              <span className="bg-[linear-gradient(100deg,#7c3aed_0%,#ec4899_55%,#f59e0b_100%)] bg-size-[200%_100%] bg-clip-text text-transparent animate-[grad-shift_8s_ease-in-out_infinite]">
                {titleLast}
              </span>
            </h1>

            <p className="mb-6 max-w-155 text-[clamp(1rem,1.3vw,1.08rem)] leading-[2.05] text-ink-2">
              {category.description}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <span className="inline-flex items-center gap-2 text-[0.86rem] text-ink-2">
                <RiArticleLine
                  className="text-base"
                  style={{ color: "var(--cat)" }}
                />
                <strong className="font-bold text-ink">
                  {category.count} مقاله
                </strong>
              </span>
              <span className="inline-flex items-center gap-2 text-[0.86rem] text-ink-2">
                <RiCalendarLine
                  className="text-base"
                  style={{ color: "var(--cat)" }}
                />
                آخرین به‌روزرسانی:{" "}
                <strong className="font-bold text-ink">
                  {category.lastUpdate}
                </strong>
              </span>
              <span className="inline-flex items-center gap-2 text-[0.86rem] text-ink-2">
                <RiTimeLine
                  className="text-base"
                  style={{ color: "var(--cat)" }}
                />
                حدود{" "}
                <strong className="font-bold text-ink">
                  {category.readTime}
                </strong>{" "}
                مطالعه
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-1 pb-16">
        <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-border bg-surface p-3.5 px-5 shadow-[0_1px_2px_rgba(20,20,26,0.04)] max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-3">
            <div className="inline-flex items-center gap-3.5 text-[0.88rem] text-ink-2">
              <span>
                <strong className="font-bold text-ink">
                  {category.count} مقاله
                </strong>{" "}
                در این دسته
              </span>
            </div>
            <div className="inline-flex items-center gap-2 max-[640px]:justify-between">
              <span className="text-[0.82rem] text-ink-3">مرتب‌سازی:</span>
              <div
                role="group"
                aria-label="مرتب‌سازی"
                className="inline-flex gap-1 rounded-[10px] border border-border bg-surface-2 p-0.75"
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-[7px] border-0 bg-surface px-3 py-1.75 text-[0.82rem] font-medium text-ink shadow-[0_1px_2px_rgba(20,20,26,0.04)]"
                >
                  <RiFireLine className="text-[0.9rem]" />
                  جدیدترین
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-[7px] border-0 bg-transparent px-3 py-1.75 text-[0.82rem] font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  <RiEyeLine className="text-[0.9rem]" />
                  پربازدید
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-[7px] border-0 bg-transparent px-3 py-1.75 text-[0.82rem] font-medium text-ink-2 transition-colors hover:text-ink"
                >
                  <RiHeartLine className="text-[0.9rem]" />
                  محبوب
                </button>
              </div>
            </div>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-6 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.title} {...article} />
            ))}
          </div>

          <nav
            aria-label="صفحه‌بندی"
            className="mb-16 flex flex-wrap items-center justify-center gap-1.5"
          >
            <button
              type="button"
              disabled
              aria-label="صفحهٔ قبل"
              className="inline-grid h-10.5 min-w-10.5 place-items-center rounded-[10px] border border-border bg-surface px-3 text-[0.92rem] font-medium text-ink-2 opacity-45"
            >
              <RiArrowRightSLine className="text-[1.05rem]" />
            </button>
            <button
              type="button"
              className="inline-grid h-10.5 min-w-10.5 place-items-center rounded-[10px] border border-ink bg-ink px-3 text-[0.92rem] font-medium text-white"
            >
              ۱
            </button>
            <button
              type="button"
              className="inline-grid h-10.5 min-w-10.5 place-items-center rounded-[10px] border border-border bg-surface px-3 text-[0.92rem] font-medium text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
            >
              ۲
            </button>
            <button
              type="button"
              className="inline-grid h-10.5 min-w-10.5 place-items-center rounded-[10px] border border-border bg-surface px-3 text-[0.92rem] font-medium text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
            >
              ۳
            </button>
            <span className="inline-grid h-10.5 min-w-10.5 place-items-center text-[0.92rem] text-ink-3">
              …
            </span>
            <button
              type="button"
              className="inline-grid h-10.5 min-w-10.5 place-items-center rounded-[10px] border border-border bg-surface px-3 text-[0.92rem] font-medium text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
            >
              ۸
            </button>
            <button
              type="button"
              aria-label="صفحهٔ بعد"
              className="inline-grid h-10.5 min-w-10.5 place-items-center rounded-[10px] border border-border bg-surface px-3 text-[0.92rem] font-medium text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
            >
              <RiArrowLeftSLine className="text-[1.05rem]" />
            </button>
          </nav>
        </div>
      </section>

      <section className="relative z-1 pb-16">
        <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
          <div className="relative grid grid-cols-1 items-center gap-6 overflow-hidden rounded-[28px] border border-border bg-surface px-6 py-12 min-[720px]:grid-cols-[1.2fr_.8fr] min-[720px]:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--cat-tint)_1.2px,transparent_1.2px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_80%_60%_at_100%_0%,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_80%_60%_at_100%_0%,#000,transparent_70%)]" />
            <div className="relative z-1">
              <h2 className="mb-2 text-[clamp(1.35rem,2.6vw,1.7rem)] font-extrabold leading-[1.4] tracking-[-0.02em] text-ink">
                این دسته رو دنبال کن
              </h2>
              <p className="max-w-120 text-[0.95rem] leading-[1.95] text-ink-2">
                با ثبت‌نام، هر بار مقاله‌ای توی این دسته منتشر بشه، تو اولین
                نفری می‌شی که می‌فهمه.
              </p>
            </div>
            <div className="relative z-1 flex flex-wrap gap-2.5">
              <a
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] px-5.5 py-3 text-[0.95rem] font-medium leading-none text-white shadow-[0_6px_18px_var(--cat-tint)] transition-all hover:-translate-y-px hover:no-underline hover:brightness-90"
                style={{ background: "var(--cat)" }}
              >
                <RiBookmarkLine />
                <span>دنبال کردن دسته</span>
              </a>
              <a
                href="/#categories"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border-strong bg-transparent px-5.5 py-3 text-[0.95rem] font-medium leading-none text-ink transition-all hover:-translate-y-px hover:border-ink hover:bg-surface hover:no-underline"
              >
                <span>دسته‌های دیگه</span>
                <RiArrowLeftLine />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
