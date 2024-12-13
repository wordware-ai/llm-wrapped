"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { shareConfig } from "@/config/share-config";
import { Share } from "lucide-react";
import { useState, useEffect } from "react";
import { ShareIcon } from "./share-icon";
import { isMobile } from "@/lib/utils";

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof window === "undefined") return;

    if (typeof navigator.share === "function" && isMobile()) {
      try {
        const url = window.location.href;
        await navigator.share({
          title: "Check this out!",
          text: "I created something awesome!",
          url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      setIsOpen(true);
    }
  };

  if (!mounted) return null;

  return (
    <Button
      onClick={handleShare}
      variant="ghost"
      size="lg"
      className="z-[100] flex w-min items-center justify-center gap-2 rounded-full bg-white/20 px-6 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white"
    >
      <Share className="h-6 w-6" />
      <span>Share</span>
    </Button>
  );
}
