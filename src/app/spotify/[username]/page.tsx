import { SpotifyResults } from "@/components/spotify/spotify-results";
import { getSession } from "@/lib/supabase/server";
import { api } from "@/trpc/server";

export default async function SpotifyResultsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  const user = await api.users.getByUsername({
    username,
  });

  const { session } = await getSession();

  let profileData;
  let llmData;
  if (!user?.spotifyResult && session?.provider_token) {
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
      leastPopularImageUrl: user?.spotifyResult?.leastPopularImageUrl ?? null,
      mostPopularImageUrl: user?.spotifyResult?.mostPopularImageUrl ?? null,
      topArtistImageUrl: user?.spotifyResult?.topArtistImageUrl ?? null,
      leastPopularUrl: user?.spotifyResult?.leastPopularUrl ?? null,
      mostPopularUrl: user?.spotifyResult?.mostPopularUrl ?? null,
      topArtistUrl: user?.spotifyResult?.topArtistUrl ?? null,
    };
  }

  if (!user) return <p>User not found</p>;

  return (
    <SpotifyResults user={user} profileData={profileData} llmData={llmData} />
  );
}
