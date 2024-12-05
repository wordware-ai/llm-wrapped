import {
  type CardComponentProps,
  type CardItem,
  MetricCard,
  TextCard,
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
    Component: TextCard,
  },
  {
    data: {
      id: "actual_position",
      bgColor: "#637BC4",
      fillColor: "#6D87D7",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "position_mother",
      bgColor: "#D68E49",
      fillColor: "#D8924C",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "accidental_success",
      bgColor: "#D17974",
      fillColor: "#D47D78",
    },
    Component: TextCard,
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
        title="Reality Check Rating"
        value={result.score as string}
        description={result.description as string}
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
      />
    ),
  },
  {
    data: {
      id: "career_trajectory",
      bgColor: "#5D9266",
      fillColor: "#61966A",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "next_endeavor",
      bgColor: "#6A2B63",
      fillColor: "#6E2D67",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "job_description",
      bgColor: "#F3A373",
      fillColor: "#F4A677",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "buzzword_bingo",
      bgColor: "#2C8E94",
      fillColor: "#2E9298",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "skills",
      bgColor: "#8A423D",
      fillColor: "#8E4440",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "reason_for_firing",
      bgColor: "#BD68C8",
      fillColor: "#C06CCB",
    },
    Component: TextCard,
  },
  {
    data: {
      id: "recommendation",
      bgColor: "#414A0D",
      fillColor: "#444D0D",
    },
    Component: TextCard,
  },
];
