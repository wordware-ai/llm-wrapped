"use client";

import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { type SpotifyResult } from "@prisma/client";
import { useEffect } from "react";
import { CardWrapper } from "./bento-cards/base-card";
import { cardConfigs } from "./card-config";
import { useRouter } from "next/navigation";
import { useStreamContext } from "../stream-provider";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

export function SpotifyResults({
  data,
  result,
}: {
  data: string;
  result?: SpotifyResult;
}) {
  console.log(data);
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

  const { results, setResults } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "ed4202f2-12b7-401c-a233-545b80dc740c",
    data,
    onFinish,
  });

  useEffect(() => {
    if (result) {
      const displayResults: Record<string, string> = {
        music_taste_analysis: result.musicTasteAnalysis,
        identity_crisis_level: result.identityCrisisLevel,
        emotional_stability_rating: result.emotionalStability,
        dance_floor_credibility: result.danceFloorCredibility,
        time_machine_status: result.timeMachineStatus,
        achievement_unlocked: result.achievementUnlocked,
        geographic_confusion_score: result.geographicConfusion,
        guilty_pleasure_song: result.guiltyPleasureSong,
        songs_you_secretly_think_are_about_you: result.songsYouThinkAreAboutYou,
        lyric_therapist_needed: result.lyricTherapistNeeded,
        final_diagnosis: result.finalDiagnosis,
        recommendation: result.recommendation,
      };
      setResults(displayResults);
    } else {
      void streamResponse();
    }
  }, [result]);

  const router = useRouter();

  const renderCard = (key: string, content?: string) => {
    const config = cardConfigs[key];
    if (!content || !config) return null;

    const BentoComponent = config.bentoComponent;
    return (
      <Card
        className={cn(
          `col-span-${config.gridConfig.colSpan}`,
          `row-span-${config.gridConfig.rowSpan}`,
          config.theme.backgroundColor,
          config.theme.textColor,
        )}
      >
        <BentoComponent content={content} />
      </Card>
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-12 grid-rows-[12] gap-4">
        <div
          onClick={() => router.push(`/results/slide?slide=1`)}
          className="col-span-2 row-span-2 hover:cursor-pointer"
        >
          <div className="size-40 rounded-full bg-blue-500" />
        </div>

        {Object.entries(cardConfigs).map(([key, config]) =>
          renderCard(key, results[config.id]),
        )}
      </div>
    </div>
  );
}
