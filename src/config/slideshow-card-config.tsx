import { type CardItem, cards } from "./card-config";

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
