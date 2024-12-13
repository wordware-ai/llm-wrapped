"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePDFJS } from "@/hooks/use-pdf";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import * as pdfjsLib from "pdfjs-dist";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { buttonVariants } from "../ui/button";
import { useParams } from "next/navigation";
import Image from "next/image";

// Configure the worker
// Note: You'll need to copy the pdf.worker.js file from node_modules/pdfjs-dist/build

// Define the structure for parsed PDF data

export function PDFInput({
  setRenderScrapeFailed,
  setPdfData,
}: {
  setRenderScrapeFailed: (value: boolean) => void;
  setPdfData: (value: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  usePDFJS(async (pdfjs) => {
    console.log(pdfjs);
  });

  const { username } = useParams();

  const parsePDF = async (arrayBuffer?: ArrayBuffer): Promise<string> => {
    if (!arrayBuffer) {
      throw new Error("No array buffer provided");
    }
    try {
      // Load the PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      // Get document info

      // Extract text from all pages
      let fullText = "";
      for (let i = 1; i <= numPages; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => {
            if (typeof item === "object" && item !== null && "str" in item) {
              return (item as { str: string }).str;
            }
            return "";
          })
          .join(" ");
        fullText += pageText + "\n";
      }
      console.log("fullText", fullText);
      return fullText;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error parsing PDF");
      throw err;
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      setIsLoading(true);
      try {
        const file = acceptedFiles[0];
        const arrayBuffer = await file?.arrayBuffer();
        const parsed = await parsePDF(arrayBuffer);
        setPdfData(parsed);
        setRenderScrapeFailed(false);
      } catch (error) {
        console.error("Error parsing PDF:", error);
        setError(error instanceof Error ? error.message : "Error parsing PDF");
      } finally {
        setIsLoading(false);
      }
    },
    [setPdfData, setRenderScrapeFailed],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  return (
    <Dialog open={true}>
      <DialogContent className="p-8 sm:max-w-[800px]">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl font-bold">
            Our Scraper Took a Coffee Break
          </DialogTitle>
          <DialogDescription className="text-lg leading-relaxed">
            We’re currently experiencing issues with our web scraping provider,
            which means we couldn’t retrieve your data, causing the analysis to
            fail. While this is out of our control, there’s a quick fix: head to
            your{" "}
            <Link
              href={`https://www.linkedin.com/in/${username as string}`}
              className="text-lg text-blue-500 hover:underline"
            >
              LinkedIn profile,
            </Link>{" "}
            click More, then select Save as PDF. Once you’ve saved it, drag and
            drop the PDF into the dropzone below to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/images/linkedin-pdf-download.png"
            alt="LinkedIn Save as PDF"
            className="rounded-lg border"
            fill
            style={{ objectFit: "contain" }}
            placeholder="blur"
            blurDataURL="/images/linkedin-pdf-blur.png"
          />
        </div>

        <div className="grid gap-6 py-6">
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-lg border-4 border-dashed p-12 text-center transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            {isLoading ? (
              <p className="text-lg text-gray-500">Processing PDF...</p>
            ) : isDragActive ? (
              <p className="text-lg text-gray-500">Drop the PDF here...</p>
            ) : (
              <p className="text-lg text-gray-500">
                Drag and drop a PDF here, or click to select a file
              </p>
            )}
          </div>

          <Link className={buttonVariants({ size: "lg" })} href="/">
            <ChevronLeft className="h-6 w-6" />
            <span className="ml-2 text-lg">Return Home</span>
          </Link>

          {error && <p className="text-lg text-red-500">Error: {error}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PDFInput;
