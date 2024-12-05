"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import type React from "react";
import { useEffect, useState } from "react";
import SlideIndicator from "./slide-indicator";
import WordwareCard from "./spotify/wordware-card";
import { type CardComponentProps } from "./story-cards";

type Slide = {
  id: string;
  value: unknown;
  bgColor: string;
  fillColor: string;
  Component: React.ComponentType<CardComponentProps>;
  Animation: JSX.Element | undefined;
};

type ProfileData = Record<string, string | null>;

type SlideshowShellProps = {
  slides: Slide[];
  profileData: ProfileData;
};

export default function SlideshowShell({
  slides,
  profileData,
}: SlideshowShellProps) {
  const [currentSlide, setCurrentSlide] = useQueryState(
    "slide",
    parseAsInteger,
  );

  const [isPaused, setIsPaused] = useState(false);

  const router = useRouter();
  const { username } = useParams();

  // Prevent scrolling when the slideshow is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (currentSlide) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        void nextSlide();
      } else if (e.key === "ArrowLeft") {
        void previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  if (!currentSlide || !slides.length) return null;

  const currentSlideData = slides[currentSlide - 1];
  if (!currentSlideData) return null;

  const exit = () => {
    if (username) {
      // Get the current pathname and remove query parameters
      const currentPath = window.location.pathname;
      router.push(currentPath);
    } else {
      router.push("/", { scroll: false });
    }
  };

  const nextSlide = async () => {
    if (currentSlide === slides.length) {
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
        className="absolute right-4 top-8 z-20 size-8 text-white hover:cursor-pointer md:top-4"
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
      <div
        onClick={handleClick}
        // Pause the slideshow when the user holds a card
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="h-[100dvh] sm:h-auto"
      >
        <WordwareCard
          className={cn(
            "aspect-auto h-full w-full rounded-none sm:aspect-[4/7] sm:max-h-[80dvh] lg:rounded-xl",
          )}
          Animation={currentSlideData.Animation}
          backgroundColor={currentSlideData.bgColor}
          fillColor={currentSlideData.fillColor}
        >
          <div className="absolute left-0 top-0 z-20 w-full">
            <SlideIndicator
              currentSlide={currentSlide}
              totalSlides={slides.length}
              nextSlide={nextSlide}
              isPaused={isPaused}
            />
          </div>
          {currentSlideData.Component && (
            <currentSlideData.Component
              result={
                typeof currentSlideData.value === "object"
                  ? (currentSlideData.value as Record<string, unknown>)
                  : { value: currentSlideData.value }
              }
              profileData={profileData}
            />
          )}
        </WordwareCard>
      </div>
      <ChevronRight
        className={cn(
          "hidden size-7 rounded-full bg-zinc-600 pl-0.5 hover:cursor-pointer sm:block",
        )}
        onClick={async (e) => {
          e.stopPropagation();
          await nextSlide();
        }}
      />
    </div>
  );
}