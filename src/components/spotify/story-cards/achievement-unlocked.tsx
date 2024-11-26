import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function AchievementUnlockedBentoCard({
  achievement,
}: {
  achievement: string;
}) {
  return (
    <Card className="col-span-2 row-span-1 bg-amber-300 text-amber-950">
      <CardHeader>
        <CardTitle className="font-bold text-amber-950">
          Achievement Unlocked
        </CardTitle>
      </CardHeader>
      <CardContent className="text-amber-950">{achievement}</CardContent>
    </Card>
  );
}
