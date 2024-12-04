import { type CardComponentProps, type CardItem, cards } from "./card-config";
import Image from "next/image";

const TopArtist = ({ result, imageUrl }: CardComponentProps) => {
  return (
    <div className="flex h-max w-full flex-col gap-8 text-center text-white">
      {imageUrl && (
        <div className="my-2 flex justify-center">
          <Image
            src={imageUrl}
            alt="Most Popular Artist"
            className="aspect-square rounded-lg object-cover"
            width={200}
            height={200}
          />
        </div>
      )}
      <p className="text-4xl">{result.value as string}</p>
    </div>
  );
};

const Tools = () => {
  return (
    <div className="flex h-max w-full flex-col text-center text-white">
      <p className="text-3xl font-semibold">Tools</p>
      <p className="text-2xl">
        feel unstoppable with tools that take your WordApps to the next level.
        from web searches to image generation, text-to-speech, PDF parsing, and
        more—you can do so much, so quickly.
        <br />
        <br />
        ready to add one? just type / in the editor and explore the tool
        section.
      </p>
    </div>
  );
};

const GetStarted = () => {
  return (
    <div className="flex h-max w-full flex-col text-center text-white">
      <p className="text-3xl font-semibold">Get Started</p>
      <p className="text-2xl">
        Whether you&apos;re new to AI or ready to create complex AI agents,
        Wordware is here for you. Try for free at{" "}
        <a
          href="https://wordware.ai"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open("https://wordware.ai", "_blank", "noopener,noreferrer");
          }}
        >
          wordware.ai
        </a>{" "}
        or book a demo call to see it in action.
      </p>
    </div>
  );
};

export const slideshowCards: CardItem[] = [
  {
    data: {
      id: "short_summary",
      title: "",
    },
  },
  {
    data: {
      id: "music_taste_analysis_1",
      title: "",
    },
    Component: TopArtist,
  },
  {
    data: {
      id: "music_taste_analysis_2",
      title: "",
    },
  },
  {
    data: {
      id: "music_taste_analysis_3",
      title: "",
    },
  },
  {
    data: {
      id: "lyric_therapy_needed",
      title: "",
    },
  },
  {
    data: {
      id: "what_is_wordware",
      title: "What is Wordware?",
    },
  },
  {
    data: {
      id: "all_the_models",
      title: "All the models you need in one place",
    },
  },
  {
    data: {
      id: "multi_modal",
      title: "Ohh, did we mention we're multimodal?",
    },
  },
  {
    data: {
      id: "deploy_with_api",
      title: "Deploy anywhere via API",
    },
  },
  {
    data: {
      id: "functions",
      title: "Functions that work for you",
    },
  },
  {
    data: {
      id: "tools",
      title: "Tools to supercharge your WordApps",
    },
    Component: Tools,
  },
  {
    data: {
      id: "get_started",
      title: "Ready to build something amazing?",
    },
    Component: GetStarted,
  },

  ...Object.values(cards),
];
