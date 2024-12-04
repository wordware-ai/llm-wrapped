"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { type ReactNode } from "react";
import ShareButton from "../share";
import { motion } from "framer-motion";

export default function WordwareCard({
  children,
  fillColor,
  className,
  show = true,
  wide = false,
  hideHashtag = false,
  hideShare = false,
}: {
  children: ReactNode;
  fillColor?: string;
  className: string;
  show?: boolean;
  wide?: boolean;
  hideHashtag?: boolean;
  hideShare?: boolean;
}) {
  return (
    show && (
      <div
        className={cn(
          "relative flex aspect-[4/7] items-center overflow-hidden rounded-lg bg-[#1A1A1A] p-8",
          className,
        )}
      >
        <motion.div
          className={cn(
            "absolute left-0 top-0 w-full gap-[7px] px-2",
            wide ? "grid md:grid-cols-2" : "flex flex-col",
          )}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <WordwareLogo key={i} fillColor={fillColor} />
          ))}
        </motion.div>
        <div className={cn("z-10", (!hideShare || !hideHashtag) && "pb-24")}>
          {children}
        </div>

        {!hideShare && (
          <div
            className={cn(
              "absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <ShareButton className="text-white hover:text-white/80">
              Share
            </ShareButton>
          </div>
        )}
        {!hideHashtag && (
          <p
            className={cn(
              "absolute left-8 z-[10] text-white",
              !hideShare ? "bottom-20 text-lg" : "bottom-8",
            )}
          >
            #LLMwrapped
          </p>
        )}
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
