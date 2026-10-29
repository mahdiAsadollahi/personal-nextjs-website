import { RiUserAddLine, RiArrowLeftLine } from "react-icons/ri";

export default function Join() {
  return (
    <section id="join" className="relative z-1 py-16">
      <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
        <div className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[28px] border border-border bg-surface px-6 py-16 min-[720px]:grid-cols-[1.1fr_.9fr] min-[720px]:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(124,58,237,0.10)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_80%_60%_at_100%_0%,#000,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_80%_60%_at_100%_0%,#000,transparent_70%)]" />

          <div className="relative z-1">
            <h2 className="mb-3 text-[clamp(1.5rem,3vw,2rem)] font-extrabold leading-[1.35] tracking-[-0.02em] text-ink">
              عضو خانوادهٔ زاویهٔ دیگه شو
            </h2>
            <p className="max-w-120 text-[0.98rem] leading-loose text-ink-2">
              با ثبت‌نام، مقالات تازه رو قبل از همه می‌خونی، می‌تونی نظر بدی و
              مقاله‌های موردعلاقه‌ت رو ذخیره کنی. به‌سادگی، بدون اسپم.
            </p>
          </div>

          <div className="relative z-1 flex flex-wrap gap-2.5">
            <a
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-violet px-6 py-3.5 text-[0.98rem] font-medium leading-none text-white shadow-[0_6px_18px_rgba(124,58,237,0.22)] transition-all hover:-translate-y-px hover:bg-[#6d28d9] hover:no-underline hover:shadow-[0_10px_26px_rgba(124,58,237,0.28)]"
            >
              <RiUserAddLine />
              <span>ساخت حساب کاربری</span>
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-border-strong bg-transparent px-6 py-3.5 text-[0.98rem] font-medium leading-none text-ink transition-all hover:-translate-y-px hover:border-ink hover:bg-surface hover:no-underline"
            >
              <span>قبلاً عضو شدم</span>
              <RiArrowLeftLine />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
