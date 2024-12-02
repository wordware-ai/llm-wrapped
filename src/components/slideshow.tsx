"use client";

import { slideshowCards } from "@/config/slideshow-card-config";
import { homepageSlideshows } from "@/config/examples-config";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import React, { useEffect, useMemo } from "react";
import WordwareCard from "./spotify/wordware-card";
import { useStreamContext } from "./stream-provider";
import { getImageUrl } from "@/lib/get-image-url";

export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useQueryState(
    "slide",
    parseAsInteger,
  );
  const [name] = useQueryState("name", parseAsString);

  const { results } = useStreamContext();
  const router = useRouter();
  const { username } = useParams();

  // Prevent scrolling when the slideshow is open
  useEffect(() => {
    if (currentSlide) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [currentSlide]);

  const slides = useMemo(() => {
    if (name) {
      const staticSlideshow =
        homepageSlideshows[name as keyof typeof homepageSlideshows];
      if (!staticSlideshow) return [];
      return Object.entries(staticSlideshow).map(([key, value]) => ({
        id: key,
        value,
        Component: slideshowCards.find((card) => card.data.id === key)
          ?.Component,
        title: slideshowCards.find((card) => card.data.id === key)?.data.title,
      }));
    } else if (username && results) {
      // Filter out metadata fields before mapping
      return Object.entries(results).map(([key, value]) => {
        // Find the card config for this result
        const cardConfig = slideshowCards.find((card) => card.data.id === key);

        return {
          id: key,
          value,
          Component: cardConfig?.Component,
          title: cardConfig?.data.title,
        };
      });
    }
    return [];
  }, [username, name, results]);

  if (!currentSlide || !slides.length) return null;

  console.log(slides);

  const currentSlideData = slides[currentSlide - 1];
  if (!currentSlideData) return null;

  const exit = () => {
    if (username) {
      router.push(`/${username as string}`);
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
      className="fixed z-20 flex h-screen w-full select-none items-start justify-center gap-4 bg-black/95 sm:items-center md:p-6"
      onClick={exit}
    >
      <X
        className="absolute right-4 top-4 z-20 size-8 text-white hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          exit();
        }}
      />
      <ChevronLeft
        className={cn(
          "hidden size-7 rounded-full bg-zinc-600 pr-0.5 hover:cursor-pointer sm:block",
          currentSlide === 1 && "invisible",
        )}
        onClick={async (e) => {
          e.stopPropagation();
          await previousSlide();
        }}
      />
      <div onClick={handleClick} className="h-[100dvh] sm:h-auto">
        <WordwareCard
          className={cn(
            "aspect-auto h-full w-full rounded-none sm:aspect-[4/7] sm:max-w-md sm:rounded-xl",
          )}
          hideShare={!username}
          hideHashtag
        >
          {currentSlideData.Component ? (
            <currentSlideData.Component
              result={
                typeof currentSlideData.value === "object"
                  ? (currentSlideData.value as Record<string, unknown>)
                  : { value: currentSlideData.value }
              }
              imageUrl={
                username
                  ? getImageUrl(currentSlideData.id, results)
                  : getImageUrl(
                      currentSlideData.id,
                      homepageSlideshows[
                        name as keyof typeof homepageSlideshows
                      ],
                    )
              }
            />
          ) : (
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-3xl font-semibold text-white">
                {currentSlideData.title}
              </h3>
              <p className="text-2xl text-white">
                {String(currentSlideData.value)}
              </p>
            </div>
          )}
        </WordwareCard>
      </div>
      <ChevronRight
        className={cn(
          "hidden size-7 rounded-full bg-zinc-600 pl-0.5 hover:cursor-pointer sm:block",
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
