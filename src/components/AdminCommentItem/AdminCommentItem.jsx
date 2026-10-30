import {
  RiArticleLine,
  RiCheckLine,
  RiCloseLine,
  RiReplyLine,
  RiDeleteBinLine,
} from "react-icons/ri";

const avatarColors = {
  violet: "bg-[linear-gradient(135deg,#7c3aed,#a78bfa)]",
  pink: "bg-[linear-gradient(135deg,#ec4899,#be185d)]",
  cyan: "bg-[linear-gradient(135deg,#06b6d4,#0e7490)]",
  amber: "bg-[linear-gradient(135deg,#f59e0b,#d97706)]",
  emerald: "bg-[linear-gradient(135deg,#10b981,#047857)]",
};

const statusBadge = {
  pending: "bg-amber/12 text-[#b45309]",
  approved: "bg-emerald/10 text-emerald",
  rejected: "bg-rose/10 text-[#b91c1c]",
};

const statusLabel = {
  pending: "در انتظار",
  approved: "تاییدشده",
  rejected: "رد‌شده",
};

export default function AdminCommentItem({ comment }) {
  const isPending = comment.status === "pending";

  return (
    <article className="flex items-start gap-4 border-b border-border p-5 transition-colors last:border-b-0 hover:bg-violet/2 max-[480px]:p-4">
      <span
        className={`grid h-10.5 w-10.5 shrink-0 place-items-center rounded-full text-[0.82rem] font-bold text-white max-[480px]:h-9 max-[480px]:w-9 max-[480px]:text-[0.76rem] ${
          avatarColors[comment.color] || avatarColors.violet
        }`}
      >
        {comment.initial}
      </span>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
          <span className="text-[0.9rem] font-bold text-ink">
            {comment.author}
          </span>
          <span className="text-[0.74rem] text-ink-3">{comment.time}</span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.74rem] font-bold ${
              statusBadge[comment.status]
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {statusLabel[comment.status]}
          </span>
        </div>

        <p className="mb-3 text-[0.92rem] leading-[1.95] text-ink-2">
          {comment.text}
        </p>

        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-0.75 text-[0.76rem] text-ink-3">
          <RiArticleLine className="text-[0.85rem]" />
          {comment.articleTitle}
        </span>

        <div className="flex flex-wrap gap-2">
          {isPending && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-[10px] bg-violet px-3.5 py-2 text-[0.8rem] font-medium text-white shadow-[0_4px_14px_rgba(124,58,237,0.22)] transition-all hover:-translate-y-px hover:bg-[#6d28d9] hover:shadow-[0_8px_20px_rgba(124,58,237,0.28)]"
              >
                <RiCheckLine className="text-base" />
                تایید
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-border-strong bg-transparent px-3.5 py-2 text-[0.8rem] font-medium text-ink transition-all hover:bg-surface-2"
              >
                <RiCloseLine className="text-base" />
                رد
              </button>
            </>
          )}
          <button
            type="button"
            title="پاسخ"
            className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
          >
            <RiReplyLine />
          </button>
          <button
            type="button"
            title="حذف"
            className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-rose hover:bg-rose/6 hover:text-rose"
          >
            <RiDeleteBinLine />
          </button>
        </div>
      </div>
    </article>
  );
}
