import { type User } from "@prisma/client";
import { BaseStory } from "../stories/base";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaReddit,
  FaWhatsapp,
} from "react-icons/fa";

export function UserInfo({ user }: { user: User }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${user.id}`;
  const shareText = `Check out my #LLMwrapped results!`;

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    instagram: `https://instagram.com/`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    tiktok: `https://www.tiktok.com/`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
  };

  return (
    <div className="flex flex-col justify-between gap-4 lg:w-1/2">
      <h1 className="text-5xl font-semibold xs:text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl">
        #LLMwrapped
      </h1>
      <div className="flex gap-8 lg:gap-20">
        <div className="flex w-min flex-col gap-4">
          <BaseStory
            className="size-36 p-1 lg:size-48 lg:p-2"
            src={user.imageUrl}
            alt="Spotify 1"
            href={`/${user.id}?slide=1`}
          />
          <p className="text-center text-xl font-semibold">
            {user.username ?? user.email}
          </p>
        </div>
        <div className="flex flex-col gap-8 lg:pt-[4.15em]">
          <p className="text-xl sm:text-2xl">Share your results</p>
          <div className="grid grid-cols-2 gap-4">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <FaTwitter className="text-xl text-[#1DA1F2]" />
              <p>Twitter</p>
            </a>
            <button
              onClick={() => {
                void navigator.clipboard.writeText(shareUrl);
                alert('Link copied! Share it on Instagram');
              }}
              className="flex items-center gap-2 hover:opacity-80"
            >
              <FaInstagram className="text-xl text-[#E4405F]" />
              <p>Instagram</p>
            </button>
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-xl text-[#0A66C2]" />
              <p>LinkedIn</p>
            </div>
            <div className="flex items-center gap-2">
              <FaTiktok className="text-xl text-[#000000]" />
              <p>TikTok</p>
            </div>
            <div className="flex items-center gap-2">
              <FaReddit className="text-xl text-[#FF4500]" />
              <p>Reddit</p>
            </div>
            <div className="flex items-center gap-2">
              <FaWhatsapp className="text-xl text-[#25D366]" />
              <p>WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
