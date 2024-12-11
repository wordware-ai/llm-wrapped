import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function AnnouncementBanner() {
  return (
    <div className="flex h-16 w-full items-center justify-between gap-2 bg-[#EEE] px-4 py-2 md:px-12">
      <p className="text-xs sm:text-sm lg:text-base">
        This WordApp has been built with Wordware, the ultimate AI operating
        system.
      </p>
      <Link
        href="https://app.wordware.ai/register"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-8 sm:h-9 md:h-10", // Height: small -> default -> large
          "px-3 sm:px-4 md:px-6", // Padding: small -> default -> large
        )}
      >
        Try Wordware for free
      </Link>
    </div>
  );
}
