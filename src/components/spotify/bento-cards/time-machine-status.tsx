import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TimeMachineStatusBentoCard({
  content,
}: {
  content: string;
}) {
  return (
    <>
      <CardHeader>
        <CardTitle>Time Machine Status</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  );
}
