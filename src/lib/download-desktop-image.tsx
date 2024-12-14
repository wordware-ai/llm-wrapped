import { toast } from "sonner";
import { prepareElementForCapture } from "./mobile-share";
import html2canvas from "html2canvas";

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
