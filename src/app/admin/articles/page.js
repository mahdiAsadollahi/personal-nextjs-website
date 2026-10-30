import AdminArticlesTable from "@/components/AdminArticlesTable/AdminArticlesTable";

const articles = [
  {
    id: 1,
    title: "وقتی ماسک ماشین پرنده ساخت",
    color: "violet",
    readTime: "۸ دقیقه مطالعه",
    comments: "۱۲ نظر",
    category: "تکنولوژی",
    status: "published",
    views: "۴۸۲",
    date: "۲۵ مهر ۱۴۰۴",
  },
  {
    id: 2,
    title: "Rust؛ زبونی که یاد گرفتنش سخته ولی می‌ارزه",
    color: "pink",
    readTime: "۹ دقیقه مطالعه",
    comments: "۸ نظر",
    category: "تکنولوژی",
    status: "published",
    views: "۳۵۶",
    date: "۱۰ مهر ۱۴۰۴",
  },
  {
    id: 3,
    title: "الگوی Strategy؛ وقتی رفتار رو به کلاس می‌سپاریم",
    color: "cyan",
    readTime: "۶ دقیقه مطالعه",
    comments: "۵ نظر",
    category: "الگوهای طراحی",
    status: "published",
    views: "۲۴۱",
    date: "۸ مهر ۱۴۰۴",
  },
  {
    id: 4,
    title: "طراحی رنگی دسترس‌پذیر تو رابط‌های راست‌به‌چپ",
    color: "amber",
    readTime: "۵ دقیقه مطالعه",
    comments: "۴ نظر",
    category: "طراحی رابط",
    status: "published",
    views: "۱۹۸",
    date: "۵ مهر ۱۴۰۴",
  },
  {
    id: 5,
    title: "آیندهٔ کار؛ چه شغل‌هایی واقعاً ناپدید می‌شن؟",
    color: "emerald",
    readTime: "۷ دقیقه مطالعه",
    comments: "—",
    category: "دنیا از یه زاویه",
    status: "draft",
    views: "—",
    date: "۲۶ مهر ۱۴۰۴",
  },
];

export const metadata = {
  title: "مقالات — پنل مدیریت",
};

export default function AdminArticlesPage() {
  return <AdminArticlesTable articles={articles} />;
}
