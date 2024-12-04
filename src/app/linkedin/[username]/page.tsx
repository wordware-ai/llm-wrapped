import { LinkedInResults } from "@/components/linkedin/linkedin-results";
import { api } from "@/trpc/server";
import { Suspense } from "react";

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
  let llmData;
  if (!linkedinResult) {
    const allData = await api.linkedinApi.getUserData({
      linkedinUrl: `https://www.linkedin.com/in/${(await params).username}`,
    });
    llmData = allData?.linkedinData;
    profileData = {
      imageUrl: allData?.imageUrl ?? undefined,
      name: allData?.name ?? undefined,
      username,
      currentPositionImageUrl: allData?.currentCompanyImageUrl ?? undefined,
    };
  } else {
    profileData = {
      imageUrl: linkedinResult.imageUrl ?? undefined,
      name: linkedinResult.name ?? undefined,
      username,
      currentPositionImageUrl:
        linkedinResult.currentPositionImageUrl ?? undefined,
    };
  }

  console.log("profileData", profileData);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LinkedInResults
        linkedinResult={linkedinResult}
        llmData={llmData}
        profileData={profileData}
      />
    </Suspense>
  );
}
