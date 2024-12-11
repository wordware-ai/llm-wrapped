"use client";
import { useEffect, useState } from "react";
import type * as PDFJS from "pdfjs-dist/types/src/pdf";

export const usePDFJS = (
  onLoad: (pdfjs: typeof PDFJS) => Promise<void>,
  deps: (string | number | boolean | undefined | null)[] = [],
) => {
  const [pdfjs, setPDFJS] = useState<typeof PDFJS | null>(null);

  useEffect(() => {
    void import("pdfjs-dist/webpack.mjs").then(setPDFJS);
  }, []);

  useEffect(() => {
    if (!pdfjs) return;
    void (async () => await onLoad(pdfjs))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfjs, onLoad, ...deps]);
};
