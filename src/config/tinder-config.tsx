import {
  type CardComponentProps,
  type CardItem,
  TextCard,
  TitleCard,
  MetricCard,
} from "@/components/story-cards";
import { cardConfig } from "./card-config";

export const tinderConfig: CardItem[] = [
  {
    id: "short_summary",
    card: cardConfig.card1,
    Component: TextCard,
  },
  {
    id: "alternative",
    card: cardConfig.card2,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What You Could've Done Instead"
        description={result.value as string}
      />
    ),
  },
  {
    id: "roast_bio",
    card: cardConfig.card3,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="How You Market Yourself on Tinder"
        description={result.value as string}
      />
    ),
  },
  {
    id: "age_preferences",
    card: cardConfig.card4,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Who You're Hoping Will Swipe Back"
        description={result.value as string}
      />
    ),
  },
  {
    id: "swipe_ratios",
    card: cardConfig.card5,
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
    id: "match_ratios",
    card: cardConfig.card6,
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
    id: "message_peak_day",
    card: cardConfig.card7,
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
    id: "total_messages_sent",
    card: cardConfig.card8,
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
    id: "chat_heavy_days",
    card: cardConfig.card9,
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
    id: "personality_insights",
    card: cardConfig.card10,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="How You Tried to Seem Interesting"
        description={result.value as string}
      />
    ),
  },
  {
    id: "theme_song_analysis",
    card: cardConfig.card11,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard title="Your Theme Song" description={result.value as string} />
    ),
  },
  {
    id: "bold_text_moves",
    card: cardConfig.card12,
    Component: TextCard,
  },
  {
    id: "bold_text_moves_2",
    card: cardConfig.card13,
    Component: TextCard,
  },
  {
    id: "bold_text_moves_3",
    card: cardConfig.card14,
    Component: TextCard,
  },
  {
    id: "message_style",
    card: cardConfig.card15,
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
    id: "red_flags",
    card: cardConfig.card16,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="Things That Make Matches Swipe Left"
        description={result.value as string}
      />
    ),
  },
  {
    id: "final_recommendation",
    card: cardConfig.card17,
    Component: ({ result }: CardComponentProps) => (
      <TitleCard
        title="What to Fix Before You Swipe Again"
        description={result.value as string}
      />
    ),
  },
];
