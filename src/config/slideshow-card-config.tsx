import { type CardComponentProps, type CardItem, cards } from "./card-config";
import Image from "next/image";

const TopArtist = ({ result, imageUrl }: CardComponentProps) => {
  return (
    <div className="flex h-max w-full flex-col text-center text-white">
      <p className="text-2xl font-semibold">Top Artist</p>
      {imageUrl && (
        <div className="my-2 flex justify-center">
          <Image
            src={imageUrl}
            alt="Most Popular Artist"
            className="aspect-square rounded-lg object-cover"
            width={120}
            height={120}
          />
        </div>
      )}
      <div>{result.value as string}</div>
    </div>
  );
};

export const slideshowCards: CardItem[] = [
  {
    data: {
      id: "short_summary",
      title: "Short Summary",
    },
  },
  {
    data: {
      id: "music_taste_analysis_1",
      title: "Music Taste Analysis 1",
    },
    Component: TopArtist,
  },
  {
    data: {
      id: "music_taste_analysis_2",
      title: "Music Taste Analysis 2",
    },
  },
  {
    data: {
      id: "music_taste_analysis_3",
      title: "Music Taste Analysis 3",
    },
  },
  {
    data: {
      id: "lyric_therapy_needed",
      title: "Lyric Therapy Needed",
    },
  },
  ...Object.values(cards),
];
