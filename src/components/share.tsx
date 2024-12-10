"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, Share } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp, FaTelegram, FaTwitter } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";

interface ShareButtonProps {
  url?: string;
  className?: string;
  children?: React.ReactNode;
  cardContent?: string;
  cardImage?: string;
  username?: string;
}

export default function ShareButton({
  url,
  className,
  cardContent,
  username,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = username
    ? `${process.env.NEXT_PUBLIC_APP_URL}/spotify/${username}`
    : (url ?? (typeof window !== "undefined" ? window.location.href : ""));
  const shareText = `Check out my #LLMwrapped results!`;

  const shareOptions = [
    [
      {
        icon: <FaWhatsapp className="h-6 w-6" />,
        label: "WhatsApp",
        action: () => {
          window.open(
            `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
            "_blank",
          );
        },
      },
      {
        icon: <FaTelegram className="h-6 w-6" />,
        label: "Telegram",
        action: () => {
          window.open(
            `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
            "_blank",
          );
        },
      },
    ],
    [
      {
        icon: <Link2 className="h-6 w-6" />,
        label: "Copy link",
        action: async () => {
          await navigator.clipboard.writeText(shareUrl);
          alert("Link copied!");
        },
      },
      {
        icon: <FaTwitter className="h-6 w-6" />,
        label: "X",
        action: () => {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            "_blank",
          );
        },
      },
      {
        icon: <FaAt className="h-6 w-6" />,
        label: "Threads",
        action: () => {
          window.open(
            `https://www.threads.net/intent/post?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
            "_blank",
          );
        },
      },
    ],
  ];

  return (
    <div className="relative w-[10em]">
      <Button
        variant="ghost"
        size="lg"
        className={cn(
          "z-[100] flex w-full items-center justify-center gap-2 rounded-full bg-white/20 px-6 backdrop-blur-sm hover:bg-white/30",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share className="h-6 w-6" />
        <span>Share</span>
      </Button>

      {isOpen && (
        <div className="absolute bottom-52 left-1/2 z-[99] w-[110vw] -translate-x-1/2 translate-y-full rounded-xl bg-zinc-900 pb-10 shadow-lg">
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="h-1 w-10 rounded-full bg-zinc-600 hover:bg-zinc-500"
              aria-label="Close share menu"
            />
          </div>

          <div className="grid gap-4 p-4">
            {shareOptions.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-4">
                {row.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      setIsOpen(false);
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-zinc-700">
                      {option.icon}
                    </div>
                    <span className="text-xs text-white">{option.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
