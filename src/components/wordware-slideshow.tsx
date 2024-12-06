"use client";

import { wordwareConfig } from "@/config/wordware-config";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import SlideshowShell from "./slideshow-shell";
import { TitleCard } from "./story-cards";

export default function WordwareSlideshow() {
  const [currentSlide] = useQueryState("slide", parseAsInteger);
  const [name] = useQueryState("name");

  if (name !== "wordware" || !currentSlide) return null;

  // If no slide is selected, show first slide
  const slideIndex = currentSlide ? currentSlide - 1 : 0;
  const slideData = wordwareConfig[slideIndex];

  if (!slideData) return null;

  const slideContent = (
    <div className="relative flex aspect-[4/7] items-start overflow-hidden rounded-xl bg-[#1A1A1A] p-8 pt-56">
      <Image
        src={"/images/story-background.png"}
        alt={slideData.title}
        fill
        quality={100}
        className="object-cover object-[center_20%]"
        priority
      />
      <TitleCard title={slideData.title} description={slideData.description} />
    </div>
  );

  return (
    <SlideshowShell slidesLength={wordwareConfig.length}>
      {slideContent}
    </SlideshowShell>
  );
}
