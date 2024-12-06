import { Suspense } from "react";
import { BaseStory } from "./base-story";
import WordwareSlideshow from "./wordware-slideshow";

export default function WordwareStory({ href }: { href: string }) {
  return (
    <>
      <BaseStory
        src="/brand/w-black.png"
        alt="Wordware"
        href={href}
        imageClassName="pt-1.5"
      />
      <Suspense>
        <WordwareSlideshow />
      </Suspense>
    </>
  );
}
