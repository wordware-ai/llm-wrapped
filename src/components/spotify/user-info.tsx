import { BaseStory } from "../stories/base";

export function UserInfo() {
  return (
    <div className="flex flex-col justify-between gap-4 lg:w-1/2">
      <h1 className="text-5xl font-semibold xs:text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl">
        #LLMWrapped
      </h1>
      <div className="flex gap-8 lg:gap-20">
        <div className="flex w-min flex-col gap-4">
          <BaseStory
            size="lg:size-64 size-36 p-1 lg:p-2"
            src="/images/kamil.png"
            alt="Spotify 1"
            id="6def5615-1a4d-42e6-b1df-6e3063349e89"
          />
          <p className="text-center text-xl font-semibold">Kamil Kamil</p>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-xl sm:text-2xl">Share your results</p>
          <div className="grid grid-cols-2 gap-4">
            <p>Twitter</p>
            <p>Instagram</p>
            <p>LinkedIn</p>
            <p>TikTok</p>
            <p>Reddit</p>
            <p>WhatsApp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
