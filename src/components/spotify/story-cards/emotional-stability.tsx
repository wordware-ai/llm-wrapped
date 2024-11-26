import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function EmotionalStabilityBentoCard({
  stabilityScore,
}: {
  stabilityScore: string;
}) {
  return (
    <Card className="col-span-2 row-span-1 bg-red-300 text-red-950">
      <CardHeader>
        <CardTitle className="font-bold text-red-950">
          Emotional Stability Score
        </CardTitle>
      </CardHeader>
      <CardContent className="text-red-950">{stabilityScore}</CardContent>
    </Card>
  );
}
