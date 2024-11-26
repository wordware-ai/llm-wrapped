import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LyricTherapistNeededBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Lyric Therapist Needed</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
