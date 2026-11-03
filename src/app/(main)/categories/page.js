import CategoriesPage from "@/components/CategoriesPage/CategoriesPage";

const categories = [
  {
    href: "/categories/world-other-angle",
    title: "دنیا از یه زاویهٔ دیگه",
    description: "اخبار روز و اتفاق‌ها، ولی از دیدی که کمتر شنیده می‌شه.",
    count: "۸",
    icon: "earth",
    color: "violet",
  },
  {
    href: "/categories/technology",
    title: "تکنولوژی",
    description: "معرفی ابزارها، زبان‌ها و فناوری‌های تازه، به زبون ساده.",
    count: "۶",
    icon: "cpu",
    color: "pink",
  },
  {
    href: "/categories/design-patterns",
    title: "الگوهای طراحی",
    description: "Design Patterns، معماری نرم‌افزار و راه‌حل‌های تکرارشدنی.",
    count: "۵",
    icon: "shape",
    color: "cyan",
  },
  {
    href: "/categories/ui-ux",
    title: "طراحی رابط و تجربه",
    description: "UI و UX؛ از تئوری رنگ تا طراحی دسترس‌پذیر برای همه.",
    count: "۴",
    icon: "palette",
    color: "amber",
  },
  {
    href: "/categories/web-dev",
    title: "توسعهٔ وب",
    description:
      "وب مدرن، فریم‌ورک‌ها، ابزارها و هر چیزی که تو مرورگر می‌گذره.",
    count: "۷",
    icon: "code",
    color: "emerald",
  },
  {
    href: "/categories/personal-notes",
    title: "یادداشت‌های شخصی",
    description: "فکرها، تجربه‌ها و چیزهایی که جایی برای گفتنشون نبود.",
    count: "۳",
    icon: "quill",
    color: "sky",
  },
];

export const metadata = {
  title: "دسته‌بندی‌ها — مهدی اسداللهی",
  description: "همهٔ دسته‌بندی‌های وبلاگ — از اخبار و تکنولوژی تا طراحی و کد.",
};

export default function CategoriesPageRoute() {
  return <CategoriesPage categories={categories} />;
}
