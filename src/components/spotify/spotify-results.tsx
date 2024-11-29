"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type UserWithSpotifyResult } from "@/types/user";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Slideshow from "../slideshow";
import { useStreamContext } from "../stream-provider";
import { CardGrid } from "./card-grid";

import Navbar from "./navbar";
import { SideCards } from "./side-cards";
import { UserInfo } from "./user-info";
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

  const onFinish = (results: Record<string, unknown>) => {
    const spotifyResult = {
      short_summary: String(results.short_summary) ?? "",
      music_taste_analysis_1: String(results.music_taste_analysis_1) ?? "",
      music_taste_analysis_2: String(results.music_taste_analysis_2) ?? "",
      music_taste_analysis_3: String(results.music_taste_analysis_3) ?? "",
      lyric_therapy_needed: String(results.lyric_therapy_needed) ?? "",
      identity_crisis_level: results.identity_crisis_level ?? {},
      emotional_stability_rating: results.emotional_stability_rating ?? {},
      achievement: results.achievement ?? {},
      dance_floor_credibility: String(results.dance_floor_credibility) ?? "",
      song_you_would_hit_the_dance_floor:
        String(results.song_you_would_hit_the_dance_floor) ?? "",
      songs_you_secretly_think_are_about_you:
        String(results.songs_you_secretly_think_are_about_you) ?? "",
      guilty_pleasure_song: String(results.guilty_pleasure_song) ?? "",
      least_popular_artist: String(results.least_popular_artist) ?? "",
      most_popular_artist: String(results.most_popular_artist) ?? "",
      time_machine_status: String(results.time_machine_status) ?? "",
      titles_that_need_therapy: String(results.titles_that_need_therapy) ?? "",
      final_diagnosis: String(results.final_diagnosis) ?? "",
      recommendation: String(results.recommendation) ?? "",
      user: {}, // Handled in procedure
    };
    createSpotifyResult(spotifyResult);
  };

  const { setResults } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "5d5cb90e-4197-4c60-bcb4-8c9b8137f636",
    data: spotifyData ?? "",
    onFinish,
  });

  useEffect(() => {
    if (previousRun) {
      const displayResults: Record<string, unknown> = {
        short_summary: previousRun.short_summary,
        music_taste_analysis_1: previousRun.music_taste_analysis_1,
        music_taste_analysis_2: previousRun.music_taste_analysis_2,
        music_taste_analysis_3: previousRun.music_taste_analysis_3,
        lyric_therapy_needed: previousRun.lyric_therapy_needed,
        identity_crisis_level: previousRun.identity_crisis_level,
        emotional_stability_rating: previousRun.emotional_stability_rating,
        achievement: previousRun.achievement,
        dance_floor_credibility: previousRun.dance_floor_credibility,
        song_you_would_hit_the_dance_floor:
          previousRun.song_you_would_hit_the_dance_floor,
        songs_you_secretly_think_are_about_you:
          previousRun.songs_you_secretly_think_are_about_you,
        guilty_pleasure_song: previousRun.guilty_pleasure_song,
        least_popular_artist: previousRun.least_popular_artist,
        most_popular_artist: previousRun.most_popular_artist,
        time_machine_status: previousRun.time_machine_status,
        titles_that_need_therapy: previousRun.titles_that_need_therapy,
        final_diagnosis: previousRun.final_diagnosis,
        recommendation: previousRun.recommendation,
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

  // uncomment this
  // if (!previousRun && !session?.provider_token) {
  //   redirect("/");
  // }

  if (slide) {
    return <Slideshow />;
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col gap-4 pb-16 lg:h-[calc(100vh-56px)] lg:flex-row">
          <UserInfo />
          <SideCards />
        </div>
        <CardGrid />
      </div>
    </div>
  );
}
