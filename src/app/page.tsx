import Header from "@/app/components/header";
import Hero from "@/app/components/hero";
import cn from "@/lib/clsx";

export default function Home() {
  return (
    <main
      className={cn(
        "w-full min-h-screen pb-14",
        "bg-background-light dark:bg-[#293941]",
      )}
    >
      <Header />
      <Hero />
    </main>
  );
}
