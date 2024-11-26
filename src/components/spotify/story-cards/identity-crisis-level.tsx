import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function IdentityCrisisLevelBentoCard({
  crisisLevel,
}: {
  crisisLevel: string;
}) {
  return (
    <Card className="col-span-2 row-span-2 bg-green-300 text-green-950">
      <CardHeader>
        <CardTitle className="font-bold text-green-950">
          Identity Crisis Level
        </CardTitle>
      </CardHeader>
      <CardContent className="text-green-950">{crisisLevel}</CardContent>
    </Card>
  );
}
