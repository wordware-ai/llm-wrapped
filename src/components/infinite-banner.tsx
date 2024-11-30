import React from "react";

export default function InfiniteBanner() {
  const content = (
    <>
      <span className="text-gray-400">This is a</span>
      <span className="text-black"> WordApp</span>
      <span className="text-gray-400">-- A Wordware Application --</span>
    </>
  );

  return (
    <div className="relative flex w-full overflow-hidden py-8">
      <div className="absolute left-0 top-0 z-10 h-full w-[200px] bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute right-0 top-0 z-10 h-full w-[200px] bg-gradient-to-l from-white to-transparent"></div>

      <div className="flex min-w-full shrink-0 animate-scroll items-center justify-around gap-4 text-4xl md:text-8xl">
        {content}
        {content}
        {content}
        {content}
      </div>
      <div className="flex min-w-full shrink-0 animate-scroll items-center justify-around gap-4 text-4xl md:text-8xl">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
}
