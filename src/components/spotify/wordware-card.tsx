"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/share";

export default function WordwareCard({
  children,
  fillColor,
  className,
  show = true,
  wide = false,
  hideHashtag = false,
}: {
  children: ReactNode;
  fillColor?: string;
  className: string;
  show?: boolean;
  wide?: boolean;
  hideHashtag?: boolean;
}) {
  return (
    show && (
      <div
        className={cn(
          "relative flex aspect-[4/7] items-center overflow-hidden rounded-lg p-8",
          className,
        )}
      >
        {!hideHashtag && (
          <p className="absolute left-8 top-8 z-[10] text-white">#LLMwrapped</p>
        )}
        <div
          className={cn(
            "absolute left-0 top-0 w-full gap-[7px] px-2",
            wide ? "grid grid-cols-2" : "flex flex-col",
          )}
        >
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
          <WordwareLogo fillColor={fillColor} />
        </div>
        <div className="z-10">{children}</div>
        <div
          className="absolute bottom-8 left-8 flex items-center gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          <ShareButton className="text-white hover:text-white/80">
            Share
          </ShareButton>
        </div>
      </div>
    )
  );
}

function WordwareLogo({
  fillColor = "fill-black opacity-50",
}: {
  fillColor?: string;
}) {
  return (
    <Image
      src="/brand/wordware-black.svg"
      alt="Wordware"
      width={100}
      height={100}
      className={cn("w-full", fillColor)}
    />
  );
}
