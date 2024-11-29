import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function BaseStory({
  src,
  alt,
  id,
  className,
  size,
}: {
  src: string | null;
  alt: string;
  id: string;
  className?: string;
  size?: string;
}) {
  return (
    <Link
      href={`/${id}?slide=1&returnHome=true`}
      className={cn(
        "relative size-20 cursor-pointer rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[4px]",
        size,
      )}
    >
      <div className="aspect-square h-full w-full rounded-full bg-background object-cover">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={200}
            height={200}
            className={cn("h-full w-full rounded-full object-cover", className)}
          />
        ) : (
          <div className="h-full w-full rounded-full bg-gray-200" />
        )}
      </div>
    </Link>
  );
}
