import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function GuiltyPleasureSongBentoCard({
  guiltyPleasure,
}: {
  guiltyPleasure: string;
}) {
  return (
    <Card className="col-span-3 row-span-1 bg-pink-300 text-pink-950">
      <CardHeader>
        <CardTitle className="font-bold text-pink-950">
          Guilty Pleasure Song
        </CardTitle>
      </CardHeader>
      <CardContent className="text-pink-950">{guiltyPleasure}</CardContent>
    </Card>
  );
}
