"use client";

import { useState } from "react";
import Link from "next/link";
import AdminArticleRow from "@/components/AdminArticleRow/AdminArticleRow";
import {
  RiSearchLine,
  RiFilter3Line,
  RiAddLine,
  RiArticleLine,
  RiArrowRightSLine,
  RiArrowLeftSLine,
} from "react-icons/ri";

const filters = [
  { id: "all", label: "همه" },
  { id: "published", label: "منتشرشده" },
  { id: "draft", label: "پیش‌نویس" },
];

export default function AdminArticlesTable({ articles }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = articles.filter((a) => {
    const matchesQuery =
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "all" || a.status === filter;
    return matchesQuery && matchesFilter;
  });

  const published = articles.filter((a) => a.status === "published").length;
  const drafts = articles.length - published;

  return (
    <div className="overflow-hidden rounded-[20px] border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 pb-4 pt-5">
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold tracking-[-0.01em] text-ink">
            <RiArticleLine className="text-[1.1rem] text-violet" />
            مدیریت مقالات
          </h2>
          <p className="mt-0.5 text-[0.8rem] text-ink-3">
            {articles.length} مقاله — {published} منتشرشده، {drafts} پیش‌نویس
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-border-strong bg-transparent px-3.5 py-2 text-[0.8rem] font-medium text-ink transition-all hover:bg-surface-2"
          >
            <RiFilter3Line className="text-base" />
            فیلتر پیشرفته
          </button>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-violet px-3.5 py-2 text-[0.8rem] font-medium text-white no-underline shadow-[0_4px_14px_rgba(124,58,237,0.22)] transition-all hover:-translate-y-px hover:bg-[#6d28d9] hover:no-underline hover:shadow-[0_8px_20px_rgba(124,58,237,0.28)]"
          >
            <RiAddLine className="text-base" />
            مقالهٔ جدید
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-surface-2/50 px-5 py-3.5">
        <div className="relative min-w-50 max-w-80 flex-1">
          <RiSearchLine className="pointer-events-none absolute inset-e-3 top-1/2 -translate-y-1/2 text-[0.95rem] text-ink-3" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در مقالات..."
            className="w-full rounded-[10px] border border-border bg-surface py-2.25 pe-10 ps-3.5 font-[inherit] text-[0.86rem] text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-violet focus:shadow-[0_0_0_3px_rgba(124,58,237,0.10)] focus:outline-none"
          />
        </div>
        <div className="inline-flex gap-1 rounded-[10px] border border-border bg-surface p-0.75">
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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[0.9rem]">
          <thead className="bg-surface-2">
            <tr>
              <th className="whitespace-nowrap border-b border-border px-4.5 py-3.5 text-right text-[0.78rem] font-bold tracking-[0.02em] text-ink-2">
                مقاله
              </th>
              <th className="whitespace-nowrap border-b border-border px-4.5 py-3.5 text-right text-[0.78rem] font-bold tracking-[0.02em] text-ink-2">
                دسته
              </th>
              <th className="whitespace-nowrap border-b border-border px-4.5 py-3.5 text-right text-[0.78rem] font-bold tracking-[0.02em] text-ink-2">
                وضعیت
              </th>
              <th className="whitespace-nowrap border-b border-border px-4.5 py-3.5 text-right text-[0.78rem] font-bold tracking-[0.02em] text-ink-2">
                بازدید
              </th>
              <th className="whitespace-nowrap border-b border-border px-4.5 py-3.5 text-right text-[0.78rem] font-bold tracking-[0.02em] text-ink-2">
                تاریخ
              </th>
              <th className="w-35 whitespace-nowrap border-b border-border px-4.5 py-3.5 text-right text-[0.78rem] font-bold tracking-[0.02em] text-ink-2">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="[&>tr:last-child>td]:border-b-0">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-ink-3">
                    <RiSearchLine className="text-[2.5rem] opacity-50" />
                    <p className="text-base font-bold text-ink-2">
                      مقاله‌ای پیدا نشد
                    </p>
                    <p className="max-w-80 text-[0.85rem] leading-[1.9]">
                      با این جستجو یا فیلتر، مقاله‌ای پیدا نشد. یه عبارت دیگه
                      امتحان کن.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((article) => (
                <AdminArticleRow key={article.id} article={article} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-4">
        <span className="text-[0.8rem] text-ink-3">
          نمایش ۱ تا {filtered.length} از {articles.length} مقاله
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            disabled
            className="inline-grid h-8.5 min-w-8.5 place-items-center rounded-lg border border-border bg-surface px-2.5 text-[0.82rem] font-medium text-ink-2 opacity-40"
          >
            <RiArrowRightSLine />
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
            <RiArrowLeftSLine />
          </button>
        </div>
      </div>
    </div>
  );
}
