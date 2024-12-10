import Link from "next/link";
import { BaseStory } from "./base-story";
import WordwareStory from "./wordware-story";

type StoryConfig = {
  src: string;
  alt: string;
  href: string;
  externalUrl?: string;
};

// Update component to accept stories as a prop
export function ExampleStories({
  title,
  stories,
}: {
  title: string;
  stories: StoryConfig[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-2xl font-semibold text-zinc-700">
        {title}
      </p>
      <div className="grid grid-cols-3 items-center gap-2 md:flex md:gap-8">
        {stories.map((story, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <BaseStory {...story} />
            {story.externalUrl ? (
              <Link
                href={story.externalUrl}
                className="text-center text-blue-600 hover:underline"
              >
                {story.alt}
              </Link>
            ) : (
              <p className="text-center">{story.alt}</p>
            )}
          </div>
        ))}
        <div className="flex flex-col items-center gap-2 rounded-lg border bg-white p-4">
          <WordwareStory href="/?name=wordware&slide=1" />
          <Link
            href="https://www.wordware.ai"
            className="text-center text-blue-600 hover:underline"
          >
            Wordware
          </Link>
        </div>
      </div>
    </div>
  );
}
