import {
  RiQuillPenFill,
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";

const quickLinks = [
  { href: "#hero", label: "خانه" },
  { href: "#categories", label: "دسته‌بندی‌ها" },
  { href: "#articles", label: "مقالات" },
  { href: "#about", label: "درباره" },
];

const socials = [
  { href: "#", label: "گیت‌هاب", title: "GitHub", Icon: RiGithubFill },
  { href: "#", label: "لینکدین", title: "LinkedIn", Icon: RiLinkedinFill },
  {
    href: "#",
    label: "توییتر / ایکس",
    title: "Twitter / X",
    Icon: RiTwitterXFill,
  },
];

export default function Footer() {
  return (
    <footer className="relative z-1 border-t border-border bg-bg py-10">
      <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
        <div className="grid grid-cols-1 gap-12 text-center min-[720px]:grid-cols-[1.2fr_1fr_1fr] min-[720px]:items-start min-[720px]:text-right">
          <div className="flex flex-col items-center gap-2.5 min-[720px]:items-start">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 text-[1.15rem] font-bold tracking-tight text-ink no-underline hover:no-underline"
            >
              <span className="inline-flex h-8.5 w-8.5 items-center justify-center rounded-[11px] bg-[conic-gradient(from_210deg_at_30%_30%,#7c3aed,#ec4899_40%,#f59e0b_70%,#06b6d4_100%)] text-white text-base shadow-[0_4px_12px_rgba(124,58,237,0.22)]">
                <RiQuillPenFill />
              </span>
              <span>مهدی اسداللهی</span>
            </a>
            <p className="max-w-80 text-[0.88rem] leading-loose text-ink-2">
              یه وبلاگ شخصی برای خوندن دنیا از یه زاویهٔ دیگه — از اخبار و
              تکنولوژی تا طراحی و کد.
            </p>
          </div>

          <nav
            aria-label="لینک‌های سریع"
            className="flex flex-col items-center gap-3.5 min-[720px]:items-start"
          >
            <span className="text-[0.78rem] font-bold uppercase tracking-widest text-ink-3">
              دسترسی سریع
            </span>
            <ul className="flex flex-col items-center gap-2.5 min-[720px]:items-start">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.92rem] text-ink-2 no-underline transition-colors hover:text-ink hover:no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-3.5 min-[720px]:items-start">
            <span className="text-[0.78rem] font-bold uppercase tracking-widest text-ink-3">
              شبکه‌های اجتماعی
            </span>
            <div className="flex justify-center gap-2.5 min-[720px]:justify-start">
              {socials.map(({ href, label, title, Icon }) => (
                <a
                  key={title}
                  href={href}
                  aria-label={label}
                  title={title}
                  className="inline-grid h-10 w-10 place-items-center rounded-[10px] border border-border bg-surface text-[1.1rem] text-ink-2 no-underline transition-all hover:-translate-y-0.5 hover:border-violet hover:bg-violet/6 hover:text-violet hover:no-underline"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-6 text-center text-[0.84rem] text-ink-3">
          <span>© ۱۴۰۴ مهدی اسداللهی — ساخته‌شده با</span>
          <span aria-label="عشق" className="text-[0.95rem] text-[#e25555]">
            ❤️
          </span>
        </div>
      </div>
    </footer>
  );
}
