import {
  type CardComponentProps,
  type CardItem,
  ImageCard,
  MetricCard,
  TextCard,
  TitleCard,
} from "@/components/story-cards";
import { colorConfig } from "./color-config";

export const linkedinConfig: CardItem[] = [
  {
    data: {
      id: "short_summary",
      bgColor: colorConfig.color1.bgColor,
      fillColor: colorConfig.color1.fillColor,
    },
    Component: TextCard,
  },
  {
    data: {
      id: "current_position",
      bgColor: colorConfig.color2.bgColor,
      fillColor: colorConfig.color2.fillColor,
    },
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.currentPositionImageUrl ?? ""}
        title="What You Call Work"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "actual_position",
      bgColor: colorConfig.color3.bgColor,
      fillColor: colorConfig.color3.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What You're Actually Doing"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "position_mother",
      bgColor: colorConfig.color4.bgColor,
      fillColor: colorConfig.color4.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="How Mom Sees Your Job"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "accidental_success",
      bgColor: colorConfig.color5.bgColor,
      fillColor: colorConfig.color5.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Any Success in Your Career?"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "ambition",
      bgColor: colorConfig.color6.bgColor,
      fillColor: colorConfig.color6.fillColor,
    },
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
    data: {
      id: "delusional",
      bgColor: colorConfig.color7.bgColor,
      fillColor: colorConfig.color7.fillColor,
    },
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
    data: {
      id: "performance",
      bgColor: colorConfig.color8.bgColor,
      fillColor: colorConfig.color8.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="How You're Performing"
        value={result.score as string}
        description={result.performance_review as string}
        valueColor="#182571"
      />
    ),
  },
  {
    data: {
      id: "career_trajectory",
      bgColor: colorConfig.color9.bgColor,
      fillColor: colorConfig.color9.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Career Trajectory"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "next_endeavor",
      bgColor: colorConfig.color10.bgColor,
      fillColor: colorConfig.color10.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What You'll Do Next"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "job_description",
      bgColor: colorConfig.color11.bgColor,
      fillColor: colorConfig.color11.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Ideal Job Match"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "buzzword_bingo",
      bgColor: colorConfig.color12.bgColor,
      fillColor: colorConfig.color12.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Buzzword Bingo"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "skills",
      bgColor: colorConfig.color13.bgColor,
      fillColor: colorConfig.color13.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Actual Skillset"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "reason_for_firing",
      bgColor: colorConfig.color14.bgColor,
      fillColor: colorConfig.color14.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Why You Won't Last Here"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "recommendation",
      bgColor: colorConfig.color15.bgColor,
      fillColor: colorConfig.color15.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="The Honest Feedback You Need"
        description={result.value as string}
      />
    ),
  },
];
