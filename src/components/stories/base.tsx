import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function BaseStory({
  src,
  alt,
  id,
  className,
}: {
  src: string;
  alt: string;
  id: string;
  className?: string;
}) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${id}?slide=1&returnHome=true`);
  };

  return (
    <div className="relative h-20 w-20 cursor-pointer" onClick={onClick}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[4px]">
        <div className="bg-background h-full w-full rounded-full">
          <Image
            src={src}
            alt={alt}
            width={200}
            height={200}
            className={cn(
              "aspect-square h-full w-full rounded-full object-cover",
              className,
            )}
          />
        </div>
      </div>
    </div>
  );
}
