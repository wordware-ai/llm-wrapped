import { Hero } from "@/components/hero";
import HomeCards from "@/components/spotify/home-cards";

export default async function Home() {
  return (
    <div className="flex w-full flex-col gap-20 bg-[#F8FFFA] p-4">
      {/* This includes the story examples because they both need access to tab state */}
      <Hero />
      <HomeCards />
    </div>
  );
}
