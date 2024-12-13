"use client";

import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
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
import { PDFInput } from "./pdf-input";
import { validateImage } from "@/lib/validate-image";

export function LinkedInResults({
  initialLinkedinResult,
  snapshotId,
  initialProfileData,
}: {
  initialLinkedinResult: LinkedinResult | null;
  snapshotId?: string;
  initialProfileData?: {
    imageUrl?: string;
    name?: string;
    username?: string;
    currentPositionImageUrl?: string;
  };
}) {
  const utils = api.useUtils();
  const { mutate: createLinkedinResult } =
    api.linkedinResults.upsert.useMutation({
      onSuccess: async (data) => {
        await utils.linkedinResults.getByUsername.invalidate({ username });
        setProfileData({
          imageUrl: data.imageUrl,
          name: data.name,
          username: data.username,
        });
      },
    });

  const { username: usernameParam } = useParams();
  const username = usernameParam as string;

  const { results, setResults, profileData, setProfileData, isLoading } =
    useStreamContext();
  const { streamResponse } = useStream();
  const { pollData } = usePoll();

  const { data: linkedinResult } = api.linkedinResults.getByUsername.useQuery(
    { username },
    {
      initialData: initialLinkedinResult,
      staleTime: Infinity, // Prevents refetching until invalidation
    },
  );

  const [renderScrapeFailed, setRenderScrapeFailed] = useState(
    linkedinResult?.scrapeFailed && !linkedinResult.short_summary,
  );
  const [pdfData, setPdfData] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    setResults({});
    setProfileData({});
    if (linkedinResult && !pdfData) {
      const displayResults = convertLinkedinDbToState(linkedinResult);
      setResults(displayResults);
      // Set initial profile data
      if (initialProfileData) {
        setProfileData(initialProfileData);
      }
    } else if (snapshotId || pdfData) {
      const handleStreamAndCreateResult = (
        data: string,
        profileData: {
          imageUrl?: string;
          name?: string;
          currentCompanyImageUrl?: string;
        },
      ) => {
        return streamResponse({
          promptId: "eb98a6bb-d867-42a3-a475-1e0546c9f638",
          data,
          onFinish: (results: Record<string, unknown>) => {
            const linkedinResult = {
              ...convertLinkedinToDb(results),
              ...profileData,
              username: username ?? "",
            };
            createLinkedinResult(linkedinResult);
          },
        });
      };

      const createProfileData = (
        data: {
          imageUrl?: string;
          name?: string;
          currentCompanyImageUrl?: string;
        } = {},
      ) => {
        const profileData = {
          imageUrl:
            validateImage(data.imageUrl) ??
            "https://i.pinimg.com/originals/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg",
          name: data.name ?? username ?? null,
          currentPositionImageUrl:
            validateImage(data.currentCompanyImageUrl) ?? null,
          username: username,
        };
        setProfileData(profileData);
        return profileData;
      };

      if (pdfData) {
        const profileData = createProfileData({
          name: linkedinResult?.name ?? username,
          imageUrl: linkedinResult?.imageUrl ?? "",
        });
        return void handleStreamAndCreateResult(pdfData, profileData);
      } else if (snapshotId) {
        void pollData(snapshotId)
          .then((data) => {
            if (data.noExperienceData) {
              console.log("data", data);
              createLinkedinResult({
                username: username,
                scrapeFailed: true,
                name: data.profileData?.name ?? username,
                imageUrl: data.profileData?.avatar ?? "",
              });
              setRenderScrapeFailed(true);
              return;
            }

            const profileData = createProfileData({
              imageUrl: data.imageUrl ?? undefined,
              name: data.name ?? undefined,
              currentCompanyImageUrl: data.currentCompanyImageUrl ?? undefined,
            });

            return void handleStreamAndCreateResult(
              data.linkedinData ?? "",
              profileData,
            );
          })
          .catch((error) => {
            console.error("Error while polling or streaming:", error);
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshotId, renderScrapeFailed]);

  return (
    <>
      <ResultsPage
        user={{
          username,
          name: profileData?.name ?? "",
          imageUrl:
            profileData?.imageUrl ??
            "https://i.pinimg.com/originals/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg",
          storyHref: `/linkedin/${username}?slide=1`,
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
      {renderScrapeFailed && (
        <PDFInput
          setRenderScrapeFailed={setRenderScrapeFailed}
          setPdfData={setPdfData}
        />
      )}
    </>
  );
}
