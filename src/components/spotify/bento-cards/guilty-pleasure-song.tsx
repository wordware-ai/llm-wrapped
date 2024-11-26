import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GuiltyPleasureSongBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Guilty Pleasure Song</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
