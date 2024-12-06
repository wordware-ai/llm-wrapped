import React, { useState, useEffect } from "react";

export const DynamicText = ({
  text,
  minFontSize = 12,
  maxFontSize = 80,
}: {
  text: string;
  minFontSize?: number;
  maxFontSize?: number;
}) => {
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const calculateFontSize = () => {
      const length = text.length;

      // Increased scaling factor from 0.5 to 2 for faster size reduction
      // Added a baseline of maxFontSize to start bigger
      const newSize = Math.max(minFontSize, maxFontSize - length * 2);

      setFontSize(Math.min(maxFontSize, newSize));
    };

    calculateFontSize();
  }, [text, minFontSize, maxFontSize]);

  return <p style={{ fontSize: `${fontSize}px` }}>{text}</p>;
};
