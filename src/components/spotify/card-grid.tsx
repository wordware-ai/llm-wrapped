import { getImageUrl } from "@/lib/get-image-url";
import { cards } from "../../config/card-config";
import { useStreamContext } from "../stream-provider";
import WordwareCard from "./wordware-card";

export function CardGrid() {
  const { results } = useStreamContext();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="flex aspect-[4/7] h-full flex-col gap-4">
        <WordwareCard
          show={!!results?.music_taste_analysis_3}
          className="aspect-auto h-full w-full bg-[#1A1A1A]"
          hideHashtag
          hideShare
        >
          <p className="text-center text-2xl text-white">
            {String(results.music_taste_analysis_3)}
          </p>
        </WordwareCard>
        <WordwareCard
          show={!!results?.lyric_therapy_needed}
          className="aspect-auto h-full bg-[#1A1A1A]"
          hideHashtag
          hideShare
        >
          <p className="text-center text-2xl text-white">
            {String(results.lyric_therapy_needed)}
          </p>
        </WordwareCard>
      </div>
      {cards.map(({ data, Component }) => (
        <WordwareCard
          show={!!results[data.id]}
          key={data.id}
          className="w-full bg-[#1A1A1A]"
          hideHashtag
        >
          {Component ? (
            <Component
              key={data.id}
              result={results[data.id] as Record<string, unknown>}
              imageUrl={getImageUrl(data.id, results)}
            />
          ) : (
            <div className="flex h-full flex-col gap-4 text-center">
              <h3 className="text-3xl font-semibold text-white">
                {data.title}
              </h3>

              <p className="text-2xl text-white">{String(results[data.id])}</p>
            </div>
          )}
        </WordwareCard>
      ))}
    </div>
  );
}
