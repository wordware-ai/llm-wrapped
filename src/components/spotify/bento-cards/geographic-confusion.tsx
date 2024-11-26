import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeographicConfusionBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Geographic Confusion</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
