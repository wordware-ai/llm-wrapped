"use client";

import { linkedinConfig } from "@/config/linkedin-config";
import { linkedinExamples } from "@/config/linkedin-examples";
import { spotifyConfig } from "@/config/spotify-config";
import { spotifyExamples } from "@/config/spotify-examples";
import { tinderConfig } from "@/config/tinder-config";
import { tinderExamples } from "@/config/tinder-examples";
import { usePathname } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import SlideshowShell from "./slideshow-shell";
import WordwareCard from "./spotify/wordware-card";
import { useStreamContext } from "./stream-provider";

export default function SlideShow() {
  const [currentSlide] = useQueryState("slide", parseAsInteger);
  const [name] = useQueryState("name", parseAsString);
  const [type] = useQueryState("type", parseAsString);

  const { results, profileData } = useStreamContext();
  const pathname = usePathname();

  const getServiceType = useMemo(() => {
    if (!pathname || pathname === "/") return type;
    const path = pathname.split("/");
    return path[1] ?? type;
  }, [pathname, type]);

  const serviceCards =
    getServiceType === "linkedin"
      ? linkedinConfig
      : getServiceType === "tinder"
        ? tinderConfig
        : spotifyConfig;

  const serviceExamples =
    getServiceType === "linkedin"
      ? linkedinExamples
      : getServiceType === "tinder"
        ? tinderExamples
        : spotifyExamples;

  const slides = useMemo(() => {
    if (name) {
      const staticSlideshow =
        serviceExamples[name as keyof typeof serviceExamples];
      console.log(staticSlideshow);
      if (!staticSlideshow) return [];
      return Object.entries(staticSlideshow)
        .map(([key, value]) => {
          const card = serviceCards.find((card) => card.data.id === key);
          if (!card) return null;
          return {
            id: key,
            value,
            bgColor: card?.data.bgColor,
            fillColor: card?.data.fillColor,
            Component: card?.Component,
            Animation: card?.Animation,
          };
        })
        .filter(Boolean);
    }
    return Object.entries(results).map(([key, value]) => {
      const cardConfig = serviceCards.find((card) => card.data.id === key);
      return {
        id: key,
        value,
        bgColor: cardConfig?.data.bgColor,
        fillColor: cardConfig?.data.fillColor,
        Component: cardConfig?.Component,
        Animation: cardConfig?.Animation,
      };
    });
  }, [name, results, serviceCards, serviceExamples]);

  if (!currentSlide || !slides.length || name === "wordware") return null;

  const currentSlideData = slides[currentSlide - 1];
  if (!currentSlideData) return null;

  console.log(currentSlideData.value);

  const slideContent = (
    <WordwareCard
      Animation={currentSlideData.Animation}
      backgroundColor={currentSlideData.bgColor}
      fillColor={currentSlideData.fillColor}
      className="fixed left-0 top-0 -z-20 h-[100dvh] w-full select-none overflow-hidden rounded-none sm:relative sm:aspect-[4/7] sm:h-auto sm:w-auto sm:rounded-xl"
    >
      {currentSlideData.Component && (
        <currentSlideData.Component
          key={currentSlideData.id}
          result={
            typeof currentSlideData.value === "object"
              ? (currentSlideData.value as Record<string, unknown>)
              : { value: currentSlideData.value }
          }
          profileData={
            (
              serviceExamples[name as keyof typeof serviceExamples] as {
                profileData: Record<string, string | null>;
              }
            )?.profileData ?? profileData
          }
        />
      )}
    </WordwareCard>
  );

  return (
    <SlideshowShell slidesLength={slides.length}>{slideContent}</SlideshowShell>
  );
}
