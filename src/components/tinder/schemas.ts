import { z } from "zod";

// User schema
const UserSchema = z.object({
  age_filter_max: z.number(),
  age_filter_min: z.number(),
  bio: z.string(),
  birth_date: z.string(),
  gender: z.string(),
  user_interests: z.array(z.string()),
  name: z.string(),
});

// Usage schema
const UsageSchema = z.object({
  app_opens: z.record(z.string(), z.number().nullable()),
  swipes_likes: z.record(z.string(), z.number().nullable()),
  swipes_passes: z.record(z.string(), z.number().nullable()),
  superlikes: z.record(z.string(), z.number().nullable()),
  matches: z.record(z.string(), z.number().nullable()),
  messages_sent: z.record(z.string(), z.number().nullable()),
  messages_received: z.record(z.string(), z.number().nullable()),
});

// Transform nested messages into array of message arrays, only keeping message content
const MessagesSchema = z
  .array(
    z.object({
      messages: z.array(
        z.object({
          message: z.string(),
        }),
      ),
    }),
  )
  .transform((data) =>
    // Transform to array of message arrays, only keeping message content
    data.map((match) =>
      match.messages.map((msg) => ({ message: msg.message })),
    ),
  );

// Spotify schema
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

// Main schema with objects at root level
export const TinderDataSchema = z
  .object({
    User: UserSchema,
    Usage: UsageSchema,
    Spotify: SpotifySchema,
    Messages: MessagesSchema,
  })
  .transform((data) => {
    const allMessages = data.Messages.flat().slice(-100);
    // Calculate totals from Usage data
    const totalAppOpens = Object.values(data.Usage.app_opens)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalSwipesLikes = Object.values(data.Usage.swipes_likes)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalSwipesPasses = Object.values(data.Usage.swipes_passes)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalSuperlikes = Object.values(data.Usage.superlikes)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalMatches = Object.values(data.Usage.matches)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalMessagesSent = Object.values(data.Usage.messages_sent)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const totalMessagesReceived = Object.values(data.Usage.messages_received)
      .filter((val): val is number => val !== null)
      .reduce((sum, val) => sum + val, 0);

    const daysWithAppOpens = Object.values(data.Usage.app_opens).filter(
      (val) => val !== null && val > 0,
    ).length;

    const daysWithMessages = Object.values(data.Usage.messages_sent).filter(
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

    const findPeakDay = (data: Record<string, number | null>) => {
      let maxValue = -Infinity;
      let peakDay = "";

      Object.entries(data).forEach(([date, value]) => {
        if (value !== null && value > maxValue) {
          maxValue = value;
          peakDay = date;
        }
      });

      return { date: peakDay, value: maxValue };
    };

    const peakDays = {
      appOpens: findPeakDay(data.Usage.app_opens),
      swipesLikes: findPeakDay(data.Usage.swipes_likes),
      swipesPasses: findPeakDay(data.Usage.swipes_passes),
      matches: findPeakDay(data.Usage.matches),
      messagesSent: findPeakDay(data.Usage.messages_sent),
      messagesReceived: findPeakDay(data.Usage.messages_received),
    };

    return {
      spotify: data.Spotify.spotify_theme_track,
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
        peakDays,
      },
      user: data.User,
    };
  });

export type TinderData = z.infer<typeof TinderDataSchema>;
