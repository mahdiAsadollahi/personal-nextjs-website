import { RiExternalLinkLine, RiGithubFill } from "react-icons/ri";

export default function ProjectCard({ project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_18px_36px_rgba(20,20,26,0.07)]">
      <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-surface-2">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute top-3 right-3 z-2 rounded-full border border-border bg-white/94 px-2.75 py-1.25 text-[0.72rem] font-bold text-ink-2 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-[1.05rem] font-bold leading-[1.55] tracking-[-0.01em] text-ink">
          {project.title}
        </h3>

        <p className="text-[0.9rem] leading-[1.9] text-ink-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-violet/8 px-2.5 py-1 text-[0.72rem] font-medium text-violet"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.75 text-[0.8rem] font-medium text-white no-underline transition-colors hover:bg-black hover:no-underline"
              >
                <RiExternalLinkLine className="text-[0.9rem]" />
                مشاهده
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="گیت‌هاب"
                className="inline-grid h-8.5 w-8.5 place-items-center rounded-lg border border-border bg-surface text-[1rem] text-ink-2 no-underline transition-colors hover:border-border-strong hover:bg-surface-2 hover:text-ink hover:no-underline"
              >
                <RiGithubFill />
              </a>
            )}
          </div>
          {project.year && (
            <span className="text-[0.76rem] text-ink-3">{project.year}</span>
          )}
        </div>
      </div>
    </article>
  );
}
