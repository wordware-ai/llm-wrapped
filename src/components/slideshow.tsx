"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStreamContext } from "./stream-provider";
import { useQueryState, parseAsInteger, parseAsBoolean } from "nuqs";

export default function SlideShow() {
  const colorMap = {
    1: "bg-blue-500",
    2: "bg-green-500",
    3: "bg-yellow-500",
    4: "bg-purple-500",
    5: "bg-pink-500",
    6: "bg-orange-500",
    7: "bg-teal-500",
  };

  const [currentSlide, setCurrentSlide] = useQueryState(
    "slide",
    parseAsInteger.withDefault(1),
  );
  const [returnHome] = useQueryState("returnHome", parseAsBoolean);

  const { results } = useStreamContext();
  const resultsArray = Object.values(results);
  const router = useRouter();
  const { userId } = useParams();

  const exit = () => {
    if (returnHome) {
      router.push("/");
    } else {
      router.push(`/${userId as string}`);
    }
  };

  const nextSlide = () => {
    if (currentSlide === 7) {
      exit();
    } else {
      const next = currentSlide + 1;
      if (resultsArray.length >= next + 3) {
        setCurrentSlide(next);
      }
    }
  };

  const previousSlide = () => {
    const prev = Math.max(1, currentSlide - 1);
    setCurrentSlide(prev);
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
      <X
        className="absolute right-4 top-4 size-8 hover:cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          exit();
        }}
      />
      <ChevronLeft
        className={cn(
          "hidden size-8 hover:cursor-pointer md:block",
          currentSlide === 1 && "invisible",
        )}
      />

      <div
        className={cn(
          "h-full w-full p-6 shadow-lg md:max-w-xl md:rounded-lg",
          colorMap[currentSlide as keyof typeof colorMap],
        )}
      >
        <div className="flex h-full items-center justify-center">
          <p className="text-center text-5xl text-white">
            {resultsArray[currentSlide + 2]}
          </p>
        </div>
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
