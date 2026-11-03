import CategoryCard from "@/components/CategoryCard/CategoryCard";

export default function CategoriesPage({ categories }) {
  return (
    <section className="relative z-1 pt-37.5 pb-16">
      <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
        <div className="mb-12 flex max-w-160 flex-col gap-3">
          <span className="inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-violet before:h-0.5 before:w-5.5 before:rounded-sm before:bg-[linear-gradient(90deg,#7c3aed,#ec4899)] before:content-['']">
            دسته‌بندی‌ها
          </span>
          <h1 className="text-[clamp(1.6rem,3.2vw,2.3rem)] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
            همهٔ دسته‌بندی‌ها
          </h1>
          <p className="text-base leading-loose text-ink-2">
            هر مقاله توی یکی از این شش دسته منتشر می‌شه. از هر کدوم که بیشتر
            خوشت اومد، شروع کن.
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
