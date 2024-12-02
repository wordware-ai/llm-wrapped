"use client";

import { SpotifyButton } from "@/components/spotify/spotify-button";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import { SpotifyLogo } from "./logos/spotify";
import { SpotifyStorys } from "./stories/spotify";
import { LinkedinLogo } from "./logos/linkedin";
import { TwitterXLogo } from "./logos/twitter";
import { GitHubLogo } from "./logos/github";

export function Hero() {
  const [tab, setTab] = useState<"spotify" | "linkedin" | "twitter" | "github">(
    "spotify",
  );

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

        <Tabs
          defaultValue="spotify"
          className="z-10 flex w-full flex-col items-center gap-4"
          value={tab}
          onValueChange={(value) =>
            setTab(value as "spotify" | "linkedin" | "twitter" | "github")
          }
        >
          <TabsList className="flex h-10 justify-center">
            <TabsTrigger value="spotify">
              <SpotifyLogo className="h-7 w-auto" />
            </TabsTrigger>
            <TabsTrigger value="linkedin">
              <LinkedinLogo className="h-7 w-auto" />
            </TabsTrigger>
            <TabsTrigger value="twitter">
              <TwitterXLogo className="h-7 w-auto" />
            </TabsTrigger>
            <TabsTrigger value="github">
              <GitHubLogo className="h-7 w-auto" />
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
