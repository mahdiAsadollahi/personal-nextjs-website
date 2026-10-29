import { RiArrowLeftLine, RiImage2Line } from "react-icons/ri";

export default function ArticleCard({
  href = "#",
  tag,
  date,
  readTime,
  title,
  excerpt,
  author = "مهدی اسداللهی",
  authorInitial = "م",
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_18px_36px_rgba(20,20,26,0.07)]">
      <div className="relative grid aspect-16/10 place-items-center overflow-hidden border-b border-border bg-[linear-gradient(135deg,var(--surface-2),#ece9e3)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,26,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,26,0.035)_1px,transparent_1px)] bg-size-[26px_26px]" />
        <span className="absolute top-3 right-3 z-2 rounded-full border border-border bg-white/94 px-2.75 py-1.25 text-[0.72rem] font-bold text-ink-2 backdrop-blur-sm">
          {tag}
        </span>
        <div className="relative z-1 flex flex-col items-center gap-2 text-ink-3">
          <RiImage2Line className="text-[1.9rem] opacity-70" />
          <span className="text-[0.76rem] tracking-[0.02em]">تصویر مقاله</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3 text-[0.78rem] text-ink-3">
          <span>{date}</span>
          <span className="h-1 w-1 rounded-full bg-ink-3 opacity-60" />
          <span>{readTime}</span>
        </div>

        <h3 className="text-[1.05rem] font-bold leading-[1.55] tracking-[-0.01em] text-ink">
          {title}
        </h3>

        <p className="text-[0.9rem] leading-[1.9] text-ink-2">{excerpt}</p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="inline-flex items-center gap-2 text-[0.82rem] text-ink-2">
            <span className="grid h-6.5 w-6.5 place-items-center rounded-full bg-[linear-gradient(135deg,#7c3aed,#ec4899)] text-[0.7rem] font-bold text-white">
              {authorInitial}
            </span>
            {author}
          </span>
          <a
            href={href}
            className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-ink-2 no-underline transition-all group-hover:gap-2 group-hover:text-violet hover:no-underline"
          >
            ادامه
            <RiArrowLeftLine />
          </a>
        </div>
      </div>
    </article>
  );
}
