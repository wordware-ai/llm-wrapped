"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Share, Link2, X } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  url?: string;
  className?: string;
  children?: React.ReactNode;
  cardContent?: string;
  cardImage?: string;
}

export default function ShareButton({
  url,
  className,
  cardContent,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");
  const shareText = cardContent ? `${cardContent}\n\n${shareUrl}` : shareUrl;

  const shareOptions = [
    // First row
    [
      {
        icon: <Link2 className="h-6 w-6" />,
        label: "Copy link",
        action: async () => {
          if (typeof window !== "undefined") {
            await navigator.clipboard.writeText(shareUrl);
            alert("Link copied!");
          }
        },
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M16.6 5.82s-1.74-1.74-4.15-1.74c-2.41 0-4.15 1.74-4.15 1.74s1.74 1.74 4.15 1.74c2.41 0 4.15-1.74 4.15-1.74zM12 0c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "TikTok",
        action: () => {
          window.open(
            `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`,
            "_blank",
          );
        },
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "Stories",
        action: () => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            "_blank",
          );
        },
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "Messages",
        action: () => {
          window.open(
            `https://www.instagram.com/share?url=${encodeURIComponent(shareUrl)}`,
            "_blank",
          );
        },
      },
    ],
    // Second row
    [
      {
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "X",
        action: () => {
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
            "_blank",
          );
        },
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "Feed",
        action: () => {
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            "_blank",
          );
        },
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
              fill="currentColor"
            />
          </svg>
        ),
        label: "WhatsApp",
        action: () => {
          window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank",
          );
        },
      },
      {
        icon: (
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="19" cy="12" r="2" fill="currentColor" />
            <circle cx="5" cy="12" r="2" fill="currentColor" />
          </svg>
        ),
        label: "More",
        action: () => {
          if (navigator.share) {
            navigator.share({
              title: "Share",
              text: cardContent,
              url: shareUrl,
            });
          }
        },
      },
    ],
  ];

  return (
    <div className="relative w-full">
      <Button
        variant="ghost"
        size="lg"
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-full bg-white/20 px-6 backdrop-blur-sm hover:bg-white/30",
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share className="h-6 w-6" />
        <span>Share</span>
      </Button>

      {isOpen && (
        <div className="absolute bottom-60 left-1/2 z-[10] w-[325px] -translate-x-1/2 translate-y-full rounded-xl bg-zinc-900 pb-10 shadow-lg">
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <h2 className="text-white">Share</h2>
            <Button
              variant="ghost"
              className="h-auto p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </Button>
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
