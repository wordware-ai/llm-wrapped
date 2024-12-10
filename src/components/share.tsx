"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, Share } from "lucide-react";
import { FaTelegram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaAt } from "react-icons/fa6";
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
import { shareOptions } from "@/config/share-config";
import { ShareButtons } from "./share-buttons";

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
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Share</DrawerTitle>
            <DrawerDescription>
              Share your results with others
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <ShareButtons />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
