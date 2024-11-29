type CardData = {
  id: string;
  title: string;
  // ... other common card data
};

type CardComponentProps = {
  result: Record<string, unknown>;
};

type CardItem = {
  data: CardData;
  Component?: React.ComponentType<CardComponentProps>;
};

const IdentityCrisisLevel = ({ result }: CardComponentProps) => {
  return (
    <div className="flex flex-col text-center text-white">
      <p className="text-2xl font-semibold">Identity Crisis Level</p>
      <div className="text-4xl">{String(result.level)}</div>
      <p className="">{String(result.description)}</p>
    </div>
  );
};

const EmotionalStability = ({ result }: CardComponentProps) => {
  return (
    <div className="flex flex-col text-center text-white">
      <p className="text-2xl font-semibold">Emotional Stability</p>
      <div className="text-7xl">{String(result.level)}</div>
      <p className="">{String(result.description)}</p>
    </div>
  );
};

const Achievement = ({ result }: CardComponentProps) => {
  return (
    <div className="flex flex-col text-center text-white">
      <p className="text-2xl font-semibold">Achievement</p>
      <div className="text-4xl">{String(result.title)}</div>
      <p className="">{String(result.description)}</p>
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
  },
  {
    data: {
      id: "most_popular_artist",
      title: "Overplayed and Overhyped",
    },
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
