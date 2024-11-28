import Image from "next/image";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
export default function WordwareCard({
  children,
  fillColor,
  className,
  wide = false,
  hideHashtag = false,
}: {
  children: ReactNode;
  fillColor?: string;
  className: string;
  wide?: boolean;
  hideHashtag?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative -z-20 flex aspect-[4/7] items-center overflow-hidden rounded-lg p-8",
        className,
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-0 -z-10 w-full gap-[7px] px-2",
          wide ? "grid grid-cols-2" : "flex flex-col",
        )}
      >
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
        <WordwareLogo fillColor={fillColor} />
      </div>
      {children}
      {!hideHashtag && (
        <p className="absolute bottom-8 left-8 text-white">#LLMWrapped</p>
      )}
    </div>
  );
}

function WordwareLogo({
  fillColor = "fill-black opacity-50",
}: {
  fillColor?: string;
}) {
  return (
    <Image
      src="/brand/wordware-black.svg"
      alt="Wordware"
      width={100}
      height={100}
      className={cn("w-full", fillColor)}
    />
  );
}
