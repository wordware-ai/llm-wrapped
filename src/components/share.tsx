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
import { shareContent } from "@/lib/mobile-share";
import { isMobile } from "@/lib/utils";
import { Share } from "lucide-react";
import { useState } from "react";
import { ShareIcon } from "./share-icon";

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof window === "undefined") return;

    if (!navigator.share || !isMobile()) {
      setIsOpen(true);
    } else {
      await shareContent();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          onClick={handleShare}
          variant="ghost"
          size="lg"
          className="z-[100] flex w-min items-center justify-center gap-2 rounded-full bg-white/20 px-6 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white"
        >
          <Share className="h-6 w-6" />
          <span>Share</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle className="text-center">Share</DrawerTitle>
            <DrawerDescription className="text-center">
              Share your results with others
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-wrap justify-center gap-2 p-4 sm:gap-4">
            {shareConfig.map((shareOption) => (
              <div key={shareOption.label} onClick={() => setIsOpen(false)}>
                <ShareIcon
                  label={shareOption.label}
                  icon={shareOption.icon}
                  action={shareOption.action}
                />
              </div>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <div className="flex justify-center">
                <Button variant="outline" className="w-80">
                  Close
                </Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
