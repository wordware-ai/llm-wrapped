import {
  FaInstagram,
  FaLinkedin,
  FaTwitter as FaXTwitter,
  FaTelegram,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import { FaAt } from "react-icons/fa6";
import { BaseStory } from "./base-story";
import { useStreamContext } from "./stream-provider";
import Image from "next/image";
import { Link } from "next/link";
import { Link2 } from "lucide-react";

export function UserInfo({
  username,
  name,
  imageUrl,
  storyHref,
}: {
  username: string;
  name: string;
  imageUrl: string;
  storyHref: string;
}) {
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/spotify/${username}`;
  const shareText = `Check out my #LLMwrapped results!`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
  };

  const { results } = useStreamContext();

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:min-w-0 lg:flex-1">
      <h1 className="text-5xl font-semibold text-muted-foreground xs:text-6xl sm:text-7xl md:text-8xl lg:text-6xl xl:text-8xl">
        #LLMwrapped
      </h1>
      <div className="flex gap-8 lg:gap-20">
        <div className="relative flex w-min flex-col gap-4">
          {Object.keys(results || {}).length > 4 ? (
            <>
              <BaseStory
                className="size-36 p-1 lg:size-48 lg:p-2"
                src={imageUrl}
                alt="Spotify 1"
                href={storyHref}
              />{" "}
              <div className="absolute -top-44 right-[-340px] hidden items-center whitespace-nowrap lg:flex">
                <Image
                  src="/arrow.png"
                  alt="Curved arrow"
                  width={120}
                  height={120}
                  className="mt-16 rotate-[0deg]"
                />
                <p className="-mt-0 ml-8 max-w-[250px] text-wrap font-medium text-black">
                  Catch the full reel-tap the profile picture now.
                </p>
              </div>
            </>
          ) : (
            <div className="size-42 aspect-square rounded-full bg-background object-cover lg:size-48">
              <Image
                src={imageUrl}
                alt={name}
                width={200}
                height={200}
                className="aspect-square h-full w-full rounded-full object-cover"
              />
            </div>
          )}
          <p className="text-center text-xl font-semibold">{name}</p>
        </div>
        <div className="flex flex-col justify-start gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Share your results</h2>
              <p className="text-gray-600">
                Unwrap your LLM-crafted journey with friends.
              </p>
            </div>

            {/* Share buttons grid */}
            <div className="flex justify-center gap-6">
              {/* Copy Link */}
              <button
                onClick={() => {
                  void navigator.clipboard.writeText(shareUrl);
                  alert("Link copied!");
                }}
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <Link2 className="text-lg sm:text-xl" />
                <span className="sr-only">Copy link</span>
              </button>

              {/* WhatsApp */}
              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <FaWhatsapp className="text-lg sm:text-xl" />
                <span className="sr-only">WhatsApp</span>
              </a>

              {/* Threads */}
              <a
                href={shareLinks.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <FaAt className="text-lg sm:text-xl" />
                <span className="sr-only">Threads</span>
              </a>

              {/* Telegram */}
              <a
                href={shareLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <FaTelegram className="text-lg sm:text-xl" />
                <span className="sr-only">Telegram</span>
              </a>

              {/* X (Twitter) */}
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <FaXTwitter className="text-lg sm:text-xl" />
                <span className="sr-only">X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
