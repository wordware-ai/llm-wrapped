import { cn } from "@/lib/utils";
import Image from "next/image";

export default function WordwareCard({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex min-h-[35em] w-full max-w-xs items-center overflow-hidden rounded-lg bg-[#181818]",
        className,
      )}
    >
      <div className="absolute left-0 top-0 flex w-full flex-col gap-2 p-2">
        <WordwareLogo />
        <WordwareLogo />
        <WordwareLogo />
        <WordwareLogo />
        <WordwareLogo />
        <WordwareLogo />
        <WordwareLogo />
        <WordwareLogo />
        <WordwareLogo />
      </div>
      <p className="z-10 p-8 pb-16 text-2xl font-bold text-white">{content}</p>
      <p className="absolute bottom-8 left-8 text-white">#LLMWrapped</p>
    </div>
  );
}

function WordwareLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/wordware-black.svg"
      alt="Wordware"
      width={100}
      height={100}
      className={cn("w-full fill-black opacity-50", className)}
    />
  );
}
