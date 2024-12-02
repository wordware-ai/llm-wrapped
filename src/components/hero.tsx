"use client";

import { SpotifyButton } from "@/components/spotify/spotify-button";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { SpotifyStorys } from "./stories/spotify";

export function Hero() {
  const [tab, setTab] = useState<"spotify" | "linkedin" | "twitter" | "github">(
    "spotify",
  );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12">
      <div className="relative z-0 flex h-[500px] w-full flex-col items-center justify-center gap-12 overflow-hidden bg-black sm:rounded-xl">
        <img
          src="/blobs/background.svg"
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-20"
          alt="Background"
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

        <Tabs
          defaultValue="spotify"
          className="z-10 flex w-full flex-col items-center gap-4"
          value={tab}
          onValueChange={(value) =>
            setTab(value as "spotify" | "linkedin" | "twitter" | "github")
          }
        >
          <TabsList className="flex justify-center">
            <TabsTrigger className="h-8" value="spotify">
              <div className="h-[20px] w-[70px]">
                <img
                  src="/logos/spotify-big.svg"
                  alt="Spotify"
                  className="h-full w-full"
                />
              </div>
            </TabsTrigger>
            <TabsTrigger className="h-8" value="linkedin">
              <img
                src="/logos/linkedin-big.svg"
                alt="LinkedIn"
                className="h-5 w-auto"
              />
            </TabsTrigger>
            <TabsTrigger className="h-8" value="twitter">
              <div className="flex items-center gap-1">
                <img
                  src="/logos/twitter-small.svg"
                  alt="Twitter"
                  className="h-4 w-4"
                />
                <p className="text-black">Twitter</p>
              </div>
            </TabsTrigger>
            <TabsTrigger className="h-8" value="github">
              <div className="flex items-center gap-2">
                <img
                  src="/logos/github-small.svg"
                  alt="GitHub"
                  className="h-4 w-4"
                />
                <p className="text-black">GitHub</p>
              </div>
            </TabsTrigger>
          </TabsList>
          <div className="h-10 w-full">
            <TabsContent
              value="spotify"
              className="absolute flex w-full justify-center"
            >
              <SpotifyButton />
            </TabsContent>
            <TabsContent
              value="linkedin"
              className="absolute flex w-full justify-center"
            >
              <Button>LinkedIn</Button>
            </TabsContent>
            <TabsContent
              value="twitter"
              className="absolute flex w-full justify-center"
            >
              <Button>Twitter</Button>
            </TabsContent>
            <TabsContent
              value="github"
              className="absolute flex w-full justify-center"
            >
              <Button>GitHub</Button>
            </TabsContent>
          </div>
          <p className="w-96 text-center text-xs text-muted-foreground">
            By logging in you agree to our Terms and Conditions and acknowledge
            our Privacy Policy.
          </p>
        </Tabs>
      </div>
      {tab === "spotify" && <SpotifyStorys />}
    </div>
  );
}
