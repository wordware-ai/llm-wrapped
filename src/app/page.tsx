import { Hero } from "@/components/hero";

export default async function Home() {
  return (
    <div className="flex w-full flex-col bg-[#F8FFFA] p-4">
      {/* This includes the story examples because they both need access to tab state */}
      <Hero />
    </div>
  );
}
