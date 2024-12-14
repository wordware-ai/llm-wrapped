"use client";

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

  const html2canvas = (await import("html2canvas")).default;

  try {
    const clonedElement = originalElement.cloneNode(true) as HTMLElement;
    const preparedElement = prepareElementForCapture(clonedElement);

    const computedStyle = window.getComputedStyle(originalElement);
    preparedElement.style.position = "absolute";
    preparedElement.style.top = "-9999px";
    preparedElement.style.width = computedStyle.width;
    preparedElement.style.height = computedStyle.height;

    document.body.appendChild(preparedElement);
    toast.info("Generating image...");
    const canvas = await html2canvas(preparedElement, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    toast.success("Image generated!");

    document.body.removeChild(preparedElement);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  } catch (error) {
    console.error("Error generating image:", error);
    toast.error("Error generating image");
    return null;
  }
};

// Share handler
const shareContent = async () => {
  if (typeof window === "undefined") return false;

  if (screen.width < 1024) {
    document
      .getElementById("viewport")
      ?.setAttribute("content", "width=1200px");
  }

  try {
    const imageBlob = await generateShareImage();
    toast.info(JSON.stringify(imageBlob));
    if (!imageBlob) return false;

    toast.info("Sharing...");

    const file = new File([imageBlob], "llm-wrapped.png", {
      type: "image/png",
    });

    toast.info("File created!");

    // const url = window.location.href;

    await navigator.share({
      title: "My LLM Wrapped",
      // url,
      text: "Check out my #LLMwrapped results — prompted by an AI Agent powered by Wordware!",
      files: [file],
    });

    toast.success("Shared!");

    return true;
  } catch (error) {
    console.error("Error sharing:", error);
    toast.error(JSON.stringify(error));
    return false;
  }
};

export { generateShareImage, prepareElementForCapture, shareContent };
