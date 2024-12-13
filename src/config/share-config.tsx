import html2canvas from "html2canvas";
import { Image, Link } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

export const shareConfig = [
  {
    icon: <Link className="h-6 w-6" />,
    label: "Copy Link",
    action: (shareUrl: string) => {
      void navigator.clipboard.writeText(shareUrl);
      toast("Link copied to clipboard!");
    },
  },
  {
    icon: <FaXTwitter className="h-6 w-6" />,
    label: "Share on X",
    action: (shareUrl: string) => {
      const shareText =
        "Check out my #LLMWrapped results — prompted by an AI Agent powered by @wordware_ai! 🤖\n\n";
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        "_blank",
      );
    },
  },
  {
    icon: <FaLinkedin className="h-6 w-6" />,
    label: "Share onLinkedIn",
    action: (shareUrl: string) => {
      const shareText =
        "Check out my #LLMWrapped results — prompted by an AI Agent powered by Wordware! 🤖\n\n";
      window.open(
        `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
          shareText + shareUrl,
        )}`,
        "_blank",
      );
    },
  },
  {
    icon: <FaFacebook className="h-6 w-6" />,
    label: "Share on Facebook",
    action: (shareUrl: string) => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        "_blank",
      );
    },
  },
  {
    icon: <FaWhatsapp className="h-6 w-6" />,
    label: "Share on WhatsApp",
    action: (shareUrl: string) => {
      const shareText =
        "Check out my #LLMWrapped results — prompted by an AI Agent powered by Wordware! 🤖\n\n";
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${shareText}${shareUrl}`)}`,
        "_blank",
      );
    },
  },
  {
    icon: <FaInstagram className="h-6 w-6" />,
    label: "Share to Instagram Story",
    action: (shareUrl: string) => {
      window.open(
        `instagram://story-camera?text=${encodeURIComponent(
          "Check out my #LLMWrapped results — prompted by an AI Agent powered by Wordware! 🤖\n\n" +
            shareUrl,
        )}`,
        "_blank",
      );
    },
  },
  {
    icon: <Image className="h-6 w-6" />,
    label: "Export Image",
    action: async () => {
      // Find the element you want to capture
      const originalElement = document.getElementById("share-card");

      if (!originalElement) {
        toast.error("Could not find element to capture");
        return;
      }

      try {
        // Clone the element
        const clonedElement = originalElement.cloneNode(true);

        // Apply same styles and dimensions
        const computedStyle = window.getComputedStyle(originalElement);
        (clonedElement as HTMLElement).style.position = "absolute";
        (clonedElement as HTMLElement).style.top = "-9999px";
        (clonedElement as HTMLElement).style.width = computedStyle.width;
        (clonedElement as HTMLElement).style.height = computedStyle.height;

        // Remove the share button from clone
        const shareButtonContainer = (
          clonedElement as HTMLElement
        ).querySelector('[class*="justify-center"]:last-child');
        if (shareButtonContainer) {
          shareButtonContainer.remove();
        }

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

        // Apply z-index modifications
        boostTextZIndex(clonedElement as HTMLElement);

        // Add clone to document temporarily
        document.body.appendChild(clonedElement);

        // Convert the cloned element to canvas
        const canvas = await html2canvas(clonedElement as HTMLElement, {
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
    },
  },
];
