"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type UserWithSpotifyResult } from "@/types/user";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Slideshow from "../slideshow";
import StoryCircle from "../story-circle";
import { useStreamContext } from "../stream-provider";

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
      musicTasteAnalysis: results.music_taste_analysis ?? "",
      identityCrisisLevel: results.identity_crisis_level ?? "",
      emotionalStability: results.emotional_stability_rating ?? "",
      danceFloorCredibility: results.dance_floor_credibility ?? "",
      timeMachineStatus: results.time_machine_status ?? "",
      achievementUnlocked: results.achievement_unlocked ?? "",
      geographicConfusion: results.geographic_confusion_score ?? "",
      guiltyPleasureSong: results.guilty_pleasure_song ?? "",
      songsYouThinkAreAboutYou:
        results.songs_you_secretly_think_are_about_you ?? "",
      lyricTherapistNeeded: results.lyric_therapist_needed ?? "",
      finalDiagnosis: results.final_diagnosis ?? "",
      recommendation: results.recommendation ?? "",
      user: {}, // Handled in procedure
    };
    createSpotifyResult(spotifyResult);
  };

  const { results, setResults, isLoading } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "ed4202f2-12b7-401c-a233-545b80dc740c",
    data: "I like the smiths",
    onFinish,
  });

  useEffect(() => {
    if (previousRun) {
      const displayResults: Record<string, string> = {
        music_taste_analysis: previousRun.musicTasteAnalysis,
        identity_crisis_level: previousRun.identityCrisisLevel,
        emotional_stability_rating: previousRun.emotionalStability,
        dance_floor_credibility: previousRun.danceFloorCredibility,
        time_machine_status: previousRun.timeMachineStatus,
        achievement_unlocked: previousRun.achievementUnlocked,
        geographic_confusion_score: previousRun.geographicConfusion,
        guilty_pleasure_song: previousRun.guiltyPleasureSong,
        songs_you_secretly_think_are_about_you:
          previousRun.songsYouThinkAreAboutYou,
        lyric_therapist_needed: previousRun.lyricTherapistNeeded,
        final_diagnosis: previousRun.finalDiagnosis,
        recommendation: previousRun.recommendation,
      };
      setResults(displayResults);
    } else {
      void streamResponse();
    }
  }, [previousRun]);

  const searchParams = useSearchParams();
  const slide = searchParams.get("slide");

  if (!previousRun && !session?.provider_token) {
    redirect("/");
  }

  if (slide) {
    return <Slideshow />;
  }

  return (
    <div className="flex h-screen gap-12 p-8">
      <div className="flex h-full flex-col">
        <div className="flex h-full items-center gap-12 pb-12">
          <div className="flex h-full flex-col justify-between">
            <Image
              src="/brand/wordware-black.svg"
              alt="Wordware"
              width={100}
              height={100}
              className="w-48"
            />
            <StoryCircle />
          </div>

          {results.music_taste_analysis && (
            <div className="h-full w-full">
              <div className="h-full w-full rounded-xl bg-orange-500 p-4">
                {results.music_taste_analysis}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="break-words text-8xl font-bold leading-[1.1]">
            {user.name}
          </div>
          <div className="flex gap-12">
            <p>Share on X</p>
            <p>Share on Instagram</p>
            <p>Share on LinkedIn</p>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-12">
        {results.identity_crisis_level && (
          <div className="h-1/3 w-full rounded-xl bg-red-500 p-4">
            {results.identity_crisis_level}
          </div>
        )}

        {results.emotional_stability_rating && (
          <div className="h-2/3 w-full rounded-xl bg-green-500 p-4">
            {results.emotional_stability_rating}
          </div>
        )}
      </div>
    </div>
  );
}
