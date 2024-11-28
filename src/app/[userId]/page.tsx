import { SpotifyResults } from "@/components/spotify/spotify-results";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const user = await api.users.getById({ id: (await params).userId });

  if (!user) {
    redirect("/");
  }

  return <SpotifyResults user={user} />;
}
