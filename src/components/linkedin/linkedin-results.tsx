"use client";

import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { type UserWithSpotifyResult } from "@/types/user";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";

import { convertDbToState, convertStateToDb } from "@/lib/convert-results";
import WordwareInfo from "../wordware-info";
import { type LinkedinResult } from "@prisma/client";

export function LinkedInResults({
  linkedinResult,
  linkedinData,
}: {
  linkedinResult: LinkedinResult | null;
  linkedinData?: string;
}) {
  const previousRun = linkedinResult;

  const { mutate: createLinkedinResult } =
    api.linkedinResults.createLinkedinResult.useMutation();

  const onFinish = (results: Record<string, unknown>) => {
    const linkedinResult = convertStateToDb(results);
    createLinkedinResult(linkedinResult);
  };

  const { setResults } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "45bf050b-4223-45c1-9fd6-a2d6c6b2ac1d",
    data: spotifyData ?? "",
    onFinish,
  });

  useEffect(() => {
    if (previousRun) {
      const displayResults = convertDbToState(previousRun);
      setResults(displayResults);
    } else {
      if (spotifyData) {
        void streamResponse({ initialState: { ...data?.imageUrls } });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousRun, spotifyData]);

  return (
    <div className="flex flex-col">
      {/* <Navbar />
      <div className="flex flex-col gap-4 sm:pb-16 lg:h-[calc(100vh-56px)] lg:flex-row">
        <UserInfo user={user} />
        <SideCards />
      </div> */}
      <WordwareInfo />
    </div>
  );
}
