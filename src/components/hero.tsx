"use client";

import { SpotifyButton } from "@/components/spotify/spotify-button";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { linkedinStorys } from "@/config/linkedin-examples";
import { spotifyStorys } from "@/config/spotify-examples";
import { tinderStorys } from "@/config/tinder-examples";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { ExampleStories } from "./example-stories";
import { LinkedinInput } from "./linkedin/linkedin-input";
import { GitHubLogo } from "./logos/github";
import { LinkedinLogo } from "./logos/linkedin";
import { SpotifyLogo } from "./logos/spotify";
import { TinderLogo } from "./logos/tinder";
import { TwitterXLogo } from "./logos/twitter";
import { TinderInput } from "./tinder/tinder-input";

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
  const [tab, setTab] = useQueryState<TabValue>("tab", {
    defaultValue: "spotify",
    parse: (value): TabValue => {
      const validTabs = ["spotify", "linkedin", "twitter", "github", "tinder"];
      return validTabs.includes(value as TabValue)
        ? (value as TabValue)
        : "spotify";
    },
  });

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
      value: "tinder" as const,
      icon: <TinderLogo className="h-7 w-auto" />,
      label: "Tinder",
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
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12">
      <div className="relative z-0 flex h-fit min-h-[500px] w-full flex-col items-center justify-center gap-12 overflow-hidden bg-black py-20 sm:rounded-xl">
        <div
          className="absolute left-0 right-0 top-0 -z-10 h-[500px]"
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_APP_URL}/blobs/background.svg')`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
            transform: "scale(1.5)",
            opacity: 0.2,
          }}
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

        <div className="z-10 flex w-full flex-col items-center gap-6">
          <div className="flex h-10 items-stretch rounded-lg bg-muted p-1">
            {tabs.map((tabItem, index) => (
              <div key={tabItem.value} className="flex items-stretch">
                {index > 0 && (
                  <div
                    className={`my-1 w-px self-stretch transition-opacity ${
                      tab === tabItem.value || tab === tabs[index - 1]?.value
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

          <div className="w-full">
            <div className="flex w-full justify-center">
              {tab === "spotify" && <SpotifyButton />}
              {tab === "linkedin" && <LinkedinInput />}
              {tab === "tinder" && <TinderInput />}
              {tab === "twitter" && <Button disabled>Twitter</Button>}
              {tab === "github" && <Button disabled>GitHub</Button>}
            </div>
          </div>

          <p className="w-96 text-center text-xs text-muted-foreground">
            By logging in you agree to our Terms and Conditions and acknowledge
            our{" "}
            <Link href="https://www.wordware.ai/privacy-policy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      {tab === "spotify" && (
        <ExampleStories title="Spotify Examples" stories={spotifyStorys} />
      )}
      {tab === "linkedin" && (
        <div className="flex flex-col gap-4">
          <ExampleStories title="LinkedIn Examples" stories={linkedinStorys} />
          <p className="text-center text-muted-foreground">
            By logging in you agree to our Terms and Conditions and acknowledge
            our{" "}
            <Link href="https://www.wordware.ai/privacy-policy">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      )}
      {tab === "tinder" && (
        <ExampleStories title="Tinder Examples" stories={tinderStorys} />
      )}
    </div>
  );
}
