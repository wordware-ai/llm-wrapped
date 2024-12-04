import { BaseStory } from "./base";

const spotifyStorys = [
  {
    src: "/images/stories/brian.webp",
    alt: "Brian Chesky",
    href: "/?name=brian&slide=1",
  },
  {
    src: "/images/stories/trump.webp",
    alt: "Donald Trump",
    href: "/?name=trump&slide=1",
  },
  {
    src: "/images/stories/elon.jpg",
    alt: "Elon Musk",
    href: "/?name=elon&slide=1",
  },
  {
    src: "/images/stories/kanye.webp",
    alt: "Kanye West",
    href: "/?name=kanye&slide=1",
  },
  // {
  //   src: "/images/stories/sam.webp",
  //   alt: "Sam Altman",
  //   href: "/?name=sam&slide=1",
  // },
  {
    src: "/images/stories/taylor.jpg",
    alt: "Taylor Swift",
    href: "/?name=taylor&slide=1",
  },
];

export function SpotifyStorys() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-2xl font-semibold">Spotify Examples</p>
      <div className="grid grid-cols-3 items-center gap-2 md:flex md:gap-8">
        {spotifyStorys.map((story, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <BaseStory {...story} />
            <p className="text-center">{story.alt}</p>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2 rounded-lg border bg-white p-4">
          <BaseStory
            src="/brand/w-black.png"
            alt="Wordware"
            href="/?name=wordware&slide=1"
            imageClassName="pt-1.5"
          />
          <p className="text-center">Wordware </p>
        </div>
      </div>
    </div>
  );
}
