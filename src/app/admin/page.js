import AdminStatCard from "@/components/AdminStatCard/AdminStatCard";
import {
  RiGroupLine,
  RiArticleLine,
  RiChat3Line,
  RiEyeLine,
  RiHistoryLine,
  RiFireLine,
  RiCheckLine,
} from "react-icons/ri";

const activities = [
  {
    initial: "ن",
    color: "violet",
    name: "نیما احمدی",
    action: "یه نظر جدید گذاشت",
    time: "۱۵ دقیقه پیش",
  },
  {
    initial: "م",
    color: "pink",
    name: "مریم حسینی",
    action: "توی سایت ثبت‌نام کرد",
    time: "۱ ساعت پیش",
  },
  {
    icon: RiArticleLine,
    color: "cyan",
    text: "مقالهٔ «Rust؛ زبونی که یاد گرفتنش سخته» منتشر شد",
    time: "۳ ساعت پیش",
  },
  {
    icon: RiCheckLine,
    color: "emerald",
    text: "۴ نظر تایید شدن",
    time: "۵ ساعت پیش",
  },
];

const topArticles = [
  { rank: 1, title: "وقتی ماسک ماشین پرنده ساخت", views: "۴۸۲ بازدید" },
  { rank: 2, title: "Rust؛ زبونی که یاد گرفتنش سخته", views: "۳۵۶ بازدید" },
  {
    rank: 3,
    title: "اقتصاد توجه؛ چرا همه چیز اینقدر پرهیاهو شده؟",
    views: "۲۹۸ بازدید",
  },
  { rank: 4, title: "WebAssembly؛ مرز بعدی وب", views: "۲۴۱ بازدید" },
];

const avatarColors = {
  violet: "bg-[linear-gradient(135deg,#7c3aed,#a78bfa)]",
  pink: "bg-[linear-gradient(135deg,#ec4899,#be185d)]",
  cyan: "bg-[linear-gradient(135deg,#06b6d4,#0e7490)]",
  amber: "bg-[linear-gradient(135deg,#f59e0b,#d97706)]",
  emerald: "bg-[linear-gradient(135deg,#10b981,#047857)]",
};

export default function AdminDashboardPage() {
  return (
    <>
      <div className="mb-6 grid grid-cols-1 gap-4 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4">
        <AdminStatCard
          label="کاربران"
          value="۲۴۸"
          change="۱۲٪ این ماه"
          changeDirection="up"
          icon={RiGroupLine}
          color="violet"
        />
        <AdminStatCard
          label="مقالات منتشرشده"
          value="۲۴"
          change="۳ مقاله جدید"
          changeDirection="up"
          icon={RiArticleLine}
          color="pink"
        />
        <AdminStatCard
          label="نظرات در انتظار"
          value="۱۲"
          change="نیاز به بررسی"
          changeDirection="down"
          icon={RiChat3Line}
          color="cyan"
        />
        <AdminStatCard
          label="بازدید این ماه"
          value="۱.۲K"
          change="۲۴٪ رشد"
          changeDirection="up"
          icon={RiEyeLine}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 min-[1024px]:grid-cols-2">
        <div className="overflow-hidden rounded-[20px] border border-border bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 pb-4 pt-5">
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold tracking-[-0.01em] text-ink">
                <RiHistoryLine className="text-[1.1rem] text-violet" />
                فعالیت‌های اخیر
              </h2>
              <p className="mt-0.5 text-[0.8rem] text-ink-3">
                آخرین رویدادهای سایت
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 px-5">
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={`grid h-8.5 w-8.5 shrink-0 place-items-center rounded-full text-[0.75rem] font-bold text-white ${
                      avatarColors[a.color]
                    }`}
                  >
                    {Icon ? <Icon className="text-[0.9rem]" /> : a.initial}
                  </span>
                  <div className="flex-1">
                    <p className="text-[0.88rem] leading-[1.7] text-ink-2">
                      {a.name && (
                        <strong className="text-ink">{a.name} </strong>
                      )}
                      {a.text || a.action}
                    </p>
                    <span className="text-[0.74rem] text-ink-3">{a.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-border bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 pb-4 pt-5">
            <div>
              <h2 className="flex items-center gap-2 text-base font-bold tracking-[-0.01em] text-ink">
                <RiFireLine className="text-[1.1rem] text-violet" />
                پربازدیدترین مقالات
              </h2>
              <p className="mt-0.5 text-[0.8rem] text-ink-3">این هفته</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 px-5">
            {topArticles.map((a) => (
              <div key={a.rank} className="flex items-center gap-3">
                <span
                  className={`w-6 text-base font-extrabold ${
                    a.rank <= 3 ? "text-violet" : "text-ink-3"
                  }`}
                >
                  {a.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="mb-0.5 truncate text-[0.88rem] font-semibold text-ink">
                    {a.title}
                  </p>
                  <div className="text-[0.74rem] text-ink-3">
                    <RiEyeLine className="inline" /> {a.views}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
