import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "مهدی اسداللهی — دنیا از یه زاویهٔ دیگه",
  description:
    "یه وبلاگ شخصی برای خوندن دنیا از یه زاویهٔ دیگه — از اخبار و تکنولوژی تا طراحی و کد.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
