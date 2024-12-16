import Image from "next/image";
import { BaseStory } from "./base-story";
import { ShareIcon } from "./share-icon";
import { useStreamContext } from "./stream-provider";
import { toast } from "sonner";
import { shareConfig } from "@/config/share-config";
import { isMobile } from "@/lib/utils";
import { Button } from "./ui/button";

export function UserInfo({
  name,
  imageUrl,
  storyHref,
}: {
  name: string;
  imageUrl: string;
  storyHref: string;
}) {
  const { results } = useStreamContext();

  return (
    <div className="flex w-full flex-col justify-between gap-4 lg:min-w-0 lg:flex-1">
      <h1 className="text-5xl font-semibold text-muted-foreground xs:text-6xl sm:text-7xl md:text-8xl lg:text-6xl xl:text-8xl">
        #LLMwrapped
      </h1>
      <div className="flex flex-col gap-8 sm:flex-row lg:flex-col-reverse lg:gap-12 xl:flex-row xl:gap-20">
        <div className="relative flex w-min flex-col gap-4 xl:pt-48">
          {Object.keys(results || {}).length > 4 ? (
            <>
              <BaseStory
                className="size-36 p-1 sm:size-48 md:p-2"
                src={imageUrl}
                alt="Pfp"
                href={storyHref}
              />{" "}
              <div className="absolute -right-48 -top-4 flex-col-reverse items-center whitespace-nowrap sm:hidden lg:flex xl:-top-0 xl:right-[-340px] xl:flex-row">
                <Image
                  src="/arrow.png"
                  alt="Curved arrow"
                  width={120}
                  height={120}
                  loading="eager"
                  className="mr-16 mt-0 rotate-[40deg] sm:rotate-[110deg] sm:scale-x-[-1] xl:mr-0 xl:mt-16 xl:rotate-[0deg] xl:scale-x-[1]"
                />
                <p className="-mt-6 ml-10 max-w-[150px] text-wrap font-medium text-black sm:ml-8 sm:mt-0 xl:max-w-[250px] xl:text-lg">
                  Catch the full reel-tap the profile picture now.
                </p>
              </div>
            </>
          ) : (
            <div className="aspect-square size-36 rounded-full bg-background object-cover sm:size-48">
              <Image
                src={imageUrl}
                alt={name}
                width={200}
                height={200}
                loading="eager"
                className="aspect-square h-full w-full rounded-full object-cover"
              />
            </div>
          )}
          <p className="text-center text-xl font-semibold">{name}</p>
        </div>
        <div className="flex flex-col justify-end gap-8">
          <div className="flex w-min flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Share your results</h2>
              <p className="whitespace-nowrap text-gray-600 sm:whitespace-normal">
                Unwrap your LLM-crafted journey with friends.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {isMobile() ? (
                <Button
                  onClick={async () =>
                    await navigator.share({
                      title: "My LLM Wrapped",
                      text: "Check out my #LLMwrapped results — prompted by an AI Agent powered by Wordware!",
                      url: window.location.href,
                    })
                  }
                  size="lg"
                  className="w-full"
                >
                  Share
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  {shareConfig
                    .filter(
                      (option) =>
                        !["Copy Link", "Export Image"].includes(option.label),
                    )
                    .map((shareOption) => (
                      <ShareIcon
                        key={shareOption.label}
                        label={shareOption.label}
                        icon={shareOption.icon}
                        action={shareOption.action}
                        size="size-12"
                      />
                    ))}
                </div>
              )}

              <div className="flex w-full items-center gap-2 rounded-lg border p-3">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 bg-transparent text-gray-600 outline-none"
                />
                <button
                  onClick={() => {
                    void navigator.clipboard.writeText(window.location.href);
                    toast("Link copied to clipboard!");
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
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span className="sr-only">Copy link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
