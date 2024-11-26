import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AchievementUnlockedBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Achievement Unlocked</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
