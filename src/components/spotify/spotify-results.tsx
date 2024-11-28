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
      response1: results.music_taste_analysis ?? "",
      response2: results.identity_crisis_level ?? "",
      response3: results.emotional_stability_rating ?? "",
      response4: results.dance_floor_credibility ?? "",
      response5: results.time_machine_status ?? "",
      response6: results.achievement_unlocked ?? "",
      response7: results.geographic_confusion_score ?? "",
      response8: results.guilty_pleasure_song ?? "",
      response9: results.songs_you_secretly_think_are_about_you ?? "",
      response10: results.lyric_therapist_needed ?? "",
      response11: results.final_diagnosis ?? "",
      response12: results.recommendation ?? "",
      user: {}, // Handled in procedure
    };
    createSpotifyResult(spotifyResult);
  };

  const { setResults } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "8ffe6968-fdf7-4822-90a6-2ed650812e7a",
    data: spotifyData ?? "",
    onFinish,
  });

  useEffect(() => {
    if (previousRun) {
      const displayResults: Record<string, string> = {
        music_taste_analysis: previousRun.response1,
        identity_crisis_level: previousRun.response2,
        emotional_stability_ranking: previousRun.response3,
        dance_floor_credibility: previousRun.response4,
        time_machine_status: previousRun.response5,
        achievement_unlocked: previousRun.response6,
        geographic_confusion_score: previousRun.response7,
        guilty_pleasure_song: previousRun.response8,
        songs_you_secretly_think_are_about_you: previousRun.response9,
        lyric_therapist_needed: previousRun.response10,
        final_diagnosis: previousRun.response11,
        recommendation: previousRun.response12,
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
