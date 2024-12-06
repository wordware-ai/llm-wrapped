"use client";

import React, { useRef, useEffect, useState } from "react";
import WordwareCard from "./wordware-card";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { colorConfig } from "@/config/color-config";

const SCROLL_INTERVAL = 7000;
const cards = [
  {
    content:
      "Your playlist screams'I learned about music from my mom's aerobics DVD collection.' You've got Madonna next to Zach Bryan - it's like putting caviar on a gas station hot dog.",
    ...colorConfig.color1,
  },
  {
    content:
      "The fact that you're listening to both 'Without Me' and 'My Heart Will Go On' suggests you're the kind of person who can't decide if they want to fight someone or dramatically stare out a rainy window.",
    ...colorConfig.color2,
  },
  {
    content:
      "Your career is like a DJ Khaled song - you just keep saying 'Another one' while moving from job to job. At least you're consistent at being inconsistent!",
    ...colorConfig.color3,
  },
  {
    content:
      "You'd probably try to mosh to 'This Charming Man' while attempting to hit the griddy to The Smiths. Please stay at least 100 feet away from any dance floor",
    ...colorConfig.color4,
  },
  {
    content:
      "Your playlist is like a time machine, but it's stuck in reverse. You've got more 80s hits than a high school reunion.",
    ...colorConfig.color5,
  },
  {
    content:
      "Listening to your playlist is like watching a movie with too many plot twists. One minute it's heavy metal, the next it's a Disney soundtrack.",
    ...colorConfig.color6,
  },
  {
    content:
      "Your music taste is so eclectic, it's like you threw a dart at a genre chart and decided to listen to whatever it landed on.",
    ...colorConfig.color7,
  },
  {
    content:
      "Your playlist is the musical equivalent of a mixed bag of jellybeans - you never know if you're going to get a sweet pop hit or a bitter breakup ballad.",
    ...colorConfig.color8,
  },
];

export default function HomeCards() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedCards = [...cards, ...cards];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: NodeJS.Timeout;
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isPaused && scrollContainer) {
          const firstChild = scrollContainer.firstElementChild as HTMLElement;
          const cardElement = firstChild?.firstElementChild as HTMLElement;
          const cardWidth = cardElement?.clientWidth ?? 0;
          scrollContainer.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }, SCROLL_INTERVAL);
    };

    // Infinite scroll handler
    const handleScroll = () => {
      if (isScrolling || !scrollContainer) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const halfWidth = scrollWidth / 2;

      if (
        Math.abs(
          Number(scrollLeft) + Number(clientWidth) - Number(scrollWidth),
        ) < 10 ||
        Math.abs(Number(scrollLeft)) < 10
      ) {
        setIsScrolling(true);
        scrollContainer.style.scrollBehavior = "auto";
        scrollContainer.scrollLeft =
          Number(scrollLeft) < 10
            ? Number(scrollLeft) + halfWidth
            : Number(scrollLeft) - halfWidth;
        requestAnimationFrame(() => {
          if (scrollContainer) {
            scrollContainer.style.scrollBehavior = "smooth";
            setIsScrolling(false);
          }
        });
      }
    };

    // User interaction handlers
    const pauseScroll = () => setIsPaused(true);
    const resumeScroll = () => {
      setIsPaused(false);
      clearInterval(scrollInterval);
      startAutoScroll();
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    scrollContainer.addEventListener("mouseenter", pauseScroll);
    scrollContainer.addEventListener("touchstart", pauseScroll);
    scrollContainer.addEventListener("mouseleave", resumeScroll);
    scrollContainer.addEventListener("touchend", resumeScroll);

    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer.removeEventListener("mouseenter", pauseScroll);
        scrollContainer.removeEventListener("touchstart", pauseScroll);
        scrollContainer.removeEventListener("mouseleave", resumeScroll);
        scrollContainer.removeEventListener("touchend", resumeScroll);
      }
    };
  }, [isScrolling, isPaused]);

  return (
    <div className="relative sm:px-4 xl:px-16">
      <button
        className="absolute left-0 top-1/2 z-[10] block -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
        onClick={() => {
          if (!scrollRef.current) return;
          const cardElement = scrollRef.current.firstElementChild
            ?.firstElementChild as HTMLElement;
          const cardWidth = cardElement?.clientWidth ?? 0;
          scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }}
      >
        <ChevronLeft className="z-[99] h-6 w-6 text-black" />
      </button>

      <button
        className="absolute right-0 top-1/2 z-[10] block -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
        onClick={() => {
          if (!scrollRef.current) return;
          const cardElement = scrollRef.current.firstElementChild
            ?.firstElementChild as HTMLElement;
          const cardWidth = cardElement?.clientWidth ?? 0;
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }}
      >
        <ChevronRight className="h-6 w-6 text-black" />
      </button>

      <div
        ref={scrollRef}
        className="scrollbar-hide snap-x snap-mandatory overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
        }}
      >
        <div className="flex w-fit">
          {duplicatedCards.map((card, index) => (
            <div
              key={`card-${index}`}
              className={cn(
                "w-[calc(100vw-38px)] shrink-0 px-4 sm:w-[calc(50vw-2rem)] md:w-[calc(50vw-2rem)] lg:w-[calc(33.333vw-25px)] xl:w-[calc(25vw-40px)]",
                !isScrolling && "snap-start",
              )}
            >
              <WordwareCard
                className={cn("w-full items-center")}
                backgroundColor={card.bgColor}
                fillColor={card.fillColor}
                hideHashtag
                hideShare
              >
                <div className="z-10 self-start text-2xl text-white xl:text-2xl">
                  {card.content}
                </div>
              </WordwareCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
