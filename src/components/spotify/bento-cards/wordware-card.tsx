import Image from "next/image";
import { cn } from "@/lib/utils";

export default function WordwareCard({
  content,
  bgColor,
  fillColor,
  width,
}: {
  content: string;
  bgColor: string;
  fillColor?: string;
  width?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/7] items-center overflow-hidden rounded-lg",
        bgColor,
        width,
      )}
    >
      <div className="absolute left-0 top-0 flex w-full flex-col gap-[7px] px-2">
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
      <p className="z-10 p-8 pb-16 text-2xl font-bold text-white">{content}</p>
      <p className="absolute bottom-8 left-8 text-white">#LLMWrapped</p>
    </div>
  );
}

function WordwareLogo({
  fillColor = "fill-black opacity-20",
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
