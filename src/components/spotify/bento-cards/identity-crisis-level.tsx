import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IdentityCrisisLevelBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Identity Crisis Level</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
