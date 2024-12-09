import { colorConfig } from "@/config/color-config";
import Image from "next/image";
import Link from "next/link";
import WordwareCard from "./spotify/wordware-card";
import WordwareStory from "./wordware-story";

export function SideCards({
  card1text,
  card2,
  card3text,
  storyHref,
}: {
  card1text: string;
  card2: {
    title?: string;
    text: string;
    imageUrl?: string;
    href?: string;
  };
  card3text: string;
  storyHref: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:h-full lg:w-1/2 lg:min-w-[550px]">
      <WordwareCard
        hideShare
        hideHashtag
        backgroundColor={colorConfig.color1.bgColor}
        fillColor={colorConfig.color1.fillColor}
        className="aspect-auto h-min min-h-[400px] w-full rounded-xl sm:min-h-80 lg:h-1/3 lg:min-h-56"
      >
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-4xl text-white lg:text-2xl">
            {card1text}
          </p>
        </div>
      </WordwareCard>
      <div className="flex min-h-[550px] w-full flex-col gap-4 rounded-xl sm:flex-row lg:h-2/3 lg:min-h-0">
        <WordwareCard
          hideShare
          hideHashtag
          backgroundColor={colorConfig.color2.bgColor}
          fillColor={colorConfig.color2.fillColor}
          className="aspect-auto min-h-[400px] rounded-xl bg-blue-500 sm:min-h-full sm:w-1/2 lg:min-h-0"
        >
          <div className="flex h-full flex-col items-center justify-center gap-4">
            {card2.text && card2.title && (
              <h3 className="text-4xl font-semibold text-white lg:text-3xl xl:text-4xl">
                {card2.title}
              </h3>
            )}
            {card2.imageUrl !== "null" && card2.imageUrl && card2.text && (
              <>
                {card2.href ? (
                  <Link href={card2.href}>
                    <Image
                      src={card2.imageUrl}
                      alt={card2.title ?? ""}
                      className="rounded-lg object-cover"
                      width={120}
                      height={120}
                    />
                  </Link>
                ) : (
                  <Image
                    src={card2.imageUrl}
                    alt={card2.title ?? ""}
                    className="rounded-lg object-cover"
                    width={120}
                    height={120}
                  />
                )}
              </>
            )}
            <p className="text-center text-2xl text-white lg:text-xl xl:text-2xl">
              {card2.text}
            </p>
          </div>
        </WordwareCard>
        <div className="flex h-full w-full flex-col gap-4 sm:w-1/2">
          <WordwareCard
            hideShare
            hideHashtag
            backgroundColor={colorConfig.color3.bgColor}
            fillColor={colorConfig.color3.fillColor}
            className="flex aspect-auto h-min min-h-[400px] w-full items-center justify-center rounded-xl lg:h-full lg:min-h-0"
          >
            <div className="flex h-full w-full items-center justify-center">
              <p className="grow text-center text-2xl text-white">
                {card3text}
              </p>
            </div>
          </WordwareCard>
          <div className="relative flex h-40 w-full items-center justify-between gap-4 overflow-hidden rounded-xl border p-4">
            <Image
              src="/images/card-background.png"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            <div className="relative z-10 flex w-full items-center justify-between gap-4">
              <p className="text-xl text-white sm:text-sm">
                LLMwrapped has been built with Wordware - the ultimate AI
                operating system
              </p>
              <WordwareStory href={storyHref} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
