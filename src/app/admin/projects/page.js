import AdminProjectsTable from "@/components/AdminProjectsTable/AdminProjectsTable";

const projects = [
  {
    id: 1,
    title: "داشبورد فروشگاه آنلاین",
    category: "وب اپلیکیشن",
    tech: ["Next.js", "Tailwind", "MongoDB"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۴",
    status: "published",
  },
  {
    id: 2,
    title: "اپلیکیشن مدیریت وظایف",
    category: "وب اپلیکیشن",
    tech: ["React", "TypeScript", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۳",
    status: "published",
  },
  {
    id: 3,
    title: "سایت شرکتی",
    category: "وب‌سایت",
    tech: ["Next.js", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۳",
    status: "published",
  },
  {
    id: 4,
    title: "پلتفرم وبلاگ",
    category: "وب اپلیکیشن",
    tech: ["Next.js", "MongoDB", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۴",
    status: "published",
  },
  {
    id: 5,
    title: "اپلیکیشن هواشناسی",
    category: "وب اپلیکیشن",
    tech: ["React", "Vite", "API"],
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۲",
    status: "published",
  },
  {
    id: 6,
    title: "لندینگ پیج استارتاپ",
    category: "وب‌سایت",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&auto=format&fit=crop",
    demo: "#",
    github: "#",
    year: "۱۴۰۲",
    status: "draft",
  },
];

export const metadata = {
  title: "نمونه‌کارها — پنل مدیریت",
};

export default function AdminProjectsPage() {
  return <AdminProjectsTable projects={projects} />;
}
