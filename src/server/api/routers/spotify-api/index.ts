import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  playlistsResponseSchema,
  recentlyPlayedResponseSchema,
  topArtistsResponseSchema,
  topTracksResponseSchema,
  userProfileSchema,
} from "./schemas";

// TRPC Router
export const spotifyApiRouter = createTRPCRouter({
  getAllUserData: privateProcedure.query(async ({ ctx }) => {
    const params = new URLSearchParams({
      time_range: "long_term",
      limit: "50",
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
        fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
          headers: {
            Authorization: `Bearer ${ctx.session?.provider_token}`,
          },
        })
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
