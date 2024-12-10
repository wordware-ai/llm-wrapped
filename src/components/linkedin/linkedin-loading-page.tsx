"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const loadingMessages = [
  "Decoding your professional journey...",
  "Analyzing career trajectories...",
  "Calculating networking potential...",
  "Mining hidden opportunities...",
  "Evaluating skill synergies...",
  "Quantifying leadership impact...",
  "Processing connection patterns...",
  "Mapping industry influence...",
  "Synthesizing career achievements...",
  "Discovering growth vectors...",
  "Measuring professional momentum...",
  "Calibrating success metrics...",
];

export default function LinkedinLoadingPage() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col justify-between gap-8 lg:min-w-0 lg:flex-1">
      <h1 className="text-5xl font-semibold text-muted-foreground xs:text-6xl sm:text-7xl md:text-8xl lg:text-6xl xl:text-8xl">
        #LLMwrapped
      </h1>
      <div className="flex w-full flex-col items-center justify-center rounded-lg border px-8 py-24">
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center text-2xl font-semibold text-black"
        >
          {loadingMessages[messageIndex]}
        </motion.div>
        <div className="flex items-center justify-center gap-2">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-black"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-black"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-black"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}
