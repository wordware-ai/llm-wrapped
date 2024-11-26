import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function SongsYouThinkAreAboutYouBentoCard({
  songs,
}: {
  songs: string;
}) {
  return (
    <Card className="col-span-3 row-span-2 bg-cyan-300 text-cyan-950">
      <CardHeader>
        <CardTitle className="font-bold text-cyan-950">
          Songs You Think Are About You
        </CardTitle>
      </CardHeader>
      <CardContent className="text-cyan-950">{songs}</CardContent>
    </Card>
  );
}
