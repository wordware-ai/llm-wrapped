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
      className="fixed left-0 top-0 z-40 flex aspect-[4/7] h-full w-full select-none items-center overflow-hidden rounded-none bg-black p-8 sm:relative sm:aspect-[4/7] sm:h-auto sm:w-auto sm:rounded-xl"
    >
      <Image
        src={"/images/story-background.png"}
        alt={slideData.title}
        fill
        quality={10}
        className="absolute inset-0 object-cover opacity-50"
        priority
        fetchPriority="high"
        placeholder="blur"
        loading="eager"
        blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAoAAAAVCAMAAABIbI/BAAAAqFBMVEUhNzg/XV1IaWcsR0cnQEAzUFA2VFNTd3NMbWsvS0wjOjsOGxNPcWwjQhwpREMeMjNDYmEwTkcKFBFfhHklPj46V1g7W1JCY1cVJhRPdi5UdmtYgTdkijYfNDVHZmcuTSAoRh1GZ2MgORkoSR9vkVQwViFhhUgcMRdjiXpuk3BZfnocLzEaLC57r0lvpjpqmUpLcEZbfVp1oFxSclweNh1bez1pjoNAaCnKoVkWAAAAt0lEQVQI1x2NyWKDIABER1BUBJFixLXRmETTNmuX/P+fBTqnd5h5Ax7SNNoUJDZAmKcRC97FB1CG/5jEAC9pyoLC4cC5a2wCEkPBD5nHzwHe4Xb4UkOZ0yggCZRyOso8coWSMvchoDkPnWByMq1zXVVTIlbYSjNLBCEG11tlbdwWyYrL+XG3rWjNHw5Nd9zvv1tjsJVz0/e/x9MJUu7mcdt0fYc6q3fLj2dkLvUi5eGJ7M2nHmf5AgI0DnJo+IK6AAAAAElFTkSuQmCC"
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
