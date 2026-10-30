"use client";

import { useEffect, useRef, useState } from "react";
import ArticleCard from "@/components/ArticleCard/ArticleCard";
import Comment from "@/components/Comment/Comment";
import {
  RiArrowLeftSLine,
  RiArrowLeftLine,
  RiCpuLine,
  RiCalendarLine,
  RiTimeLine,
  RiUserLine,
  RiGithubFill,
  RiLink,
  RiTwitterXFill,
  RiLinkedinFill,
  RiTelegramFill,
  RiSendPlaneFill,
  RiArrowDownLine,
} from "react-icons/ri";

export default function ArticleDetail({ article, related, comments }) {
  const rootRef = useRef(null);
  const [commentText, setCommentText] = useState("");
  const [sort, setSort] = useState("newest");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentText("");
  };

  return (
    <main ref={rootRef}>
      <section className="relative overflow-hidden pt-35 pb-8 max-[640px]:pt-30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <span
            data-blob
            data-speed="1.5"
            data-range="26"
            data-phase="0"
            className="pointer-events-none absolute h-80 w-80 top-15 right-[4%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--violet-soft),var(--violet)_70%)] opacity-[0.42] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
          />
          <span
            data-blob
            data-speed="2.2"
            data-range="34"
            data-phase="2.1"
            className="pointer-events-none absolute h-70 w-70 -bottom-15 left-[8%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--pink-soft),var(--pink)_70%)] opacity-[0.35] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
          />
          <span
            data-blob
            data-speed="1.8"
            data-range="28"
            data-phase="4.3"
            className="pointer-events-none absolute h-55 w-55 top-1/2 left-[30%] rounded-full bg-[radial-gradient(circle_at_35%_35%,var(--cyan-soft),var(--cyan)_70%)] opacity-[0.28] blur-[52px] saturate-[1.4] mix-blend-multiply will-change-transform"
          />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-190 px-6 max-[420px]:px-4.5">
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
              href={`/categories/${article.categorySlug}`}
              className="text-ink-2 no-underline transition-colors hover:text-ink hover:no-underline"
            >
              {article.category}
            </a>
            <RiArrowLeftSLine className="text-[0.9rem] text-ink-3" />
            <span className="max-w-70 truncate font-medium text-ink">
              {article.title}
            </span>
          </nav>

          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-violet/10 px-3.5 py-1.5 text-[0.78rem] font-bold tracking-[0.02em] text-violet">
            <RiCpuLine />
            {article.category}
          </span>

          <h1 className="mb-6 text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
            {article.title}
          </h1>

          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2.5 text-[0.88rem] text-ink-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[0.9rem] font-bold text-white">
                م
              </span>
              <span>
                <span className="block font-bold leading-tight text-ink">
                  مهدی اسداللهی
                </span>
                <span className="text-[0.76rem] text-ink-3">نویسنده</span>
              </span>
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-3 opacity-50" />
            <span className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-3">
              <RiCalendarLine className="text-[0.9rem]" />
              {article.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-3 opacity-50" />
            <span className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-3">
              <RiTimeLine className="text-[0.9rem]" />
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      <div className="relative z-1 mx-auto mb-16 w-full max-w-250 px-6 max-[420px]:px-4.5">
        <figure className="relative aspect-video overflow-hidden rounded-[28px] border border-border bg-surface-2 shadow-[0_20px_50px_rgba(20,20,26,0.10),0_8px_16px_rgba(20,20,26,0.05)]">
          <img
            src={article.cover}
            alt={article.coverAlt}
            className="h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(20,20,26,0.72),transparent)] px-6 pt-10 pb-4.5 text-right text-[0.82rem] leading-[1.7] text-white/92">
            {article.coverCaption}
          </figcaption>
        </figure>
      </div>

      <article className="relative z-1 mx-auto w-full max-w-190 px-6 max-[420px]:px-4.5">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="mt-16 mb-12 flex flex-wrap items-center justify-between gap-6 border-y border-border py-6">
          <span className="text-[0.88rem] font-medium text-ink-2">
            این مقاله رو به اشتراک بذار
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="کپی لینک"
              title="کپی لینک"
              className="grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet"
            >
              <RiLink />
            </button>
            <button
              type="button"
              aria-label="توییتر / ایکس"
              title="Twitter / X"
              className="grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet"
            >
              <RiTwitterXFill />
            </button>
            <button
              type="button"
              aria-label="لینکدین"
              title="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet"
            >
              <RiLinkedinFill />
            </button>
            <button
              type="button"
              aria-label="تلگرام"
              title="Telegram"
              className="grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet"
            >
              <RiTelegramFill />
            </button>
          </div>
        </div>

        <div className="mb-16 flex items-start gap-6 rounded-[20px] border border-border bg-surface p-8 shadow-[0_1px_2px_rgba(20,20,26,0.04)] max-[640px]:flex-col">
          <span className="grid h-15 w-15 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[1.2rem] font-bold text-white">
            م
          </span>
          <div className="flex-1">
            <div className="mb-1 text-[1.05rem] font-bold text-ink">
              مهدی اسداللهی
            </div>
            <p className="mb-3 text-[0.9rem] leading-[1.9] text-ink-2">
              طراح و توسعه‌دهنده‌ای که به فاصله‌ها، جزئیات و لحظه‌های خالی اهمیت
              می‌ده. اینجا دربارهٔ تکنولوژی، طراحی و چیزهایی می‌نویسه که معمولاً
              ازشون غافل می‌شیم.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-violet no-underline"
              >
                <RiUserLine />
                مقالات نویسنده
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-violet no-underline"
              >
                <RiGithubFill />
                گیت‌هاب
              </a>
            </div>
          </div>
        </div>
      </article>

      <section className="relative z-1 border-t border-border py-16">
        <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(1.3rem,2.6vw,1.7rem)] font-extrabold tracking-[-0.02em] text-ink">
              مقالات مرتبط
            </h2>
            <a
              href={`/categories/${article.categorySlug}`}
              className="inline-flex items-center gap-1.5 text-[0.92rem] font-medium text-ink-2 no-underline transition-all hover:gap-2.5 hover:text-violet hover:no-underline"
            >
              <span>مشاهدهٔ همهٔ مقالات {article.category}</span>
              <RiArrowLeftLine />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 min-[720px]:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-1 border-t border-border py-16">
        <div className="mx-auto w-full max-w-190 px-6 max-[420px]:px-4.5">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
            <h2 className="inline-flex items-center gap-2.5 text-[clamp(1.3rem,2.6vw,1.65rem)] font-extrabold tracking-[-0.02em] text-ink">
              نظرات
              <span className="inline-grid h-7 min-w-7 place-items-center rounded-full bg-violet/10 px-2 text-[0.8rem] font-bold text-violet">
                {comments.length}
              </span>
            </h2>
            <div
              role="group"
              aria-label="مرتب‌سازی نظرات"
              className="inline-flex gap-1 rounded-[10px] border border-border bg-surface-2 p-0.75"
            >
              {[
                { id: "newest", label: "جدیدترین" },
                { id: "popular", label: "محبوب‌ترین" },
                { id: "oldest", label: "قدیمی‌ترین" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSort(opt.id)}
                  className={`rounded-[7px] border-0 px-3 py-1.5 text-[0.8rem] font-medium transition-colors ${
                    sort === opt.id
                      ? "bg-surface text-ink shadow-[0_1px_2px_rgba(20,20,26,0.04)]"
                      : "bg-transparent text-ink-2 hover:text-ink"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <form
              onSubmit={handleSubmit}
              className="flex items-start gap-4 max-[640px]:flex-col"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[0.9rem] font-bold text-white max-[640px]:h-10 max-[640px]:w-10">
                م
              </span>
              <div className="flex flex-1 flex-col gap-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="نظرت رو بنویس..."
                  aria-label="متن نظر"
                  required
                  className="min-h-25 w-full resize-y rounded-[10px] border border-border-strong bg-surface px-4 py-3.5 font-[inherit] text-[0.95rem] leading-[1.9] text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[0.76rem] text-ink-3">
                    لطفاً محترمانه نظر بدید.
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-[10px] border border-transparent bg-violet px-5 py-2.5 text-[0.88rem] font-medium text-white shadow-[0_4px_14px_rgba(124,58,237,0.22)] transition-all hover:-translate-y-px hover:bg-[#6d28d9] hover:shadow-[0_8px_22px_rgba(124,58,237,0.28)]"
                  >
                    <RiSendPlaneFill className="text-base" />
                    <span>ارسال نظر</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[10px] border border-border-strong bg-transparent px-6 py-3 text-[0.9rem] font-medium text-ink-2 transition-colors hover:border-ink hover:bg-surface hover:text-ink"
            >
              <RiArrowDownLine />
              <span>نمایش نظرات بیشتر</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
