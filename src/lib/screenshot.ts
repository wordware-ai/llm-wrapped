export const takeScreenshot = async (element: HTMLElement): Promise<string> => {
  // Dynamically import html2canvas only when needed
  const html2canvas = (await import("html2canvas")).default;

  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error taking screenshot:", error);
    throw error;
  }
};
