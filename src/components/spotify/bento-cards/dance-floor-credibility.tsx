import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DanceFloorCredibilityBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Dance Floor Credibility</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
