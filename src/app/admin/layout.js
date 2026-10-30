"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import AdminTopbar from "@/components/AdminTopbar/AdminTopbar";
import { usePathname } from "next/navigation";

const titles = {
  dashboard: { title: "داشبورد", subtitle: "نگاهی کلی به وضعیت سایت" },
  users: { title: "کاربران", subtitle: "مدیریت کاربران ثبت‌نام‌شده" },
  articles: { title: "مقالات", subtitle: "مدیریت مقالات و پیش‌نویس‌ها" },
  comments: { title: "نظرات", subtitle: "بررسی و تایید نظرات کاربران" },
};

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const segment = pathname?.split("/").filter(Boolean)[1] || "dashboard";
  const meta = titles[segment] || titles.dashboard;

  const handleSelect = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar
        active={segment}
        onSelect={handleSelect}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 min-w-0 min-[1025px]:me-65">
        <AdminTopbar
          title={meta.title}
          subtitle={meta.subtitle}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <div className="relative p-8 max-[720px]:p-4">{children}</div>
      </div>
    </div>
  );
}
