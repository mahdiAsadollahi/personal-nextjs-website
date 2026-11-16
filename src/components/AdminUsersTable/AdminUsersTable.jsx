"use client";

import { useEffect, useState } from "react";
import {
  RiSearchLine,
  RiUserLine,
  RiShieldLine,
  RiRefreshLine,
} from "react-icons/ri";

const roleLabels = {
  ADMIN: { label: "مدیر", cls: "bg-violet/10 text-violet" },
  USER: { label: "کاربر", cls: "bg-ink/5 text-ink-2" },
};

export default function AdminUsersTable() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async (params = {}) => {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams({
        page: String(params.page ?? pagination.page),
        limit: String(pagination.limit),
        ...(params.search !== undefined
          ? { search: params.search }
          : search
          ? { search }
          : {}),
        ...(params.role !== undefined
          ? { role: params.role }
          : role
          ? { role }
          : {}),
      });

      const res = await fetch(`/api/users?${qs.toString()}`, {
        cache: "no-store",
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.message || "خطا در دریافت کاربران");
        setUsers([]);
        return;
      }

      setUsers(json.data || []);
      setPagination(json.pagination || pagination);
    } catch {
      setError("اتصال به سرور برقرار نشد.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers({ page: 1, search });
  };

  const handleReset = () => {
    setSearch("");
    setRole("");
    fetchUsers({ page: 1, search: "", role: "" });
  };

  const goToPage = (p) => {
    if (p < 1 || p > pagination.totalPages || p === pagination.page) return;
    fetchUsers({ page: p });
  };

  const formatDate = (d) => {
    if (!d) return "—";
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(d));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[1.3rem] font-extrabold text-ink">کاربران</h1>
          <p className="mt-1 text-[0.85rem] text-ink-2">
            {pagination.total} کاربر ثبت‌نام شده
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <RiSearchLine className="pointer-events-none absolute inset-e-3 text-ink-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی نام یا نام کاربری..."
              className="w-64 rounded-[10px] border border-border-strong bg-surface py-2.5 pe-9 ps-4 text-[0.85rem] text-ink placeholder:text-ink-3 focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
            />
          </form>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="cursor-pointer rounded-[10px] border border-border-strong bg-surface px-4 py-2.5 text-[0.85rem] text-ink focus:border-violet focus:outline-none"
          >
            <option value="">همهٔ نقش‌ها</option>
            <option value="ADMIN">مدیر</option>
            <option value="USER">کاربر</option>
          </select>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-border-strong bg-transparent px-3.5 py-2.5 text-[0.85rem] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <RiRefreshLine />
            بازنشانی
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose/30 bg-rose/5 px-4 py-3 text-[0.85rem] text-rose">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-right">
            <thead>
              <tr className="border-b border-border bg-surface-2/50 text-[0.78rem] uppercase tracking-wider text-ink-3">
                <th className="px-5 py-3.5 font-semibold">کاربر</th>
                <th className="px-5 py-3.5 font-semibold">نام کاربری</th>
                <th className="px-5 py-3.5 font-semibold">نقش</th>
                <th className="px-5 py-3.5 font-semibold">تاریخ عضویت</th>
                <th className="px-5 py-3.5 font-semibold">آخرین ورود</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {Array.from({ length: 5 }).map((__, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 w-24 animate-pulse rounded bg-ink/5" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-[0.9rem] text-ink-3"
                  >
                    کاربری پیدا نشد.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const roleInfo = roleLabels[u.role] || roleLabels.USER;
                  return (
                    <tr
                      key={u._id}
                      className="border-b border-border transition-colors last:border-0 hover:bg-surface-2/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[0.8rem] font-bold text-white">
                            {u.nickname?.charAt(0) || "؟"}
                          </span>
                          <span className="text-[0.9rem] font-medium text-ink">
                            {u.nickname}
                          </span>
                        </div>
                      </td>
                      <td
                        dir="ltr"
                        className="px-5 py-4 text-left text-[0.88rem] text-ink-2"
                      >
                        @{u.username}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${roleInfo.cls}`}
                        >
                          {u.role === "ADMIN" ? (
                            <RiShieldLine />
                          ) : (
                            <RiUserLine />
                          )}
                          {roleInfo.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[0.85rem] text-ink-2">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-[0.85rem] text-ink-2">
                        {u.updatedAt ? formatDate(u.updatedAt) : "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-2/30 px-5 py-3">
            <span className="text-[0.8rem] text-ink-3">
              صفحهٔ {pagination.page} از {pagination.totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => goToPage(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="rounded-lg border border-border-strong bg-transparent px-3 py-1.5 text-[0.82rem] text-ink-2 transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                قبلی
              </button>
              <button
                type="button"
                onClick={() => goToPage(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="rounded-lg border border-border-strong bg-transparent px-3 py-1.5 text-[0.82rem] text-ink-2 transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
