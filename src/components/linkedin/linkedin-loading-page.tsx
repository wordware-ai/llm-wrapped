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

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="mb-8 text-center">
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-2xl font-semibold text-blue-600"
        >
          {loadingMessages[messageIndex]}
        </motion.div>
        <div className="flex items-center justify-center gap-2">
          <div
            className="animate-bounce h-2 w-2 rounded-full bg-blue-600"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="animate-bounce h-2 w-2 rounded-full bg-blue-600"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="animate-bounce h-2 w-2 rounded-full bg-blue-600"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-medium text-gray-700">
            While you wait...
          </h3>
          <p className="text-sm text-gray-500">Click this button 500 times</p>
        </div>
        <Counter />
      </div>
    </div>
  );
}
