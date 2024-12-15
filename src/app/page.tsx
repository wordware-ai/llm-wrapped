"use client";

import { useCallback } from "react";
import html2canvas from "html2canvas";

export default function Home() {
  const captureAndDownload = useCallback(async () => {
    const element = document.getElementById("capture");
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, "image/png");
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "hello-world.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  }, []);

  return (
    <div className="p-8">
      <div id="capture" className="mb-4 w-fit bg-white p-4">
        <h1 className="text-2xl">Hello World</h1>
      </div>

      <button
        onClick={captureAndDownload}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Download as Image
      </button>
    </div>
  );
}
