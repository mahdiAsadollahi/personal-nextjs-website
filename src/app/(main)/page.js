import Hero from "@/components/Hero/Hero";
import Categories from "@/components/Categories/Categories";
import Articles from "@/components/Articles/Articles";
import Join from "@/components/Join/Join";
import CTA from "@/components/CTA/CTA";

export default function Page() {
  return (
    <main>
      <Hero />
      <Categories />
      <Articles />
      <Join />
      <CTA />
    </main>
  );
}
