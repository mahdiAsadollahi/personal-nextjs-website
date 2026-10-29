"use client";

import { useState } from "react";
import {
  RiQuillPenFill,
  RiMenu3Line,
  RiCloseLine,
  RiUserLine,
  RiArrowLeftLine,
} from "react-icons/ri";

const navItems = [
  { href: "#hero", label: "خانه", active: true },
  { href: "#categories", label: "دسته‌بندی‌ها" },
  { href: "#articles", label: "مقالات" },
  { href: "#about", label: "درباره" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex max-w-300 items-center justify-between gap-4 px-6 py-4 relative">
        <a
          href="#"
          className="inline-flex items-center gap-2.5 text-base font-bold tracking-tight text-ink no-underline hover:no-underline"
        >
          <span className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-[11px] bg-[conic-gradient(from_210deg_at_30%_30%,#7c3aed,#ec4899_40%,#f59e0b_70%,#06b6d4_100%)] text-base text-white shadow-[0_4px_12px_rgba(124,58,237,0.22)]">
            <RiQuillPenFill />
          </span>
          <span>مهدی اسداللهی</span>
        </a>

        <nav
          className={`absolute inset-x-4 top-[calc(100%+8px)] rounded-[20px] border border-border bg-white/95 p-2.5 shadow-[0_20px_50px_rgba(20,20,26,0.10),0_8px_16px_rgba(20,20,26,0.05)] backdrop-blur-md min-[861px]:static min-[861px]:flex min-[861px]:items-center min-[861px]:rounded-none min-[861px]:border-0 min-[861px]:bg-transparent min-[861px]:p-0 min-[861px]:shadow-none min-[861px]:backdrop-blur-none ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col items-stretch gap-0.5 min-[861px]:flex-row min-[861px]:items-center min-[861px]:gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`block rounded-[10px] px-3.5 py-3 text-[0.95rem] font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink hover:no-underline min-[861px]:py-2 min-[861px]:text-[0.92rem] ${
                    item.active ? "font-bold text-ink" : ""
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="inline-flex items-center gap-2">
          <a
            href="/register"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-ink px-4 py-2.5 text-[0.88rem] font-medium text-white shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] transition-all hover:-translate-y-px hover:bg-black hover:no-underline hover:shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)]"
          >
            <RiUserLine className="text-base" />
            <span className="hidden min-[861px]:inline">ورود / </span>
            <span className="hidden min-[861px]:inline">ثبت‌نام</span>
            <RiArrowLeftLine />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="باز و بسته کردن منو"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-border-strong bg-white/70 text-[1.15rem] text-ink min-[861px]:hidden"
        >
          {open ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>
    </header>
  );
}
