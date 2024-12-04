import Image from "next/image";

type CardData = {
  id: string;
  title: string;
};

export type CardComponentProps = {
  result: Record<string, unknown>;
  imageUrl?: string;
};

export type CardItem = {
  data: CardData;
  Component?: React.ComponentType<CardComponentProps>;
};

const TopArtist = ({ result, imageUrl }: CardComponentProps) => {
  return (
    <div className="flex h-max w-full flex-col gap-8 text-center text-white">
      {imageUrl && (
        <div className="my-2 flex justify-center">
          <Image
            src={imageUrl}
            alt="Most Popular Artist"
            className="aspect-square rounded-lg object-cover"
            width={200}
            height={200}
          />
        </div>
      )}
      <p className="text-4xl">{result.value as string}</p>
    </div>
  );
};

const IdentityCrisisLevel = ({ result }: CardComponentProps) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[3vh] text-center text-white sm:gap-[2vh]">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        Identity Crisis Level
      </p>
      <div className="text-[7vh] font-semibold italic leading-tight text-[#F8D4D7] sm:text-[6vh]">
        {String(result.level)}
      </div>
      <p className="text-[4vh] leading-tight sm:text-[3vh]">
        {String(result.description)}
      </p>
    </div>
  );
};

const EmotionalStability = ({ result }: CardComponentProps) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[3vh] text-center text-white sm:gap-[2vh]">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        Emotional Stability
      </p>
      <div className="text-[7vh] font-semibold italic leading-tight text-[#F8D4D7] sm:text-[6vh]">
        {String(result.level)}
      </div>
      <p className="text-[4vh] leading-tight sm:text-[3vh]">
        {String(result.description)}
      </p>
    </div>
  );
};

const Achievement = ({ result }: CardComponentProps) => {
  return (
    <div className="flex flex-col gap-[3vh] text-center text-white sm:gap-4">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        Achievement
      </p>
      <div className="text-[7vh] font-semibold italic leading-tight text-[#F8D4D7] sm:text-[6vh]">
        {String(result.title)}
      </div>
      <p className="text-[4vh] leading-tight sm:text-[3vh]">
        {String(result.description)}
      </p>
    </div>
  );
};

const LeastPopularArtist = ({ result, imageUrl }: CardComponentProps) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[3vh] text-center text-white sm:gap-[2vh]">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        Least Popular Artist
      </p>
      {imageUrl && (
        <div className="my-[2vh] flex justify-center sm:my-[1vh]">
          <Image
            src={imageUrl}
            alt="Least Popular Artist"
            className="aspect-square h-[18vh] w-[18vh] rounded-lg object-cover sm:h-[15vh] sm:w-[15vh]"
            width={200}
            height={200}
          />
        </div>
      )}
      <p className="text-[4vh] leading-tight sm:text-[3vh]">
        {typeof result === "object" && result !== null
          ? (result.value as string)
          : (result as string)}
      </p>
    </div>
  );
};

const MostPopularArtist = ({ result, imageUrl }: CardComponentProps) => {
  return (
    <div className="flex h-max w-full flex-col text-center text-white">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        Most Popular Artist
      </p>
      {imageUrl && (
        <div className="my-[2vh] flex justify-center sm:my-2">
          <Image
            src={imageUrl}
            alt="Most Popular Artist"
            className="aspect-square h-[18vh] w-[18vh] rounded-lg object-cover sm:h-[15vh] sm:w-[15vh]"
            width={200}
            height={200}
          />
        </div>
      )}
      <p className="text-[4vh] leading-tight sm:text-[3vh]">
        {typeof result === "object" && result !== null
          ? (result.value as string)
          : (result as string)}
      </p>
    </div>
  );
};

const Recommendation = ({ result }: CardComponentProps) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[4vh] text-center sm:gap-[3vh]">
      <h3 className="text-[4.5vh] font-semibold leading-tight text-white sm:text-[3.5vh]">
        Recommendation
      </h3>
      <p className="text-[4vh] leading-tight text-white sm:text-[3vh]">
        {String(result.value)}
      </p>
    </div>
  );
};

export const spotifyConfig: CardItem[] = [
  {
    data: {
      id: "short_summary",
      title: "",
    },
  },
  {
    data: {
      id: "music_taste_analysis_1",
      title: "",
    },
    Component: TopArtist,
  },
  {
    data: {
      id: "music_taste_analysis_2",
      title: "",
    },
  },
  {
    data: {
      id: "music_taste_analysis_3",
      title: "",
    },
  },
  {
    data: {
      id: "lyric_therapy_needed",
      title: "",
    },
  },
  {
    data: {
      id: "identity_crisis_level",
      title: "Identity Crisis Level",
    },
    Component: IdentityCrisisLevel,
  },
  {
    data: {
      id: "emotional_stability_rating",
      title: "Emotional Stability",
    },
    Component: EmotionalStability,
  },
  {
    data: {
      id: "achievement",
      title: "Achievement",
    },
    Component: Achievement,
  },
  {
    data: {
      id: "dance_floor_credibility",
      title: "Dance Floor Credibility",
    },
  },
  {
    data: {
      id: "song_you_would_hit_the_dance_floor",
      title: "Song You'd Hit The Dance Floor To",
    },
  },
  {
    data: {
      id: "songs_you_secretly_think_are_about_you",
      title: "Song You Secretly Think Is About You",
    },
  },
  {
    data: {
      id: "guilty_pleasure_song",
      title: "Guilty Pleasure Song",
    },
  },
  {
    data: {
      id: "least_popular_artist",
      title: "Rare Finds, Rare Listens",
    },
    Component: LeastPopularArtist,
  },
  {
    data: {
      id: "most_popular_artist",
      title: "Overplayed and Overhyped",
    },
    Component: MostPopularArtist,
  },
  {
    data: {
      id: "time_machine_status",
      title: "Lost Between Decades, Like Your Taste",
    },
  },
  {
    data: {
      id: "titles_that_need_therapy",
      title: "Names So Random Even AI's Confused",
    },
  },
  {
    data: {
      id: "final_diagnosis",
      title: "Musical Taste Diagnosis",
    },
  },
  {
    data: {
      id: "recommendation",
      title: "Recommendation",
    },
    Component: Recommendation,
  },
];
