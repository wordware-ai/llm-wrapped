import { SpotifyResults } from "@/components/spotify/spotify-results";
import { getSession } from "@/lib/supabase/server";
import { api } from "@/trpc/server";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const user = await api.users.getById({ id: (await params).userId });

  if (!user) return <p>User not found</p>;

  const data = await api.spotifyApi.getAllUserData();

  const { session } = await getSession();
  console.log(session?.provider_token);

  console.log(data);

  return <SpotifyResults user={user} />;
}
