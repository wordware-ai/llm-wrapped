"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStreamContext } from "./stream-provider";
import { useQueryState, parseAsInteger, parseAsBoolean } from "nuqs";
import WordwareCard from "./spotify/wordware-card";

export default function SlideShow() {
  // const colorMap = {
  //   1: "bg-gradient-to-bl from-gray-800 via-blue-950 to-slate-900",
  //   2: "bg-gradient-to-bl from-gray-800 via-emerald-950 to-slate-900",
  //   3: "bg-gradient-to-bl from-gray-900 via-amber-950 to-slate-900",
  //   4: "bg-gradient-to-bl from-gray-800 via-purple-950 to-slate-900",
  //   5: "bg-gradient-to-bl from-gray-800 via-pink-950 to-slate-900",
  //   6: "bg-gradient-to-bl from-gray-900 via-orange-950 to-slate-900",
  //   7: "bg-gradient-to-bl from-gray-800 via-teal-950 to-slate-900",
  // };

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

  const nextSlide = async () => {
    if (currentSlide === 7) {
      exit();
    } else {
      const next = currentSlide + 1;
      if (resultsArray.length >= next + 3) {
        await setCurrentSlide(next);
      }
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
      className="flex h-screen w-full select-none items-center justify-center gap-4 md:p-6"
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
      <WordwareCard className="h-full w-full rounded-none sm:h-auto sm:max-w-md sm:rounded-xl">
        <div>{resultsArray[currentSlide + 2] as string}</div>
      </WordwareCard>
      <ChevronRight
        className={cn(
          "hidden size-8 hover:cursor-pointer md:block",
          resultsArray.length < currentSlide + 3 && "invisible",
        )}
      />
    </div>
  );
}
