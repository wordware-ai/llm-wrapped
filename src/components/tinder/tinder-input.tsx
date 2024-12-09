"use client";

import { convertTinderDataToMarkdown } from "@/lib/convert-to-markdown";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TinderDataSchema } from "./schemas";
import { useRouter } from "next/navigation";
import { createTinderId } from "@/lib/create-tinder-id";

export function TinderInput() {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
        const dataToStore = { name, llmdata: markdown };
        sessionStorage.setItem("tinderData", JSON.stringify(dataToStore));
        router.push(`/tinder/${id}`);
      } catch (err) {
        setError("Invalid JSON file");
        console.error("Error parsing JSON:", err);
      }
    };

    reader.readAsText(file);
  }, []);

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
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
        )}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag and drop your Tinder data file here, or click to select
        </p>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
