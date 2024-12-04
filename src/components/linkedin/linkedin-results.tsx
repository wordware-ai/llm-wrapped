"use client";

import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";

import {
  convertLinkedinDbToState,
  convertLinkedinToDb,
} from "@/lib/convert-linkedin";
import { type LinkedinResult } from "@prisma/client";
import { ResultsPage } from "../results-page";

export function LinkedInResults({
  linkedinResult,
  llmData,
  profileData,
}: {
  linkedinResult: LinkedinResult | null;
  llmData?: string;
  profileData?: {
    imageUrl?: string;
    name?: string;
    username?: string;
    currentPositionImageUrl?: string;
  };
}) {
  const { mutate: createLinkedinResult } =
    api.linkedinResults.createLinkedinResult.useMutation();

  const onFinish = (results: Record<string, unknown>) => {
    const linkedinResult = {
      ...convertLinkedinToDb(results),
      username: profileData?.username ?? "",
      imageUrl: profileData?.imageUrl ?? null,
      name: profileData?.name ?? null,
      currentPositionImageUrl: profileData?.currentPositionImageUrl ?? null,
    };
    createLinkedinResult(linkedinResult);
  };

  const { results, setResults } = useStreamContext();
  const { streamResponse } = useStream();

  useEffect(() => {
    if (linkedinResult) {
      const displayResults = convertLinkedinDbToState(linkedinResult);
      setResults(displayResults);
    } else {
      void streamResponse({
        promptId: "81464643-a0e0-4982-9370-9bc37fd9a4a5",
        data: llmData ?? "",
        onFinish,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedinResult]);

  return (
    <ResultsPage
      user={{
        username: profileData?.username ?? "",
        name: profileData?.name ?? "",
        imageUrl: profileData?.imageUrl ?? "",
        storyHref: `/linkedin/${profileData?.username}?slide=1`,
      }}
      cards={{
        card1text: results.short_summary as string,
        card2: {
          title: "Current Position",
          text: results.current_position as string,
          imageUrl: profileData?.currentPositionImageUrl ?? "",
        },
        card3text: results.actual_position as string,
        storyHref: `/linkedin/${profileData?.username}?slide=1`,
      }}
    />
  );
}
