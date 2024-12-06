import { useEffect, useState, useRef } from "react";

export default function SlideIndicator({
  currentSlide,
  totalSlides,
  nextSlide,
  isPaused,
}: {
  currentSlide: number;
  totalSlides: number;
  nextSlide: () => Promise<void>;
  isPaused: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [pausedTime, setPausedTime] = useState<number | null>(null);
  const lastSlideRef = useRef(currentSlide);
  const SLIDE_DURATION = 7000;

  useEffect(() => {
    lastSlideRef.current = currentSlide;

    setProgress(0);
    setStartTime(Date.now());
    setPausedTime(null);
  }, [currentSlide]);

  useEffect(() => {
    if (isPaused) {
      // Store the current progress time when paused
      setPausedTime(Date.now());
      return;
    } else if (pausedTime) {
      // Adjust the start time to account for the pause duration
      const pauseDuration = Date.now() - pausedTime;
      setStartTime((prev) => prev + pauseDuration);
      setPausedTime(null);
    }

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

      if (newProgress >= 100) {
        clearInterval(timer);
        void nextSlide();
      } else {
        setProgress(newProgress);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [currentSlide, nextSlide, isPaused, pausedTime, startTime]);

  return (
    <div className="fixed left-0 top-0 z-40 flex w-full gap-1 px-2 py-4 sm:absolute sm:px-6">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className="h-0.5 flex-1 overflow-hidden rounded-full bg-gray-600/30"
        >
          <div
            className={`h-full rounded-full ${isPaused ? "" : "duration-200"} ${
              index + 1 < currentSlide
                ? "w-full bg-gray-300" // Completed slides
                : index + 1 === currentSlide
                  ? `${progress < 5 ? "bg-transparent" : "bg-gray-300"} transition-none` // Current slide
                  : "w-0 bg-gray-600/30" // Future slides
            }`}
            style={{
              width: index + 1 === currentSlide ? `${progress}%` : undefined,
            }}
          />
        </div>
      ))}
    </div>
  );
}
