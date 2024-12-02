import Image from "next/image";
import { BaseStory } from "../stories/base";
import { useStreamContext } from "../stream-provider";
import WordwareCard from "./wordware-card";
import { useParams } from "next/navigation";

export function SideCards() {
  const { results } = useStreamContext();
  const { username } = useParams();
  return (
    <div className="flex flex-col justify-between gap-4 lg:h-full lg:w-1/2">
      <WordwareCard
        wide
        hideHashtag
        hideShare
        show={!!results.short_summary}
        className="w-full rounded-xl bg-[#1A1A1A] md:h-[400px] lg:h-1/3"
      >
        <p className="text-center text-2xl text-white">
          {String(results.short_summary)}
        </p>
      </WordwareCard>
      <div className="flex w-full flex-col gap-4 rounded-xl sm:flex-row md:h-2/3">
        <WordwareCard
          hideHashtag
          hideShare
          show={!!results.music_taste_analysis_1}
          className="h-full w-full rounded-xl bg-[#1A1A1A]"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            {results.top_artist_image_url !== "null" && (
              <Image
                src={results.top_artist_image_url as string}
                alt="Top Artist"
                className="aspect-square rounded-lg object-cover"
                width={120}
                height={120}
              />
            )}
            <p className="text-center text-2xl text-white">
              {String(results.music_taste_analysis_1)}
            </p>
          </div>
        </WordwareCard>
        <div className="h-full w-full rounded-xl">
          <div className="flex h-full w-full flex-col gap-4">
            <WordwareCard
              hideHashtag
              hideShare
              show={!!results.music_taste_analysis_2}
              className="h-2/3 w-full rounded-xl bg-[#1A1A1A]"
            >
              <p className="text-center text-2xl text-white">
                {String(results.music_taste_analysis_2)}
              </p>
            </WordwareCard>
            {!!results.music_taste_analysis_3 && (
              <div className="flex h-1/3 w-full items-center justify-between gap-4 rounded-xl border p-4">
                <p className="">
                  LLMwrapped has been built with Wordware - the ultimate AI
                  operating system
                </p>
                <BaseStory
                  src="/brand/w-black.png"
                  alt="Wordware"
                  href={`/${username as string}?name=wordware&slide=1`}
                  imageClassName="pt-1.5"
                  className="shrink-0"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
