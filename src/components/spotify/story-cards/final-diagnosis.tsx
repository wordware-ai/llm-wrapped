import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function FinalDiagnosisBentoCard({
  diagnosis,
}: {
  diagnosis: string;
}) {
  return (
    <Card className="col-span-4 row-span-2 bg-blue-300 text-blue-950">
      <CardHeader>
        <CardTitle className="font-bold text-blue-950">
          Final Diagnosis
        </CardTitle>
      </CardHeader>
      <CardContent className="text-blue-950">{diagnosis}</CardContent>
    </Card>
  );
}
