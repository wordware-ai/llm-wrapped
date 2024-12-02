import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function HomeInfo() {
  return (
    <>
      <div className="mx-auto flex max-w-3xl flex-col gap-4 text-left text-3xl font-light leading-10">
        <h1>Why did we build #LLMwrapped?</h1>

        <p className="text-gray-400">
          <br />
          This project was built to showcase the power of effective prompting on
          Wordware. using our platform, we orchestrated LLMs to build results
          designed for you to enjoy. In just 2 days, 4 team members completed
          3,529 prompt iterations (including chains) and tested 7
          models—achieving a level of efficiency and creativity that
          wouldn&apos;t have been possible without Wordware.
          <br /> <br /> explore the final prompts in this WordApp (and try
          building your own version!). <br /> <br />
          ps: this isn&apos;t our first Wordware showcase—check out our other
          projects: twitter.wordware.ai <br />
          audioscribe.wordware.ai
        </p>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-600/20 py-6 text-center text-2xl font-light">
        <h2 className="font-medium">Ready to create your own AI showcase?</h2>
        <p className="max-w-xl text-gray-600">
          Start building with Wordware today and create powerful AI applications
          in record time.
        </p>
      </div>
      <div className="flex justify-center gap-4 pb-20">
        <Link
          href="https://wordware.ai"
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:opacity-90",
          )}
        >
          Duplicate this WordApp
        </Link>
        <Link
          href="https://github.com/wordware-ai"
          className={cn(buttonVariants({ variant: "outline" }))}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub repo
        </Link>
      </div>
    </>
  );
}
