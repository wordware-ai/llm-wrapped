import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";

export const shareOptions = [
  {
    icon: <FaXTwitter className="h-6 w-6" />,
    label: "X",
    action: (shareUrl: string) => {
      const shareText =
        "Check out my #LLMWrapped results— prompted by an AI Agent powered by @wordware_ai! 🤖\n\n";
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        "_blank",
      );
    },
  },
  {
    icon: <FaLinkedin className="h-6 w-6" />,
    label: "LinkedIn",
    action: (shareUrl: string) => {
      const shareText =
        "Check out my #LLMWrapped results— prompted by an AI Agent powered by Wordware! 🤖\n\n";
      window.open(
        `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
          shareText + shareUrl,
        )}`,
        "_blank",
      );
    },
  },
  {
    icon: <FaThreads className="h-6 w-6" />,
    label: "Threads",
    action: (shareUrl: string) => {
      const shareText =
        "Check out my #LLMWrapped results— prompted by an AI Agent powered by Wordware! 🤖\n\n";
      window.open(
        `https://www.threads.net/intent/post?text=${encodeURIComponent(
          shareText + shareUrl,
        )}`,
        "_blank",
      );
    },
  },

  {
    icon: <FaWhatsapp className="h-6 w-6" />,
    label: "WhatsApp",
    action: (shareUrl: string) => {
      const shareText =
        "Check out my #LLMWrapped results— prompted by an AI Agent powered by Wordware! 🤖\n\n";
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${shareText}${shareUrl}`)}`,
        "_blank",
      );
    },
  },
  {
    icon: <FaFacebook className="h-6 w-6" />,
    label: "Facebook",
    action: (shareUrl: string) => {
      const shareText =
        "Check out my #LLMWrapped results— prompted by an AI Agent powered by Wordware! 🤖\n\n";
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl,
        )}`,
        "_blank",
      );
    },
  },
];
