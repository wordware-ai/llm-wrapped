"use client";

import { SpotifyButton } from "@/components/spotify/spotify-button";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { useState } from "react";
import { SpotifyLogo } from "./logos/spotify";
import { SpotifyStorys } from "./stories/spotify";
import { LinkedinLogo } from "./logos/linkedin";
import { TwitterXLogo } from "./logos/twitter";
import { GitHubLogo } from "./logos/github";
import { TinderLogo } from "./logos/tinder";

type TabValue = "spotify" | "linkedin" | "twitter" | "github" | "tinder";

interface TabProps {
  value: TabValue;
  currentTab: TabValue;
  onClick: (value: TabValue) => void;
  children: React.ReactNode;
}

const Tab = ({ value, currentTab, onClick, children }: TabProps) => (
  <button
    onClick={() => onClick(value)}
    className={`flex items-center gap-2 rounded-md px-4 py-2 transition-colors hover:bg-white lg:px-8 ${
      currentTab === value
        ? "bg-background text-foreground"
        : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {children}
  </button>
);

const DisabledTab = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="relative flex items-center gap-2 rounded-md px-4 py-2.5 opacity-50 lg:px-8"
          disabled
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="bg-black px-3 py-1.5 text-white">
        <p>Coming soon</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export function Hero() {
  const [tab, setTab] = useState<TabValue>("spotify");

  const tabs = [
    {
      value: "spotify" as const,
      icon: <SpotifyLogo className="h-7 w-auto" />,
      label: "Spotify",
      disabled: false,
    },
    {
      value: "linkedin" as const,
      icon: <LinkedinLogo className="h-7 w-auto" />,
      label: "LinkedIn",
      disabled: false,
    },
    {
      value: "twitter" as const,
      icon: <TwitterXLogo className="h-6 w-auto" />,
      label: "Twitter",
      disabled: true,
    },
    {
      value: "github" as const,
      icon: <GitHubLogo className="h-7 w-auto" />,
      label: "GitHub",
      disabled: true,
    },
    {
      value: "tinder" as const,
      icon: <TinderLogo className="h-7 w-auto" />,
      label: "Tinder",
      disabled: true,
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12">
      <div className="relative z-0 flex h-[500px] w-full flex-col items-center justify-center gap-12 overflow-hidden bg-black sm:rounded-xl">
        <Image
          src="/blobs/background.svg"
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-20"
          alt="Background"
          width={1000}
          height={1000}
        />
        <div className="z-10 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-medium text-white sm:text-7xl lg:text-9xl">
            #LLMwrapped
          </h1>
          <p className="w-full max-w-xs text-center text-sm text-zinc-300 md:max-w-lg md:text-xl lg:max-w-none lg:text-2xl">
            get a true look at yourself through the lens of large language
            models (LLMs)
          </p>
        </div>

        <div className="z-10 flex w-full flex-col items-center gap-4">
          <div className="flex h-10 items-stretch rounded-lg bg-muted p-1">
            {tabs.map((tabItem, index) => (
              <div key={tabItem.value} className="flex items-stretch">
                {index > 0 && (
                  <div
                    className={`my-1 w-px self-stretch transition-opacity ${
                      tab === tabItem.value || tab === tabs[index - 1].value
                        ? "opacity-0"
                        : "bg-muted-foreground/25"
                    }`}
                    aria-hidden="true"
                  />
                )}
                {tabItem.disabled ? (
                  <DisabledTab>
                    {tabItem.icon}
                    <p className="hidden md:block">{tabItem.label}</p>
                  </DisabledTab>
                ) : (
                  <Tab value={tabItem.value} currentTab={tab} onClick={setTab}>
                    {tabItem.icon}
                    <p className="hidden md:block">{tabItem.label}</p>
                  </Tab>
                )}
              </div>
            ))}
          </div>

          <div className="h-10 w-full">
            <div className="absolute flex w-full justify-center">
              {tab === "spotify" && <SpotifyButton />}
              {tab === "linkedin" && <Button disabled>LinkedIn</Button>}
              {tab === "twitter" && <Button disabled>Twitter</Button>}
              {tab === "github" && <Button disabled>GitHub</Button>}
            </div>
          </div>

          <p className="w-96 text-center text-xs text-muted-foreground">
            By logging in you agree to our Terms and Conditions and acknowledge
            our Privacy Policy.
          </p>
        </div>
      </div>
      {tab === "spotify" && <SpotifyStorys />}
    </div>
  );
}
