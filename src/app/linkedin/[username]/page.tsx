import { LinkedInResults } from "@/components/linkedin/linkedin-results";
import { api } from "@/trpc/server";

export default async function LinkedInResultsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const linkedinResult = await api.linkedinResults.getByUsername({
    username,
  });

  let profileData;
  let snapshotId: string | undefined;
  if (!linkedinResult) {
    snapshotId = await api.linkedinApi.triggerScrape({
      linkedinUrl: `https://www.linkedin.com/in/${(await params).username}`,
    });
  } else {
    profileData = {
      imageUrl: linkedinResult.imageUrl ?? undefined,
      name: linkedinResult.name ?? undefined,
      username,
      currentPositionImageUrl:
        linkedinResult.currentPositionImageUrl ?? undefined,
    };
  }

  return (
    <LinkedInResults
      initialLinkedinResult={linkedinResult}
      snapshotId={snapshotId}
      initialProfileData={profileData}
    />
  );
}
