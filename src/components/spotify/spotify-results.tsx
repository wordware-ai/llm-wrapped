"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type UserWithSpotifyResult } from "@/types/user";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";

import {
  convertSpotifyDbToState,
  convertSpotifyToDb,
} from "@/lib/convert-spotify";
import { ResultsPage } from "../results-page";

export function SpotifyResults({
  user,
  profileData,
  llmData,
}: {
  user: UserWithSpotifyResult;
  profileData?: {
    leastPopularImageUrl: string | null;
    mostPopularImageUrl: string | null;
    topArtistImageUrl: string | null;
    leastPopularUrl: string | null;
    mostPopularUrl: string | null;
    topArtistUrl: string | null;
  };

  llmData?: string;
}) {
  const previousRun = user.spotifyResult;
  const { session } = useUser();

  const { mutate: createSpotifyResult } =
    api.spotifyResults.createSpotifyResult.useMutation();

  const onFinish = (results: Record<string, unknown>) => {
    const spotifyResult = {
      ...convertSpotifyToDb(results),
      leastPopularImageUrl: profileData?.leastPopularImageUrl ?? null,
      mostPopularImageUrl: profileData?.mostPopularImageUrl ?? null,
      topArtistImageUrl: profileData?.topArtistImageUrl ?? null,
      leastPopularUrl: profileData?.leastPopularUrl ?? null,
      mostPopularUrl: profileData?.mostPopularUrl ?? null,
      topArtistUrl: profileData?.topArtistUrl ?? null,
      user: {},
    };
    createSpotifyResult(spotifyResult);
  };

  const { results, setResults } = useStreamContext();
  const { streamResponse } = useStream();

  useEffect(() => {
    if (previousRun) {
      const displayResults = convertSpotifyDbToState(previousRun);
      setResults(displayResults);
    } else {
      void streamResponse({
        promptId: "45bf050b-4223-45c1-9fd6-a2d6c6b2ac1d",
        data: llmData ?? "",
        onFinish,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousRun, llmData]);

  // might not need this have to think about it
  if (!previousRun && !session?.provider_token) {
    redirect("/");
  }

  return (
    <ResultsPage
      user={{
        username: user.username ?? "",
        name: user.username ?? "",
        imageUrl: user.imageUrl ?? "",
        storyHref: `/spotify/${user.username}?slide=1`,
      }}
      cards={{
        card1text: results.short_summary as string,
        card2: {
          title: "Top Artist",
          text: results.music_taste_analysis_2 as string,
          imageUrl: profileData?.topArtistImageUrl ?? "",
          href: profileData?.topArtistUrl ?? undefined,
        },
        card3text: results.music_taste_analysis_1 as string,
        storyHref: `/spotify/${user.username}?name=wordware&slide=1`,
      }}
    />
  );
}
