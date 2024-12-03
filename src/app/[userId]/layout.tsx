export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "LLMwrapped Results",
    description: "Check out my LLM usage wrapped for the year!",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "LLMwrapped Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LLMwrapped Results",
    description: "Check out my LLM usage wrapped for the year!",
    images: ["/api/og"],
  },
};
