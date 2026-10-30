import AdminCommentsList from "@/components/AdminCommentsList/AdminCommentsList";

const comments = [
  {
    id: 1,
    initial: "س",
    color: "violet",
    author: "سارا محمدی",
    time: "۲ ساعت پیش",
    status: "pending",
    text: "واقعاً جالب بود. ولی یه سؤال دارم: این تکنولوژی عملاً به چه دردی می‌خوره؟ یعنی صرفاً یه نمایش مهندسیه یا کاربرد واقعی هم داره؟",
    articleTitle: "وقتی ماسک ماشین پرنده ساخت",
  },
  {
    id: 2,
    initial: "م",
    color: "pink",
    author: "مریم حسینی",
    time: "۴ ساعت پیش",
    status: "pending",
    text: "من نمی‌فهمم چرا همه دارن این رو مسخره می‌کنن. حتی اگه عملی نباشه، حداقل یه شرکت جرات کرده یه چیز متفاوت رو تست کنه.",
    articleTitle: "وقتی ماسک ماشین پرنده ساخت",
  },
  {
    id: 3,
    initial: "ر",
    color: "cyan",
    author: "رضا کریمی",
    time: "۵ ساعت پیش",
    status: "pending",
    text: "این ماشین پرنده نیست. یه ماشینیه که می‌تونه بپره. تفاوتش مثل تفاوت پنگوئن و عقابه. ولی خب، پنگوئن هم باحاله.",
    articleTitle: "وقتی ماسک ماشین پرنده ساخت",
  },
  {
    id: 4,
    initial: "پ",
    color: "amber",
    author: "پویا نادری",
    time: "دیروز",
    status: "pending",
    text: "من فقط یه چیز رو نمی‌فهمم: چرا کسی باید ۲۵۰ هزار دلار بده برای یه ماشینی که نمی‌تونه تو جاده برونه؟",
    articleTitle: "وقتی ماسک ماشین پرنده ساخت",
  },
  {
    id: 5,
    initial: "ن",
    color: "emerald",
    author: "نیما احمدی",
    time: "دیروز",
    status: "pending",
    text: "دقیقاً. به جای اینکه بگیم «این کار نمی‌کنه»، بهتره بگیم «حالا ببینیم چقدر می‌تونه پیش بره».",
    articleTitle: "وقتی ماسک ماشین پرنده ساخت",
  },
  {
    id: 6,
    initial: "ع",
    color: "cyan",
    author: "علی رضایی",
    time: "۲ روز پیش",
    status: "approved",
    text: "به نظرم الان بیشتر یه نمایش قدرته. ولی همون‌طور که موشک‌های اسپیس‌ایکس اول مسخره به نظر می‌رسیدن، شاید ۱۰ سال دیگه عادی بشه.",
    articleTitle: "وقتی ماسک ماشین پرنده ساخت",
  },
  {
    id: 7,
    initial: "ف",
    color: "pink",
    author: "فاطمه رحیمی",
    time: "۳ روز پیش",
    status: "rejected",
    text: "این مقاله خیلی سطحی بود. انتظار داشتم بیشتر به جزئیات فنی بپردازید.",
    articleTitle: "وقتی ماسک ماشین پرنده ساخت",
  },
];

export const metadata = {
  title: "نظرات — پنل مدیریت",
};

export default function AdminCommentsPage() {
  return <AdminCommentsList comments={comments} />;
}
