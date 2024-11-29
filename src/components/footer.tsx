import Link from "next/link";
import Image from "next/image";
import WordwareLogo from "public/brand/wordware-black.svg";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 bg-black p-8 text-white">
      <div className="flex items-center">
        <Image
          src={WordwareLogo}
          alt="Wordware Logo"
          width={120}
          height={30}
          className="invert"
        />
      </div>

      <div className="flex flex-wrap gap-8">
        <Link href="https://wordware.ai" className="hover:underline">
          Wordware home page
        </Link>
        <Link href="https://discord.gg/wordware" className="hover:underline">
          Join Discord
        </Link>
        <Link
          href="https://twitter.com/wordware_ai"
          className="hover:underline"
        >
          Follow us on X (fka Twitter)
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between border-t border-white/20 pt-4 text-sm text-white/60">
        <p>© 2024 Wordware. All Right reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
