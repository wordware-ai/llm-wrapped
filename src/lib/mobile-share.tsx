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
    (image as HTMLElement).style.objectFit = "contain";
    (image as HTMLElement).style.width = "100%";
    (image as HTMLElement).style.height = "auto";
    (image as HTMLElement).style.transform = "scale(1)";
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
    // Create a div element that says "Hello World"
    const helloWorldDiv = document.createElement("div");
    helloWorldDiv.textContent = "Hello World";
    helloWorldDiv.style.position = "absolute";
    helloWorldDiv.style.top = "0";
    helloWorldDiv.style.left = "0";
    helloWorldDiv.style.zIndex = "1000";
    helloWorldDiv.style.backgroundColor = "white";
    helloWorldDiv.style.padding = "10px";
    helloWorldDiv.style.border = "1px solid black";

    // Add the div to the document body
    document.body.appendChild(helloWorldDiv);

    const canvas = await html2canvas(helloWorldDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: rect.width,
      height: rect.height,
    });

    // Clean up by removing the div after capturing
    document.body.removeChild(helloWorldDiv);

    toast("created image");

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
    toast("failed to generate image");
    console.error("Error generating image:", error);
    return null;
  }
};

// Share handler
const shareContent = async () => {
  toast("sharing content");
  if (typeof window === "undefined") {
    void logtail.warn("Window is undefined, cannot proceed with sharing.");
    return false;
  }
  toast("generating image");
  const image = await generateShareImage();
  toast("generated image");

  if (!image) {
    toast.error("Failed to generate image");
    return false;
  }

  const attemptShare = async () => {
    try {
      toast("pre share");
      await navigator.share({
        title: "My LLM Wrapped",
        text: "Check out my #LLMwrapped results — prompted by an AI Agent powered by Wordware!",
        files: [image],
      });
      toast("shared image");
      return true;
    } catch (error) {
      toast("failed to share image");
      throw error;
    }
  };

  try {
    // First attempt
    return await attemptShare();
  } catch (error) {
    toast("failed to share image");
    // Show retry toast only if the action is not allowed
    if (error instanceof Error && error.name === "NotAllowedError") {
      toast.error(
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
