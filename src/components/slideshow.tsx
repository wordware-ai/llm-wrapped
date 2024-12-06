"use client";

import { linkedinConfig } from "@/config/linkedin-config";
import { spotifyConfig } from "@/config/spotify-config";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import SlideIndicator from "./slide-indicator";
import WordwareCard from "./spotify/wordware-card";
import { useStreamContext } from "./stream-provider";
import { spotifyExamples } from "@/config/spotify-examples";
import { linkedinExamples } from "@/config/linkedin-examples";
import SlideshowShell from "./slideshow-shell";

export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useQueryState(
    "slide",
    parseAsInteger,
  );
  const [name] = useQueryState("name", parseAsString);
  const [type] = useQueryState("type", parseAsString);

  const [isPaused, setIsPaused] = useState(false);

  const { results, profileData } = useStreamContext();
  const router = useRouter();
  const { username } = useParams();

  const pathname = usePathname();

  const getServiceType = useMemo(() => {
    if (!pathname || pathname === "/") return type;
    const path = pathname.split("/");

    return path[1] ?? type;
  }, [pathname, type]);

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

  const serviceCards =
    getServiceType === "linkedin" ? linkedinConfig : spotifyConfig;
  const serviceExamples =
    getServiceType === "linkedin" ? linkedinExamples : spotifyExamples;

  const slides = useMemo(() => {
    if (name) {
      const staticSlideshow =
        serviceExamples[name as keyof typeof serviceExamples];
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
      // Find the card config for this result

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
  return <SlideshowShell slides={slides} profileData={profileData} />;
}
