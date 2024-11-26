import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function DanceFloorCredibilityBentoCard({
  credibilityScore,
}: {
  credibilityScore: string;
}) {
  return (
    <Card className="col-span-3 row-span-1 bg-yellow-300 text-yellow-950">
      <CardHeader>
        <CardTitle className="font-bold text-yellow-950">
          Dance Floor Credibility
        </CardTitle>
      </CardHeader>
      <CardContent className="text-yellow-950">{credibilityScore}</CardContent>
    </Card>
  );
}
