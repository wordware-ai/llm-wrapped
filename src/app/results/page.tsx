import { SpotifyResults } from "@/components/spotify/spotify-results";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function ResultsPage() {
  const user = await api.users.getCurrent();

  if (!user) {
    redirect("/");
  }

  return <SpotifyResults user={user} />;
}
