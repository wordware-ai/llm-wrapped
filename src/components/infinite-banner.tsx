import React from "react";

export default function InfiniteBanner() {
  const content = (
    <>
      <span className="text-black">This is a</span>
      <span className="font-bold"> WordApp</span>
      <span className="text-gray-300"> - Wordware - </span>
    </>
  );

  return (
    <div className="relative flex w-full overflow-hidden bg-white py-8">
      <div className="animate-scroll flex min-w-full shrink-0 items-center justify-around gap-4 text-4xl md:text-6xl">
        {content}
        {content}
        {content}
        {content}
      </div>
      <div className="animate-scroll flex min-w-full shrink-0 items-center justify-around gap-4 text-4xl md:text-6xl">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
} 