import { z } from "zod";

// Helper schema for messages
const MessageSchema = z.object({
  to: z.union([z.number(), z.string()]).optional(),
  from: z.string().optional(),
  message: z.string().optional(),
  sent_date: z.string().optional(),
  type: z.string().optional(),
  fixed_height: z.string().optional(),
});

const SpotifySchema = z.object({
  spotify_connected: z.boolean(),
  spotify_theme_track: z
    .object({
      id: z.string(),
      name: z.string(),
      album: z.object({
        id: z.string(),
        name: z.string(),
        images: z.array(
          z.object({
            height: z.number(),
            width: z.number(),
            url: z.string(),
          }),
        ),
      }),
      artists: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
        }),
      ),
      preview_url: z.string(),
      uri: z.string(),
    })
    .optional(),
});

const UserSchema = z.object({
  age_filter_max: z.number(),
  age_filter_min: z.number(),
  bio: z.string(),
  birth_date: z.string(),
  gender: z.string(),
  user_interests: z.array(z.string()),
  name: z.string(),
});

const UsageSchema = z.object({
  app_opens: z.record(z.string(), z.number().nullable()),
  swipes_likes: z.record(z.string(), z.number().nullable()),
  swipes_passes: z.record(z.string(), z.number().nullable()),
  superlikes: z.record(z.string(), z.number().nullable()),
  matches: z.record(z.string(), z.number().nullable()),
  messages_sent: z.record(z.string(), z.number().nullable()),
  messages_received: z.record(z.string(), z.number().nullable()),
  User: UserSchema,
});

// Main schema
export const TinderDataSchema = z
  .object({
    Messages: z.array(
      z.object({
        match_id: z.string(),
        messages: z.array(MessageSchema).optional().default([]),
        Usage: UsageSchema.optional(),
        Spotify: SpotifySchema.optional(),
      }),
    ),
  })
  .transform((data) => {
    const lastMessage = data.Messages[data.Messages.length - 1];
    const usage = lastMessage?.Usage;

    if (!usage) return null;

    // Collect all messages from all matches
    const allMessages = data.Messages.flatMap(
      (match) =>
        match.messages?.map((msg) => msg.message).filter(Boolean) || [],
    );

    // Calculate totals and stats
    const totalAppOpens = Object.values(usage.app_opens)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalSwipesLikes = Object.values(usage.swipes_likes)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalSwipesPasses = Object.values(usage.swipes_passes)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalSuperlikes = Object.values(usage.superlikes)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalMatches = Object.values(usage.matches)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalMessagesSent = Object.values(usage.messages_sent)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalMessagesReceived = Object.values(usage.messages_received)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const daysWithAppOpens = Object.values(usage.app_opens).filter(
      (val) => val !== null && val > 0,
    ).length;

    const daysWithMessages = Object.values(usage.messages_sent).filter(
      (val) => val !== null && val > 0,
    ).length;

    const swipeRightToLeftRatio = (
      (totalSwipesLikes / (totalSwipesLikes + totalSwipesPasses)) *
      100
    ).toFixed(1);

    const matchesToSwipeRightRatio = (
      (totalMatches / totalSwipesLikes) *
      100
    ).toFixed(1);

    const matchesRatio = (
      (totalMatches / (totalSwipesLikes + totalSwipesPasses)) *
      100
    ).toFixed(1);

    const averageSwipesPerDay = Math.round(
      (totalSwipesLikes + totalSwipesPasses) / daysWithAppOpens,
    );

    return {
      spotify: lastMessage?.Spotify?.spotify_theme_track,
      messages: allMessages,
      stats: {
        totalAppOpens,
        totalSwipesLikes,
        totalSwipesPasses,
        totalSuperlikes,
        totalMatches,
        totalMessagesSent,
        totalMessagesReceived,
        daysWithAppOpens,
        daysWithMessages,
        swipeRightToLeftRatio,
        matchesToSwipeRightRatio,
        matchesRatio,
        averageSwipesPerDay,
        appOpensByDate: usage.app_opens,
        swipeLikesByDate: usage.swipes_likes,
        swipePassesByDate: usage.swipes_passes,
        matchesByDate: usage.matches,
        messagesSentByDate: usage.messages_sent,
        messagesReceivedByDate: usage.messages_received,
      },
      user: usage.User,
    };
  });

export type TinderData = z.infer<typeof TinderDataSchema>;
