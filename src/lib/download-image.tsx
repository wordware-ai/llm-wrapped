import { toast } from "sonner";

import html2canvas from "html2canvas";

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

export const generateShareImage = async (): Promise<Blob | null> => {
  const originalElement = document.getElementById("share-card");

  if (!originalElement) {
    return null;
  }

  try {
    const clonedElement = originalElement.cloneNode(true) as HTMLElement;
    const preparedElement = prepareElementForCapture(clonedElement);

    // Apply positioning styles
    const computedStyle = window.getComputedStyle(originalElement);
    preparedElement.style.position = "absolute";
    preparedElement.style.top = "-9999px";
    preparedElement.style.width = computedStyle.width;
    preparedElement.style.height = computedStyle.height;

    // Add clone to document temporarily
    document.body.appendChild(preparedElement);

    // Convert the cloned element to canvas
    const canvas = await html2canvas(preparedElement, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      onclone: (clonedDoc) => {
        const preparedElement = clonedDoc.getElementById("share-card");
        if (preparedElement) {
          prepareElementForCapture(preparedElement);
        }
      },
    });

    // Remove the clone after capture
    document.body.removeChild(preparedElement);

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

export const downloadDesktopImage = async () => {
  // Find the element you want to capture
  const originalElement = document.getElementById("share-card");

  if (!originalElement) {
    toast.error("Could not find element to capture");
    return;
  }

  try {
    const clonedElement = originalElement.cloneNode(true) as HTMLElement;
    const preparedElement = prepareElementForCapture(clonedElement);

    // Apply positioning styles
    const computedStyle = window.getComputedStyle(originalElement);
    preparedElement.style.position = "absolute";
    preparedElement.style.top = "-9999px";
    preparedElement.style.width = computedStyle.width;
    preparedElement.style.height = computedStyle.height;

    // Add clone to document temporarily
    document.body.appendChild(preparedElement);

    // Convert the cloned element to canvas
    const canvas = await html2canvas(preparedElement, {
      backgroundColor: null,
      scale: 2, // Higher quality
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById("share-card");
        if (clonedElement) {
          prepareElementForCapture(clonedElement);
        }
      },
    });

    // Remove the clone after capture
    document.body.removeChild(preparedElement);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error("Failed to generate image");
        return;
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "llm-wrapped.png";
      link.href = url;
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    }, "image/png");
  } catch (error) {
    toast.error("Failed to generate image");
    console.error(error);
  }
};
