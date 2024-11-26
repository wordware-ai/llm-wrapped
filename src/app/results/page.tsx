import { SpotifyResults } from "@/components/spotify/spotify-results";
import { api } from "@/trpc/server";

export default async function ResultsPage() {
  // Fetch all data concurrently
  const { topArtists, topTracks, playlists, recentlyPlayed } =
    await api.spotifyApi.getAllUserData();

  const spotifyResult = await api.spotifyUser.getSpotifyResult();

  return (
    <div>
      <div className="h-14 w-full">Wordware</div>
      <SpotifyResults
        data={JSON.stringify({
          topArtists,
          topTracks,
          playlists,
          recentlyPlayed,
        })}
        result={spotifyResult ?? undefined}
      />
    </div>
  );
}
