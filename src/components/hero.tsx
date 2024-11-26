"use client";

import { SpotifyButton } from "@/components/spotify/spotify-button";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useState } from "react";
import { SpotifyStorys } from "./stories/spotify";

export function Hero() {
  const [tab, setTab] = useState<"spotify" | "linkedin" | "twitter" | "github">(
    "spotify",
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="relative z-0 flex h-[500px] w-full flex-col items-center justify-center gap-12 overflow-hidden rounded-xl bg-black">
        <Image
          src="/blobs/background.svg"
          className="absolute left-0 top-0 -z-10 h-full w-full object-cover opacity-20"
          alt="Background"
          width={1000}
          height={1000}
        />
        <div className="z-10 flex flex-col items-center justify-center">
          <h1 className="text-9xl font-bold text-white">#LLMWrapped</h1>
          <p className="text-xl text-white">
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
            <TabsTrigger value="spotify">
              <Image
                src="/logos/spotify-big.svg"
                alt="Spotify"
                width={70}
                height={70}
              />
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="overflow-hidden">
              <Image
                src="/logos/linkedin-big.svg"
                alt="LinkedIn"
                width={80}
                height={80}
              />
            </TabsTrigger>
            <TabsTrigger value="twitter">
              <div className="flex items-center gap-1">
                <Image
                  src="/logos/twitter-small.svg"
                  alt="Twitter"
                  width={20}
                  height={20}
                />
                <p className="text-black">Twitter</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="github">
              <div className="flex items-center gap-2">
                <Image
                  src="/logos/github-small.svg"
                  alt="GitHub"
                  width={20}
                  height={20}
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
          <p className="text-muted-foreground w-96 text-center text-xs">
            By logging in you agree to our Terms and Conditions and acknowledge
            our Privacy Policy.
          </p>
        </Tabs>
      </div>
      {tab === "spotify" && <SpotifyStorys />}
    </div>
  );
}
