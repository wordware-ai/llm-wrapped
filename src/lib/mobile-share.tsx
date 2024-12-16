"use client";

import html2canvas from "html2canvas";
import { logtail } from "./logtail";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Prepare element for capture
const prepareElementForCapture = (clonedElement: HTMLElement) => {
  // Remove share button
  const shareButtonContainer = clonedElement.querySelector(
    '[class*="justify-center"]:last-child',
  );
  if (shareButtonContainer) {
    shareButtonContainer.remove();
  }

  clonedElement.style.padding = "2.25rem 1.5rem";

  // Hide the SVG container
  const svgContainer = clonedElement.querySelector(".svg-container");
  if (svgContainer) {
    (svgContainer as HTMLElement).style.display = "none";
  }

  const hashtag = clonedElement.querySelector(".hashtag");
  if (hashtag) {
    (hashtag as HTMLElement).style.paddingTop = "1rem";
  }

  const image = clonedElement.querySelector(".image");
  if (image) {
    (image as HTMLElement).style.paddingTop = "1rem";
    (image as HTMLElement).style.objectFit = "cover";

    // Set size based on viewport width
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    );
    const size = vw >= 640 ? Math.min(window.innerHeight * 0.25, 400) : 150; // 640px is sm breakpoint

    (image as HTMLElement).style.width = `${size}px`;
    (image as HTMLElement).style.height = `${size}px`;
    (image as HTMLElement).style.transform = "none";
    (image as HTMLElement).style.aspectRatio = "1/1";
    (image as HTMLElement).style.borderRadius = "0.5rem 0.5rem 0 0";
  }

  // Boost text z-index
  const contentContainer = clonedElement.querySelector(".z-10");
  if (contentContainer) {
    (contentContainer as HTMLElement).style.zIndex = "50";
    contentContainer.querySelectorAll("p, div").forEach((el) => {
      if (!el.querySelector("svg")) {
        (el as HTMLElement).style.position = "relative";
        (el as HTMLElement).style.zIndex = "50";
      }
    });
  }

  return clonedElement;
};

// Generate share image
const generateShareImage = async (): Promise<File | null> => {
  if (typeof window === "undefined") return null;

  const originalElement = document.getElementById("share-card");
  if (!originalElement) return null;

  const clonedElement = originalElement.cloneNode(true) as HTMLElement;
  const preparedElement = prepareElementForCapture(clonedElement);

  const computedStyle = window.getComputedStyle(originalElement);
  preparedElement.style.position = "absolute";
  preparedElement.style.top = "-9999px";
  preparedElement.style.width = computedStyle.width;
  preparedElement.style.height = computedStyle.height;

  document.body.appendChild(preparedElement);

  const rect = preparedElement.getBoundingClientRect();

  try {
    const canvas = await html2canvas(preparedElement, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: rect.width,
      height: rect.height,
      windowWidth: rect.width,
      onclone: (clonedDoc) => {
        const images = clonedDoc.getElementsByTagName("img");
        for (const img of images) {
          img.crossOrigin = "anonymous";
        }
      },
    });

    // Clean up by removing the div after capturing

    document.body.removeChild(preparedElement);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], "llm-wrapped.png", { type: "image/png" }));
        } else {
          resolve(null);
        }
      }, "image/png");
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

// Share handler
const shareContent = async () => {
  if (typeof window === "undefined") {
    void logtail.warn("Window is undefined, cannot proceed with sharing.");
    return false;
  }
  const image = await generateShareImage();

  if (!image) {
    return false;
  }

  const attemptShare = async () => {
    try {
      await navigator.share({
        title: "My LLM Wrapped",
        text: "Check out my #LLMwrapped results — prompted by an AI Agent powered by Wordware!",
        url: window.location.href,
        files: [image],
      });
      return true;
    } catch (error) {
      throw error;
    }
  };

  try {
    // First attempt
    return await attemptShare();
  } catch (error) {
    // Show retry toast only if the action is not allowed
    if (error instanceof Error && error.name === "NotAllowedError") {
      toast(
        <div className="flex gap-2">
          <p>Image generation complete. Share your results?</p>
          <Button
            onClick={() => {
              toast.dismiss();
              void attemptShare().catch((retryError) => {
                console.error("Retry share failed:", retryError);
              });
            }}
          >
            Share
          </Button>
        </div>,
        {
          duration: Infinity,
        },
      );
    }

    return false;
  }
};

export { generateShareImage, prepareElementForCapture, shareContent };
