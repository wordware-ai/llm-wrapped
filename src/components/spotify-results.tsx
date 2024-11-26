"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { SpotifyResultCreateInputSchema } from "prisma/generated/zod";

export function SpotifyResults({ data }: { data: string }) {
  const { mutate: createSpotifyResult } =
    api.spotifyUser.createSpotifyResult.useMutation();

  const onFinish = (results: Record<string, string>) => {
    console.log("results", results);
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

  const { results, isLoading, streamResponse } = useStream({
    promptId: "ed4202f2-12b7-401c-a233-545b80dc740c",
    data: "i like the smiths",
    onFinish,
  });

  return (
    <div className="p-4">
      <Button onClick={streamResponse} disabled={isLoading}>
        {isLoading ? "Streaming..." : "Start Stream"}
      </Button>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(results).map(([key, value]) => (
          <Card key={key} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="capitalize">
                {key.replace(/_/g, " ")}
              </CardTitle>
            </CardHeader>
            <CardContent>{value}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
