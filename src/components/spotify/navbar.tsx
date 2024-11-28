import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
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
      <div className="flex gap-2">
        <Button variant="outline">See rankings</Button>
        <Button>How was it made?</Button>
      </div>
    </div>
  );
}
