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

const IdentityCrisisLevel = ({ result }: CardComponentProps) => {
  return (
    <div className="flex flex-col gap-4 text-center text-white">
      <p className="text-3xl font-semibold">Identity Crisis Level</p>
      <div className="text-5xl font-semibold italic">
        {String(result.level)}
      </div>
      <p className="text-2xl">{String(result.description)}</p>
    </div>
  );
};

const EmotionalStability = ({ result }: CardComponentProps) => {
  return (
    <div className="flex flex-col gap-4 text-center text-white">
      <p className="text-3xl font-semibold">Emotional Stability</p>
      <div className="text-7xl font-semibold italic">
        {String(result.level)}
      </div>
      <p className="text-2xl">{String(result.description)}</p>
    </div>
  );
};

const Achievement = ({ result }: CardComponentProps) => {
  return (
    <div className="flex flex-col gap-4 text-center text-white">
      <p className="text-3xl font-semibold">Achievement</p>
      <div className="text-5xl font-semibold italic">
        {String(result.title)}
      </div>
      <p className="text-2xl">{String(result.description)}</p>
    </div>
  );
};

const LeastPopularArtist = ({ result, imageUrl }: CardComponentProps) => {
  return (
    <div className="flex flex-col justify-center gap-4 text-center text-white">
      <p className="text-3xl font-semibold">Least Popular Artist</p>
      {imageUrl && (
        <div className="my-2 flex justify-center">
          <Image
            src={imageUrl}
            alt="Least Popular Artist"
            className="aspect-square rounded-lg object-cover"
            width={120}
            height={120}
          />
        </div>
      )}
      <p className="text-2xl">
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
      <p className="text-3xl font-semibold">Top Artist</p>
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
      <p className="text-2xl">
        {typeof result === "object" && result !== null
          ? (result.value as string)
          : (result as string)}
      </p>
    </div>
  );
};

export const cards: CardItem[] = [
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
      title: "Musical Taste Analysis",
    },
  },
  {
    data: {
      id: "recommendation",
      title: "Recommendation",
    },
  },
];
