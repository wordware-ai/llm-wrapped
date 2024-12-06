import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function WordwareInfo() {
  return (
    <div className="flex flex-col gap-12 px-4">
      <section className="mx-auto flex max-w-3xl flex-col gap-8 text-left">
        <h1 className="text-3xl font-medium">Why did we build #LLMwrapped?</h1>

        <div className="flex flex-col gap-8 text-3xl font-light leading-10 text-gray-400">
          <p>
            we created this project to showcase the power of effective prompting
            on wordware.
          </p>

          <h2 className="font-medium text-black">word... what?</h2>

          <p>
            wordware – the ultimate AI operating system, designed to build AI
            agents using natural language. we used it for LLM orchestration.
          </p>

          <p>
            in just 2 days, our team of 4 completed exactly 3,529 prompt
            iterations (using different techniques) and tested 7
            models—unlocking efficiency and creativity that wouldn&apos;t have
            been possible without wordware. (seriously, without a proper
            solution, we&apos;d still be drowning in endless back-and-forths and
            getting those classic passive-aggressive &quot;noted&quot; replies
            from engineers every time we needed a tiny prompt tweak.)
          </p>

          <div>
            <p className="mb-4">
              this isn&apos;t our first wordware showcase—check out what else
              we&apos;ve built:
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="https://twitter.wordware.ai"
                className="hover:underline"
              >
                • twitter.wordware.ai
              </Link>
              <Link
                href="https://audioscribe.wordware.ai"
                className="hover:underline"
              >
                • audioscribe.wordware.ai
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-600/20 py-6 text-center text-2xl font-light">
        <h2 className="font-medium">Ready to build your own AI agents?</h2>
        <p className="max-w-xl text-gray-600">
          Start building with Wordware today and create powerful AI applications
          in record time.
        </p>
      </div>
      <div className="flex flex-col justify-center gap-4 pb-20 sm:flex-row">
        <Link
          href="https://wordware.ai"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Sign up for free
        </Link>
        <Link
          href="https://wordware.ai"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90",
          )}
        >
          Duplicate this WordApp
        </Link>
        <Link
          href="https://github.com/wordware-ai/llm-wrapped"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repo
        </Link>
      </div>
    </div>
  );
}
