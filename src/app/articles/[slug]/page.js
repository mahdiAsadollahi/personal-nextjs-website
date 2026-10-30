import ArticleDetail from "@/components/ArticleDetail/ArticleDetail";

const articles = {
  "mask-flying-car": {
    title: "وقتی ماسک ماشین پرنده ساخت",
    category: "تکنولوژی",
    categorySlug: "technology",
    date: "۲۵ مهر ۱۴۰۴",
    readTime: "۸ دقیقه مطالعه",
    cover:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600&q=85&auto=format&fit=crop",
    coverAlt: "خودروی اسپرت برقی در حال حرکت روی جاده",
    coverCaption: "نسل دوم تسلا Roadster در حال تست روی پیست — منبع: تسلا",
    contentHtml: `
      <p>یه شب سرد پاییزی تو تگزاس، جایی که معمولاً موشک‌ها به آسمون فرستاده می‌شن، یه ماشین قرمز از شیب بالا رفت، وایساد، و بعد... پرید...</p>
      <h2>اصلاً چی شد؟</h2>
      <p>روز ۱۵ اکتبر ۲۰۲۶، تو تأسیسات تست اسپیس‌ایکس تو مک‌گرگور تگزاس، تسلا از نسل دوم ماشین Roadster رونمایی کرد...</p>
    `,
  },
};

const relatedData = {
  "mask-flying-car": [
    {
      href: "/articles/rust-language",
      tag: "تکنولوژی",
      date: "۱۰ مهر ۱۴۰۴",
      readTime: "۹ دقیقه مطالعه",
      title: "Rust؛ زبونی که یاد گرفتنش سخته ولی می‌ارزه",
      excerpt: "Rust قول می‌ده هم امنیت حافظه داشته باشی، هم سرعت C.",
      image:
        "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80&auto=format&fit=crop",
    },
    {
      href: "/articles/webassembly",
      tag: "توسعهٔ وب",
      date: "۱ مهر ۱۴۰۴",
      readTime: "۶ دقیقه مطالعه",
      title: "WebAssembly؛ مرز بعدی وب",
      excerpt: "WebAssembly داره مرزهای مرورگر رو جابه‌جا می‌کنه.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop",
    },
    {
      href: "/articles/future-of-work",
      tag: "دنیا از یه زاویهٔ دیگه",
      date: "۲۰ شهریور ۱۴۰۴",
      readTime: "۷ دقیقه مطالعه",
      title: "آیندهٔ کار؛ چه شغل‌هایی واقعاً ناپدید می‌شن؟",
      excerpt: "نگرانی دربارهٔ از دست دادن شغل‌ها به خاطر AI جدیه.",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&auto=format&fit=crop",
    },
  ],
};

const commentsData = {
  "mask-flying-car": [
    {
      id: 1,
      initial: "س",
      color: "violet",
      author: "سارا محمدی",
      time: "۲ ساعت پیش",
      isAuthor: true,
      liked: true,
      likes: 12,
      text: "واقعاً جالب بود. ولی یه سؤال دارم: این تکنولوژی عملاً به چه دردی می‌خوره؟ یعنی صرفاً یه نمایش مهندسیه یا کاربرد واقعی هم داره؟",
      replies: [
        {
          id: 11,
          initial: "ع",
          color: "pink",
          author: "علی رضایی",
          time: "۱ ساعت پیش",
          liked: false,
          likes: 4,
          text: "به نظرم الان بیشتر یه نمایش قدرته. ولی همون‌طور که موشک‌های اسپیس‌ایکس اول مسخره به نظر می‌رسیدن، شاید ۱۰ سال دیگه عادی بشه.",
          replies: [],
        },
      ],
    },
    {
      id: 2,
      initial: "ر",
      color: "cyan",
      author: "رضا کریمی",
      time: "۵ ساعت پیش",
      liked: false,
      likes: 8,
      text: "این ماشین پرنده نیست. یه ماشینیه که می‌تونه بپره. تفاوتش مثل تفاوت پنگوئن و عقابه. ولی خب، پنگوئن هم باحاله.",
      replies: [],
    },
    {
      id: 3,
      initial: "م",
      color: "amber",
      author: "مریم حسینی",
      time: "دیروز",
      liked: true,
      likes: 15,
      text: "من نمی‌فهمم چرا همه دارن این رو مسخره می‌کنن. حتی اگه عملی نباشه، حداقل یه شرکت جرات کرده یه چیز متفاوت رو تست کنه. تو دنیای تکنولوژی، همین جرات ارزشمنده.",
      replies: [
        {
          id: 31,
          initial: "ن",
          color: "emerald",
          author: "نیما احمدی",
          time: "۲۲ ساعت پیش",
          liked: false,
          likes: 6,
          text: "دقیقاً. به جای اینکه بگیم «این کار نمی‌کنه»، بهتره بگیم «حالا ببینیم چقدر می‌تونه پیش بره».",
          replies: [],
        },
      ],
    },
  ],
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = articles[slug];
  return {
    title: data ? `${data.title} — مهدی اسداللهی` : "مقاله",
    description: data?.title,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return null;

  return (
    <ArticleDetail
      article={article}
      related={relatedData[slug] || []}
      comments={commentsData[slug] || []}
    />
  );
}
