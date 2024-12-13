import html2canvas from "html2canvas";
import { toast } from "sonner";

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

// Function to boost z-index for text content
const boostTextZIndex = (element: HTMLElement) => {
  // Find the content container with z-10
  const contentContainer = element.querySelector(".z-10");
  if (contentContainer) {
    (contentContainer as HTMLElement).style.zIndex = "50"; // Boost z-index significantly

    // Ensure all child text elements have high z-index
    contentContainer.querySelectorAll("p, div").forEach((el) => {
      // Don't modify SVG-containing elements
      if (!el.querySelector("svg")) {
        (el as HTMLElement).style.position = "relative";
        (el as HTMLElement).style.zIndex = "50";
      }
    });
  }

  // Make sure the SVG container stays behind
  const svgContainer = element.querySelector(".absolute");
  if (svgContainer) {
    (svgContainer as HTMLElement).style.zIndex = "1";
  }
};

const prepareElementForCapture = (originalElement: HTMLElement) => {
  // Clone the element
  const clonedElement = originalElement.cloneNode(true) as HTMLElement;

  // Remove the share button from clone
  const shareButtonContainer = clonedElement.querySelector(
    '[class*="justify-center"]:last-child',
  );
  if (shareButtonContainer) {
    shareButtonContainer.remove();
  }

  // Apply z-index modifications
  boostTextZIndex(clonedElement);

  return clonedElement;
};

const downloadDesktopImage = async () => {
  // Find the element you want to capture
  const originalElement = document.getElementById("share-card");

  if (!originalElement) {
    toast.error("Could not find element to capture");
    return;
  }

  try {
    const clonedElement = prepareElementForCapture(originalElement);

    // Apply positioning styles
    const computedStyle = window.getComputedStyle(originalElement);
    clonedElement.style.position = "absolute";
    clonedElement.style.top = "-9999px";
    clonedElement.style.width = computedStyle.width;
    clonedElement.style.height = computedStyle.height;

    // Add clone to document temporarily
    document.body.appendChild(clonedElement);

    // Convert the cloned element to canvas
    const canvas = await html2canvas(clonedElement, {
      backgroundColor: null,
      scale: 2, // Higher quality
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById("share-card");
        if (clonedElement) {
          boostTextZIndex(clonedElement);
        }
      },
    });

    // Remove the clone after capture
    document.body.removeChild(clonedElement);

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
          boostTextZIndex(clonedElement);
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

export const downloadImage = async () => {
  if (isMobileDevice()) {
    await downloadMobileImage();
  } else {
    await downloadDesktopImage();
  }
};
