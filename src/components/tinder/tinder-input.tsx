"use client";

import { convertTinderDataToMarkdown } from "@/lib/convert-to-markdown";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TinderDataSchema } from "./schemas";
import { useRouter } from "next/navigation";
import { createTinderId } from "@/lib/create-tinder-id";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import DownloadPopover from "./download-popover";

interface StoredTinderData {
  id: string;
  name: string;
  llmdata: string;
}

export function TinderInput() {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("tinderData");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as StoredTinderData;
      setExistingId(parsedData.id);
    }
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      if (!file) return;

      if (!file.type.includes("json")) {
        setError("Please upload a JSON file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string) as unknown;
          const parsedData = TinderDataSchema.parse(jsonData);
          const name = parsedData?.user?.name;
          const id = createTinderId(name);
          const markdown = convertTinderDataToMarkdown(parsedData);
          const dataToStore = { name, llmdata: markdown, id };
          localStorage.setItem("tinderData", JSON.stringify(dataToStore));
          router.push(`/tinder/${id}`);
        } catch (err) {
          setError("Invalid JSON file");
          console.error("Error parsing JSON:", err);
        }
      };

      reader.readAsText(file);
    },
    [router],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div className="">
      {existingId ? (
        <Link
          href={`/tinder/${existingId}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full rounded-lg border-none bg-[#FF4458] text-white hover:bg-[#FF4458]/90",
          )}
        >
          View Your Previous Results
        </Link>
      ) : (
        <div className="flex flex-col gap-2 px-8">
          <DownloadPopover />
          <div
            {...getRootProps()}
            className={cn(
              "cursor-pointer rounded-lg border-2 border-dashed bg-[#111] p-8 text-center transition-all",
              isDragging
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-300 hover:border-gray-200 hover:bg-[#222]",
              "focus:outline-none focus:ring-2 focus:ring-blue-500",
            )}
          >
            <input {...getInputProps()} />
            <p className="text-muted-foreground">
              Drag and drop your Tinder data file here, or click to select
            </p>

            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
