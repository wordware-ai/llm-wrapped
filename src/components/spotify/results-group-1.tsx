import { BaseStory } from "../stories/base";
import { useStreamContext } from "../stream-provider";
import WordwareCard from "./wordware-card";

export function SideCards() {
  const { results } = useStreamContext();

  return (
    <div className="flex h-[800px] flex-col justify-between gap-4 lg:h-full lg:w-1/2">
      <WordwareCard
        wide
        hideHashtag
        show={!!results.short_summary}
        className="h-1/3 w-full rounded-xl bg-[#1A1A1A]"
      >
        <p className="text-3xl text-white">{String(results.short_summary)}</p>
      </WordwareCard>
      <div className="flex h-2/3 w-full gap-4 rounded-xl">
        <WordwareCard
          hideHashtag
          show={!!results.music_taste_analysis_1}
          className="h-full w-full rounded-xl bg-[#1A1A1A]"
        >
          <p className="text-3xl text-white">
            {String(results.music_taste_analysis_1)}
          </p>
        </WordwareCard>
        <div className="h-full w-full rounded-xl">
          <div className="flex h-full w-full flex-col gap-4">
            <WordwareCard
              hideHashtag
              show={!!results.music_taste_analysis_2}
              className="h-2/3 w-full rounded-xl bg-[#1A1A1A]"
            >
              <p className="text-3xl text-white">
                {String(results.music_taste_analysis_2)}
              </p>
            </WordwareCard>
            {String(results.music_taste_analysis_2) && (
              <div className="flex h-1/3 w-full items-center justify-between gap-4 rounded-xl border p-4">
                <p className="">
                  LLMwrapped has been built with Wordware - the ultimate AI
                  operating system
                </p>
                <BaseStory
                  src="/brand/w-black.png"
                  alt="Wordware"
                  id="add"
                  className="pt-1.5"
                  size="shrink-0"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
