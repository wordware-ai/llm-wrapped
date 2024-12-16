import {
  type CardComponentProps,
  type CardItem,
  ImageCard,
  MetricCard,
  TextCard,
  TitleCard,
} from "@/components/story-cards";
import { cardConfig } from "./card-config";

export const spotifyConfig: CardItem[] = [
  {
    id: "short_summary",
    card: cardConfig.card1,
    Component: TextCard,
  },
  {
    id: "music_taste_analysis_1",
    card: cardConfig.card2,
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.topArtistImageUrl ?? ""}
        url={profileData?.topArtistUrl ?? ""}
        title="Top Artist"
        description={result.value as string}
      />
    ),
  },
  {
    id: "music_taste_analysis_2",
    card: cardConfig.card3,
    Component: TextCard,
  },
  {
    id: "music_taste_analysis_3",
    card: cardConfig.card4,
    Component: TextCard,
  },
  {
    id: "lyric_therapy_needed",
    card: cardConfig.card5,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Lyric Therapy Needed"
        description={result.value as string}
      />
    ),
  },
  {
    id: "identity_crisis_level",
    card: cardConfig.card6,
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Identity Crisis Level"
        value={String(result.level)}
        description={String(result.description)}
        valueColor="#6F0FA7"
      />
    ),
  },
  {
    id: "emotional_stability_rating",
    card: cardConfig.card7,
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Emotional Stability"
        value={String(result.level)}
        description={String(result.description)}
        valueColor="#5F7118"
      />
    ),
  },
  {
    id: "achievement",
    card: cardConfig.card8,
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Achievement"
        value={String(result.title)}
        description={String(result.description)}
        valueColor="#182571"
      />
    ),
  },
  {
    id: "dance_floor_credibility",
    card: cardConfig.card9,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Dance Floor Credibility"
        description={result.value as string}
      />
    ),
  },
  {
    id: "song_you_would_hit_the_dance_floor",
    card: cardConfig.card10,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Song You Would Hit the Dance Floor To"
        description={result.value as string}
      />
    ),
  },
  {
    id: "songs_you_secretly_think_are_about_you",
    card: cardConfig.card11,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Songs You Secretly Think Are About You"
        description={result.value as string}
      />
    ),
  },
  {
    id: "guilty_pleasure_song",
    card: cardConfig.card12,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Guilty Pleasure Song"
        description={result.value as string}
      />
    ),
  },
  {
    id: "least_popular_artist",
    card: cardConfig.card13,
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.leastPopularImageUrl ?? ""}
        url={profileData?.leastPopularUrl ?? ""}
        title="Least Popular Artist"
        description={result.value as string}
      />
    ),
  },
  {
    id: "most_popular_artist",
    card: cardConfig.card14,
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.mostPopularImageUrl ?? ""}
        url={profileData?.mostPopularUrl ?? ""}
        title="The influencer of your playlist"
        description={result.value as string}
      />
    ),
  },
  {
    id: "time_machine_status",
    card: cardConfig.card15,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Time Machine Status"
        description={result.value as string}
      />
    ),
  },
  {
    id: "titles_that_need_therapy",
    card: cardConfig.card16,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Titles That Need Therapy"
        description={result.value as string}
      />
    ),
  },
  {
    id: "final_diagnosis",
    card: cardConfig.card17,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Final Diagnosis" description={result.value as string} />
    ),
  },
  {
    id: "recommendation",
    card: cardConfig.card18,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Recommendation" description={result.value as string} />
    ),
  },
];
