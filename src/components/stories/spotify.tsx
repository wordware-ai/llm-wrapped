import React from "react";
import Image from "next/image";
export function SpotifyStorys() {
  return (
    <div className="flex flex-col gap-4 pt-12 sm:flex-row sm:gap-6 md:flex-col md:gap-4 lg:flex-row lg:gap-6">
      <div className="flex flex-col gap-2">
        <p>Spotify</p>
        <div className="flex items-center gap-4">
          <Image
            src="/images/kamil.png"
            alt="Kamil"
            width={200}
            height={200}
            className="aspect-square h-20 w-20 rounded-full object-cover"
          />
          <Image
            src="/images/kamil.png"
            alt="Kamil"
            width={200}
            height={200}
            className="aspect-square h-20 w-20 rounded-full object-cover"
          />
          <Image
            src="/images/kamil.png"
            alt="Kamil"
            width={200}
            height={200}
            className="aspect-square h-20 w-20 rounded-full object-cover"
          />
          <Image
            src="/images/kamil.png"
            alt="Kamil"
            width={200}
            height={200}
            className="aspect-square h-20 w-20 rounded-full object-cover"
          />
          <Image
            src="/images/kamil.png"
            alt="Kamil"
            width={200}
            height={200}
            className="aspect-square h-20 w-20 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
