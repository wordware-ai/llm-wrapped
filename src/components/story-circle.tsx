import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useStreamContext } from "./stream-provider";

export default function StoryCircle() {
  const router = useRouter();
  const { results } = useStreamContext();

  const canClick = Object.keys(results).length > 3;

  const onClick = () => {
    if (canClick) {
      router.push("/results?slide=1");
    }
  };
  return (
    <div
      className={cn(
        "h-40 w-40 animate-pulse rounded-full bg-blue-500",
        canClick && "animate-none cursor-pointer",
      )}
      onClick={onClick}
    ></div>
  );
}
