import { BaseStory } from "./base";

const spotifyStorys = [
  { src: "/images/kamil.png", alt: "Kamil", id: "1" },
  { src: "/images/kamil.png", alt: "Kamil", id: "2" },
  { src: "/images/kamil.png", alt: "Kamil", id: "3" },
  { src: "/images/kamil.png", alt: "Kamil", id: "4" },
  { src: "/images/kamil.png", alt: "Kamil", id: "5" },
];

export function SpotifyStorys() {
  return (
    <div className="flex flex-col gap-4 pt-12 sm:flex-row sm:gap-6 md:flex-col md:gap-4 lg:flex-row lg:gap-6">
      <div className="flex flex-col gap-4">
        <p className="text-center text-2xl font-semibold">Spotify Examples</p>
        <div className="flex items-center gap-8">
          {spotifyStorys.map((story) => (
            <div key={story.id} className="flex flex-col gap-2">
              <BaseStory {...story} />
              <p className="text-center">{story.alt}</p>
            </div>
          ))}
          <div className="rounded-lg border bg-white p-4">
            <BaseStory
              src="/brand/w-black.png"
              alt="Wordware"
              id="add"
              className="pt-1.5"
            />
            <p className="text-center">Kamil </p>
          </div>
        </div>
      </div>
    </div>
  );
}
