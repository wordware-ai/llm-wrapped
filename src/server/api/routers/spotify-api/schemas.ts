import { z } from "zod";

// Artist Schema
export const spotifyArtistSchema = z.object({
  name: z.string(),
  popularity: z.number().optional(),
  followers: z
    .object({
      total: z.number(),
    })
    .optional(),
});

// Track Schema
export const spotifyTrackSchema = z.object({
  album: z.object({
    name: z.string(),
    release_date: z.string(),
  }),
  artists: z.array(spotifyArtistSchema),
  name: z.string(),
  popularity: z.number(),
});

// Playlist Schema
export const playlistSchema = z.object({
  name: z.string(),
  tracks: z.object({
    total: z.number(),
  }),
});

// Response Schemas
export const topArtistsResponseSchema = z.object({
  items: z.array(spotifyArtistSchema),
  total: z.number(),
});

export const topTracksResponseSchema = z.object({
  items: z.array(spotifyTrackSchema),
  total: z.number(),
});

export const playlistsResponseSchema = z.object({
  items: z.array(playlistSchema),
  total: z.number(),
});

export const recentlyPlayedTrackSchema = z.object({
  track: spotifyTrackSchema,
  played_at: z.string(),
});

export const recentlyPlayedResponseSchema = z.object({
  items: z.array(recentlyPlayedTrackSchema).optional().default([]),
  limit: z.number().optional().default(20),
});
