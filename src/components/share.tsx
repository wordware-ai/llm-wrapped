"use client";

import { Share, Link2, MoreHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ShareOption {
  icon: JSX.Element;
  label: string;
  action: () => void;
  className?: string;
}

interface ShareButtonProps {
  url?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function ShareButton({
  url,
  className,
  children,
}: ShareButtonProps) {
  const shareUrl = url || window.location.href;

  const shareOptions: ShareOption[] = [
    {
      icon: <Link2 className="h-6 w-6" />,
      label: "Copy link",
      action: async () => {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied!");
      },
      className: "bg-gray-100",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      label: "WhatsApp",
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
          "_blank",
        );
      },
      className: "bg-[#25D366]",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
        </svg>
      ),
      label: "Messenger",
      action: () => {
        window.open(
          `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=YOUR_APP_ID`,
          "_blank",
        );
      },
      className: "bg-[#006AFF]",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.5 6.5h-11v-2h11v2zm0 4h-11v-2h11v2zm-4 4h-7v-2h7v2z" />
        </svg>
      ),
      label: "Messages",
      action: () => {
        window.open(`sms:?&body=${encodeURIComponent(shareUrl)}`, "_blank");
      },
      className: "bg-[#34C759]",
    },
    {
      icon: <MoreHorizontal className="h-6 w-6" />,
      label: "More",
      action: () => {
        if (navigator.share) {
          navigator.share({
            url: shareUrl,
          });
        }
      },
      className: "bg-gray-100",
    },
    {
      icon: <Download className="h-6 w-6" />,
      label: "Download",
      action: () => {
        // Implement download functionality
        console.log("Download clicked");
      },
      className: "bg-gray-100",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm hover:bg-white/30",
            className,
          )}
        >
          <Share className="h-5 w-5" />
          <span>Share this story</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[300px] rounded-lg p-0">
        <DialogTitle className="px-6 pt-6">Share your results</DialogTitle>
        <div className="grid grid-cols-2 gap-4 p-6">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full",
                  option.className,
                )}
              >
                {option.icon}
              </div>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
