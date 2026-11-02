import Projects from "@/components/Projects/Projects";

const projects = [
  {
    id: 1,
    title: "داشبورد فروشگاه آنلاین",
    description:
      "پنل مدیریت کامل برای فروشگاه با نمودارهای فروش، مدیریت محصولات و سفارش‌ها. ساخته‌شده با Next.js و Tailwind.",
    category: "وب اپلیکیشن",
    tech: ["Next.js", "Tailwind", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۴",
  },
  {
    id: 2,
    title: "اپلیکیشن مدیریت وظایف",
    description:
      "یه تسک‌منیجر ساده با قابلیت درگ‌اند‌دراپ، برچسب‌گذاری و همگام‌سازی. تمرکز روی تجربهٔ کاربری روان.",
    category: "وب اپلیکیشن",
    tech: ["React", "TypeScript", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۳",
  },
  {
    id: 3,
    title: "سایت شرکتی",
    description:
      "یه وب‌سایت شرکتی با طراحی مینیمال، سرعت بالا و بهینه برای موتورهای جستجو. تمرکز روی تایپوگرافی فارسی.",
    category: "وب‌سایت",
    tech: ["Next.js", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۳",
  },
  {
    id: 4,
    title: "پلتفرم وبلاگ",
    description:
      "یه سیستم مدیریت محتوا با ادیتور متن غنی، مدیریت دسته‌بندی‌ها و نظرات. همین سایتی که الان می‌بینی.",
    category: "وب اپلیکیشن",
    tech: ["Next.js", "MongoDB", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۴",
  },
  {
    id: 5,
    title: "اپلیکیشن هواشناسی",
    description:
      "یه اپ ساده که وضعیت هوا رو با API دریافت می‌کنه و با نمودارهای زیبا نشون می‌ده. تمرکز روی انیمیشن.",
    category: "وب اپلیکیشن",
    tech: ["React", "Vite", "API"],
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۲",
  },
  {
    id: 6,
    title: "لندینگ پیج استارتاپ",
    description:
      "یه لندینگ پیج مدرن با انیمیشن‌های اسکرول و طراحی ریسپانسیو کامل. تمرکز روی نرخ تبدیل.",
    category: "وب‌سایت",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۲",
  },
];

export const metadata = {
  title: "نمونه‌کارها — مهدی اسداللهی",
  description:
    "گزیده‌ای از پروژه‌هایی که مهدی اسداللهی روشون کار کرده — از وب‌سایت‌های کوچک تا اپلیکیشن‌های کامل.",
};

export default function ProjectsPage() {
  return <Projects projects={projects} />;
}
