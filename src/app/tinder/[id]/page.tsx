import { TinderResults } from "@/components/tinder/tinder-results";
import { api } from "@/trpc/server";

export default async function TinderResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const tinderResult = await api.tinderResults.getById({
    id,
  });

  const profileData = {
    name: tinderResult?.name ?? undefined,
  };

  return (
    <TinderResults
      previousRun={tinderResult ?? undefined}
      profileData={profileData}
    />
  );
}
