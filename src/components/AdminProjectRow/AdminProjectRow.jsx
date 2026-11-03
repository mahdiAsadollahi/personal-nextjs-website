import {
  RiEyeLine,
  RiEditLine,
  RiDeleteBinLine,
  RiSendPlaneLine,
  RiExternalLinkLine,
  RiGithubFill,
} from "react-icons/ri";

const statusBadge = {
  published: "bg-emerald/10 text-emerald",
  draft: "bg-amber/12 text-[#b45309]",
};

const statusLabel = {
  published: "منتشرشده",
  draft: "پیش‌نویس",
};

export default function AdminProjectRow({ project }) {
  return (
    <tr className="transition-colors hover:bg-violet/2.5">
      <td className="px-4.5 py-4 align-middle">
        <div className="flex min-w-0 items-center gap-3.5">
          <span className="h-13 w-18 shrink-0 overflow-hidden rounded-[10px] border border-border bg-surface-2">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </span>
          <div className="min-w-0 flex-1">
            <span className="mb-0.5 block text-[0.92rem] font-bold leading-normal text-ink">
              {project.title}
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[0.76rem] text-ink-3 max-[720px]:hidden">
              {project.demo && (
                <span className="inline-flex items-center gap-1">
                  <RiExternalLinkLine className="text-[0.8rem]" />
                  دمو
                </span>
              )}
              {project.github && (
                <span className="inline-flex items-center gap-1">
                  <RiGithubFill className="text-[0.8rem]" />
                  گیت‌هاب
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4.5 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-ink/6 px-2.5 py-1 text-[0.74rem] font-bold text-ink-2">
          {project.category}
        </span>
      </td>
      <td className="px-4.5 py-4">
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-violet/8 px-2 py-0.5 text-[0.7rem] font-medium text-violet"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-ink/6 px-2 py-0.5 text-[0.7rem] font-medium text-ink-3">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </td>
      <td className="px-4.5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.74rem] font-bold ${
            statusBadge[project.status]
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusLabel[project.status]}
        </span>
      </td>
      <td className="px-4.5 py-4 whitespace-nowrap">{project.year || "—"}</td>
      <td className="px-4.5 py-4">
        <div className="flex gap-1.5">
          {project.status === "draft" ? (
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
                href={`/projects`}
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
