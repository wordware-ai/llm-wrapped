import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MusicTasteAnalysisBentoCard({
  musicTasteAnalysis,
}: {
  musicTasteAnalysis: string;
}) {
  return (
    <Card className="col-span-4 bg-blue-300 text-blue-950">
      <CardHeader>
        <CardTitle className="font-bold text-blue-950">
          Music Taste Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="text-blue-950">{musicTasteAnalysis}</CardContent>
    </Card>
  );
}
