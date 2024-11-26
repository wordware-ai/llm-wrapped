import { z } from "zod";

// Base Schemas
export const imageSchema = z.object({
  height: z.number().nullable(),
  url: z.string().url(),
  width: z.number().nullable(),
});

export const externalUrlsSchema = z.object({
  spotify: z.string().url(),
});

export const followersSchema = z.object({
  href: z.null(),
  total: z.number(),
});

// Artist Schema
export const spotifyArtistSchema = z.object({
  external_urls: externalUrlsSchema,
  followers: followersSchema.optional().default({ href: null, total: 0 }),
  genres: z.array(z.string()).optional().default([]),
  href: z.string().url(),
  id: z.string(),
  images: z.array(imageSchema).nullable().default([]),
  name: z.string(),
  popularity: z.number().optional().default(0),
  type: z.literal("artist"),
  uri: z.string(),
});

// Track Schema
export const spotifyTrackSchema = z.object({
  album: z.object({
    album_type: z.string(),
    artists: z.array(spotifyArtistSchema),
    external_urls: externalUrlsSchema,
    href: z.string().url(),
    id: z.string(),
    images: z.array(imageSchema).nullable().default([]),
    name: z.string(),
    release_date: z.string(),
    release_date_precision: z.string(),
    total_tracks: z.number(),
    type: z.literal("album"),
    uri: z.string(),
  }),
  artists: z.array(spotifyArtistSchema),
  external_urls: externalUrlsSchema,
  href: z.string().url(),
  id: z.string(),
  name: z.string(),
  popularity: z.number(),
  preview_url: z.string().url().nullable(),
  track_number: z.number(),
  type: z.literal("track"),
  uri: z.string(),
});

// Playlist Schema
export const playlistSchema = z.object({
  collaborative: z.boolean(),
  description: z.string().nullable(),
  external_urls: externalUrlsSchema,
  href: z.string().url(),
  id: z.string(),
  images: z.array(imageSchema).nullable().default([]),
  name: z.string(),
  owner: z.object({
    display_name: z.string(),
    external_urls: externalUrlsSchema,
    href: z.string().url(),
    id: z.string(),
    type: z.string(),
    uri: z.string(),
  }),
  public: z.boolean(),
  tracks: z.object({
    href: z.string().url(),
    total: z.number(),
  }),
  type: z.literal("playlist"),
  uri: z.string(),
});

// Response Schemas
export const topArtistsResponseSchema = z.object({
  items: z.array(spotifyArtistSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  href: z.string().url(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
});

export const topTracksResponseSchema = z.object({
  items: z.array(spotifyTrackSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  href: z.string().url(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
});

export const playlistsResponseSchema = z.object({
  items: z.array(playlistSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  href: z.string().url(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
});

export const userProfileSchema = z.object({
  country: z.string(),
  display_name: z.string(),
  email: z.string().email(),
  explicit_content: z.object({
    filter_enabled: z.boolean(),
    filter_locked: z.boolean(),
  }),
  external_urls: externalUrlsSchema,
  followers: followersSchema,
  href: z.string().url(),
  id: z.string(),
  images: z.array(imageSchema),
  product: z.string(),
  type: z.string(),
  uri: z.string(),
});

export const recentlyPlayedTrackSchema = z.object({
  track: spotifyTrackSchema,
  played_at: z.string(),
  context: z
    .object({
      type: z.string(),
      href: z.string().url().nullable(),
      external_urls: externalUrlsSchema.nullable(),
      uri: z.string().nullable(),
    })
    .nullable(),
});

export const recentlyPlayedResponseSchema = z.object({
  items: z.array(recentlyPlayedTrackSchema).optional().default([]),
  next: z.string().url().nullable().optional(),
  cursors: z
    .object({
      after: z.string().nullable(),
      before: z.string().nullable(),
    })
    .optional()
    .default({ after: null, before: null }),
  limit: z.number().optional().default(20),
  href: z.string().optional().default(""),
});
