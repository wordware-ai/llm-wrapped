"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { type SpotifyResult } from "@prisma/client";
import { useEffect } from "react";
import { CardWrapper } from "./bento-cards/base-card";
import { cardConfigs } from "./card-config";

export function SpotifyResults({
  data,
  result,
}: {
  data: string;
  result?: SpotifyResult;
}) {
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

  const { results, setResults, isLoading, streamResponse } = useStream({
    promptId: "ed4202f2-12b7-401c-a233-545b80dc740c",
    data: "i like the smiths",
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

  console.log("results", results);

  const renderCard = (key: string, content?: string) => {
    const config = cardConfigs[key];
    if (!content || !config) return null;

    const BentoComponent = config.bentoComponent;
    return (
      <CardWrapper
        gridConfig={config.gridConfig}
        theme={config.theme}
        key={config.id}
      >
        <div className="h-full max-h-[200px] overflow-y-auto">
          <BentoComponent content={content} />
        </div>
      </CardWrapper>
    );
  };

  console.log("results", results);

  return (
    <div className="p-4">
      <div className="grid h-[800px] grid-cols-12 gap-4">
        {renderCard("musicTasteAnalysis", results.music_taste_analysis)}
        {renderCard("identityCrisis", results.identity_crisis_level)}
        {renderCard("emotionalStability", results.emotional_stability_rating)}
        {renderCard("danceFloorCredibility", results.dance_floor_credibility)}
        {renderCard("timeMachineStatus", results.time_machine_status)}
        {renderCard("achievementUnlocked", results.achievement_unlocked)}
        {renderCard("geographicConfusion", results.geographic_confusion_score)}
        {renderCard("guiltyPleasureSong", results.guilty_pleasure_song)}
        {renderCard(
          "songsYouThinkAreAboutYou",
          results.songs_you_secretly_think_are_about_you,
        )}
        {renderCard("lyricTherapistNeeded", results.lyric_therapist_needed)}
        {renderCard("finalDiagnosis", results.final_diagnosis)}
        {renderCard("recommendation", results.recommendation)}
      </div>
    </div>
  );
}
