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
    const canvas = await html2canvas(preparedElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: rect.width,
      height: rect.height,
    });

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

const downloadMobileImage = async () => {
  const element = document.getElementById("share-card");
  if (!element) {
    console.error("Share card element not found");
    return;
  }

  try {
    // Get element dimensions
    const rect = element.getBoundingClientRect();

    // Create canvas and convert to image data
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: rect.width,
      height: rect.height,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById("share-card");
        if (clonedElement) {
          // Remove share button and adjust z-indices in the cloned document
          const shareButtonContainer = clonedElement.querySelector(
            '[class*="justify-center"]:last-child',
          );
          if (shareButtonContainer) {
            shareButtonContainer.remove();
          }
        }
      },
    });

    // Get image data URL
    const imageUrl = canvas.toDataURL("image/png", 1.0);

    // Create a full-screen container
    const container = document.createElement("div");
    Object.assign(container.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      zIndex: "999999",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
    });

    // Create header section
    const header = document.createElement("div");
    Object.assign(header.style, {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      pointerEvents: "auto",
    });

    // Create instruction text
    const instruction = document.createElement("div");
    Object.assign(instruction.style, {
      padding: "10px 20px",
      color: "#333",
      fontSize: "16px",
      backgroundColor: "#f0f0f0",
      borderRadius: "8px",
    });
    instruction.textContent = "Press and hold image to save";

    // Create close button
    const closeButton = document.createElement("button");
    Object.assign(closeButton.style, {
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    });
    closeButton.textContent = "Close";
    closeButton.onclick = () => document.body.removeChild(container);

    // Add elements to header
    header.appendChild(instruction);
    header.appendChild(closeButton);

    // Create the image element
    const img = new Image();
    Object.assign(img.style, {
      maxWidth: "90%",
      maxHeight: "calc(100vh - 100px)",
      objectFit: "contain",
      display: "block",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    });

    img.src = imageUrl;

    container.appendChild(header);
    container.appendChild(img);
    document.body.appendChild(container);
  } catch (error) {
    console.error("Error generating image:", error);
  }
};

export {
  generateShareImage,
  prepareElementForCapture,
  shareContent,
  downloadMobileImage,
};
