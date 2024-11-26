import { SpotifyResults } from "@/components/spotify-results";
import { api } from "@/trpc/server";

export default async function ResultsPage() {
  // Fetch all data concurrently
  const [topArtists, topTracks, profile, playlists, recentlyPlayed] =
    await Promise.all([
      api.spotifyApi.getTopArtists(),
      api.spotifyApi.getTopTracks(),
      api.spotifyApi.getUserProfile(),
      api.spotifyApi.getPlaylists(),
      api.spotifyApi.getRecentlyPlayed(),
    ]);

  const spotifyResult = await api.spotifyUser.getSpotifyResult();

  return (
    <div>
      <div className="h-14 w-full">Wordware</div>
      <SpotifyResults
        data={JSON.stringify({
          topArtists,
          topTracks,
          profile,
          playlists,
          recentlyPlayed,
        })}
      />
    </div>
  );
}
