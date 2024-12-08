import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { BaseStory } from "./base-story";
import { useStreamContext } from "./stream-provider";
import Image from "next/image";

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
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${username}`;
  const shareText = `Check out my #LLMwrapped results!`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    instagram: `https://instagram.com/`,
    linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText + " " + shareUrl)}`,
    tiktok: `https://www.tiktok.com/`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
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
              <div className="absolute -top-12 right-[-320px] hidden items-center whitespace-nowrap lg:flex">
                <Image
                  src="/arrow.png"
                  alt="Curved arrow"
                  width={80}
                  height={80}
                  className="rotate-[20deg]"
                />
                <p className="ml-6 max-w-[250px] text-wrap font-medium italic text-gray-600">
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
        <div className="flex flex-col gap-8 lg:pt-[4.15em]">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Share your results</h2>
              <p className="text-gray-600">
                Unwrap your LLM-crafted journey with friends.
              </p>
            </div>

            {/* Share buttons grid */}
            <div className="flex gap-4 lg:flex-wrap lg:gap-6">
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <FaTwitter className="text-lg sm:text-xl" />
                <span className="sr-only">Twitter</span>
              </a>

              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <FaLinkedin className="text-lg sm:text-xl" />
                <span className="sr-only">LinkedIn</span>
              </a>

              <a
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <FaWhatsapp className="text-lg sm:text-xl" />
                <span className="sr-only">WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  void navigator.clipboard.writeText(shareUrl);
                  alert("Link copied! Share it on Instagram");
                }}
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <FaInstagram className="text-lg sm:text-xl" />
                <span className="sr-only">Instagram</span>
              </button>

              <a
                href={storyHref}
                className="flex size-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 sm:size-14"
              >
                <Image
                  src="/stories-icon.png"
                  alt="Stories"
                  width={20}
                  height={20}
                  className="sm:h-6 sm:w-6"
                />
                <span className="sr-only">Stories</span>
              </a>
            </div>

            {/* Share link input */}
            <div className="flex items-center gap-2 rounded-lg border p-3">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-gray-600 outline-none"
              />
              <button
                onClick={() => {
                  void navigator.clipboard.writeText(shareUrl);
                  alert("Link copied to clipboard!");
                }}
                className="flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span className="sr-only">Copy link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
