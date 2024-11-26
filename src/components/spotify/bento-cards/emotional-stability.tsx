import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmotionalStabilityBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Emotional Stability Score</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
