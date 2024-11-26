import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinalDiagnosisBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Final Diagnosis</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
