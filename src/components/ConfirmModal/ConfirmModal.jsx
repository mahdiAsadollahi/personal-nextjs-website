"use client";

import Modal from "@/components/Modal/Modal";
import { RiAlertLine } from "react-icons/ri";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "مطمئنی؟",
  message = "این عمل قابل بازگشت نیست.",
  confirmLabel = "تایید",
  cancelLabel = "انصراف",
  danger = true,
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <span
          className={`grid h-14 w-14 place-items-center rounded-full text-[1.5rem] ${
            danger ? "bg-rose/10 text-rose" : "bg-violet/10 text-violet"
          }`}
        >
          <RiAlertLine />
        </span>
        <div>
          <h3 className="mb-1.5 text-[1.05rem] font-extrabold text-ink">
            {title}
          </h3>
          <p className="text-[0.9rem] leading-[1.9] text-ink-2">{message}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex flex-1 items-center justify-center rounded-[10px] border border-border-strong bg-transparent px-4 py-2.75 text-[0.9rem] font-medium text-ink transition-all hover:bg-surface-2"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
          className={`inline-flex flex-1 items-center justify-center rounded-[10px] px-4 py-2.75 text-[0.9rem] font-medium text-white shadow-sm transition-all hover:-translate-y-px ${
            danger
              ? "bg-rose hover:bg-[#dc2626]"
              : "bg-violet hover:bg-[#6d28d9]"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
