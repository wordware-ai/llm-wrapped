import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export default function WordwareInfo() {
  return (
    <div className="flex flex-col gap-16 px-4 py-0">
      <section className="mx-auto flex max-w-3xl flex-col gap-12 text-left">
        <div className="flex items-center gap-4 pt-48">
          <Image
            src="/brand/w-black-cropped.png"
            alt="Wordware Logo"
            width={40}
            height={40}
            className="opacity-80"
          />
          <h1 className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-4xl font-semibold text-transparent">
            Why did we build #LLMwrapped?
          </h1>
        </div>

        <div className="flex flex-col gap-10 text-2xl font-light leading-relaxed text-zinc-500">
          <p>
            We created this project to showcase the power of effective prompting
            on Wordware.
          </p>

          <div className="space-y-4">
            <h2 className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-3xl font-semibold text-transparent">
              Word... what?
            </h2>

            <p>
              Wordware – the ultimate AI operating system, designed to build AI
              agents using natural language. We used it for LLM orchestration.
            </p>
          </div>

          <p>
            In just 2 days, our team of 4 completed exactly 3,529 prompt
            iterations (using different techniques) and tested 7
            models—unlocking efficiency and creativity that wouldn&apos;t have
            been possible without Wordware.
            <br />
            <br />
            Seriously, without a proper solution, we&apos;d still be drowning in
            endless back-and-forths and getting those classic passive-aggressive
            &quot;noted&quot; replies from engineers every time we needed a tiny
            prompt tweak.
          </p>

          <div className="rounded-xl bg-zinc-50 p-8">
            <p className="mb-6 text-zinc-600">
              This isn&apos;t our first Wordware showcase—check out what else
              we&apos;ve built:
            </p>
            <div className="flex flex-col gap-4 pl-4">
              <Link
                href="https://twitter.wordware.ai"
                className="flex items-center gap-3 text-xl text-zinc-600 transition-colors hover:text-zinc-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                  →
                </div>
                twitter.wordware.ai
              </Link>
              <Link
                href="https://audioscribe.wordware.ai"
                className="flex items-center gap-3 text-xl text-zinc-600 transition-colors hover:text-zinc-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-purple-600 text-white">
                  →
                </div>
                audioscribe.wordware.ai
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-xl border-[1px] border-[#E2E2E2] bg-[radial-gradient(circle_at_top_left,white_0%,transparent_70%),radial-gradient(circle_at_top_right,rgba(96,165,250,0.4)_0%,transparent_30%),linear-gradient(to_right,rgba(236,72,153,0.6)_0%,rgba(255,255,255,0.9)_50%,rgba(74,222,128,0.6)_100%)] px-12 py-10">
        <h2 className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-3xl font-medium text-[#515151] text-transparent">
          Ready to build your own AI agents?
        </h2>
        <p className="max-w-xl text-2xl font-[200] text-zinc-600">
          Start creating with Wordware today and design intelligent, powerful AI
          agents in record time.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-4 pb-20 sm:flex-row">
        <Link
          href="https://app.wordware.ai/register"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "bg-zinc-900 text-lg font-light text-white hover:bg-zinc-800",
          )}
        >
          Sign up for free
        </Link>
        <Link
          href="https://app.wordware.ai/explore/apps/45bf050b-4223-45c1-9fd6-a2d6c6b2ac1d"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 text-lg font-light text-white hover:opacity-90",
          )}
        >
          Duplicate this WordApp
        </Link>
        <Link
          href="https://github.com/wordware-ai/llm-wrapped"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "text-lg font-light text-zinc-700 hover:bg-zinc-50",
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repo
        </Link>
      </div>
    </div>
  );
}
