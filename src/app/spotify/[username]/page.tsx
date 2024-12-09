import { SpotifyResults } from "@/components/spotify/spotify-results";
import { getSession } from "@/lib/supabase/server";
import { api } from "@/trpc/server";

export default async function SpotifyResultsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  const spotifyResult = await api.spotifyResults.getByUsername({
    username,
  });

  const { session } = await getSession();

  // this can be improved
  let profileData;
  let llmData;
  if (!spotifyResult && session?.provider_token) {
    const allData = await api.spotifyApi.getAllUserData();
    llmData = allData?.spotifyData;
    profileData = {
      leastPopularImageUrl: allData?.imageUrls.leastPopularImageUrl ?? null,
      mostPopularImageUrl: allData?.imageUrls.mostPopularImageUrl ?? null,
      topArtistImageUrl: allData?.imageUrls.topArtistImageUrl ?? null,
      leastPopularUrl: allData?.artistUrls.leastPopularUrl ?? null,
      mostPopularUrl: allData?.artistUrls.mostPopularUrl ?? null,
      topArtistUrl: allData?.artistUrls.topArtistUrl ?? null,
    };
  } else {
    profileData = {
      leastPopularImageUrl: spotifyResult?.leastPopularImageUrl ?? null,
      mostPopularImageUrl: spotifyResult?.mostPopularImageUrl ?? null,
      topArtistImageUrl: spotifyResult?.topArtistImageUrl ?? null,
      leastPopularUrl: spotifyResult?.leastPopularUrl ?? null,
      mostPopularUrl: spotifyResult?.mostPopularUrl ?? null,
      topArtistUrl: spotifyResult?.topArtistUrl ?? null,
    };
  }

  return (
    <SpotifyResults
      previousRun={spotifyResult ?? undefined}
      profileData={profileData}
      llmData={llmData}
    />
  );
}
