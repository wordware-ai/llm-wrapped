import { downloadImage } from "@/lib/download-image";
import { Download, Link } from "lucide-react";
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
    icon: <Download className="h-6 w-6" />,
    label: "Export Image",
    action: downloadImage,
  },
];
