import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function RecommendationBentoCard({
  recommendation,
}: {
  recommendation: string;
}) {
  return (
    <Card className="col-span-3 row-span-1 bg-orange-300 text-orange-950">
      <CardHeader>
        <CardTitle className="font-bold text-orange-950">
          Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="text-orange-950">{recommendation}</CardContent>
    </Card>
  );
}
