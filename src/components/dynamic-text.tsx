import React, { useState, useEffect } from "react";

export const DynamicText = ({
  text,
  minFontSize = 30,
  maxFontSize = 80,
}: {
  text: string;
  minFontSize?: number;
  maxFontSize?: number;
}) => {
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const calculateFontSize = () => {
      // Calculate size based on total text length
      const totalLengthSize = Math.max(
        minFontSize,
        maxFontSize - text.length * 1.5,
      );

      // Calculate size based on longest word
      const longestWordLength = text
        .split(/\s+/)
        .reduce((max, word) => Math.max(max, word.length), 0);
      const wordLengthSize = Math.max(
        minFontSize,
        maxFontSize - longestWordLength * 3,
      );

      // Use the smaller of the two calculated sizes
      const newSize = Math.min(totalLengthSize, wordLengthSize);

      setFontSize(Math.min(maxFontSize, newSize));
    };

    calculateFontSize();
  }, [text, minFontSize, maxFontSize]);

  return <p style={{ fontSize: `${fontSize}px` }}>{text}</p>;
};
