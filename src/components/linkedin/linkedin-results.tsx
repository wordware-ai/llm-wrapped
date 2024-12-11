"use client";

import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";
import { usePoll } from "@/hooks/use-poll";

import {
  convertLinkedinDbToState,
  convertLinkedinToDb,
} from "@/lib/convert-linkedin";
import { type LinkedinResult } from "@prisma/client";
import { ResultsPage } from "../results-page";
import { useParams } from "next/navigation";
import LinkedinLoadingPage from "./linkedin-loading-page";

export function LinkedInResults({
  linkedinResult,
  snapshotId,
  initialProfileData,
}: {
  linkedinResult: LinkedinResult | null;
  snapshotId?: string;
  initialProfileData?: {
    imageUrl?: string;
    name?: string;
    username?: string;
    currentPositionImageUrl?: string;
  };
}) {
  const { mutate: createLinkedinResult } =
    api.linkedinResults.createLinkedinResult.useMutation();

  const { username } = useParams();

  const { results, setResults, profileData, setProfileData } =
    useStreamContext();
  const { streamResponse } = useStream();
  const { pollData } = usePoll();

  useEffect(() => {
    setResults({});
    setProfileData({});
    if (linkedinResult) {
      const displayResults = convertLinkedinDbToState(linkedinResult);
      setResults(displayResults);
      // Set initial profile data
      if (initialProfileData) {
        setProfileData(initialProfileData);
      }
    } else if (snapshotId) {
      void pollData(snapshotId)
        .then((data) => {
          if (!data) {
            console.warn("No data received from polling");
            return;
          }

          // Update profile data first
          const updatedProfileData = {
            imageUrl: data.imageUrl ?? null,
            name: data.name ?? null,
            currentPositionImageUrl: data.currentCompanyImageUrl ?? null,
            username: username as string,
          };

          setProfileData(updatedProfileData);

          // Then handle the stream response
          return streamResponse({
            promptId: "eb98a6bb-d867-42a3-a475-1e0546c9f638",
            data: data.linkedinData ?? "",
            onFinish: (results: Record<string, unknown>) => {
              const linkedinResult = {
                ...convertLinkedinToDb(results),
                ...updatedProfileData,
                username: (username as string) ?? "",
              };
              createLinkedinResult(linkedinResult);
            },
          });
        })
        .catch((error) => {
          console.error("Error while polling or streaming:", error);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedinResult, snapshotId]);

  return (
    <ResultsPage
      user={{
        username: profileData?.username ?? "",
        name: profileData?.name ?? "",
        imageUrl: profileData?.imageUrl ?? "",
        storyHref: `/linkedin/${username as string}?slide=1`,
      }}
      cards={{
        card1text: results.short_summary as string,
        card2: {
          title: "Current Position",
          text: results.current_position as string,
          imageUrl: profileData?.currentPositionImageUrl ?? "",
        },
        card3text: results.actual_position as string,
        wordwareStoryHref: `/linkedin/${profileData?.username}?name=wordware&slide=1`,
        showWordwareCard: !!results.position_mother,
      }}
      LoadingState={
        Object.keys(results).length === 0 && !linkedinResult ? (
          <LinkedinLoadingPage />
        ) : null
      }
    />
  );
}
