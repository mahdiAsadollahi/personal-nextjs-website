"use client";

import { useState } from "react";
import AdminCommentItem from "@/components/AdminCommentItem/AdminCommentItem";
import { RiChat3Line, RiCheckDoubleLine, RiInboxLine } from "react-icons/ri";

const filters = [
  { id: "pending", label: "در انتظار تایید" },
  { id: "approved", label: "تاییدشده" },
  { id: "rejected", label: "رد‌شده" },
  { id: "all", label: "همه" },
];

export default function AdminCommentsList({ comments }) {
  const [filter, setFilter] = useState("pending");

  const filtered = comments.filter(
    (c) => filter === "all" || c.status === filter
  );

  const pendingCount = comments.filter((c) => c.status === "pending").length;

  return (
    <div className="overflow-hidden rounded-[20px] border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 pb-4 pt-5">
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold tracking-[-0.01em] text-ink">
            <RiChat3Line className="text-[1.1rem] text-violet" />
            مدیریت نظرات
          </h2>
          <p className="mt-0.5 text-[0.8rem] text-ink-3">
            {pendingCount} نظر در انتظار تایید
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={pendingCount === 0}
            className="inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-border-strong bg-transparent px-3.5 py-2 text-[0.8rem] font-medium text-ink transition-all hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RiCheckDoubleLine className="text-base" />
            تایید همه
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-surface-2/50 px-5 py-3.5">
        <div className="inline-flex flex-wrap gap-1 rounded-[10px] border border-border bg-surface p-0.75">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-[7px] border-0 px-3 py-1.5 text-[0.78rem] font-medium whitespace-nowrap transition-colors ${
                filter === f.id
                  ? "bg-ink text-white"
                  : "bg-transparent text-ink-2 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-5 py-16 text-center text-ink-3">
          <RiInboxLine className="text-[2.5rem] opacity-50" />
          <p className="text-base font-bold text-ink-2">نظری نیست</p>
          <p className="max-w-80 text-[0.85rem] leading-[1.9]">
            با این فیلتر، نظری پیدا نشد. یه فیلتر دیگه امتحان کن.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {filtered.map((comment) => (
            <AdminCommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-4">
        <span className="text-[0.8rem] text-ink-3">
          نمایش {filtered.length} از {comments.length} نظر
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            disabled
            className="inline-grid h-8.5 min-w-8.5 place-items-center rounded-lg border border-border bg-surface px-2.5 text-[0.82rem] font-medium text-ink-2 opacity-40"
          >
            <i className="ri-arrow-right-s-line" />
          </button>
          <button
            type="button"
            className="inline-grid h-8.5 min-w-8.5 place-items-center rounded-lg border border-ink bg-ink px-2.5 text-[0.82rem] font-medium text-white"
          >
            ۱
          </button>
          <button
            type="button"
            className="inline-grid h-8.5 min-w-8.5 place-items-center rounded-lg border border-border bg-surface px-2.5 text-[0.82rem] font-medium text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
          >
            ۲
          </button>
          <button
            type="button"
            className="inline-grid h-8.5 min-w-8.5 place-items-center rounded-lg border border-border bg-surface px-2.5 text-[0.82rem] font-medium text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
          >
            ۳
          </button>
          <button
            type="button"
            className="inline-grid h-8.5 min-w-8.5 place-items-center rounded-lg border border-border bg-surface px-2.5 text-[0.82rem] font-medium text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
          >
            <i className="ri-arrow-left-s-line" />
          </button>
        </div>
      </div>
    </div>
  );
}
