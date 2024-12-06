import { Hero } from "@/components/hero";
import WordwareInfo from "@/components/wordware-info";
import InfiniteBanner from "@/components/infinite-banner";
import HomeCards from "@/components/spotify/home-cards";
import LinkedinLoadingPage from "@/components/linkedin/linkedin-loading-page";

export default async function Home() {
  return <LinkedinLoadingPage />;
  return (
    <div className="flex w-full flex-col gap-20 bg-[#F8FFFA] sm:p-4">
      <Hero />
      <div className="flex flex-col gap-12 px-4 sm:px-0">
        <HomeCards />
        <InfiniteBanner />
        <WordwareInfo />
      </div>
    </div>
  );
}
