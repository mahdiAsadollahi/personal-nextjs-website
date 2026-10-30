import { RiArrowUpLine, RiTimeLine } from "react-icons/ri";

const palette = {
  violet: {
    iconBg: "bg-[linear-gradient(135deg,#7c3aed,#a78bfa)]",
    accent: "#7c3aed",
  },
  pink: {
    iconBg: "bg-[linear-gradient(135deg,#ec4899,#be185d)]",
    accent: "#ec4899",
  },
  cyan: {
    iconBg: "bg-[linear-gradient(135deg,#06b6d4,#0e7490)]",
    accent: "#06b6d4",
  },
  amber: {
    iconBg: "bg-[linear-gradient(135deg,#f59e0b,#d97706)]",
    accent: "#f59e0b",
  },
};

export default function AdminStatCard({
  label,
  value,
  change,
  changeDirection = "up",
  icon,
  color = "violet",
}) {
  const p = palette[color] || palette.violet;
  const Icon = icon;
  const isUp = changeDirection === "up";

  return (
    <div
      style={{ "--stat-accent": p.accent }}
      className="group relative flex items-start gap-4 overflow-hidden rounded-[20px] border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_24px_rgba(20,20,26,0.05)] after:absolute after:inset-x-0 after:top-0 after:h-0.75 after:origin-right after:scale-x-0 after:bg-(--stat-accent) after:transition-transform after:duration-300 hover:after:scale-x-100 max-[480px]:p-4"
    >
      <span
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-[13px] text-[1.3rem] text-white shadow-[0_1px_3px_rgba(20,20,26,0.05),0_1px_2px_rgba(20,20,26,0.03)] ${p.iconBg} max-[480px]:h-10.5 max-[480px]:w-10.5 max-[480px]:text-[1.15rem]`}
      >
        <Icon />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 text-[0.8rem] text-ink-3">{label}</div>
        <div className="flex items-baseline gap-1.5 text-[1.65rem] font-extrabold leading-tight tracking-[-0.01em] text-ink max-[480px]:text-[1.4rem]">
          {value}
        </div>
        <span
          className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.72rem] font-bold ${
            isUp ? "bg-emerald/10 text-emerald" : "bg-rose/10 text-rose"
          }`}
        >
          {isUp ? <RiArrowUpLine /> : <RiTimeLine />}
          {change}
        </span>
      </div>
    </div>
  );
}
