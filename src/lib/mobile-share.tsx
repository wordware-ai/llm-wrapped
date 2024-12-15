"use client";

import html2canvas from "html2canvas";
import { logtail } from "./logtail";
import { toast } from "sonner";

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
const generateShareImage = async (): Promise<Blob | null> => {
  if (typeof window === "undefined") return null;

  const originalElement = document.getElementById("share-card");
  if (!originalElement) return null;

  try {
    const clonedElement = originalElement.cloneNode(true) as HTMLElement;
    const preparedElement = prepareElementForCapture(clonedElement);

    const computedStyle = window.getComputedStyle(originalElement);
    preparedElement.style.position = "absolute";
    preparedElement.style.top = "-9999px";
    preparedElement.style.width = computedStyle.width;
    preparedElement.style.height = computedStyle.height;

    document.body.appendChild(preparedElement);

    const rect = preparedElement.getBoundingClientRect();

    const canvas = await html2canvas(preparedElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: rect.width,
      height: rect.height,
    });

    // const canvas = await html2canvas(preparedElement, {
    //   backgroundColor: null,
    //   scale: 2,
    //   logging: false,
    // });

    // document.body.removeChild(preparedElement);

    // return new Promise((resolve) => {
    //   canvas.toBlob((blob) => {
    //     resolve(blob);
    //   }, "image/png");
    // });
    return null;
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

  try {
    void logtail.info("Attempting to generate share image.");
    const imageBlob = await generateShareImage();

    // if (!imageBlob) {
    //   void logtail.warn("Image generation failed, no blob returned.");
    //   return false;
    // }

    // const file = new File([imageBlob], "llm-wrapped.png", {
    //   type: "image/png",
    // });

    // void logtail.info("File created, preparing to share.", {
    //   url: window.location.href,
    //   file,
    // });

    await navigator.share({
      title: "My LLM Wrapped",
      text: "Check out my #LLMwrapped results — prompted by an AI Agent powered by Wordware!",
      // files: [file],
    });

    void logtail.info("Content shared successfully.");
    return true;
  } catch (error) {
    console.error("Error sharing:", error);
    void logtail.error("Error sharing", {
      error,
    });
    return false;
  }
};

const downloadMobileImage = async () => {
  try {
    const element = document.getElementById("share-card");
    if (!element) {
      console.error("Share card element not found");
      return;
    }

    // const preparedElement = prepareElementForCapture(element);

    // First make sure canvas creation works
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Once canvas works, we'll add sharing logic here
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error("Blob creation failed");
        }
      }, "image/png"),
    );
    const file = new File([blob], "llm-wrapped.png", { type: "image/png" });

    await navigator.share({
      title: "My LLM Wrapped",
      text: "Check out my #LLMwrapped results — prompted by an AI Agent powered by Wordware!",
      files: [file],
    });
  } catch (error) {
    // Log the full error for debugging
    console.error("Full error:", error);
  }
};

export {
  generateShareImage,
  prepareElementForCapture,
  shareContent,
  downloadMobileImage,
};
