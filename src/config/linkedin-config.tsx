import {
  type CardComponentProps,
  type CardItem,
  ImageCard,
  MetricCard,
  TextCard,
  TitleCard,
} from "@/components/story-cards";
import { cardConfig } from "./card-config";

export const linkedinConfig: CardItem[] = [
  {
    id: "short_summary",
    card: cardConfig.card1,
    Component: TextCard,
  },
  {
    id: "current_position",
    card: cardConfig.card2,
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.currentPositionImageUrl ?? ""}
        title="What You Call Work"
        description={result.value as string}
      />
    ),
  },
  {
    id: "actual_position",
    card: cardConfig.card3,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What You're Actually Doing"
        description={result.value as string}
      />
    ),
  },
  {
    id: "position_mother",
    card: cardConfig.card4,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="How Mom Sees Your Job"
        description={result.value as string}
      />
    ),
  },
  {
    id: "accidental_success",
    card: cardConfig.card5,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Any Success in Your Career?"
        description={result.value as string}
      />
    ),
  },
  {
    id: "ambition",
    card: cardConfig.card6,
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="How Ambitious You Are"
        value={result.ambition_score as string}
        description={result.description as string}
        valueColor="#6F0FA7"
      />
    ),
  },
  {
    id: "delusional",
    card: cardConfig.card7,
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Delusional Score"
        value={result.score as string}
        description={result.description as string}
        valueColor="#5F7118"
      />
    ),
  },
  {
    id: "performance",
    card: cardConfig.card8,
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="How You're Performing"
        value={result.score as string}
        description={result.description as string}
        valueColor="#182571"
      />
    ),
  },
  {
    id: "career_trajectory",
    card: cardConfig.card9,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Career Trajectory"
        description={result.value as string}
      />
    ),
  },
  {
    id: "next_endeavor",
    card: cardConfig.card10,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What You'll Do Next"
        description={result.value as string}
      />
    ),
  },
  {
    id: "job_description",
    card: cardConfig.card11,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Ideal Job Match"
        description={result.value as string}
      />
    ),
  },
  {
    id: "buzzword_bingo",
    card: cardConfig.card12,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Buzzword Bingo"
        description={result.value as string}
      />
    ),
  },
  {
    id: "skills",
    card: cardConfig.card13,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Actual Skillset"
        description={result.value as string}
      />
    ),
  },
  {
    id: "reason_for_firing",
    card: cardConfig.card14,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Why You Won't Last Here"
        description={result.value as string}
      />
    ),
  },
  {
    id: "recommendation",
    card: cardConfig.card15,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="The Honest Feedback You Need"
        description={result.value as string}
      />
    ),
  },
];
