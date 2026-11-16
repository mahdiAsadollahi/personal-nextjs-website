"use client";

import { useEffect, useRef } from "react";
import Modal from "@/components/Modal/Modal";
import {
  RiCheckLine,
  RiErrorWarningLine,
  RiInformationLine,
  RiQuestionLine,
} from "react-icons/ri";

const variants = {
  success: {
    icon: RiCheckLine,
    ring: "border-emerald/30 bg-emerald/10 text-emerald",
    glow: "shadow-[0_0_0_10px_rgba(16,185,129,0.06),0_0_0_22px_rgba(16,185,129,0.035)]",
    button:
      "bg-emerald hover:bg-[#059669] shadow-[0_8px_22px_rgba(16,185,129,0.28)]",
    defaultTitle: "انجام شد!",
    defaultMessage: "عملیات با موفقیت انجام شد.",
  },
  error: {
    icon: RiErrorWarningLine,
    ring: "border-rose/30 bg-rose/10 text-rose",
    glow: "shadow-[0_0_0_10px_rgba(244,63,94,0.06),0_0_0_22px_rgba(244,63,94,0.035)]",
    button:
      "bg-rose hover:bg-[#e11d48] shadow-[0_8px_22px_rgba(244,63,94,0.28)]",
    defaultTitle: "مشکلی پیش اومد",
    defaultMessage: "لطفاً دوباره تلاش کن.",
  },
  info: {
    icon: RiInformationLine,
    ring: "border-violet/30 bg-violet/10 text-violet",
    glow: "shadow-[0_0_0_10px_rgba(124,58,237,0.06),0_0_0_22px_rgba(124,58,237,0.035)]",
    button:
      "bg-violet hover:bg-[#6d28d9] shadow-[0_8px_22px_rgba(124,58,237,0.28)]",
    defaultTitle: "اطلاع",
    defaultMessage: "",
  },
  question: {
    icon: RiQuestionLine,
    ring: "border-amber/30 bg-amber/10 text-amber",
    glow: "shadow-[0_0_0_10px_rgba(245,158,11,0.06),0_0_0_22px_rgba(245,158,11,0.035)]",
    button:
      "bg-violet hover:bg-[#6d28d9] shadow-[0_8px_22px_rgba(124,58,237,0.28)]",
    defaultTitle: "مطمئنی؟",
    defaultMessage: "این عمل قابل بازگشت نیست.",
  },
};

export default function MessageModal({
  open,
  onClose,
  type = "success",
  title,
  message,
  confirmLabel = "باشه، متوجه شدم",
  onConfirm,
  showCancel = false,
  cancelLabel = "انصراف",
}) {
  const variant = variants[type] || variants.success;
  const Icon = variant.icon;
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => confirmRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center px-1 pt-2 pb-1 text-center">
        <div
          className={`relative mb-5 grid h-20 w-20 place-items-center rounded-full border-2 ${variant.ring} ${variant.glow} animate-[pop_320ms_cubic-bezier(.34,1.56,.64,1)]`}
        >
          <Icon className="text-[2.6rem]" strokeWidth={1.6} />
        </div>

        <h3 className="mb-2 text-[1.2rem] font-extrabold tracking-[-0.01em] text-ink">
          {title || variant.defaultTitle}
        </h3>

        <p className="max-w-[34ch] text-[0.9rem] leading-[1.95] text-ink-2">
          {message || variant.defaultMessage}
        </p>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-2 min-[380px]:flex-row">
        {showCancel && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-border-strong bg-transparent px-4 py-3 text-[0.9rem] font-semibold text-ink-2 transition-all hover:bg-surface-2 hover:text-ink"
          >
            {cancelLabel}
          </button>
        )}
        <button
          ref={confirmRef}
          type="button"
          onClick={handleConfirm}
          className={`inline-flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-[0.9rem] font-semibold text-black transition-all hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet/20 ${variant.button}`}
        >
          {confirmLabel}
        </button>
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          60% {
            opacity: 1;
            transform: scale(1.06);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Modal>
  );
}
