import Profile from "@/components/Profile/Profile";

const user = {
  nickname: "مهدی",
  username: "mahdi_dev",
  createdAt: "۱ فروردین ۱۴۰۴",
};

const comments = [
  {
    id: 1,
    articleTitle: "وقتی ماسک ماشین پرنده ساخت",
    articleHref: "/articles/mask-flying-car",
    text: "واقعاً جالب بود. ولی یه سؤال دارم: این تکنولوژی عملاً به چه دردی می‌خوره؟",
    time: "۲ ساعت پیش",
    status: "approved",
  },
  {
    id: 2,
    articleTitle: "Rust؛ زبونی که یاد گرفتنش سخته ولی می‌ارزه",
    articleHref: "/articles/rust-language",
    text: "من تازه شروع کردم Rust یاد بگیرم. این مقاله خیلی کمکم کرد.",
    time: "۳ روز پیش",
    status: "pending",
  },
  {
    id: 3,
    articleTitle: "اقتصاد توجه؛ چرا همه چیز اینقدر پرهیاهو شده؟",
    articleHref: "/articles/attention-economy",
    text: "این موضوع واقعاً دغدغهٔ منم هست. ممنون از این نوشته.",
    time: "۱ هفته پیش",
    status: "approved",
  },
];

export const metadata = {
  title: "پروفایل — مهدی اسداللهی",
};

export default function ProfilePage() {
  return <Profile user={user} comments={comments} />;
}
