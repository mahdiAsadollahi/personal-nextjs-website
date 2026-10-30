"use client";

import {
  RiMenu3Line,
  RiSearchLine,
  RiNotification3Line,
  RiArrowDownSLine,
} from "react-icons/ri";

export default function AdminTopbar({ title, subtitle, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between gap-4 border-b border-border bg-bg/85 px-8 backdrop-blur-md max-[720px]:px-4">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="منو"
          className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-border-strong bg-surface text-[1.15rem] text-ink min-[1025px]:hidden"
        >
          <RiMenu3Line />
        </button>
        <div className="min-w-0">
          <div className="truncate text-[1.1rem] font-extrabold tracking-[-0.01em] text-ink">
            {title}
          </div>
          <div className="-mt-0.5 truncate text-[0.78rem] text-ink-3">
            {subtitle}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex items-center max-[720px]:hidden">
          <RiSearchLine className="pointer-events-none absolute inset-e-3 text-base text-ink-3" />
          <input
            type="search"
            placeholder="جستجو..."
            aria-label="جستجو"
            className="w-55 rounded-[10px] border border-border bg-surface py-2.25 pe-10 ps-3.5 font-[inherit] text-[0.88rem] text-ink transition-all placeholder:text-ink-3 focus:w-65 focus:border-violet focus:shadow-[0_0_0_3px_rgba(124,58,237,0.10)] focus:outline-none min-[1025px]:max-[1024px]:w-45 min-[1025px]:max-[1024px]:focus:w-55"
          />
        </div>

        <button
          type="button"
          aria-label="اعلان‌ها"
          className="relative inline-grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.15rem] text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
        >
          <RiNotification3Line />
          <span className="absolute inset-e-2 top-2 h-2 w-2 rounded-full bg-pink shadow-[0_0_0_2px_#fff]" />
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface py-1.5 pe-1.5 ps-2.5 transition-colors hover:border-border-strong"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[0.78rem] font-bold text-white">
            م
          </span>
          <span className="flex flex-col text-right leading-tight max-[720px]:hidden">
            <strong className="text-[0.82rem] font-bold text-ink">
              مهدی اسداللهی
            </strong>
            <span className="text-[0.68rem] text-ink-3">مدیر سایت</span>
          </span>
          <RiArrowDownSLine className="text-base text-ink-3" />
        </button>
      </div>
    </header>
  );
}
