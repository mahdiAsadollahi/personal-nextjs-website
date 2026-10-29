import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { RiArrowLeftLine } from "react-icons/ri";

const articles = [
  {
    href: "#",
    tag: "دنیا از یه زاویهٔ دیگه",
    date: "۱۲ مهر ۱۴۰۴",
    readTime: "۷ دقیقه مطالعه",
    title: "وقتی الگوریتم‌ها خبر می‌نویسن؛ فرصت یا تهدید؟",
    excerpt:
      "هوش مصنوعی مولد داره اتاق خبر رو دوباره اختراع می‌کنه. اما سؤال مهم این نیست که آیا خبرنگارها حذف می‌شن یا نه؛ سؤال اینه که ما چی رو می‌خوایم «خبر» بنامیم.",
  },
  {
    href: "#",
    tag: "تکنولوژی",
    date: "۱۰ مهر ۱۴۰۴",
    readTime: "۹ دقیقه مطالعه",
    title: "Rust؛ زبونی که یاد گرفتنش سخته ولی می‌ارزه",
    excerpt:
      "Rust قول می‌ده هم امنیت حافظه داشته باشی، هم سرعت C. تو این مقاله نگاه می‌کنیم به اینکه چرا این زبون داره جایگاهش رو تو دنیای نرم‌افزار محکم می‌کنه.",
  },
  {
    href: "#",
    tag: "الگوهای طراحی",
    date: "۸ مهر ۱۴۰۴",
    readTime: "۶ دقیقه مطالعه",
    title: "الگوی Strategy؛ وقتی رفتار رو به کلاس می‌سپاریم",
    excerpt:
      "Strategy یکی از اون الگوهایی‌ست که تو نگاه اول بدیهی به نظر می‌رسه، ولی وقتی درست استفاده بشه، کد رو برای همیشه از شر شرط‌های تودرتو نجات می‌ده.",
  },
  {
    href: "#",
    tag: "طراحی رابط و تجربه",
    date: "۵ مهر ۱۴۰۴",
    readTime: "۵ دقیقه مطالعه",
    title: "طراحی رنگی دسترس‌پذیر تو رابط‌های راست‌به‌چپ",
    excerpt:
      "رنگ تو رابط‌های فارسی فقط زیبایی نیست؛ ابزاریه برای هدایت چشم و انتقال معنا. تو این مقاله سراغ پالت‌هایی می‌ریم که هم زیبا و هم دسترس‌پذیرن.",
  },
  {
    href: "#",
    tag: "دنیا از یه زاویهٔ دیگه",
    date: "۳ مهر ۱۴۰۴",
    readTime: "۸ دقیقه مطالعه",
    title: "اقتصاد توجه؛ چرا همه چیز اینقدر پرهیاهو شده؟",
    excerpt:
      "هر پلتفرمی داره برای گرفتن چند ثانیه از توجه ما رقابت می‌کنه. ولی وقتی همه در حال فریاد زدن باشن، کی واقعاً شنیده می‌شه؟",
  },
  {
    href: "#",
    tag: "توسعهٔ وب",
    date: "۱ مهر ۱۴۰۴",
    readTime: "۶ دقیقه مطالعه",
    title: "WebAssembly؛ مرز بعدی وب",
    excerpt:
      "WebAssembly داره مرزهای مرورگر رو جابه‌جا می‌کنه. از اپلیکیشن‌های سنگین تا اجرای زبون‌های دیگه تو وب؛ نگاهی به چیزی که تو راهه.",
  },
];

export default function Articles() {
  return (
    <section id="articles" className="relative z-1 py-16">
      <div className="mx-auto w-full max-w-300 px-6 max-[420px]:px-4.5">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-160 flex-col gap-3">
            <span className="inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-violet before:h-0.5 before:w-5.5 before:rounded-sm before:bg-[linear-gradient(90deg,#7c3aed,#ec4899)] before:content-['']">
              آخرین نوشته‌ها
            </span>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.3rem)] font-extrabold leading-[1.3] tracking-[-0.02em] text-ink">
              تازه‌ترین مقالات
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[0.92rem] font-medium text-ink-2 no-underline transition-all hover:gap-2.5 hover:text-violet hover:no-underline"
          >
            <span>مشاهدهٔ همهٔ مقالات</span>
            <RiArrowLeftLine />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
