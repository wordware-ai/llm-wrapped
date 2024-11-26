import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function GeographicConfusionBentoCard({
  confusionLevel,
}: {
  confusionLevel: string;
}) {
  return (
    <Card className="col-span-2 row-span-2 bg-teal-300 text-teal-950">
      <CardHeader>
        <CardTitle className="font-bold text-teal-950">
          Geographic Confusion
        </CardTitle>
      </CardHeader>
      <CardContent className="text-teal-950">{confusionLevel}</CardContent>
    </Card>
  );
}
