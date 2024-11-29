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
