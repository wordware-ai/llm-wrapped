import {
  type CardComponentProps,
  type CardItem,
  ImageCard,
  MetricCard,
  TextCard,
  TitleCard,
} from "@/components/story-cards";

export const linkedinConfig: CardItem[] = [
  {
    data: {
      id: "short_summary",
      bgColor: "#378C77",
      fillColor: "#43937F",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "current_position",
      bgColor: "#D46FA8",
      fillColor: "#D673AB",
    },
    Component: ({ result, profileData }: CardComponentProps) => (
      <ImageCard
        imageUrl={profileData?.currentPositionImageUrl ?? ""}
        title="Current Position"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "actual_position",
      bgColor: "#637BC4",
      fillColor: "#6D87D7",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Actual Position" description={result.value as string} />
    ),
  },
  {
    data: {
      id: "position_mother",
      bgColor: "#D68E49",
      fillColor: "#D8924C",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What Your Mother Thinks You Do"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "accidental_success",
      bgColor: "#D17974",
      fillColor: "#D47D78",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Accidental Success Story"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "ambition",
      bgColor: "#8C68C8",
      fillColor: "#906CCB",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Ambition Level"
        value={result.ambition_score as string}
        description={result.description as string}
        valueColor="#6F0FA7"
      />
    ),
  },
  {
    data: {
      id: "delusional",
      bgColor: "#C0D46F",
      fillColor: "#C3D673",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Delusion Level"
        value={result.score as string}
        description={result.description as string}
        valueColor="#5F7118"
      />
    ),
  },
  {
    data: {
      id: "performance",
      bgColor: "#6FCFD4",
      fillColor: "#73D1D6",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Performance Rating"
        value={result.score as string}
        description={result.performance_review as string}
        valueColor="#182571"
      />
    ),
  },
  {
    data: {
      id: "career_trajectory",
      bgColor: "#5D9266",
      fillColor: "#61966A",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Career Trajectory"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "next_endeavor",
      bgColor: "#6A2B63",
      fillColor: "#6E2D67",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Next Career Endeavor"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "job_description",
      bgColor: "#F3A373",
      fillColor: "#F4A677",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Job Description Translation"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "buzzword_bingo",
      bgColor: "#2C8E94",
      fillColor: "#2E9298",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Buzzword Bingo" description={result.value as string} />
    ),
  },
  {
    data: {
      id: "skills",
      bgColor: "#8A423D",
      fillColor: "#8E4440",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Skills Assessment"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "reason_for_firing",
      bgColor: "#BD68C8",
      fillColor: "#C06CCB",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Potential Reason for Firing"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "recommendation",
      bgColor: "#414A0D",
      fillColor: "#444D0D",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="AI Recommendation"
        description={result.value as string}
      />
    ),
  },
];
