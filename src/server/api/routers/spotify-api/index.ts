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
  getAllUserData: privateProcedure
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

      // Fetch all data in parallel
      const [topArtists, topTracks, userProfile, playlists, recentlyPlayed] =
        await Promise.all([
          // Top Artists
          fetch(`https://api.spotify.com/v1/me/top/artists?${params}`, {
            headers: {
              Authorization: `Bearer ${ctx.session?.provider_token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => topArtistsResponseSchema.parse(data)),

          // Top Tracks
          fetch(`https://api.spotify.com/v1/me/top/tracks?${params}`, {
            headers: {
              Authorization: `Bearer ${ctx.session?.provider_token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => topTracksResponseSchema.parse(data)),

          // User Profile
          fetch("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${ctx.session?.provider_token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => userProfileSchema.parse(data)),

          // Playlists
          fetch(`https://api.spotify.com/v1/me/playlists?${params}`, {
            headers: {
              Authorization: `Bearer ${ctx.session?.provider_token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => playlistsResponseSchema.parse(data)),

          // Recently Played
          fetch(
            `https://api.spotify.com/v1/me/player/recently-played?limit=${
              input?.limit ?? 20
            }`,
            {
              headers: {
                Authorization: `Bearer ${ctx.session?.provider_token}`,
              },
            },
          )
            .then((res) => res.json())
            .then((data) => recentlyPlayedResponseSchema.parse(data)),
        ]);

      return {
        topArtists: topArtistsResponseSchema.parse(topArtists),
        topTracks: topTracksResponseSchema.parse(topTracks),
        userProfile: userProfileSchema.parse(userProfile),
        playlists: playlistsResponseSchema.parse(playlists),
        recentlyPlayed: recentlyPlayedResponseSchema.parse(recentlyPlayed),
      };
    }),
});
