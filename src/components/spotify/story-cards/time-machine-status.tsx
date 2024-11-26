import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function TimeMachineStatusBentoCard({
  timeTravelStatus,
}: {
  timeTravelStatus: string;
}) {
  return (
    <Card className="col-span-3 row-span-2 bg-purple-300 text-purple-950">
      <CardHeader>
        <CardTitle className="font-bold text-purple-950">
          Time Machine Status
        </CardTitle>
      </CardHeader>
      <CardContent className="text-purple-950">{timeTravelStatus}</CardContent>
    </Card>
  );
}
