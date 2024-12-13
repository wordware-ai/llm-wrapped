"use client";

import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { type TinderResult } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";

import {
  convertTinderDbToState,
  convertTinderToDb,
} from "@/lib/convert-tinder";
import { ResultsPage } from "../results-page";

interface StoredTinderData {
  llmdata: string;
  name: string;
}

export function TinderResults({
  previousRun,
  profileData,
}: {
  previousRun?: TinderResult;
  profileData?: {
    name?: string;
  };
}) {
  const { id } = useParams();

  const { mutate: createTinderResult } = api.tinderResults.create.useMutation();

  const {
    results,
    setResults,
    profileData: newProfileData,
    setProfileData,
    isLoading,
  } = useStreamContext();
  const { streamResponse } = useStream();

  const { data: tinderResult } = api.tinderResults.getById.useQuery(
    { id: id as string },
    {
      initialData: previousRun,
      staleTime: Infinity, // Prevents refetching until invalidation
    },
  );

  useEffect(() => {
    if (isLoading) return;
    setResults({});
    setProfileData({});
    if (tinderResult) {
      const displayResults = convertTinderDbToState(tinderResult);
      setResults(displayResults);
      setProfileData(profileData ?? {});
    } else {
      const storedData = JSON.parse(
        localStorage.getItem("tinderData") ?? "{}",
      ) as StoredTinderData;
      const { llmdata, name } = storedData;

      setProfileData({ name });
      void streamResponse({
        promptId: "786ef77a-b8b7-4951-9f4d-b58d6253dcb8",
        data: llmdata ?? "",
        onFinish: (results: Record<string, unknown>) => {
          const tinderResult = {
            ...convertTinderToDb(results),
            name,
            id: id as string,
          };
          createTinderResult(tinderResult);
        },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResultsPage
      user={{
        username: id as string,
        name: newProfileData?.name ?? "",
        imageUrl:
          "https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png",
        storyHref: `/tinder/${id as string}?slide=1`,
      }}
      cards={{
        card1text: results.short_summary as string,
        card2: {
          text: results.alternative as string,
          href: undefined,
        },
        card3text: results.roast_bio as string,
        wordwareStoryHref: `/tinder/${id as string}?name=wordware&slide=1`,
        showWordwareCard: !!results.swipe_ratios,
      }}
    />
  );
}
