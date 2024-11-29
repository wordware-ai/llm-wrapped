"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useMemo } from "react";
import WordwareCard from "./spotify/wordware-card";
import { useStreamContext } from "./stream-provider";
import { homepageSlideshows } from "@/config/slideshow-config";
import { cards } from "@/config/card-config";
import { slideshowCards } from "@/config/slideshow-card-config";

type SlideData = {
  id: string;
  value: unknown;
  Component?: React.ComponentType<{ result: Record<string, unknown> }>;
  title?: string;
};

export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useQueryState(
    "slide",
    parseAsInteger,
  );
  const [name] = useQueryState("name", parseAsString);

  const { results } = useStreamContext();
  const router = useRouter();
  const { userId } = useParams();

  // Prevent scrolling when the slideshow is open
  useEffect(() => {
    if (currentSlide) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [currentSlide]);

  const slides = useMemo<SlideData[]>(() => {
    if (userId && results) {
      // Map results to their corresponding card configurations
      return Object.entries(results).map(([key, value]) => {
        // Find the card config for this result
        const cardConfig = cards.find((card) => card.data.id === key);

        return {
          id: key,
          value,
          Component: cardConfig?.Component,
          title: cardConfig?.data.title,
        };
      });
    } else if (name) {
      const staticSlideshow =
        homepageSlideshows[name as keyof typeof homepageSlideshows];
      if (!staticSlideshow) return [];

      return Object.entries(staticSlideshow)
        .filter(([_, value]) => typeof value === "string")
        .map(([key, value]) => ({
          id: key,
          value,
          Component: slideshowCards.find((card) => card.data.id === key)
            ?.Component,
          title: slideshowCards.find((card) => card.data.id === key)?.data
            .title,
        }));
    }
    return [];
  }, [userId, name, results]);

  console.log(slides);

  if (!currentSlide || !slides.length) return null;

  const currentSlideData = slides[currentSlide - 1];
  if (!currentSlideData) return null;

  const exit = () => {
    if (userId) {
      router.push(`/${userId as string}`);
    } else {
      router.push("/", { scroll: false });
    }
  };

  const nextSlide = async () => {
    if (currentSlide === slides.length - 3) {
      exit();
    } else {
      await setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = async () => {
    if (currentSlide !== 1) {
      const prev = Math.max(1, currentSlide - 1);
      await setCurrentSlide(prev);
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { clientX, currentTarget } = e;
    const third = currentTarget.clientWidth / 3;

    if (clientX > third * 2) {
      await nextSlide();
    } else if (clientX < third) {
      await previousSlide();
    }
  };

  return (
    <div
      className="fixed z-20 flex h-screen w-full select-none items-center justify-center gap-4 bg-black/90 md:p-6"
      onClick={exit}
    >
      <X
        className="absolute right-4 top-4 size-8 text-white hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          exit();
        }}
      />
      <ChevronLeft
        className={cn(
          "hidden size-7 rounded-full bg-zinc-600 pr-0.5 hover:cursor-pointer md:block",
          currentSlide === 1 && "invisible",
        )}
        onClick={async (e) => {
          e.stopPropagation();
          await previousSlide();
        }}
      />
      <div onClick={handleClick}>
        <WordwareCard
          className={cn(
            "h-full w-full rounded-none bg-[#1A1A1A] sm:h-auto sm:max-w-md sm:rounded-xl",
          )}
        >
          {currentSlideData.Component ? (
            <currentSlideData.Component
              result={
                typeof currentSlideData.value === "object"
                  ? (currentSlideData.value as Record<string, unknown>)
                  : { value: currentSlideData.value }
              }
            />
          ) : (
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-2xl font-semibold text-white">
                {currentSlideData.title}
              </h3>
              <p className="text-white">{String(currentSlideData.value)}</p>
            </div>
          )}
        </WordwareCard>
      </div>
      <ChevronRight
        className={cn(
          "hidden size-7 rounded-full bg-zinc-600 pl-0.5 hover:cursor-pointer md:block",
          currentSlide === slides.length && "invisible",
        )}
        onClick={async (e) => {
          e.stopPropagation();
          await nextSlide();
        }}
      />
    </div>
  );
}
