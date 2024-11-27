"use client";

import React, { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStreamContext } from "./stream-provider";

export default function SlideShow() {
  // Use search params instead of dynamic route
  const searchParams = useSearchParams();
  const initialSlide = parseInt(searchParams.get("slide") ?? "1");
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const { results } = useStreamContext();

  const resultsArray = Object.values(results);

  const router = useRouter();
  const { userId } = useParams();

  const nextSlide = () => {
    const next = currentSlide + 1;
    if (next === 7) {
      router.push(`/${userId as string}`);
    } else {
      if (resultsArray.length >= next + 3) {
        setCurrentSlide(next);
        router.push(`/${userId as string}?slide=${next}`, { scroll: false });
      }
    }
  };

  const previousSlide = () => {
    const prev = Math.max(1, currentSlide - 1);
    setCurrentSlide(prev);
    router.push(`/${userId as string}?slide=${prev}`, { scroll: false });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const { clientX, currentTarget } = e;
    const third = currentTarget.clientWidth / 3;

    if (clientX > third * 2) {
      nextSlide();
    } else if (clientX < third) {
      previousSlide();
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center gap-4 md:p-6"
      onClick={handleClick}
    >
      <ChevronLeft
        className={cn(
          "hidden size-8 hover:cursor-pointer md:block",
          currentSlide === 1 && "invisible",
        )}
      />

      <div className="h-full w-full bg-green-500 p-6 shadow-lg md:max-w-xl md:rounded-lg">
        <div>ResultsDetailPage {currentSlide}</div>
        <p>{resultsArray[currentSlide + 2]}</p>
      </div>
      <ChevronRight
        className={cn(
          "hidden size-8 hover:cursor-pointer md:block",
          resultsArray.length < currentSlide + 3 && "invisible",
        )}
      />
    </div>
  );
}
