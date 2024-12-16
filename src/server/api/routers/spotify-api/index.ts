import { convertSpotifyDataToMarkdown } from "@/lib/convert-to-markdown";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  playlistsResponseSchema,
  topArtistsResponseSchema,
  topTracksResponseSchema,
} from "./schemas";
export const spotifyApiRouter = createTRPCRouter({
  getAllUserData: privateProcedure.query(async ({ ctx }) => {
    const params = new URLSearchParams({
      time_range: "medium_term",
      limit: "50",
    });

    // Fetch all data in parallel
    const [topArtists, topTracks, playlists] = await Promise.all([
      // Top Artists
      fetch(`https://api.spotify.com/v1/me/top/artists?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${ctx.session?.provider_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => topArtistsResponseSchema.parse(data)),

      // Top Tracks
      fetch(`https://api.spotify.com/v1/me/top/tracks?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${ctx.session?.provider_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => topTracksResponseSchema.parse(data)),

      // Playlists
      fetch(`https://api.spotify.com/v1/me/playlists?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${ctx.session?.provider_token}`,
        },
      })
        .then((res) => res.json())

        .then((data) => playlistsResponseSchema.parse(data)),
    ]);

    // Transform the data
    const allArtistNames = topArtists.items.map((artist) => artist.name);

    const allTracks = topTracks.items.map((track) => ({
      trackName: track.name,
      artistName: track.artists[0]?.name,
    }));

    const playlistNames = playlists.items.map((playlist) => playlist?.name);

    // Get top 5 least popular artists
    const leastPopularArtists = [...topArtists.items]
      .sort((a, b) => (a.popularity ?? 0) - (b.popularity ?? 0))
      .slice(0, 5);

    // Get top 5 most popular artists by popularity
    const mostPopularArtists = [...topArtists.items]
      .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
      .slice(0, 5);

    // Get top 5 artists by followers
    const mostFollowedArtists = [...topArtists.items]
      .sort((a, b) => (b.followers?.total ?? 0) - (a.followers?.total ?? 0))
      .slice(0, 5);

    // Get top 5 oldest songs
    const oldestSongs = [...topTracks.items]
      .sort(
        (a, b) =>
          new Date(a.album.release_date).getTime() -
          new Date(b.album.release_date).getTime(),
      )
      .slice(0, 5)
      .map((track) => ({
        name: track.name,
        artist: track.artists[0]?.name,
        releaseDate: track.album.release_date,
        albumName: track.album.name,
      }));

    const transformedData = {
      allArtistNames,
      allTracks,
      playlistNames,
      topArtistName: topArtists.items[0]?.name,
      leastPopularArtists,
      mostPopularArtists,
      mostFollowedArtists,
      oldestSongs,
    };

    // Get the required image URLs
    const imageUrls = {
      mostPopularImageUrl: mostPopularArtists[0]?.images?.[0]?.url ?? null,
      leastPopularImageUrl: leastPopularArtists[0]?.images?.[0]?.url ?? null,
      topArtistImageUrl: topArtists.items[0]?.images?.[0]?.url ?? null,
    };

    const createUrl = (uri: string) => {
      const cleanedUri = uri.replace("spotify:artist:", "");
      return `https://open.spotify.com/artist/${cleanedUri}`;
    };

    const artistUrls = {
      mostPopularUrl: createUrl(mostPopularArtists[0]?.uri ?? ""),
      leastPopularUrl: createUrl(leastPopularArtists[0]?.uri ?? ""),
      topArtistUrl: createUrl(topArtists.items[0]?.uri ?? ""),
    };

    return {
      spotifyData: convertSpotifyDataToMarkdown(transformedData),
      imageUrls,
      artistUrls,
    };
  }),
});
