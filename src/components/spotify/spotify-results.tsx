"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type UserWithSpotifyResult } from "@/types/user";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Slideshow from "../slideshow";
import { useStreamContext } from "../stream-provider";
import Navbar from "./navbar";
import { BaseStory } from "../stories/base";
import { ResultsGroup1 } from "./results-group-1";
export function SpotifyResults({ user }: { user: UserWithSpotifyResult }) {
  const previousRun = user.spotifyResult;
  const { session } = useUser();
  const { data: spotifyData } = api.spotifyApi.getAllUserData.useQuery(
    undefined,
    {
      enabled: !previousRun && !!session?.provider_token,
    },
  );

  const { mutate: createSpotifyResult } =
    api.spotifyUser.createSpotifyResult.useMutation();

  const onFinish = (results: Record<string, string>) => {
    const spotifyResult = {
      shortResponse1: results.short_response_1 ?? "",
      shortResponse2: results.short_response_2 ?? "",
      shortResponse3: results.short_response_3 ?? "",
      longResponse1: results.dance_floor_credibility ?? "",
      longResponse2: results.time_machine_status ?? "",
      longResponse3: results.achievement_unlocked ?? "",
      longResponse4: results.geographic_confusion_score ?? "",
      longResponse5: results.guilty_pleasure_song ?? "",
      longResponse6: results.songs_you_secretly_think_are_about_you ?? "",
      longResponse7: results.lyric_therapist_needed ?? "",
      user: {}, // Handled in procedure
    };
    createSpotifyResult(spotifyResult);
  };

  const { results, setResults } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "fbc771dc-7c8f-4deb-9a80-a15b8f355ab6",
    data: JSON.stringify(spotifyData),
    onFinish,
  });

  useEffect(() => {
    if (previousRun) {
      const displayResults: Record<string, string> = {
        short_response_1: previousRun.shortResponse1,
        short_response_2: previousRun.shortResponse2,
        short_response_3: previousRun.shortResponse3,
        long_response_1: previousRun.longResponse1,
        long_response_2: previousRun.longResponse2,
        long_response_3: previousRun.longResponse3,
        long_response_4: previousRun.longResponse4,
        long_response_5: previousRun.longResponse5,
        long_response_6: previousRun.longResponse6,
        long_response_7: previousRun.longResponse7,
      };
      setResults(displayResults);
    } else {
      if (spotifyData) {
        void streamResponse();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousRun, spotifyData]);

  const searchParams = useSearchParams();
  const slide = searchParams.get("slide");

  if (!previousRun && !session?.provider_token) {
    redirect("/");
  }

  if (slide) {
    return <Slideshow />;
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-4 p-8 lg:h-[calc(100vh-56px)] lg:flex-row">
        <div className="flex flex-col justify-between gap-4 lg:w-1/2">
          <h1 className="text-5xl font-semibold xs:text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl">
            #LLMWrapped
          </h1>
          <div className="flex gap-8 lg:gap-20">
            <div className="flex w-min flex-col gap-4">
              <BaseStory
                size="lg:size-64 size-36 p-1 lg:p-2"
                src="/images/kamil.png"
                alt="Spotify 1"
                id="6def5615-1a4d-42e6-b1df-6e3063349e89"
              />
              <p className="text-center text-xl font-semibold">Kamil Kamil</p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-xl sm:text-2xl">Share your results</p>
              <div className="grid grid-cols-2 gap-4">
                <p>Twitter</p>
                <p>Instagram</p>
                <p>LinkedIn</p>
                <p>TikTok</p>
                <p>Reddit</p>
                <p>WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
        <ResultsGroup1 />
      </div>
    </div>
  );
}
