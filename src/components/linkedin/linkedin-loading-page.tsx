"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Counter from "./counter";

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
      <div className="flex w-full flex-col rounded-lg border p-8">
        <div className="mb-8">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-center text-2xl font-semibold text-blue-600"
          >
            {loadingMessages[messageIndex]}
          </motion.div>
          <div className="flex items-center justify-center gap-2">
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>

        <div className="w-full rounded-lg bg-white p-6">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-medium text-gray-700">
              While you wait...
            </h3>
            <p className="text-sm text-gray-500">Click this button 500 times</p>
          </div>
          <Counter />
        </div>
      </div>
    </div>
  );
}
