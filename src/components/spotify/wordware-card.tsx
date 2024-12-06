"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import ShareButton from "../share";

export default function WordwareCard({
  children,
  Animation,
  fillColor,
  backgroundColor,
  className,
  hideShare = false,
  hideHashtag = false,
}: {
  children: ReactNode;
  Animation?: JSX.Element;
  fillColor?: string;
  backgroundColor?: string;
  className?: string;
  hideShare?: boolean;
  hideHashtag?: boolean;
}) {
  const baseClasses = cn(
    "relative flex aspect-[4/7] items-center overflow-hidden rounded-lg p-8",
    className,
  );

  return (
    <div
      className={cn(baseClasses, "bg-[#1A1A1A]")}
      style={{ backgroundColor }}
    >
      {Animation && <div className="z-10">{Animation}</div>}
      <div
        className={cn(
          "absolute left-0 top-0 w-full gap-[7px] px-2",
          "flex flex-col",
        )}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <WordwareLogo key={i} fillColor={fillColor} />
        ))}
      </div>
      <div className="z-10 flex h-full flex-col justify-between">
        {!hideHashtag && <p className="text-[2.5vh] text-white">#LLMwrapped</p>}
        <div className="flex flex-col gap-20">
          {children}
          {!hideShare && (
            <div
              className={cn("flex w-full items-center justify-center")}
              onClick={(e) => e.stopPropagation()}
            >
              <ShareButton className="text-white hover:text-white/80">
                Share
              </ShareButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WordwareLogo({ fillColor }: { fillColor?: string }) {
  return (
    <svg
      width="275"
      height="44"
      viewBox="0 0 275 44"
      xmlns="http://www.w3.org/2000/svg"
      className="h-min w-full"
      style={{ fill: fillColor ?? "#000000" }}
    >
      <g clipPath="url(#clip0_7_154)">
        <path d="M72.8159 13.708C70.3883 12.3222 67.6459 11.6248 64.5888 11.6248C61.5317 11.6248 58.7803 12.3222 56.3347 13.708C53.889 15.0938 51.9468 16.9982 50.5172 19.4033C49.0876 21.8174 48.3683 24.5801 48.3683 27.6915C48.3683 30.8029 49.0966 33.521 50.5442 35.9529C51.9918 38.3848 53.9429 40.3071 56.3886 41.7108C58.8343 43.1145 61.5677 43.8208 64.5798 43.8208C67.5919 43.8208 70.2714 43.1324 72.717 41.7376C75.1627 40.3518 77.1138 38.4384 78.5615 36.0155C80.0091 33.5836 80.7374 30.8119 80.7374 27.7005C80.7374 24.589 80.0181 21.8263 78.5884 19.4123C77.1588 16.9982 75.2256 15.1028 72.798 13.7169L72.8159 13.708ZM72.762 32.913C71.9438 34.4508 70.8198 35.6578 69.4082 36.534C67.9965 37.4102 66.3871 37.8483 64.5978 37.8483C62.8085 37.8483 61.19 37.4102 59.7514 36.534C58.3218 35.6578 57.1888 34.4508 56.3706 32.913C55.5524 31.3752 55.1388 29.6406 55.1388 27.7005C55.1388 25.7603 55.5524 24.0436 56.3706 22.5416C57.1888 21.0395 58.3218 19.8414 59.7514 18.9563C61.181 18.0622 62.7995 17.6152 64.5978 17.6152C66.3961 17.6152 67.9965 18.0622 69.4082 18.9563C70.8198 19.8504 71.9348 21.0485 72.762 22.5416C73.5802 24.0436 73.9938 25.7603 73.9938 27.7005C73.9938 29.6406 73.5802 31.3752 72.762 32.913Z" />
        <path d="M94.2773 13.2506C93.8907 13.4742 93.54 13.7335 93.2074 14.0285C92.56 14.6097 91.526 14.1805 91.526 13.3043C91.526 12.75 91.0764 12.3119 90.5279 12.3119H86.3469C85.7894 12.3119 85.3488 12.7589 85.3488 13.3043V42.1386C85.3488 42.6929 85.7984 43.131 86.3469 43.131H90.8156C91.3731 43.131 91.8137 42.684 91.8137 42.1386V25.3566C91.8137 22.9604 92.4701 21.1007 93.7918 19.7685C95.1135 18.4363 96.8399 17.7747 98.9799 17.7747H100.67C101.228 17.7747 101.668 17.3277 101.668 16.7823V12.902C101.668 12.3476 101.219 11.9095 100.67 11.9095H99.7801C97.6401 11.9095 95.8059 12.3566 94.2773 13.2506Z" />
        <path d="M128.71 13.2325C128.71 14.1713 127.64 14.7077 126.885 14.1534C126.364 13.7689 125.797 13.4113 125.186 13.1073C123.253 12.1238 121.068 11.6231 118.622 11.6231C115.682 11.6231 113.038 12.3295 110.683 13.7332C108.336 15.1369 106.484 17.0592 105.126 19.4911C103.768 21.923 103.094 24.6589 103.094 27.6988C103.094 30.7387 103.768 33.4746 105.126 35.9065C106.484 38.3384 108.336 40.2697 110.683 41.6913C113.029 43.1129 115.673 43.8281 118.622 43.8281C121.032 43.8281 123.217 43.3364 125.186 42.3439C125.887 41.9953 126.526 41.584 127.11 41.119C127.874 40.5111 128.998 41.0207 128.998 41.9953C128.998 42.6301 129.511 43.1397 130.149 43.1397H134.033C134.672 43.1397 135.184 42.6301 135.184 41.9953V1.14443C135.184 0.50963 134.672 0 134.033 0H129.861C129.223 0 128.71 0.50963 128.71 1.14443V13.2325ZM127.479 32.9113C126.66 34.4492 125.536 35.6562 124.125 36.5324C122.713 37.4086 121.104 37.8467 119.314 37.8467C117.525 37.8467 115.844 37.4086 114.414 36.5324C112.984 35.6562 111.861 34.4492 111.06 32.9113C110.26 31.3735 109.855 29.639 109.855 27.6988C109.855 25.7586 110.26 24.042 111.06 22.5399C111.861 21.0379 112.993 19.8398 114.441 18.9546C115.889 18.0605 117.516 17.6135 119.314 17.6135C121.113 17.6135 122.713 18.0516 124.125 18.9278C125.536 19.804 126.651 21.011 127.479 22.5489C128.297 24.0867 128.71 25.8033 128.71 27.7077C128.71 29.6121 128.297 31.3824 127.479 32.9203V32.9113Z" />
        <path d="M170.224 28.763L165.063 13.3936C164.847 12.7499 164.236 12.3118 163.552 12.3118H159.938C159.254 12.3118 158.643 12.7499 158.427 13.3936L153.221 28.7719C152.736 30.2114 150.677 30.2114 150.2 28.763L145.111 13.4026C144.895 12.7499 144.284 12.3118 143.6 12.3118H140.103C139.006 12.3118 138.241 13.3847 138.601 14.4129L148.168 42.0759C148.393 42.7107 148.995 43.1399 149.67 43.1399H153.284C153.967 43.1399 154.579 42.7018 154.795 42.058L160.225 25.7767C160.711 24.3283 162.761 24.3283 163.247 25.7767L168.677 42.058C168.893 42.7018 169.505 43.1399 170.188 43.1399H173.749C174.423 43.1399 175.034 42.7107 175.25 42.0759L184.862 14.4129C185.222 13.3847 184.448 12.3118 183.36 12.3118H179.872C179.188 12.3118 178.577 12.7499 178.361 13.3936L173.236 28.763C172.751 30.2114 170.701 30.2114 170.215 28.763H170.224Z" />
        <path d="M31.7127 28.763L26.5516 13.3936C26.3358 12.7499 25.7244 12.3118 25.0411 12.3118H21.4265C20.7432 12.3118 20.1318 12.7499 19.916 13.3936L14.7099 28.7719C14.2244 30.2114 12.1654 30.2114 11.6888 28.763L6.59966 13.4026C6.38387 12.7499 5.77245 12.3118 5.0891 12.3118H1.59143C0.494481 12.3118 -0.269789 13.3847 0.0898682 14.4129L9.65675 42.0759C9.88153 42.7107 10.484 43.1399 11.1583 43.1399H14.7729C15.4562 43.1399 16.0676 42.7018 16.2834 42.058L21.7142 25.7767C22.1998 24.3283 24.2498 24.3283 24.7354 25.7767L30.1662 42.058C30.382 42.7018 30.9934 43.1399 31.6768 43.1399H35.2374C35.9117 43.1399 36.5231 42.7107 36.7389 42.0759L46.3508 14.4129C46.7104 13.3847 45.9372 12.3118 44.8492 12.3118H41.3605C40.6772 12.3118 40.0658 12.7499 39.85 13.3936L34.7248 28.763C34.2393 30.2114 32.1893 30.2114 31.7037 28.763H31.7127Z" />
        <path d="M234.008 13.2506C233.622 13.4742 233.271 13.7335 232.938 14.0285C232.291 14.6097 231.257 14.1805 231.257 13.3043C231.257 12.75 230.807 12.3119 230.259 12.3119H226.078C225.52 12.3119 225.08 12.7589 225.08 13.3043V42.1386C225.08 42.6929 225.529 43.131 226.078 43.131H230.547C231.104 43.131 231.545 42.684 231.545 42.1386V25.3566C231.545 22.9604 232.201 21.1007 233.523 19.7685C234.845 18.4363 236.571 17.7747 238.711 17.7747H240.401C240.959 17.7747 241.399 17.3277 241.399 16.7823V12.902C241.399 12.3476 240.95 11.9095 240.401 11.9095H239.511C237.371 11.9095 235.537 12.3566 234.008 13.2506Z" />
        <path d="M273.503 20.8593C272.837 19.0711 271.866 17.4886 270.607 16.1027C269.349 14.7169 267.802 13.6261 265.968 12.8304C264.134 12.0346 262.03 11.6323 259.665 11.6323C256.797 11.6323 254.207 12.3297 251.896 13.7155C249.585 15.1014 247.76 16.9879 246.42 19.384C245.081 21.7802 244.415 24.534 244.415 27.6454C244.415 30.7568 245.081 33.4301 246.42 35.8799C247.76 38.3297 249.612 40.2699 251.977 41.6915C254.342 43.1131 257.075 43.8284 260.168 43.8284C262.308 43.8284 264.268 43.4976 266.04 42.827C267.82 42.1654 269.34 41.2623 270.625 40.1179C271.408 39.4205 272.064 38.6695 272.594 37.8648C273.134 37.0422 272.846 35.9425 271.965 35.5044L269.456 34.2527C268.755 33.904 267.919 34.1096 267.433 34.7266C266.759 35.567 265.968 36.2823 265.042 36.8724C263.747 37.7039 262.137 38.1241 260.231 38.1241C258.433 38.1241 256.824 37.686 255.385 36.8098C253.955 35.9336 252.84 34.7176 252.058 33.1619C251.815 32.688 251.626 32.1784 251.474 31.6509C251.186 30.6048 251.959 29.5677 253.047 29.5677H272.801C273.637 29.5677 274.366 28.9329 274.429 28.1014C274.429 28.1014 274.429 28.0924 274.429 28.0835C274.465 27.556 274.483 27.0374 274.483 26.5457C274.483 24.534 274.15 22.6296 273.476 20.8503L273.503 20.8593ZM252.049 21.9948C252.777 20.4033 253.802 19.1784 255.142 18.3201C256.482 17.4618 257.983 17.0415 259.665 17.0415C261.346 17.0415 262.893 17.4707 264.187 18.3201C265.482 19.1695 266.444 20.3318 267.056 21.7981C267.137 21.9858 267.209 22.1825 267.263 22.3792C267.586 23.4074 266.777 24.4446 265.689 24.4446H253.461C252.301 24.4446 251.492 23.2644 251.941 22.2004C251.968 22.1289 252.004 22.0574 252.031 21.9948H252.049Z" />
        <path d="M211.989 13.4044C211.989 14.3432 210.919 14.8796 210.164 14.3253C209.642 13.9408 209.076 13.5832 208.464 13.2792C206.531 12.2957 204.346 11.795 201.901 11.795C198.961 11.795 196.317 12.5013 193.961 13.9051C191.615 15.3088 189.762 17.2311 188.405 19.663C187.047 22.0949 186.373 24.8308 186.373 27.8707C186.373 30.9106 187.047 33.6465 188.405 36.0784C189.762 38.5103 191.615 40.4415 193.961 41.8631C196.308 43.2847 198.952 44 201.901 44C204.31 44 206.495 43.5083 208.464 42.5158C209.166 42.1671 209.804 41.7559 210.389 41.2909C211.153 40.6829 212.277 41.1926 212.277 42.1671C212.277 42.8019 212.789 43.3116 213.428 43.3116H217.312C217.95 43.3116 218.463 42.8019 218.463 42.1671V13.3865C218.463 12.7517 217.95 12.2421 217.312 12.2421H213.14C212.502 12.2421 211.989 12.7517 211.989 13.3865V13.4044ZM210.757 33.0743C209.939 34.6121 208.815 35.8191 207.403 36.6953C205.992 37.5715 204.382 38.0096 202.593 38.0096C200.804 38.0096 199.122 37.5715 197.693 36.6953C196.263 35.8191 195.139 34.6121 194.339 33.0743C193.539 31.5364 193.134 29.8019 193.134 27.8617C193.134 25.9216 193.539 24.2049 194.339 22.7029C195.139 21.2008 196.272 20.0027 197.72 19.1176C199.167 18.2235 200.795 17.7765 202.593 17.7765C204.391 17.7765 205.992 18.2146 207.403 19.0908C208.815 19.967 209.93 21.174 210.757 22.7118C211.575 24.2496 211.989 25.9663 211.989 27.8707C211.989 29.7751 211.575 31.5454 210.757 33.0832V33.0743Z" />
      </g>
      <defs>
        <clipPath id="clip0_7_154">
          <rect width="275" height="44" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
