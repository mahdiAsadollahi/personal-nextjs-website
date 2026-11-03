"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import {
  RiUserLine,
  RiAtLine,
  RiShieldLine,
  RiToggleLine,
} from "react-icons/ri";

const roles = [
  { value: "admin", label: "مدیر" },
  { value: "writer", label: "نویسنده" },
  { value: "user", label: "کاربر" },
];

const statuses = [
  { value: "active", label: "فعال" },
  { value: "pending", label: "در انتظار تایید" },
  { value: "blocked", label: "مسدود" },
];

export default function EditUserModal({ open, onClose, user, onSave }) {
  const [form, setForm] = useState({
    nickname: "",
    username: "",
    role: "user",
    status: "active",
  });

  useEffect(() => {
    if (user) {
      setForm({
        nickname: user.name || "",
        username: user.username || "",
        role: user.role || "user",
        status: user.status || "active",
      });
    }
  }, [user]);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({ ...user, ...form });
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="ویرایش کاربر"
      subtitle="اطلاعات کاربر رو ویرایش کن."
      size="md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-[10px] border border-border-strong bg-transparent px-4 py-2.5 text-[0.88rem] font-medium text-ink transition-colors hover:bg-surface-2"
          >
            انصراف
          </button>
          <button
            type="submit"
            form="edit-user-form"
            className="inline-flex items-center justify-center rounded-[10px] bg-violet px-5 py-2.5 text-[0.88rem] font-medium text-white shadow-[0_4px_14px_rgba(124,58,237,0.22)] transition-all hover:-translate-y-px hover:bg-[#6d28d9] hover:shadow-[0_8px_20px_rgba(124,58,237,0.28)]"
          >
            ذخیره
          </button>
        </>
      }
    >
      <form
        id="edit-user-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.75">
          <label className="flex items-center gap-1.5 ps-0.5 text-[0.82rem] font-medium text-ink-2">
            <RiUserLine className="text-[0.9rem] text-violet" />
            نام نمایشی
          </label>
          <input
            type="text"
            value={form.nickname}
            onChange={handleChange("nickname")}
            required
            className="w-full rounded-[10px] border border-border-strong bg-surface px-4 py-2.75 text-[0.92rem] text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.75">
          <label className="flex items-center gap-1.5 ps-0.5 text-[0.82rem] font-medium text-ink-2">
            <RiAtLine className="text-[0.9rem] text-violet" />
            نام کاربری
          </label>
          <input
            type="text"
            value={form.username}
            onChange={handleChange("username")}
            required
            dir="ltr"
            className="w-full rounded-[10px] border border-border-strong bg-surface px-4 py-2.75 text-left font-[inherit] text-[0.92rem] text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          <div className="flex flex-col gap-1.75">
            <label className="flex items-center gap-1.5 ps-0.5 text-[0.82rem] font-medium text-ink-2">
              <RiShieldLine className="text-[0.9rem] text-violet" />
              نقش
            </label>
            <select
              value={form.role}
              onChange={handleChange("role")}
              className="w-full cursor-pointer rounded-[10px] border border-border-strong bg-surface px-4 py-2.75 font-[inherit] text-[0.92rem] text-ink transition-[border-color,box-shadow] focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.75">
            <label className="flex items-center gap-1.5 ps-0.5 text-[0.82rem] font-medium text-ink-2">
              <RiToggleLine className="text-[0.9rem] text-violet" />
              وضعیت
            </label>
            <select
              value={form.status}
              onChange={handleChange("status")}
              className="w-full cursor-pointer rounded-[10px] border border-border-strong bg-surface px-4 py-2.75 font-[inherit] text-[0.92rem] text-ink transition-[border-color,box-shadow] focus:border-violet focus:shadow-[0_0_0_4px_rgba(124,58,237,0.10)] focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}
