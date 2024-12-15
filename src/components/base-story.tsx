import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function BaseStory({
  src,
  alt,
  href,
  className,
  imageClassName,
}: {
  src?: string;
  alt: string;
  href: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "relative size-20 cursor-pointer rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[4px]",
        className,
      )}
    >
      <div className="aspect-square h-full w-full rounded-full bg-background object-cover">
        <Image
          src={
            src ??
            "https://i.pinimg.com/originals/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
          }
          alt={alt}
          width={200}
          height={200}
          loading="eager"
          className={cn(
            "h-full w-full rounded-full object-cover",
            imageClassName,
          )}
        />
      </div>
    </Link>
  );
}
