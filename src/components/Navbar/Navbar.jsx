"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  RiQuillPenFill,
  RiMenu3Line,
  RiCloseLine,
  RiUserLine,
  RiArrowLeftLine,
  RiUser3Line,
  RiLogoutBoxRLine,
  RiArrowDownSLine,
} from "react-icons/ri";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/categories", label: "دسته‌بندی‌ها" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/profile", label: "پروفایل" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) setUser(null);
          return;
        }
        const json = await res.json();
        if (!cancelled) setUser(json?.data ?? null);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUser();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [userMenuOpen]);

  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    setUser(null);
    setUserMenuOpen(false);
    router.replace("/");
    router.refresh();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="relative mx-auto flex max-w-300 items-center justify-between gap-4 px-6 py-4">
        <a
          href="/"
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
                  onClick={() => setOpen(false)}
                  className={`block rounded-[10px] px-3.5 py-3 text-[0.95rem] font-medium transition-colors hover:bg-ink/5 hover:text-ink hover:no-underline min-[861px]:py-2 min-[861px]:text-[0.92rem] ${
                    isActive(item.href)
                      ? "bg-ink/5 font-bold text-ink"
                      : "text-ink-2"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="inline-flex items-center gap-2">
          {loading ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-ink/5" />
          ) : user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pe-1.5 ps-2.5 transition-colors hover:border-border-strong"
              >
                <span className="grid h-7.5 w-7.5 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[0.75rem] font-bold text-white">
                  {user.nickname?.charAt(0) || "؟"}
                </span>
                <span className="hidden text-[0.85rem] pt-1 font-medium text-ink min-[861px]:inline">
                  {user.nickname}
                </span>
                <RiArrowDownSLine
                  className={`text-base text-ink-3 transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute inset-e-0 top-[calc(100%+8px)] z-50 w-52 overflow-hidden rounded-[14px] border border-border bg-surface p-1.5 shadow-[0_20px_50px_rgba(20,20,26,0.10),0_8px_16px_rgba(20,20,26,0.05)]"
                >
                  <div className="mb-1 border-b border-border px-3 pb-2 pt-1">
                    <p className="truncate text-[0.82rem] font-bold text-ink">
                      {user.nickname}
                    </p>
                    <p
                      dir="ltr"
                      className="truncate text-left text-[0.75rem] text-ink-3"
                    >
                      @{user.username}
                    </p>
                  </div>
                  <a
                    href="/profile"
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[0.88rem] font-medium text-ink-2 no-underline transition-colors hover:bg-ink/5 hover:text-ink hover:no-underline"
                  >
                    <RiUser3Line className="text-base" />
                    پروفایل
                  </a>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[0.88rem] font-medium text-rose transition-colors cursor-pointer hover:bg-rose-500 hover:text-white"
                  >
                    <RiLogoutBoxRLine className="text-base" />
                    خروج از حساب
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-ink px-4 py-2.5 text-[0.88rem] font-medium text-white shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] transition-all hover:-translate-y-px hover:bg-black hover:no-underline hover:shadow-[0_6px_20px_rgba(20,20,26,0.06),0_2px_6px_rgba(20,20,26,0.04)]"
            >
              <RiUserLine className="text-base" />
              <span className="hidden min-[861px]:inline">ورود / ثبت‌نام</span>
              <RiArrowLeftLine />
            </a>
          )}
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
