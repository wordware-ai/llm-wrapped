import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function LyricTherapistNeededBentoCard({
  therapyLevel,
}: {
  therapyLevel: string;
}) {
  return (
    <Card className="col-span-2 row-span-2 bg-rose-300 text-rose-950">
      <CardHeader>
        <CardTitle className="font-bold text-rose-950">
          Lyric Therapist Needed
        </CardTitle>
      </CardHeader>
      <CardContent className="text-rose-950">{therapyLevel}</CardContent>
    </Card>
  );
}
