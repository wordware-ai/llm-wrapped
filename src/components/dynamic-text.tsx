"use client";

import React, { useState, useEffect } from "react";

export const DynamicText = ({
  text,
  minFontSize = 5,
  maxFontSize = 12,
}: {
  text: string;
  minFontSize?: number;
  maxFontSize?: number;
}) => {
  const [fontSize, setFontSize] = useState(minFontSize);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateFontSize = () => {
      // Get the screen width
      const screenWidth = window.innerWidth;

      // Adjust max font size based on screen width
      const adjustedMaxFontSize =
        screenWidth < 768 ? maxFontSize * 1 : maxFontSize;
      const adjustedMinFontSize =
        screenWidth < 768 ? minFontSize * 1 : minFontSize;

      // Calculate size based on total text length
      const totalLengthSize = Math.max(
        adjustedMinFontSize,
        adjustedMaxFontSize - text.length * 0.35,
      );

      // Calculate size based on longest word
      const longestWordLength = text
        .split(/\s+/)
        .reduce((max, word) => Math.max(max, word.length), 0);
      const wordLengthSize = Math.max(
        adjustedMinFontSize,
        adjustedMaxFontSize - longestWordLength * 1,
      );

      // Use the smaller of the two calculated sizes
      const newSize = Math.min(totalLengthSize, wordLengthSize);

      setFontSize(Math.min(adjustedMaxFontSize, newSize));
    };

    calculateFontSize();

    // Add window resize listener
    window.addEventListener("resize", calculateFontSize);

    // Cleanup
    return () => window.removeEventListener("resize", calculateFontSize);
  }, [text, minFontSize, maxFontSize]);

  // Don't render anything until client-side hydration is complete
  if (!mounted) {
    return null;
  }

  return <p style={{ fontSize: `${fontSize}vh` }}>{text}</p>;
};
