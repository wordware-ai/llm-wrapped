import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useStreamContext } from "./stream-provider";

export default function StoryCircle() {
  const router = useRouter();
  const { results } = useStreamContext();
  const { userId } = useParams();

  const canClick = Object.keys(results).length > 3;

  const onClick = () => {
    if (canClick) {
      router.push(`/${userId as string}?slide=1`);
    }
  };
  return (
    <div
      className={cn(
        "size-20 shrink-0 animate-pulse rounded-full border-2 bg-blue-500 lg:size-40",
        canClick && "animate-none cursor-pointer",
      )}
      onClick={onClick}
    ></div>
  );
}
