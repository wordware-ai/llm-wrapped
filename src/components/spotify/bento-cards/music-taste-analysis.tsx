import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MusicTasteAnalysisBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Music Taste Analysis</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
