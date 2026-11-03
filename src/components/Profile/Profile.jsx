"use client";

import Link from "next/link";
import {
  RiUserLine,
  RiAtLine,
  RiCalendarLine,
  RiChat3Line,
  RiLogoutBoxRLine,
  RiArticleLine,
  RiArrowLeftLine,
} from "react-icons/ri";

export default function Profile({ user, comments }) {
  return (
    <section className="relative z-1 pt-37.5 pb-16">
      <div className="mx-auto w-full max-w-200 px-6 max-[420px]:px-4.5">
        <div className="mb-10 overflow-hidden rounded-[20px] border border-border bg-surface">
          <div className="flex flex-col items-center gap-5 p-8 text-center min-[640px]:flex-row min-[640px]:items-start min-[640px]:text-right">
            <span className="grid h-18 w-18 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[1.8rem] font-extrabold text-white shadow-[0_8px_24px_rgba(124,58,237,0.22)]">
              {user.nickname.charAt(0)}
            </span>
            <div className="flex-1">
              <h1 className="text-[1.4rem] font-extrabold tracking-[-0.01em] text-ink">
                {user.nickname}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[0.85rem] text-ink-3 min-[640px]:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <RiAtLine className="text-[0.95rem]" />
                  {user.username}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <RiCalendarLine className="text-[0.95rem]" />
                  عضو از {user.createdAt}
                </span>
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-border-strong bg-transparent px-4 py-2.5 text-[0.85rem] font-medium text-ink no-underline transition-all hover:-translate-y-px hover:border-rose hover:bg-rose/6 hover:text-rose hover:no-underline"
            >
              <RiLogoutBoxRLine className="text-base" />
              خروج
            </Link>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-[1.05rem] font-bold tracking-[-0.01em] text-ink">
            <RiChat3Line className="text-[1.1rem] text-violet" />
            نظرات من
          </h2>
          <span className="text-[0.82rem] text-ink-3">
            {comments.length} نظر
          </span>
        </div>

        {comments.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-[20px] border border-border bg-surface px-5 py-16 text-center text-ink-3">
            <RiChat3Line className="text-[2.5rem] opacity-50" />
            <p className="text-base font-bold text-ink-2">هنوز نظری نداری</p>
            <p className="max-w-80 text-[0.85rem] leading-[1.9]">
              وقتی روی مقاله‌ها نظر بدی، اینجا نشون داده می‌شه.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
              >
                <Link
                  href={comment.articleHref}
                  className="mb-2 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-violet no-underline hover:underline hover:underline-offset-[3px]"
                >
                  <RiArticleLine className="text-[0.9rem]" />
                  {comment.articleTitle}
                </Link>
                <p className="mb-2.5 text-[0.92rem] leading-[1.95] text-ink-2">
                  {comment.text}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[0.76rem] text-ink-3">
                  <span>{comment.time}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-2.5 py-0.5">
                    {comment.status === "approved" && "تاییدشده"}
                    {comment.status === "pending" && "در انتظار تایید"}
                    {comment.status === "rejected" && "رد‌شده"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-ink-2 no-underline transition-all hover:gap-2.5 hover:text-violet hover:no-underline"
          >
            <RiArrowLeftLine className="rotate-180 text-[0.9rem]" />
            <span>بازگشت به مقالات</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
