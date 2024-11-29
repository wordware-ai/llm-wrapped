import { BaseStory } from "./base";

const spotifyStorys = [
  {
    src: "/images/kamil.png",
    alt: "Kamil",
    href: "/?name=kamil&slide=1",
  },
  {
    src: "/images/kamil.png",
    alt: "Kamil",
    href: "/?name=kamil&slide=1",
  },
  {
    src: "/images/kamil.png",
    alt: "Kamil",
    href: "/?name=kamil&slide=1",
  },
  {
    src: "/images/kamil.png",
    alt: "Kamil",
    href: "/?name=kamil&slide=1",
  },
  {
    src: "/images/kamil.png",
    alt: "Kamil",
    href: "/?name=kamil&slide=1",
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
            className="pt-1.5"
          />
          <p className="text-center">Kamil </p>
        </div>
      </div>
    </div>
  );
}
