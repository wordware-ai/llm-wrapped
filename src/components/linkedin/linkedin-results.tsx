"use client";

import { useStream } from "@/hooks/use-stream";
import { api } from "@/trpc/react";
import { useEffect } from "react";
import { useStreamContext } from "../stream-provider";

import {
  convertLinkedinDbToState,
  convertLinkedinToDb,
} from "@/lib/convert-linkedin";
import { type LinkedinResult } from "@prisma/client";
import WordwareInfo from "../wordware-info";
import { useParams } from "next/navigation";
import Navbar from "../navbar";
import { UserInfo } from "../user-info";

export function LinkedInResults({
  linkedinResult,
  llmData,
  profileData,
}: {
  linkedinResult: LinkedinResult | null;
  llmData?: string;
  profileData?: {
    imageUrl?: string;
    name?: string;
    username?: string;
  };
}) {
  const { username } = useParams();

  const { mutate: createLinkedinResult } =
    api.linkedinResults.createLinkedinResult.useMutation();

  const onFinish = (results: Record<string, unknown>) => {
    const linkedinResult = {
      ...convertLinkedinToDb(results),
      username: profileData?.username ?? "",
      imageUrl: profileData?.imageUrl ?? "",
      name: profileData?.name ?? "",
    };
    createLinkedinResult(linkedinResult);
  };

  const { results, setResults } = useStreamContext();
  const { streamResponse } = useStream({
    promptId: "81464643-a0e0-4982-9370-9bc37fd9a4a5",
    data: llmData ?? "",
    onFinish,
  });

  useEffect(() => {
    if (linkedinResult) {
      const displayResults = convertLinkedinDbToState(linkedinResult);
      setResults(displayResults);
    } else {
      void streamResponse({
        initialState: {},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedinResult]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-col gap-4 sm:pb-16 lg:h-[calc(100vh-56px)] lg:flex-row">
        <UserInfo />
        <SideCards />
      </div>
      <WordwareInfo />
    </div>
  );
}
