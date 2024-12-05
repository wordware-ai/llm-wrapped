import Image from "next/image";
import Link from "next/link";

type CardData = {
  id: string;
  bgColor: string;
  fillColor: string;
};

export type CardComponentProps = {
  result: Record<string, unknown>;
  profileData?: Record<string, string | null>;
};

export type CardItem = {
  data: CardData;
  Component: React.ComponentType<CardComponentProps>;
  Animation?: JSX.Element;
};

export const MetricCard = ({
  title,
  value,
  description,
  valueColor,
}: {
  title: string;
  value: string;
  description: string;
  valueColor?: string;
}) => {
  return (
    <div className="flex h-full flex-col justify-center gap-[3vh] text-white sm:gap-[2vh]">
      <p className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]">
        {title}
      </p>
      <div
        style={{ color: valueColor }}
        className="text-[8vh] font-semibold italic leading-tight sm:text-[8vh]"
      >
        {value}
      </div>
      <p className="text-[4vh] leading-tight sm:text-[3vh]">{description}</p>
    </div>
  );
};

export const ImageCard = ({
  imageUrl,
  url,
  title,
  description,
}: {
  imageUrl: string;
  url?: string;
  title: string;
  description: string;
}) => {
  const ImageComponent = (
    <Image
      src={imageUrl}
      alt={title}
      className="aspect-square rounded-lg object-cover"
      width={200}
      height={200}
    />
  );

  return (
    <div className="flex flex-col gap-[3vh] sm:gap-[2vh]">
      <div className="flex">
        {url ? (
          <Link
            href={url}
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {ImageComponent}
          </Link>
        ) : (
          ImageComponent
        )}
      </div>
      <h3 className="text-[4.5vh] font-semibold leading-tight text-white sm:text-[3.5vh]">
        {title}
      </h3>
      <p className="text-[4vh] leading-tight text-white sm:text-[3vh]">
        {description}
      </p>
    </div>
  );
};

export const TitleCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-[3vh] sm:gap-[2vh]">
      <h3 className="text-[4.5vh] font-semibold leading-tight text-white sm:text-[3.5vh]">
        {title}
      </h3>
      <p className="text-[4vh] leading-tight text-white sm:text-[3vh]">
        {String(description)}
      </p>
    </div>
  );
};

export const TextCard = ({ result }: { result: Record<string, unknown> }) => {
  return (
    <div className="flex flex-col gap-[3vh] sm:gap-[2vh]">
      <p className="text-[4vh] leading-tight text-white sm:text-[3vh]">
        {result.value as string}
      </p>
    </div>
  );
};
