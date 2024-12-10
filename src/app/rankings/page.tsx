import { getMostVisited } from "@/lib/posthog";
import { MostVisited } from "@/app/rankings/most-visited";
import Navbar from "@/components/navbar";

export const maxDuration = 180;
export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getMostVisited();

  return (
    <>
      <Navbar />
      <div className="container mx-auto h-screen px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Rankings</h1>
            <p className="text-lg text-gray-600">
              See which Twitter personalities are trending based on real-time
              analytics data from Posthog.
            </p>
          </div>
          {await MostVisited({ mostVisited: data })}
        </div>
      </div>
    </>
  );
};

export default Page;
