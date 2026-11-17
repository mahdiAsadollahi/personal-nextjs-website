"use client";

import { useEffect, useRef, useState, useMemo } from "react";
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
  RiListUnordered,
  RiHeartLine,
  RiBookOpenLine,
} from "react-icons/ri";

function extractHeadings(html) {
  if (typeof window === "undefined") return [];
  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.querySelectorAll("h2, h3")).map((el, i) => {
    const id = el.id || `heading-${i}`;
    el.id = id;
    return { id, text: el.textContent, level: el.tagName.toLowerCase() };
  });
}

export default function ArticleDetail({ article, related, comments }) {
  const rootRef = useRef(null);
  const articleRef = useRef(null);
  const [commentText, setCommentText] = useState("");
  const [sort, setSort] = useState("newest");
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [copied, setCopied] = useState(false);

  const headings = useMemo(
    () => extractHeadings(article.contentHtml),
    [article.contentHtml]
  );

  /* ---------- progress bar + active heading ---------- */
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!headings.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveHeading(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentText("");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <main ref={rootRef} className="relative">
      {/* progress bar */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-50 h-0.75 bg-transparent"
      >
        <div
          className="h-full bg-[linear-gradient(90deg,var(--violet),var(--pink))] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--violet-soft)_0%,transparent_60%)] opacity-40" />
          <div className="absolute -top-32 right-[8%] h-100 w-100 rounded-full bg-[radial-gradient(circle_at_40%_40%,var(--violet),transparent_70%)] opacity-25 blur-[80px]" />
          <div className="absolute -top-20 left-[12%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_40%_40%,var(--pink),transparent_70%)] opacity-20 blur-[80px]" />
        </div>

        <div className="relative z-1 mx-auto w-full max-w-190 px-6 pt-30 pb-12 max-[640px]:pt-26 max-[420px]:px-4.5">
          {/* breadcrumb */}
          <nav
            aria-label="مسیر صفحه"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/72 px-3.5 py-1.5 text-[0.82rem] text-ink-3 shadow-[0_1px_2px_rgba(20,20,26,0.04)] backdrop-blur-sm"
          >
            <a
              href="/"
              className="text-ink-2 no-underline transition-colors hover:text-ink"
            >
              خانه
            </a>
            <RiArrowLeftSLine className="text-[0.9rem]" />
            <a
              href={`/categories/${article.categorySlug}`}
              className="text-ink-2 no-underline transition-colors hover:text-ink"
            >
              {article.category}
            </a>
            <RiArrowLeftSLine className="text-[0.9rem]" />
            <span className="max-w-60 truncate font-medium text-ink">
              {article.title}
            </span>
          </nav>

          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-violet/10 px-3.5 py-1.5 text-[0.78rem] font-bold text-violet">
            <RiCpuLine />
            {article.category}
          </span>

          <h1 className="mb-6 text-[clamp(1.9rem,4.4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink">
            {article.title}
          </h1>

          {/* meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.86rem] text-ink-2">
            <span className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[0.85rem] font-bold text-white">
                م
              </span>
              <span className="font-bold text-ink">مهدی اسداللهی</span>
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-3 opacity-50" />
            <span className="inline-flex items-center gap-1.5">
              <RiCalendarLine className="text-[0.95rem] text-ink-3" />
              {article.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-ink-3 opacity-50" />
            <span className="inline-flex items-center gap-1.5">
              <RiTimeLine className="text-[0.95rem] text-ink-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ---------- COVER ---------- */}
      <div className="relative z-1 mx-auto -mt-4 w-full max-w-250 px-6 max-[420px]:px-4.5">
        <figure className="relative aspect-video overflow-hidden rounded-3xl border border-border shadow-[0_24px_60px_-20px_rgba(20,20,26,0.25)]">
          <img
            src={article.cover}
            alt={article.coverAlt}
            className="h-full w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(20,20,26,0.78),transparent)] px-6 pt-12 pb-4 text-[0.8rem] leading-[1.7] text-white/92">
            {article.coverCaption}
          </figcaption>
        </figure>
      </div>

      {/* ---------- BODY + SIDEBAR ---------- */}
      <div className="relative z-1 mx-auto mt-14 w-full max-w-250 px-6 max-[420px]:px-4.5">
        <div className="grid grid-cols-1 gap-12 min-[1000px]:grid-cols-[minmax(0,1fr)_260px]">
          {/* ---- main column ---- */}
          <div ref={articleRef}>
            <article
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            {/* share */}
            <div className="mt-14 mb-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-border bg-surface-2/60 px-5 py-4">
              <span className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-ink-2">
                <RiHeartLine className="text-violet" />
                این مقاله رو به اشتراک بذار
              </span>
              <div className="flex gap-2">
                {[
                  { icon: <RiLink />, label: "کپی لینک", onClick: handleCopy },
                  { icon: <RiTwitterXFill />, label: "توییتر / ایکس" },
                  { icon: <RiLinkedinFill />, label: "لینکدین" },
                  { icon: <RiTelegramFill />, label: "تلگرام" },
                ].map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={s.label}
                    title={s.label}
                    onClick={s.onClick}
                    className="grid h-9 w-9 place-items-center rounded-[9px] border border-border bg-surface text-[1.05rem] text-ink-2 transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet"
                  >
                    {s.icon}
                  </button>
                ))}
                {copied && (
                  <span className="self-center text-[0.76rem] font-medium text-violet">
                    کپی شد ✓
                  </span>
                )}
              </div>
            </div>

            {/* author card (single, here) */}
            <div className="mb-16 flex items-start gap-5 rounded-[20px] border border-border bg-surface p-7 shadow-[0_1px_2px_rgba(20,20,26,0.04)] max-[640px]:flex-col">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[1.15rem] font-bold text-white">
                م
              </span>
              <div className="flex-1">
                <div className="mb-1 text-[1rem] font-bold text-ink">
                  مهدی اسداللهی
                </div>
                <p className="mb-3 text-[0.88rem] leading-[1.9] text-ink-2">
                  طراح و توسعه‌دهنده‌ای که به فاصله‌ها، جزئیات و لحظه‌های خالی
                  اهمیت می‌ده. اینجا دربارهٔ تکنولوژی، طراحی و چیزهایی می‌نویسه
                  که معمولاً ازشون غافل می‌شیم.
                </p>
                <div className="flex gap-4">
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
          </div>

          {/* ---- sidebar (sticky) ---- */}
          <aside className="hidden min-[1000px]:block">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* TOC */}
              {headings.length > 0 && (
                <nav className="rounded-2xl border border-border bg-surface p-5">
                  <div className="mb-3 inline-flex items-center gap-2 text-[0.82rem] font-bold text-ink">
                    <RiListUnordered className="text-violet" />
                    فهرست مطالب
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className={`block rounded-md px-2.5 py-1.5 text-[0.82rem] no-underline transition-colors ${
                            h.level === "h3" ? "pl-5" : ""
                          } ${
                            activeHeading === h.id
                              ? "bg-violet/8 font-medium text-violet"
                              : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                          }`}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* reading info */}
              <div className="rounded-2xl border border-border bg-surface p-5">
                <div className="mb-3 inline-flex items-center gap-2 text-[0.82rem] font-bold text-ink">
                  <RiBookOpenLine className="text-violet" />
                  اطلاعات مقاله
                </div>
                <ul className="flex flex-col gap-2.5 text-[0.8rem] text-ink-2">
                  <li className="flex items-center justify-between">
                    <span>زمان مطالعه</span>
                    <span className="font-medium text-ink">
                      {article.readTime}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>تاریخ انتشار</span>
                    <span className="font-medium text-ink">{article.date}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>تعداد نظرات</span>
                    <span className="font-medium text-ink">
                      {comments.length}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ---------- RELATED ---------- */}
      <section className="relative z-1 border-t border-border py-16">
        <div className="mx-auto w-full max-w-250 px-6 max-[420px]:px-4.5">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(1.3rem,2.6vw,1.7rem)] font-extrabold tracking-[-0.02em] text-ink">
              مقالات مرتبط
            </h2>
            <a
              href={`/categories/${article.categorySlug}`}
              className="inline-flex items-center gap-1.5 text-[0.92rem] font-medium text-ink-2 no-underline transition-all hover:gap-2.5 hover:text-violet"
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

      {/* ---------- COMMENTS ---------- */}
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

          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="mb-12 flex items-start gap-4 max-[640px]:flex-col"
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
                className="min-h-25 w-full resize-y rounded-xl border border-border-strong bg-surface px-4 py-3.5 font-[inherit] text-[0.95rem] leading-[1.9] text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
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
