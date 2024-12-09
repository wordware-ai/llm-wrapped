"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type TinderResult } from "@prisma/client";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";

import { convertSpotifyDbToState } from "@/lib/convert-spotify";
import { convertTinderToDb } from "@/lib/convert-tinder";
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
  const { session } = useUser();
  const { id } = useParams();

  const { mutate: createTinderResult } = api.tinderResults.create.useMutation();

  const onFinish = (results: Record<string, unknown>) => {
    const tinderResult = {
      ...convertTinderToDb(results),
      name: profileData?.name ?? null,
      id: id as string,
    };
    createTinderResult(tinderResult);
  };

  const { results, setResults, setProfileData } = useStreamContext();
  const { streamResponse } = useStream();

  useEffect(() => {
    if (previousRun) {
      const displayResults = convertSpotifyDbToState(previousRun);
      setResults(displayResults);
      setProfileData(profileData ?? {});
    } else {
      const storedData = JSON.parse(
        sessionStorage.getItem("tinderData") ?? "{}",
      ) as StoredTinderData;
      const { llmdata, name } = storedData;

      setProfileData({ name });

      void streamResponse({
        promptId: "923167a9-b36a-4b01-a7f6-7cad56357653",
        data: llmdata ?? "",
        onFinish,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousRun]);

  return (
    <ResultsPage
      user={{
        username: id as string,
        name: profileData?.name ?? "",
        imageUrl:
          "https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png",
        storyHref: `/tinder/${id as string}?slide=1`,
      }}
      cards={{
        card1text: results.short_summary as string,
        card2: {
          title: "Top Artist",
          text: results.alternative as string,
          imageUrl: "",
          href: undefined,
        },
        card3text: results.roast_bio as string,
        storyHref: `/spotify/${id as string}?name=wordware&slide=1`,
        showWordwareCard: !!results.music_taste_analysis_3,
      }}
    />
  );
}
