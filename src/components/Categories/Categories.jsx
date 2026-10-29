import CategoryCard from "@/components/CategoryCard/CategoryCard";

const categories = [
  {
    href: "#",
    title: "دنیا از یه زاویهٔ دیگه",
    description: "اخبار روز و اتفاق‌ها، ولی از دیدی که کمتر شنیده می‌شه.",
    count: "۸",
    icon: "earth",
    color: "violet",
  },
  {
    href: "#",
    title: "تکنولوژی",
    description: "معرفی ابزارها، زبان‌ها و فناوری‌های تازه، به زبون ساده.",
    count: "۶",
    icon: "cpu",
    color: "pink",
  },
  {
    href: "#",
    title: "الگوهای طراحی",
    description: "Design Patterns، معماری نرم‌افزار و راه‌حل‌های تکرارشدنی.",
    count: "۵",
    icon: "shape",
    color: "cyan",
  },
  {
    href: "#",
    title: "طراحی رابط و تجربه",
    description: "UI و UX؛ از تئوری رنگ تا طراحی دسترس‌پذیر برای همه.",
    count: "۴",
    icon: "palette",
    color: "amber",
  },
  {
    href: "#",
    title: "توسعهٔ وب",
    description:
      "وب مدرن، فریم‌ورک‌ها، ابزارها و هر چیزی که تو مرورگر می‌گذره.",
    count: "۷",
    icon: "code",
    color: "emerald",
  },
  {
    href: "#",
    title: "یادداشت‌های شخصی",
    description: "فکرها، تجربه‌ها و چیزهایی که جایی برای گفتنشون نبود.",
    count: "۳",
    icon: "quill",
    color: "sky",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="relative z-1 py-16">
      <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
        <div className="mb-12 flex max-w-160 flex-col gap-3">
          <span className="inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-violet before:h-0.5 before:w-5.5 before:rounded-sm before:bg-[linear-gradient(90deg,#7c3aed,#ec4899)] before:content-['']">
            دسته‌بندی‌ها
          </span>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.3rem)] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
            از کجا شروع کنیم؟
          </h2>
          <p className="text-base leading-loose text-ink-2">
            هر مقاله توی یکی از این شش دسته منتشر می‌شه. اگه تازه اومدی، از اونی
            شروع کن که بیشتر بهش علاقه داری.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
