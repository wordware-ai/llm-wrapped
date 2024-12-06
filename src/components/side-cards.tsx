import Image from "next/image";
import Link from "next/link";
import WordwareCard from "./spotify/wordware-card";
import WordwareStory from "./wordware-story";
import { colorConfig } from "@/config/color-config";
import { Skeleton } from "./ui/skeleton";

export function SideCards({
  card1text,
  card2,
  card3text,
  storyHref,
  showWordwareCard,
}: {
  card1text: string;
  card2: {
    title: string;
    text: string;
    imageUrl: string;
    href?: string;
  };
  card3text: string;
  storyHref: string;
  showWordwareCard: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:h-full lg:w-1/2">
      <WordwareCard
        wide
        hideShare
        show={!!card1text}
        backgroundColor={colorConfig.color1.bgColor}
        fillColor={colorConfig.color1.fillColor}
        className="w-full rounded-xl md:h-[400px] lg:h-1/3"
      >
        <p className="text-center text-2xl text-white">{card1text}</p>
      </WordwareCard>
      <div className="flex w-full flex-col gap-4 rounded-xl sm:flex-row md:h-2/3">
        <WordwareCard
          hideShare
          show={!!card2.text}
          backgroundColor={colorConfig.color2.bgColor}
          fillColor={colorConfig.color2.fillColor}
          className="h-full w-1/2 rounded-xl"
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="text-4xl font-semibold text-white">{card2.title}</h3>
            {card2.imageUrl !== "null" && card2.text && (
              <>
                {card2.href ? (
                  <Link href={card2.href}>
                    <Image
                      src={card2.imageUrl}
                      alt={card2.title}
                      className="aspect-square rounded-lg object-cover"
                      width={120}
                      height={120}
                    />
                  </Link>
                ) : (
                  <Image
                    src={card2.imageUrl}
                    alt={card2.title}
                    className="aspect-square rounded-lg object-cover"
                    width={120}
                    height={120}
                  />
                )}
              </>
            )}
            <p className="text-center text-2xl text-white">{card2.text}</p>
          </div>
        </WordwareCard>
        <div className="h-full w-1/2 rounded-xl">
          <div className="flex h-full w-full flex-col gap-4">
            <WordwareCard
              hideShare
              show={!!card3text}
              backgroundColor={colorConfig.color3.bgColor}
              fillColor={colorConfig.color3.fillColor}
              className="h-full w-full rounded-xl"
            >
              <p className="text-center text-2xl text-white">{card3text}</p>
            </WordwareCard>
            {showWordwareCard ? (
              <div className="relative flex h-40 w-full items-center justify-between gap-4 overflow-hidden rounded-xl border p-4">
                <Image
                  src="/images/card-background.png"
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="relative z-10 flex w-full items-center justify-between gap-4">
                  <p className="text-white">
                    LLMwrapped has been built with Wordware - the ultimate AI
                    operating system
                  </p>
                  <WordwareStory href={storyHref} />
                </div>
              </div>
            ) : (
              <Skeleton className="h-40 w-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
