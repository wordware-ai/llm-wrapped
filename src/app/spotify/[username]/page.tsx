import { SpotifyResults } from "@/components/spotify/spotify-results";
import { api } from "@/trpc/server";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const user = await api.users.getByUsername({
    username: (await params).username,
  });

  if (!user) return <p>User not found</p>;

  return <SpotifyResults user={user} />;
}
