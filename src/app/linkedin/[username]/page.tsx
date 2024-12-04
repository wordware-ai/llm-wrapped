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
  let llmData;
  if (!linkedinResult) {
    const allData = await api.linkedinApi.getUserData({
      linkedinUrl: `https://www.linkedin.com/in/${(await params).username}`,
    });
    llmData = allData?.linkedinData;
    profileData = {
      imageUrl: allData?.imageUrl,
      name: allData?.name,
      username,
    };
  }

  return (
    <LinkedInResults
      linkedinResult={linkedinResult}
      llmData={llmData}
      profileData={profileData}
    />
  );
}
