import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-14 items-center justify-between border-b p-2 md:px-8">
      <Link href="/">
        <Image
          src="/brand/wordware-black.svg"
          alt="Wordware Logo"
          width={112}
          height={112}
        />
      </Link>
      <div className="hidden gap-2 md:flex">
        <Button variant="outline">See rankings</Button>
        <Button>How was it made?</Button>
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
            <Button onClick={() => setOpen(false)}>How was it made?</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
