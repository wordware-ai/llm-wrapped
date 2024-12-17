import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { AuthProvider } from "@/components/auth-provider";
import Footer from "@/components/footer";
import { CSPostHogProvider } from "@/components/posthog-provider";
import SlideShow from "@/components/slideshow";
import { StreamProvider } from "@/components/stream-provider";
import { Toaster } from "@/components/ui/sonner";
import { getSession, getUser } from "@/lib/supabase/server";
import { TRPCReactProvider } from "@/trpc/react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "LLMwrapped - AI agent by Wordware",
  description:
    "Get a true look at yourself through the lens of large language models (LLMs) ",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "LLMwrapped - AI agent by Wordware",
    description:
      "Get a true look at yourself through the lens of large language models (LLMs)",
    images: [
      {
        url: "https://llm-wrapped.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "LLMwrapped Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLMwrapped - AI agent by Wordware",
    description:
      "Get a true look at yourself through the lens of large language models (LLMs)",
    creator: "wordware",
    images: [
      {
        url: "https://llm-wrapped.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "LLMwrapped Preview",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getUser();
  const { session } = await getSession();
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <meta
          id="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>
          <AuthProvider user={user ?? undefined} session={session ?? undefined}>
            <CSPostHogProvider>
              <StreamProvider>
                <NuqsAdapter>
                  <TooltipProvider>
                    <Suspense>
                      <SlideShow />
                    </Suspense>
                    {children}

                    <Footer />
                    <Toaster />
                  </TooltipProvider>
                </NuqsAdapter>
              </StreamProvider>
            </CSPostHogProvider>
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
