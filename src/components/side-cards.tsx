import Image from "next/image";
import WordwareCard from "./spotify/wordware-card";
import { BaseStory } from "./base-story";
import Link from "next/link";

export function SideCards({
  card1text,
  card2,
  card3text,
  storyHref,
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
}) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:h-full lg:w-1/2">
      <WordwareCard
        wide
        hideShare
        show={!!card1text}
        className="w-full rounded-xl bg-[#1A1A1A] md:h-[400px] lg:h-1/3"
      >
        <p className="text-center text-2xl text-white">{card1text}</p>
      </WordwareCard>
      <div className="flex w-full flex-col gap-4 rounded-xl sm:flex-row md:h-2/3">
        <WordwareCard
          hideShare
          show={!!card2.text}
          className="h-full w-full rounded-xl bg-[#1A1A1A]"
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
        <div className="h-full w-full rounded-xl">
          <div className="flex h-full w-full flex-col gap-4">
            <WordwareCard
              hideShare
              show={!!card3text}
              className="h-2/3 w-full rounded-xl bg-[#1A1A1A]"
            >
              <p className="text-center text-2xl text-white">{card3text}</p>
            </WordwareCard>
            {!!card3text && (
              <div className="flex h-1/3 w-full items-center justify-between gap-4 rounded-xl border p-4">
                <p className="">
                  LLMwrapped has been built with Wordware - the ultimate AI
                  operating system
                </p>
                <BaseStory
                  src="/brand/w-black.png"
                  alt="Wordware"
                  href={storyHref}
                  imageClassName="pt-1.5"
                  className="shrink-0"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
