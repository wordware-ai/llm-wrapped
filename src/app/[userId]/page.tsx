import { SpotifyResults } from "@/components/spotify/spotify-results";
import { api } from "@/trpc/server";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const user = await api.users.getById({ id: (await params).userId });

  if (!user) return <p>User not found</p>;

  return <SpotifyResults user={user} />;
}
