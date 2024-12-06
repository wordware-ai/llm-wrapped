"use client";

import { wordwareConfig } from "@/config/wordware-config";
import { parseAsInteger, useQueryState } from "nuqs";
import SlideshowShell from "./slideshow-shell";
import Image from "next/image";

export default function WordwareSlideshow() {
  const [currentSlide] = useQueryState("slide", parseAsInteger);
  const [name] = useQueryState("name");

  if (name !== "wordware" || !currentSlide) return null;

  // If no slide is selected, show first slide
  const slideIndex = currentSlide ? currentSlide - 1 : 0;
  const slideData = wordwareConfig[slideIndex];

  if (!slideData) return null;

  const slideContent = (
    <div className="relative flex aspect-[4/7] items-center overflow-hidden rounded-lg bg-[#1A1A1A] p-8">
      <Image
        src={"/images/story-background.png"}
        alt={slideData.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-white">{slideData.title}</h2>
        <p className="max-w-2xl text-gray-200">{slideData.description}</p>
      </div>
    </div>
  );

  return (
    <SlideshowShell slidesLength={wordwareConfig.length}>
      {slideContent}
    </SlideshowShell>
  );
}
