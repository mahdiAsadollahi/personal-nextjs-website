"use client";

import {
  RiQuillPenFill,
  RiDashboardLine,
  RiGroupLine,
  RiArticleLine,
  RiChat3Line,
  RiExternalLinkLine,
  RiSettings3Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const mainItems = [
  { key: "dashboard", label: "داشبورد", icon: RiDashboardLine },
];

const managementItems = [
  { key: "users", label: "کاربران", icon: RiGroupLine, badge: "۲۴۸" },
  { key: "articles", label: "مقالات", icon: RiArticleLine, badge: "۲۴" },
  { key: "comments", label: "نظرات", icon: RiChat3Line, badge: "۱۲" },
];

export default function AdminSidebar({ active, onSelect, open, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-35 bg-ink/40 backdrop-blur-sm transition-opacity duration-250 min-[1025px]:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-e-0 top-0 bottom-0 z-40 flex w-65 flex-col gap-8 overflow-y-auto border-s border-border bg-surface p-4 transition-transform duration-250 min-[1025px]:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full min-[1025px]:translate-x-0"
        }`}
      >
        <a
          href="/"
          className="inline-flex items-center gap-2.5 rounded-[10px] p-1.5 text-base font-bold tracking-[-0.01em] text-ink no-underline transition-colors hover:bg-ink/4 hover:no-underline"
        >
          <span className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-[conic-gradient(from_210deg_at_30%_30%,#7c3aed,#ec4899_40%,#f59e0b_70%,#06b6d4_100%)] text-[1.05rem] text-white shadow-[0_4px_12px_rgba(124,58,237,0.22)]">
            <RiQuillPenFill />
          </span>
          <span className="flex flex-col leading-tight">
            <strong className="text-[0.95rem] font-bold text-ink">
              مهدی اسداللهی
            </strong>
            <span className="text-[0.72rem] text-ink-3">پنل مدیریت</span>
          </span>
        </a>

        <nav className="flex flex-col gap-1">
          {mainItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={active}
              onSelect={onSelect}
            />
          ))}

          <div className="px-3 pb-2 pt-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-3">
            مدیریت
          </div>

          {managementItems.map((item) => (
            <NavButton
              key={item.key}
              item={item}
              active={active}
              onSelect={onSelect}
            />
          ))}

          <div className="px-3 pb-2 pt-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-3">
            سایر
          </div>

          <a
            href="/"
            className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[0.92rem] font-medium text-ink-2 no-underline transition-colors hover:bg-ink/4 hover:text-ink hover:no-underline"
          >
            <RiExternalLinkLine className="text-[1.15rem]" />
            <span>مشاهدهٔ سایت</span>
          </a>
          <a
            href="#"
            className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[0.92rem] font-medium text-ink-2 no-underline transition-colors hover:bg-ink/4 hover:text-ink hover:no-underline"
          >
            <RiSettings3Line className="text-[1.15rem]" />
            <span>تنظیمات</span>
          </a>
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-border pt-6">
          <a
            href="#"
            className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[0.92rem] font-medium text-ink-2 no-underline transition-colors hover:bg-ink/4 hover:text-ink hover:no-underline"
          >
            <RiLogoutBoxRLine className="text-[1.15rem]" />
            <span>خروج از حساب</span>
          </a>
        </div>
      </aside>
    </>
  );
}

function NavButton({ item, active, onSelect }) {
  const Icon = item.icon;
  const isActive = active === item.key;

  return (
    <button
      type="button"
      onClick={() => onSelect(item.key)}
      className={`relative flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-right text-[0.92rem] font-medium transition-colors ${
        isActive
          ? "bg-violet/9 font-bold text-violet"
          : "bg-transparent text-ink-2 hover:bg-ink/4 hover:text-ink"
      }`}
    >
      {isActive && (
        <span className="absolute -inset-e-4 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-sm bg-violet" />
      )}
      <Icon className="text-[1.15rem]" />
      <span>{item.label}</span>
      {item.badge && (
        <span
          className={`ms-auto inline-grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[0.68rem] font-bold ${
            isActive ? "bg-violet text-white" : "bg-violet/14 text-violet"
          }`}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}
