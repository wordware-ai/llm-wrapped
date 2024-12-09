import {
  type CardComponentProps,
  type CardItem,
  TextCard,
  TitleCard,
  MetricCard,
} from "@/components/story-cards";
import { colorConfig } from "./color-config";

export const tinderConfig: CardItem[] = [
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
      id: "alternative",
      bgColor: colorConfig.color2.bgColor,
      fillColor: colorConfig.color2.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What You Could've Done Instead"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "roast_bio",
      bgColor: colorConfig.color3.bgColor,
      fillColor: colorConfig.color3.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="How You Market Yourself on Tinder"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "age_preferences",
      bgColor: colorConfig.color4.bgColor,
      fillColor: colorConfig.color4.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Who You're Hoping Will Swipe Back"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "swipe_ratios",
      bgColor: colorConfig.color5.bgColor,
      fillColor: colorConfig.color5.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="How Selective You Think You Are"
        value={result.ratio as string}
        description={result.description as string}
        valueColor="#A13D37"
      />
    ),
  },
  {
    data: {
      id: "match_ratios",
      bgColor: colorConfig.color6.bgColor,
      fillColor: colorConfig.color6.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="Your Match Game by the Numbers"
        value={result.ratio as string}
        description={result.description as string}
        valueColor="#6F0FA7"
      />
    ),
  },
  {
    data: {
      id: "message_peak_day",
      bgColor: colorConfig.color7.bgColor,
      fillColor: colorConfig.color7.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="That One Day You Really Tried"
        value={result.date as string}
        description={result.description as string}
        valueColor="#5F7118"
      />
    ),
  },
  {
    data: {
      id: "total_messages_sent",
      bgColor: colorConfig.color8.bgColor,
      fillColor: colorConfig.color8.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="How Many Messages Are Too Many? (Spoiler: This Many)"
        value={result.number as string}
        description={result.description as string}
        valueColor="#182571"
      />
    ),
  },
  {
    data: {
      id: "chat_heavy_days",
      bgColor: colorConfig.color9.bgColor,
      fillColor: colorConfig.color9.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="The Number of Days You Tried to Make It Work"
        value={result.days as string}
        description={result.description as string}
        valueColor="#2B4E31"
      />
    ),
  },
  {
    data: {
      id: "personality_insights",
      bgColor: colorConfig.color10.bgColor,
      fillColor: colorConfig.color10.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="How You Tried to Seem Interesting"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "theme_song_analysis",
      bgColor: colorConfig.color11.bgColor,
      fillColor: colorConfig.color11.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Your Theme Song" description={result.value as string} />
    ),
  },
  {
    data: {
      id: "bold_text_moves",
      bgColor: colorConfig.color12.bgColor,
      fillColor: colorConfig.color12.fillColor,
    },
    Component: TextCard,
  },
  {
    data: {
      id: "bold_text_moves_2",
      bgColor: colorConfig.color13.bgColor,
      fillColor: colorConfig.color13.fillColor,
    },
    Component: TextCard,
  },
  {
    data: {
      id: "bold_text_moves_3",
      bgColor: colorConfig.color14.bgColor,
      fillColor: colorConfig.color14.fillColor,
    },
    Component: TextCard,
  },
  {
    data: {
      id: "message_style",
      bgColor: colorConfig.color15.bgColor,
      fillColor: colorConfig.color15.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <MetricCard
        title="The Messaging Style That Got You Here"
        value={result.style as string}
        description={result.description as string}
        valueColor="#202405"
      />
    ),
  },
  {
    data: {
      id: "red_flags",
      bgColor: colorConfig.color17.bgColor,
      fillColor: colorConfig.color17.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Things That Make Matches Swipe Left"
        description={result.value as string}
      />
    ),
  },
  {
    data: {
      id: "final_recommendation",
      bgColor: colorConfig.color18.bgColor,
      fillColor: colorConfig.color18.fillColor,
    },
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What to Fix Before You Swipe Again"
        description={result.value as string}
      />
    ),
  },
];
