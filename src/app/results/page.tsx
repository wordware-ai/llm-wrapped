"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useStream } from "@/hooks/use-stream";

export default function ResultsPage() {
  const { results, isLoading, streamResponse } = useStream(
    "ed4202f2-12b7-401c-a233-545b80dc740c",
  );

  return (
    <div className="p-4">
      <Button onClick={streamResponse} disabled={isLoading}>
        {isLoading ? "Streaming..." : "Start Stream"}
      </Button>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(results).map(([key, value]) => (
          <Card key={key} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="capitalize">
                {key.replace(/_/g, " ")}
              </CardTitle>
            </CardHeader>
            <CardContent>{value}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
