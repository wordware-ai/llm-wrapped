import { SpotifyButton } from "@/components/spotify/spotify-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import HomeCards from "@/components/spotify/bento-cards/home-cards";
import InfoCards from "@/components/spotify/bento-cards/info-cards";
import InfiniteBanner from "@/components/infinite-banner";
import Footer from "@/components/footer";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-12 p-8 md:flex-row md:p-12">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2 md:justify-start lg:justify-end">
            <h3 className="pt-1 text-xl lg:text-2xl">Powered by</h3>
            <Image
              src="/brand/wordware-black.svg"
              alt="Wordware"
              className="w-32 md:w-48 lg:w-52"
              width={200}
              height={200}
            />
          </div>
          <h1 className="w-full text-6xl lg:text-8xl xl:text-9xl">
            <span className="xs:hidden">
              #LLM
              <br />
              Wrapped
            </span>
            <span className="xs:inline hidden">#LLMWrapped</span>
          </h1>
          <p className="text-xl">
            get a true look at yourself through the lens of large language
            models (LLMs)
          </p>
          <div></div>
          <div className="flex flex-col gap-2">
            <SpotifyButton />
            <p>for a brutally honest take on your music taste</p>
          </div>
          <div className="flex flex-col gap-4 pt-12 sm:flex-row sm:gap-6 md:flex-col md:gap-4 lg:flex-row lg:gap-6">
            <div className="flex flex-col gap-2">
              <p>Spotify</p>
              <div className="flex items-center gap-4">
                <Image
                  src="/images/kamil.png"
                  alt="Kamil"
                  width={200}
                  height={200}
                  className="aspect-square h-20 w-20 rounded-full object-cover"
                />
                <Image
                  src="/images/kamil.png"
                  alt="Kamil"
                  width={200}
                  height={200}
                  className="aspect-square h-20 w-20 rounded-full object-cover"
                />
                <Image
                  src="/images/kamil.png"
                  alt="Kamil"
                  width={200}
                  height={200}
                  className="aspect-square h-20 w-20 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <InfiniteBanner />
          <HomeCards />
          <InfoCards />
        </div>
        <div className="flex h-80 w-full flex-col gap-4 md:max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                what&apos;s this? and why did we build it?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg">
              this project was built to showcase{" "}
              <span className="font-bold">
                the power of effective prompting on Wordware.
              </span>{" "}
              using our platform, we orchestrated LLMs to build results designed
              for you to enjoy.
            </CardContent>
          </Card>
          <Card className="pt-4">
            <CardContent className="text-lg">
              in just 2 days, 4 team members completed 3,529 prompt iterations
              (including chains) and tested 7 models—achieving a level of
              efficiency and creativity that wouldn&apos;t have been possible
              without Wordware. explore the final prompts in this WordApp (and
              try building your own version!).
              <br />
              <br />
              ps: this isn&apos;t our first Wordware showcase—check out our
              other projects:
              <br />
              <a href="https://twitter.wordware.ai">twitter.wordware.ai</a>
              <br />
              <a href="https://audioscribe.wordware.ai">
                audioscribe.wordware.ai
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
