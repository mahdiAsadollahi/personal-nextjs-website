import {
  RiArticleLine,
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
  RiSendPlaneLine,
} from "react-icons/ri";

const avatarColors = {
  violet: "bg-[linear-gradient(135deg,#7c3aed,#a78bfa)]",
  pink: "bg-[linear-gradient(135deg,#ec4899,#be185d)]",
  cyan: "bg-[linear-gradient(135deg,#06b6d4,#0e7490)]",
  amber: "bg-[linear-gradient(135deg,#f59e0b,#d97706)]",
  emerald: "bg-[linear-gradient(135deg,#10b981,#047857)]",
};

const statusBadge = {
  published: "bg-emerald/10 text-emerald",
  draft: "bg-amber/12 text-[#b45309]",
};

const statusLabel = {
  published: "منتشرشده",
  draft: "پیش‌نویس",
};

export default function AdminArticleRow({ article }) {
  return (
    <tr className="transition-colors hover:bg-violet/2.5">
      <td className="px-4.5 py-4 align-middle">
        <div className="flex min-w-0 items-center gap-3.5">
          <span
            className={`grid h-13 w-13 shrink-0 place-items-center rounded-[14px] text-[1.1rem] text-white ${
              avatarColors[article.color] || avatarColors.violet
            }`}
          >
            <RiArticleLine />
          </span>
          <div className="min-w-0 flex-1">
            <span className="mb-0.5 block text-[0.92rem] font-bold leading-normal text-ink">
              {article.title}
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[0.76rem] text-ink-3 max-[720px]:hidden">
              <span>{article.readTime}</span>
              <span className="h-0.75 w-0.75 rounded-full bg-ink-3 opacity-60" />
              <span>{article.comments} نظر</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-4.5 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-ink/6 px-2.5 py-1 text-[0.74rem] font-bold text-ink-2">
          {article.category}
        </span>
      </td>
      <td className="px-4.5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.74rem] font-bold ${
            statusBadge[article.status]
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabel[article.status]}
        </span>
      </td>
      <td className="px-4.5 py-4 whitespace-nowrap">{article.views}</td>
      <td className="px-4.5 py-4 whitespace-nowrap">{article.date}</td>
      <td className="px-4.5 py-4">
        <div className="flex gap-1.5">
          {article.status === "draft" ? (
            <>
              <button
                type="button"
                title="انتشار"
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-emerald hover:bg-emerald/6 hover:text-emerald"
              >
                <RiSendPlaneLine />
              </button>
              <button
                type="button"
                title="ویرایش"
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
              >
                <RiEditLine />
              </button>
              <button
                type="button"
                title="حذف"
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-rose hover:bg-rose/6 hover:text-rose"
              >
                <RiDeleteBinLine />
              </button>
            </>
          ) : (
            <>
              <a
                href="#"
                title="مشاهده"
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 no-underline transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink hover:no-underline"
              >
                <RiEyeLine />
              </a>
              <button
                type="button"
                title="ویرایش"
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink"
              >
                <RiEditLine />
              </button>
              <button
                type="button"
                title="حذف"
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-base text-ink-2 transition-colors hover:border-rose hover:bg-rose/6 hover:text-rose"
              >
                <RiDeleteBinLine />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
