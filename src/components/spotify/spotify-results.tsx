"use client";

import { useStream } from "@/hooks/use-stream";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";
import { type UserWithSpotifyResult } from "@/types/user";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Slideshow from "../slideshow";
import { useStreamContext } from "../stream-provider";
import { CardGrid } from "./card-grid";

import Navbar from "./navbar";
import { SideCards } from "./side-cards";
import { UserInfo } from "./user-info";
import { convertDbToState, convertStateToDb } from "@/lib/convert-results";

export function SpotifyResults({ user }: { user: UserWithSpotifyResult }) {
  const previousRun = user.spotifyResult;
  const { session } = useUser();
  const { data } = api.spotifyApi.getAllUserData.useQuery(undefined, {
    enabled: !previousRun && !!session?.provider_token,
  });

  const spotifyData = data?.spotifyData;

  const { mutate: createSpotifyResult } =
    api.spotifyUser.createSpotifyResult.useMutation();

  const onFinish = (results: Record<string, unknown>) => {
    const spotifyResult = convertStateToDb(results);
    createSpotifyResult(spotifyResult);
  };

  const { setResults } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "5d5cb90e-4197-4c60-bcb4-8c9b8137f636",
    data: spotifyData ?? "",
    onFinish,
    initialState: data?.imageUrls ?? {},
  });

  useEffect(() => {
    if (previousRun) {
      const displayResults = convertDbToState(previousRun);
      setResults(displayResults);
    } else {
      if (spotifyData) {
        void streamResponse();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousRun, spotifyData]);

  const searchParams = useSearchParams();
  const slide = searchParams.get("slide");

  // uncomment this
  // if (!previousRun && !session?.provider_token) {
  //   redirect("/");
  // }

  if (slide) {
    return <Slideshow />;
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-4 p-8">
        <div className="flex flex-col gap-4 pb-16 lg:h-[calc(100vh-56px)] lg:flex-row">
          <UserInfo user={user} />
          <SideCards />
        </div>
        <CardGrid />
      </div>
    </div>
  );
}
