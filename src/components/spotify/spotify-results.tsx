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
import { Linkedin } from "lucide-react";
import FirstCard from "./bento-cards/first-card";
import ThirdCard from "./bento-cards/third-card";
import SecondCard from "./bento-cards/second-card";

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
    <div className="flex flex-col gap-8 p-4 sm:p-8 md:gap-12 lg:h-screen lg:flex-row">
      <div className="flex h-min w-full flex-col gap-8 md:h-full lg:w-[45%] lg:justify-between xl:gap-12">
        <Image
          src="/brand/wordware-black.svg"
          alt="Wordware"
          width={100}
          height={100}
          className="w-48"
        />
        <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start">
          <StoryCircle />

          <div className="flex flex-col gap-2 md:gap-4">
            <div className="break-words text-3xl font-bold leading-[1.1] md:text-4xl lg:text-6xl">
              {user.username}
            </div>
            <div className="flex flex-row gap-4 sm:gap-8">
              <p className="text-lg md:hidden">Share:</p>
              <div className="flex items-center gap-2">
                <Linkedin />
                <p className="hidden md:block">Share on Instagram</p>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin />
                <p className="hidden md:block">Share on LinkedIn</p>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin />
                <p className="hidden md:block">Share on X</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-4 lg:w-[55%]">
        <FirstCard content={results.short_response_1} />
        <div className="flex w-full flex-col gap-4 md:h-[65%] md:flex-row">
          <SecondCard content={results.short_response_2} />

          <ThirdCard content={results.short_response_3} />
        </div>
      </div>
    </div>
  );
}
