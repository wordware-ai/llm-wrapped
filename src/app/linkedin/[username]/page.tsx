import { LinkedInResults } from "@/components/linkedin/linkedin-results";
import { api } from "@/trpc/server";

export default async function LinkedInResultsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const linkedinResult = await api.linkedinResults.getByUsername({
    username: (await params).username,
  });

  let linkedinData;

  if (!linkedinResult) {
    const data = await api.linkedinApi.getUserData({
      linkedinUrl: `https://www.linkedin.com/in/${(await params).username}`,
    });
    linkedinData = data.linkedinData;
  }

  return (
    <LinkedInResults
      linkedinResult={linkedinResult}
      linkedinData={linkedinData}
    />
  );
}
