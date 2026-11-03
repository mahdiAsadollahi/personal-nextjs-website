"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { RiCloseLine } from "react-icons/ri";

const sizes = {
  sm: "max-w-100", // 400px
  md: "max-w-130", // 520px
  lg: "max-w-170", // 680px
  xl: "max-w-220", // 880px
};

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
}) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = panel.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelector(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      clearTimeout(t);
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        onClick={() => closeOnBackdrop && onClose?.()}
        className="absolute inset-0 bg-ink/40 backdrop-blur-md animate-[modal-fade_180ms_ease-out]"
      />

      <div
        ref={panelRef}
        className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_30px_80px_rgba(20,20,26,0.25),0_10px_30px_rgba(20,20,26,0.10)] animate-[modal-pop_220ms_cubic-bezier(.2,.7,.3,1)]`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 pb-4 pt-5">
          <div className="min-w-0 flex-1">
            {title && (
              <h2 className="text-[1.05rem] font-extrabold tracking-[-0.01em] text-ink">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-1 text-[0.85rem] leading-[1.85] text-ink-2">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="-me-1.5 inline-grid h-8.5 w-8.5 shrink-0 place-items-center rounded-[10px] border-0 bg-transparent text-[1.1rem] text-ink-3 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <RiCloseLine />
          </button>
        </div>

        <div className="max-h-[calc(90vh-180px)] overflow-y-auto px-6 py-5">
          {children}
        </div>

        {footer && (
          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border bg-surface-2/40 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
