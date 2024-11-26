import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SongsYouThinkAreAboutYouBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Songs You Think Are About You</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
