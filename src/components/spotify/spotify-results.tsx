"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type SpotifyResult } from "@prisma/client";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";

import {
  convertSpotifyDbToState,
  convertSpotifyToDb,
} from "@/lib/convert-spotify";
import { ResultsPage } from "../results-page";

export function SpotifyResults({
  previousRun,
  profileData,
  llmData,
}: {
  previousRun?: SpotifyResult;
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
  const { session } = useUser();
  const { username } = useParams();

  const { mutate: createSpotifyResult } =
    api.spotifyResults.create.useMutation();

  const { data: spotifyResult } = api.spotifyResults.getByUsername.useQuery(
    { username: username as string },
    {
      initialData: previousRun,
      staleTime: Infinity, // Prevents refetching until invalidation
    },
  );

  const onFinish = (results: Record<string, unknown>) => {
    const spotifyResult = {
      ...convertSpotifyToDb(results),
      leastPopularImageUrl: profileData?.leastPopularImageUrl ?? null,
      mostPopularImageUrl: profileData?.mostPopularImageUrl ?? null,
      topArtistImageUrl: profileData?.topArtistImageUrl ?? null,
      leastPopularUrl: profileData?.leastPopularUrl ?? null,
      mostPopularUrl: profileData?.mostPopularUrl ?? null,
      topArtistUrl: profileData?.topArtistUrl ?? null,
      userId: session?.user.id ?? "",
      username: username as string,
      email: session?.user.email,
      imageUrl:
        (
          session?.user.user_metadata as {
            picture?: string;
          }
        ).picture ??
        "https://i.pinimg.com/originals/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg",
    };
    createSpotifyResult(spotifyResult);
  };

  const { results, setResults, setProfileData, isLoading } = useStreamContext();
  const { streamResponse } = useStream();

  useEffect(() => {
    setResults({});
    setProfileData({});
    if (isLoading) return;
    if (spotifyResult) {
      const displayResults = convertSpotifyDbToState(spotifyResult);
      setResults(displayResults);
    } else {
      void streamResponse({
        promptId: "45bf050b-4223-45c1-9fd6-a2d6c6b2ac1d",
        data: llmData ?? "",
        onFinish,
      });
    }
    setProfileData(profileData ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // might not need this have to think about it
  if (!spotifyResult && !session?.provider_token) {
    redirect("/");
  }

  return (
    <ResultsPage
      user={{
        username: username as string,
        name: username as string,
        imageUrl:
          spotifyResult?.imageUrl ??
          (
            session?.user.user_metadata as {
              picture?: string;
            }
          ).picture ??
          "",
        storyHref: `/spotify/${username as string}?slide=1`,
      }}
      cards={{
        card1text: results.short_summary as string,
        card2: {
          title: "Top Artist",
          text: results.music_taste_analysis_1 as string,
          imageUrl: profileData?.topArtistImageUrl ?? "",
          href: profileData?.topArtistUrl ?? undefined,
        },
        card3text: results.music_taste_analysis_2 as string,
        wordwareStoryHref: `/spotify/${username as string}?name=wordware&slide=1`,
        showWordwareCard: !!results.music_taste_analysis_3,
      }}
    />
  );
}
