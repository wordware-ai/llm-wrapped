type CardData = {
  id: string;
  title: string;
  // ... other common card data
};

type CardItem = {
  data: CardData;
  Component?: React.ComponentType<CardData>; // Optional custom component
};

export const cards: CardItem[] = [
  {
    data: {
      id: "identity_crisis_level",
      title: "Identity Crisis Level",
    },
  },
  {
    data: {
      id: "emotional_stability_ranking",
      title: "Emotional Stability",
    },
  },
  {
    data: {
      id: "achievement",
      title: "Achievement",
    },
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
