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
        return "https://app.wordware.ai/explore/apps/fe79046c-6e72-4b7b-b9fc-e0d6657baa41";
      case "linkedin":
        return "https://app.wordware.ai/explore/apps/8799f6db-25c7-4bdc-bb1e-dde7b9b60767";
      case "tinder":
        return "https://app.wordware.ai/explore/apps/786ef77a-b8b7-4951-9f4d-b58d6253dcb8";
      default:
        return "https://app.wordware.ai/explore/apps/2b433778-0a9b-4443-b33c-945c68a74cb0";
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
          href={url}
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
              Build your own version
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
