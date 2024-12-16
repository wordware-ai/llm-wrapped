import { cardConfig } from "@/config/card-config";
import Image from "next/image";
import Link from "next/link";
import WordwareCard from "./wordware-card";
import WordwareStory from "./wordware-story";

export function SideCards({
  card1text,
  card2,
  card3text,
  wordwareStoryHref,
}: {
  card1text: string;
  card2: {
    title?: string;
    text: string;
    imageUrl?: string;
    href?: string;
  };
  card3text: string;
  wordwareStoryHref: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:h-full lg:w-1/2 lg:min-w-[550px]">
      <WordwareCard
        hideShare
        hideHashtag
        cardData={cardConfig.card1}
        className="aspect-auto h-min min-h-[400px] w-full rounded-xl sm:min-h-80 lg:h-1/3 lg:min-h-56"
      >
        <div className="flex h-full items-center justify-center">
          {card1text ? (
            <p className="py-8 text-center text-4xl text-white sm:py-0 sm:text-3xl lg:text-2xl">
              {card1text}
            </p>
          ) : (
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#2d3533] border-t-transparent" />
          )}
        </div>
      </WordwareCard>
      <div className="flex min-h-[550px] w-full flex-col gap-4 rounded-xl sm:flex-row lg:h-2/3 lg:min-h-0">
        <WordwareCard
          hideShare
          hideHashtag
          cardData={cardConfig.card2}
          className="aspect-auto min-h-[400px] w-full rounded-xl sm:min-h-full sm:w-1/2 sm:px-0 lg:min-h-0"
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-8 sm:py-0">
            {card2.text ? (
              <>
                {card2.text && card2.title && (
                  <h3 className="text-center text-5xl font-semibold text-white sm:text-4xl lg:text-3xl">
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
                          className="h-40 w-40 rounded-lg object-cover sm:h-[120px] sm:w-[120px]"
                          width={160}
                          height={160}
                          loading="eager"
                        />
                      </Link>
                    ) : (
                      <Image
                        src={card2.imageUrl}
                        alt={card2.title ?? ""}
                        className="h-40 w-40 rounded-lg object-cover sm:h-[120px] sm:w-[120px]"
                        width={160}
                        height={160}
                        loading="eager"
                      />
                    )}
                  </>
                )}

                <p className="text-center text-4xl text-white sm:text-3xl lg:text-xl xl:text-2xl">
                  {card2.text}
                </p>
              </>
            ) : (
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A03C6C] border-t-transparent" />
            )}
          </div>
        </WordwareCard>
        <div className="flex h-full w-full flex-col gap-4 sm:w-1/2">
          <WordwareCard
            hideShare
            hideHashtag
            cardData={cardConfig.card3}
            className="flex aspect-auto h-full min-h-[400px] w-full items-center justify-center rounded-xl lg:h-full lg:min-h-0"
          >
            <div className="flex h-full w-full items-center justify-center py-8 sm:py-0">
              {card3text ? (
                <p className="grow text-center text-4xl text-white sm:text-2xl">
                  {card3text}
                </p>
              ) : (
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4A5E9A] border-t-transparent" />
              )}
            </div>
          </WordwareCard>
          <div className="relative flex h-40 w-full items-center justify-between gap-4 overflow-hidden rounded-xl border p-4">
            <Image
              src="/images/card-background.png"
              alt="Background"
              fill
              className="object-cover"
              loading="eager"
              priority
            />
            <div className="relative z-10 flex w-full items-center justify-between gap-4">
              <p className="text-xl text-white sm:text-sm">
                LLMwrapped has been built with Wordware - the ultimate AI
                operating system
              </p>
              <WordwareStory href={wordwareStoryHref} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
