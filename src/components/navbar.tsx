"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import posthog from "posthog-js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const getServiceType = useMemo(() => {
    const path = pathname.split("/");
    return path[1] ?? "spotify";
  }, [pathname]);

  const url = useMemo(() => {
    switch (getServiceType) {
      case "spotify":
        return "https://app.wordware.ai/explore/apps/45bf050b-4223-45c1-9fd6-a2d6c6b2ac1d";
      case "linkedin":
        return "https://app.wordware.ai/explore/apps/eb98a6bb-d867-42a3-a475-1e0546c9f638";
      case "tinder":
        return "https://app.wordware.ai/explore/apps/786ef77a-b8b7-4951-9f4d-b58d6253dcb8";
      default:
        return "https://app.wordware.ai/explore/apps/45bf050b-4223-45c1-9fd6-a2d6c6b2ac1d";
    }
  }, [getServiceType]);

  return (
    <div className="flex h-14 items-center justify-between border-b p-2 md:px-8">
      <Link className={cn(buttonVariants({ variant: "outline" }))} href="/">
        <ChevronLeft />
        Home
      </Link>
      <div className="hidden gap-2 md:flex">
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href="/rankings"
          onClick={() => {
            posthog.capture("rankings_clicked");
          }}
        >
          See rankings
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "default" }))}
          target="_blank"
          href="https://app.wordware.ai/explore/apps/45bf050b-4223-45c1-9fd6-a2d6c6b2ac1d"
        >
          Build your own version of LLMWrapped
        </Link>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle>Menu</SheetTitle>
          <div className="mt-8 flex flex-col gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              See rankings
            </Button>
            <Link
              className={cn(buttonVariants({ variant: "default" }))}
              target="_blank"
              href={url}
            >
              Build your own version of LLMWrapped
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
