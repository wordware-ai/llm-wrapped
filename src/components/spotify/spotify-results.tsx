"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type UserWithSpotifyResult } from "@/types/user";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";

import {
  convertSpotifyDbToState,
  convertSpotifyToDb,
} from "@/lib/convert-spotify";
import WordwareInfo from "../wordware-info";
import Navbar from "../navbar";
import { SideCards } from "../side-cards";
import { UserInfo } from "../user-info";

export function SpotifyResults({ user }: { user: UserWithSpotifyResult }) {
  const previousRun = user.spotifyResult;
  const { session } = useUser();
  const { data } = api.spotifyApi.getAllUserData.useQuery(undefined, {
    enabled: !previousRun && !!session?.provider_token,
  });

  const spotifyData = data?.spotifyData;

  const { mutate: createSpotifyResult } =
    api.spotifyResults.createSpotifyResult.useMutation();

  const onFinish = (results: Record<string, unknown>) => {
    const spotifyResult = convertSpotifyToDb(results);
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
      const displayResults = convertSpotifyDbToState(previousRun);
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
      <div className="mb-20 flex flex-col gap-4 p-8 lg:h-[calc(100vh-56px)] lg:flex-row">
        <UserInfo user={user} />
        <SideCards />
      </div>

      <WordwareInfo />
    </div>
  );
}
