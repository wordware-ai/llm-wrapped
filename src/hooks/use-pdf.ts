"use client";
import { useEffect, useState } from "react";
import type * as PDFJS from "pdfjs-dist/types/src/pdf";

declare global {
  interface PromiseConstructor {
    withResolvers<T = unknown>(): {
      promise: Promise<T>;
      resolve: (value: T | PromiseLike<T>) => void;
      reject: (reason?: unknown) => void;
    };
  }
}

// Add the polyfill before the hook
if (typeof Promise.withResolvers === "undefined") {
  if (typeof window !== "undefined") {
    // @ts-expect-error This is a polyfill for Promise.withResolvers
    Promise.withResolvers = function () {
      let resolve!: (value: unknown) => void;
      let reject!: (reason?: unknown) => void;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  }
}

export const usePDFJS = (
  onLoad: (pdfjs: typeof PDFJS) => Promise<void>,
  deps: (string | number | boolean | undefined | null)[] = [],
) => {
  const [pdfjs, setPDFJS] = useState<typeof PDFJS | null>(null);

  useEffect(() => {
    void import("pdfjs-dist/webpack.mjs").then((pdf) => {
      // Set the worker source
      pdf.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      setPDFJS(pdf);
    });
  }, []);

  useEffect(() => {
    if (!pdfjs) return;
    void (async () => await onLoad(pdfjs))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfjs, onLoad, ...deps]);
};
