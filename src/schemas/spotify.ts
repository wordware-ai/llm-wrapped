import { z } from "zod";

const levelRatingSchema = z.object({
  level: z.string(),
  description: z.string(),
});

const achievementSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const spotifyResultsSchema = z.object({
  short_summary: z.string(),
  music_taste_analysis_1: z.string(),
  music_taste_analysis_2: z.string(),
  music_taste_analysis_3: z.string(),
  lyric_therapy_needed: z.string(),
  identity_crisis_level: levelRatingSchema,
  emotional_stability_ranking: levelRatingSchema,
  achievement: achievementSchema,
  dance_floor_credibility: z.string(),
  song_you_would_hit_the_dance_floor: z.string(),
  songs_you_secretly_think_are_about_you: z.string(),
  guilty_pleasure_song: z.string(),
  least_popular_artist: z.string(),
  most_popular_artist: z.string(),
  time_machine_status: z.string(),
  titles_that_need_therapy: z.string(),
  final_diagnosis: z.string(),
  recommendation: z.string(),
});

// Type can be inferred from the schema
export type SpotifyResults = z.infer<typeof spotifyResultsSchema>;
