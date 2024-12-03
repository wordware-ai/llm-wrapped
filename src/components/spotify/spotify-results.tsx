"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type UserWithSpotifyResult } from "@/types/user";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useStreamContext } from "../stream-provider";
import { CardGrid } from "./card-grid";

import { convertDbToState, convertStateToDb } from "@/lib/convert-results";
import Navbar from "./navbar";
import { SideCards } from "./side-cards";
import { UserInfo } from "./user-info";
import { ChevronDown } from "lucide-react";
import WordwareInfo from "../wordware-info";

export function SpotifyResults({ user }: { user: UserWithSpotifyResult }) {
  const previousRun = user.spotifyResult;
  const { session } = useUser();
  const { data } = api.spotifyApi.getAllUserData.useQuery(undefined, {
    enabled: !previousRun && !!session?.provider_token,
  });
  const [showScroll] = useState(false);

  const spotifyData = data?.spotifyData;

  const { mutate: createSpotifyResult } =
    api.spotifyUser.createSpotifyResult.useMutation();

  const onFinish = (results: Record<string, unknown>) => {
    const spotifyResult = convertStateToDb(results);
    createSpotifyResult(spotifyResult);
  };

  const { setResults } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "45bf050b-4223-45c1-9fd6-a2d6c6b2ac1d",
    data: spotifyData ?? "",
    onFinish,
  });

  useEffect(() => {
    if (previousRun) {
      const displayResults = convertDbToState(previousRun);
      setResults(displayResults);
    } else {
      if (spotifyData) {
        void streamResponse({ initialState: { ...data?.imageUrls } });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousRun, spotifyData]);

  if (!previousRun && !session?.provider_token) {
    redirect("/");
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex flex-col gap-4 sm:pb-16 lg:h-[calc(100vh-56px)] lg:flex-row">
          <UserInfo user={user} />
          <SideCards />
        </div>
        <CardGrid />
      </div>
      {showScroll && (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-background/80 p-2 pb-1 pt-3 shadow-md ring-1 ring-border backdrop-blur hover:cursor-pointer">
          <ChevronDown className="animate-bounce size-6 shrink-0" />
        </div>
      )}
      <WordwareInfo />
    </div>
  );
}
