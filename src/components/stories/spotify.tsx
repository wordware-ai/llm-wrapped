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
        <div className="relative flex flex-col items-center gap-2">
          <div className="absolute -top-10 left-[-30px] flex items-center whitespace-nowrap">
            <p className="mr-3 font-medium italic text-gray-600">Click me!</p>
            <svg
              className="-rotate-20 translate-y-2"
              width="40"
              height="32"
              viewBox="0 0 245 176"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3_246)">
                <path
                  d="M244.311 159.489C237.56 160.759 230.808 162.03 222.791 163.512C223.846 160.759 224.479 158.853 225.534 156.947C246.21 116.501 239.669 73.3014 208.023 40.4783C187.558 19.5139 162.241 8.71403 133.97 2.78469C102.324 -3.77994 72.154 1.72588 43.0392 14.4316C28.0599 20.9962 16.4562 31.7961 6.54028 44.5018C4.00856 47.89 1.6878 51.2782 -1.30846e-05 55.937C2.10975 54.6664 4.64145 53.6076 5.90731 51.7017C38.6087 6.17288 116.037 -4.62699 171.946 25.2315C193.888 36.8784 210.344 54.0311 220.26 76.9014C231.863 103.795 227.011 139.159 208.445 161.183C204.647 151.653 208.023 139.371 197.263 131.748C197.685 145.301 197.896 157.583 198.318 169.653C198.529 173.677 200.639 176.853 204.436 175.794C217.517 172.406 230.386 168.594 243.045 164.571C243.889 164.359 244.311 162.453 244.944 161.394C245.155 160.971 244.733 160.124 244.311 159.489Z"
                  fill="#0D1927"
                />
              </g>
              <defs>
                <clipPath id="clip0_3_246">
                  <rect
                    width="245"
                    height="176"
                    fill="white"
                    transform="matrix(-1 0 0 1 245 0)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <BaseStory {...spotifyStorys[0]!} />
          <p className="text-center">{spotifyStorys[0]?.alt}</p>
        </div>
        {spotifyStorys.slice(1).map((story, index) => (
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
