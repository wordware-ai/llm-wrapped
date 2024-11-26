import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecommendationBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Recommendation</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
