import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { z } from "zod";
import {
  playlistsResponseSchema,
  recentlyPlayedResponseSchema,
  topArtistsResponseSchema,
  topTracksResponseSchema,
  userProfileSchema,
} from "./schemas";

// TRPC Router
export const spotifyApiRouter = createTRPCRouter({
  getTopArtists: privateProcedure
    .input(
      z
        .object({
          timeRange: z
            .enum(["short_term", "medium_term", "long_term"])
            .optional(),
          limit: z.number().min(1).max(50).optional(),
          offset: z.number().min(0).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const params = new URLSearchParams({
        time_range: input?.timeRange ?? "medium_term",
        limit: (input?.limit ?? 20).toString(),
        offset: (input?.offset ?? 0).toString(),
      });

      const response = await fetch(
        `https://api.spotify.com/v1/me/top/artists?${params}`,
        {
          headers: {
            Authorization: `Bearer ${ctx.session?.provider_token}`,
          },
        },
      );

      const data = (await response.json()) as unknown;
      return topArtistsResponseSchema.parse(data);
    }),

  getTopTracks: privateProcedure
    .input(
      z
        .object({
          timeRange: z
            .enum(["short_term", "medium_term", "long_term"])
            .optional(),
          limit: z.number().min(1).max(50).optional(),
          offset: z.number().min(0).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const params = new URLSearchParams({
        time_range: input?.timeRange ?? "medium_term",
        limit: (input?.limit ?? 20).toString(),
        offset: (input?.offset ?? 0).toString(),
      });

      const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?${params}`,
        {
          headers: {
            Authorization: `Bearer ${ctx.session?.provider_token}`,
          },
        },
      );

      const data = (await response.json()) as unknown;
      return topTracksResponseSchema.parse(data);
    }),

  getUserProfile: privateProcedure.query(async ({ ctx }) => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${ctx.session?.provider_token}`,
      },
    });

    const data = (await response.json()) as unknown;
    return userProfileSchema.parse(data);
  }),

  getPlaylists: privateProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(50).optional(),
          offset: z.number().min(0).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const params = new URLSearchParams({
        limit: (input?.limit ?? 20).toString(),
        offset: (input?.offset ?? 0).toString(),
      });

      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?${params}`,
        {
          headers: {
            Authorization: `Bearer ${ctx.session?.provider_token}`,
          },
        },
      );

      const data = (await response.json()) as unknown;
      return playlistsResponseSchema.parse(data);
    }),

  getRecentlyPlayed: privateProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(50).optional(),
          before: z.number().optional(),
          after: z.number().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const params = new URLSearchParams({
        limit: (input?.limit ?? 20).toString(),
      });

      if (input?.before) params.append("before", input.before.toString());
      if (input?.after) params.append("after", input.after.toString());

      const response = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?${params}`,
        {
          headers: {
            Authorization: `Bearer ${ctx.session?.provider_token}`,
          },
        },
      );

      const data = (await response.json()) as unknown;
      return recentlyPlayedResponseSchema.parse(data);
    }),
});
