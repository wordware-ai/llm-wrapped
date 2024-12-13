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
import { Share } from "lucide-react";
import { shareConfig } from "@/config/share-config";
import { ShareIcon } from "./share-icon";

export default function ShareButton() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
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
              <ShareIcon
                key={shareOption.label}
                label={shareOption.label}
                icon={shareOption.icon}
                action={shareOption.action}
              />
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
