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
  src: string | null;
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
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={200}
            height={200}
            className={cn(
              "h-full w-full rounded-full object-cover",
              imageClassName,
            )}
          />
        ) : (
          <div className="relative h-full w-full">
            {/* Main sphere with radial gradient */}
            <div
              className="bg-gradient-radial absolute inset-0 rounded-full from-white via-gray-300 to-gray-800"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 35% 35%, white 0%, #9ca3af 30%, #1f2937 70%, #111827 100%)",
              }}
            ></div>

            {/* Subtle shadow for depth */}
            <div className="h-1/8 absolute -bottom-2 left-1/2 w-5/6 -translate-x-1/2 transform rounded-full bg-black opacity-20 blur-md"></div>
          </div>
        )}
      </div>
    </Link>
  );
}
