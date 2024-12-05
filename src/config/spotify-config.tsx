import {
  type CardComponentProps,
  type CardItem,
  ImageCard,
  MetricCard,
  TextCard,
  TitleCard,
} from "@/components/story-cards";
import { animationConfig } from "./animation-config";

import dynamic from "next/dynamic";

const ClientAnimation = dynamic(
  () => import("@/components/animation").then((mod) => mod.Animation),
  {
    ssr: false,
  },
);

export const spotifyConfig: CardItem[] = [
  {
    data: {
      id: "short_summary",
      bgColor: "#378C77",
      fillColor: "#43937F",
    },
    Component: TextCard,
    Animation: (
      <ClientAnimation
        className="top-20"
        animationData={animationConfig.animation1}
      />
    ),
  },
  {
    data: {
      id: "music_taste_analysis_1",
      bgColor: "#D46FA8",
      fillColor: "#D673AB",
    },
    Component: TextCard,
    Animation: (
      <ClientAnimation
        className="right-20 top-20 size-[200px]"
        animationData={animationConfig.animation2}
      />
    ),
  },
  {
    data: {
      id: "music_taste_analysis_2",
      bgColor: "#637BC4",
      fillColor: "#6D87D7",
    },
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.topArtistImageUrl ?? ""}
        url={profileData?.topArtistUrl ?? ""}
        title="Top Artist"
        description={result.value as string}
      />
    ),
    Animation: (
      <ClientAnimation
        className="right-0 top-0 size-[250px]"
        animationData={animationConfig.animation3}
      />
    ),
  },
  {
    data: {
      id: "music_taste_analysis_3",
      bgColor: "#D68E49",
      fillColor: "#D8924C",
    },
    Component: TextCard,
    Animation: (
      <ClientAnimation
        className="-bottom-[350px] size-[500px]"
        animationData={animationConfig.animation4}
      />
    ),
  },
  {
    data: {
      id: "lyric_therapy_needed",
      bgColor: "#D17974",
      fillColor: "#D47D78",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Lyric Therapy Needed"
        description={result.value as string}
      />
    ),
    Animation: (
      <ClientAnimation
        className="-bottom-36 right-0 size-[400px]"
        animationData={animationConfig.animation5}
      />
    ),
  },
  {
    data: {
      id: "identity_crisis_level",
      bgColor: "#8C68C8",
      fillColor: "#906CCB",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Identity Crisis Level"
        value={String(result.level)}
        description={String(result.description)}
        valueColor="#6F0FA7"
      />
    ),
    Animation: (
      <ClientAnimation
        className="-left-40 top-40 size-[1000px]"
        animationData={animationConfig.animation6}
      />
    ),
  },
  {
    data: {
      id: "emotional_stability_rating",
      bgColor: "#C0D46F",
      fillColor: "#C3D673",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Emotional Stability"
        value={String(result.level)}
        description={String(result.description)}
        valueColor="#5F7118"
      />
    ),
    Animation: (
      <ClientAnimation
        className="right-0 top-0 size-[300px]"
        animationData={animationConfig.animation7}
      />
    ),
  },
  {
    data: {
      id: "achievement",
      bgColor: "#6FCFD4",
      fillColor: "#73D1D6",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Achievement"
        value={String(result.title)}
        description={String(result.description)}
        valueColor="#182571"
      />
    ),
    // Animation: (
    //   <ClientAnimation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "dance_floor_credibility",
      bgColor: "#5D9266",
      fillColor: "#61966A",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Dance Floor Credibility"
        description={result.value as string}
      />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "song_you_would_hit_the_dance_floor",
      bgColor: "#6A2B63",
      fillColor: "#6E2D67",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Song You Would Hit the Dance Floor To"
        description={result.value as string}
      />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "songs_you_secretly_think_are_about_you",
      bgColor: "#F3A373",
      fillColor: "#F4A677",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Songs You Secretly Think Are About You"
        description={result.value as string}
      />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "guilty_pleasure_song",
      bgColor: "#2C8E94",
      fillColor: "#2E9298",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Guilty Pleasure Song"
        description={result.value as string}
      />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "least_popular_artist",
      bgColor: "#8A423D",
      fillColor: "#8E4440",
    },
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.leastPopularImageUrl ?? ""}
        url={profileData?.leastPopularUrl ?? ""}
        title="Least Popular Artist"
        description={result.value as string}
      />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "most_popular_artist",
      bgColor: "#BD68C8",
      fillColor: "#C06CCB",
    },
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.mostPopularImageUrl ?? ""}
        url={profileData?.mostPopularUrl ?? ""}
        title="Most Popular Artist"
        description={result.value as string}
      />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "time_machine_status",
      bgColor: "#414A0D",
      fillColor: "#444D0D",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Time Machine Status"
        description={result.value as string}
      />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "titles_that_need_therapy",
      bgColor: "#5A91D5",
      fillColor: "#5E95D7",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Titles That Need Therapy"
        description={result.value as string}
      />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "final_diagnosis",
      bgColor: "#AB8E40",
      fillColor: "#AE9243",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Final Diagnosis" description={result.value as string} />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
  {
    data: {
      id: "recommendation",
      bgColor: "#B3C868",
      fillColor: "#B6CB6C",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Recommendation" description={result.value as string} />
    ),
    // Animation: (
    //   <Animation
    //     className="top-20"
    //     animationData={animationConfig.animation1}
    //   />
    // ),
  },
];
