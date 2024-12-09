import {
  type CardComponentProps,
  type CardItem,
  TextCard,
  TitleCard,
  MetricCard,
} from "@/components/story-cards";

export const tinderConfig: CardItem[] = [
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
      id: "alternative",
      bgColor: "#D46FA8",
      fillColor: "#D673AB",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Alternative Reality"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "roast_bio",
      bgColor: "#637BC4",
      fillColor: "#6D87D7",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Bio Roasted"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "age_preferences",
      bgColor: "#D68E49",
      fillColor: "#D8924C",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Age Preferences Say..."
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "swipe_ratios",
      bgColor: "#D17974",
      fillColor: "#D47D78",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Your Swipe Game"
        value={result.score as string}
        description={result.description as string}
        valueColor="#A13D37"
      />
    ),
  },
  {
    data: {
      id: "match_ratios",
      bgColor: "#8C68C8",
      fillColor: "#906CCB",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Match Success Rate"
        value={result.score as string}
        description={result.description as string}
        valueColor="#6F0FA7"
      />
    ),
  },
  {
    data: {
      id: "message_peak_day",
      bgColor: "#C0D46F",
      fillColor: "#C3D673",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Peak Messaging Hours"
        value={result.time as string}
        description={result.description as string}
        valueColor="#5F7118"
      />
    ),
  },
  {
    data: {
      id: "total_messages_sent",
      bgColor: "#6FCFD4",
      fillColor: "#73D1D6",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Message Count"
        value={result.count as string}
        description={result.analysis as string}
        valueColor="#182571"
      />
    ),
  },
  {
    data: {
      id: "chat_heavy_days",
      bgColor: "#5D9266",
      fillColor: "#61966A",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Your Chattiest Days"
        value={result.peak_day as string}
        description={result.analysis as string}
        valueColor="#2B4E31"
      />
    ),
  },
  {
    data: {
      id: "personality_insights",
      bgColor: "#6A2B63",
      fillColor: "#6E2D67",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Personality Analysis"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "theme_song_analysis",
      bgColor: "#F3A373",
      fillColor: "#F4A677",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Your Dating Theme Song"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "bold_text_moves",
      bgColor: "#2C8E94",
      fillColor: "#2E9298",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Your Bold Moves" description={result.value as string} />
    ),
  },
  {
    data: {
      id: "bold_text_moves_2",
      bgColor: "#8A423D",
      fillColor: "#8E4440",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="More Bold Moves" description={result.value as string} />
    ),
  },
  {
    data: {
      id: "bold_text_moves_3",
      bgColor: "#BD68C8",
      fillColor: "#C06CCB",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Even More Bold Moves"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "message_style",
      bgColor: "#414A0D",
      fillColor: "#444D0D",
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Your Messaging Style"
        value={result.style as string}
        description={result.analysis as string}
        valueColor="#202405"
      />
    ),
  },
  {
    data: {
      id: "red_flags",
      bgColor: "#D46F6F",
      fillColor: "#D67373",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Your Red Flags" description={result.value as string} />
    ),
  },
  {
    data: {
      id: "final_recommendation",
      bgColor: "#6F8CD4",
      fillColor: "#7390D6",
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Final Dating Advice"
        description={result.value as string}
      />
    ),
  },
];
