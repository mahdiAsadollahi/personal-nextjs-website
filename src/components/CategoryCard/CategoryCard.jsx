import {
  RiArticleLine,
  RiEarthLine,
  RiCpuLine,
  RiShape2Line,
  RiPaletteLine,
  RiCodeSSlashLine,
  RiQuillPenLine,
} from "react-icons/ri";

const iconMap = {
  earth: RiEarthLine,
  cpu: RiCpuLine,
  shape: RiShape2Line,
  palette: RiPaletteLine,
  code: RiCodeSSlashLine,
  quill: RiQuillPenLine,
};

const colorMap = {
  violet: {
    accent: "#7c3aed",
    iconBg: "bg-[linear-gradient(135deg,#7c3aed,#a78bfa)]",
  },
  pink: {
    accent: "#ec4899",
    iconBg: "bg-[linear-gradient(135deg,#ec4899,#be185d)]",
  },
  cyan: {
    accent: "#06b6d4",
    iconBg: "bg-[linear-gradient(135deg,#06b6d4,#0e7490)]",
  },
  amber: {
    accent: "#f59e0b",
    iconBg: "bg-[linear-gradient(135deg,#f59e0b,#d97706)]",
  },
  emerald: {
    accent: "#10b981",
    iconBg: "bg-[linear-gradient(135deg,#10b981,#047857)]",
  },
  sky: {
    accent: "#0ea5e9",
    iconBg: "bg-[linear-gradient(135deg,#0ea5e9,#0369a1)]",
  },
};

export default function CategoryCard({
  href = "#",
  title,
  description,
  count,
  icon,
  color = "violet",
}) {
  const Icon = iconMap[icon] || RiArticleLine;
  const palette = colorMap[color] || colorMap.violet;

  return (
    <a
      href={href}
      style={{ "--cat-accent": palette.accent }}
      className="group relative flex items-start gap-4 overflow-hidden rounded-[20px] border border-border bg-surface p-6 no-underline transition-all duration-200 hover:-translate-y-1.5 hover:border-border-strong hover:no-underline hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_14px_28px_rgba(20,20,26,0.06)] after:absolute after:inset-x-0 after:top-0 after:h-0.75 after:origin-right after:scale-x-0 after:bg-(--cat-accent) after:transition-transform after:duration-300 hover:after:scale-x-100"
    >
      <span
        className={`grid h-11.5 w-11.5 shrink-0 place-items-center rounded-[13px] text-[1.25rem] text-white shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] ${palette.iconBg}`}
      >
        <Icon />
      </span>
      <div className="flex flex-1 flex-col gap-1.5">
        <h3 className="text-base font-bold leading-[1.4] tracking-[-0.01em] text-ink">
          {title}
        </h3>
        <p className="text-[0.86rem] leading-[1.85] text-ink-2">
          {description}
        </p>
        <span className="mt-1 inline-flex items-center gap-1.25 text-[0.76rem] font-medium text-ink-3">
          <RiArticleLine className="text-[0.85rem]" />
          {count} مقاله
        </span>
      </div>
    </a>
  );
}
