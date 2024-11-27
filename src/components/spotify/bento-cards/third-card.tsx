import Image from "next/image";

export default function FirstCard({ content }: { content?: string }) {
  return (
    <div className="relative flex h-[400px] items-center justify-center overflow-hidden rounded-xl border-2 bg-[#B723F1] md:h-full md:w-1/2">
      <p className="z-10 p-8 text-center text-4xl font-semibold text-white [text-shadow:_-0.75px_-0.75px_0_#000,_0.75px_-0.75px_0_#000,_-0.75px_0.75px_0_#000,_0.75px_0.75px_0_#000]">
        {content}
      </p>
      <Image
        src="/blobs/blob33.svg"
        className="absolute bottom-0 left-0 h-max -rotate-45"
        alt="blob"
        width={400}
        height={400}
      />
      {/* <Image
        src="/blobs/blob31.svg"
        className="absolute bottom-0 right-0"
        alt="blob"
        width={400}
        height={400}
      />
      <Image
        src="/blobs/blob312.svg"
        className="absolute right-0 top-0"
        alt="blob"
        width={400}
        height={400}
      /> */}
    </div>
  );
}
