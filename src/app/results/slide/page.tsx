"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResultsPage() {
  // Use search params instead of dynamic route
  const searchParams = useSearchParams();
  const initialSlide = parseInt(searchParams.get("slide") ?? "1");
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const { clientX, currentTarget } = e;
    const third = currentTarget.clientWidth / 3;

    if (clientX > third * 2) {
      // Right third - go forward
      setCurrentSlide((prev) => prev + 1);
      window.history.replaceState({}, "", `/results?slide=${currentSlide + 1}`);
    } else if (clientX < third) {
      // Left third - go backward
      setCurrentSlide((prev) => Math.max(1, prev - 1));
      window.history.replaceState(
        {},
        "",
        `/results?slide=${Math.max(1, currentSlide - 1)}`,
      );
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center md:p-6"
      onClick={handleClick}
    >
      <div className="h-full w-full bg-green-500 p-6 shadow-lg md:max-w-xl md:rounded-lg">
        <div>ResultsDetailPage {currentSlide}</div>
      </div>
    </div>
  );
}
