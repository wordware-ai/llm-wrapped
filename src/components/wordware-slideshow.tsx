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
    <div
      // className="relative flex items-center overflow-hidden p-8 sm:aspect-[4/7] sm:rounded-lg"
      className="fixed left-0 top-0 z-20 flex aspect-[4/7] h-full w-full select-none items-center overflow-hidden rounded-none bg-black p-8 sm:relative sm:aspect-[4/7] sm:h-auto sm:w-auto sm:rounded-xl"
    >
      <Image
        src={"/images/story-background.png"}
        alt={slideData.title}
        fill
        quality={100}
        className="absolute inset-0 object-cover opacity-50"
        priority
        fetchPriority="high"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQrJyEwPENDPzE2O0FBNi5QREZXUFM4UjVqV1JwZoJvdnF6eFuBgoD/2wBDARUXFyAeIBogHB4gIEEuJyBBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
      <TitleCard
        key={currentSlide}
        title={slideData.title}
        description={slideData.description}
      />
    </div>
  );

  return (
    <SlideshowShell slidesLength={wordwareConfig.length}>
      {slideContent}
    </SlideshowShell>
  );
}
