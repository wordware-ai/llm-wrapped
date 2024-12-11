import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DynamicText } from "./dynamic-text";
import { type SVGComponent } from "@/config/svg-config";

export type CardData = {
  bgColor: string;
  fillColor: string;
  svg?: SVGComponent;
};

export type CardComponentProps = {
  result: Record<string, unknown>;
  profileData?: Record<string, string | null>;
};

export type CardItem = {
  id: string;
  card: CardData;
  Component: React.ComponentType<CardComponentProps>;
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 },
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
    <motion.div
      className="flex h-full flex-col justify-end gap-[3vh] text-white sm:gap-[2vh]"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.p
        variants={fadeInUp}
        className="text-[4.5vh] font-semibold leading-tight sm:text-[3.5vh]"
      >
        {title}
      </motion.p>
      <motion.div
        variants={scaleIn}
        style={{ color: valueColor }}
        className="break-words font-semibold italic leading-tight"
      >
        <DynamicText text={String(value)} />
      </motion.div>
      <motion.p
        variants={fadeInUp}
        className="text-[4vh] leading-tight sm:text-[3vh]"
      >
        {description}
      </motion.p>
    </motion.div>
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
    <>
      {imageUrl !== "" && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Image
            src={imageUrl}
            alt={title}
            className="aspect-square rounded-lg object-cover"
            width={200}
            height={200}
          />
        </motion.div>
      )}
    </>
  );

  return (
    <motion.div
      className="flex flex-col gap-[3vh] sm:gap-[2vh]"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div variants={scaleIn} className="flex">
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
      </motion.div>
      <motion.h3
        variants={fadeInUp}
        className="text-[4.5vh] font-semibold leading-tight text-white sm:text-[3.5vh]"
      >
        {title}
      </motion.h3>
      <motion.p
        variants={fadeInUp}
        className="text-[4vh] leading-tight text-white sm:text-[3vh]"
      >
        {description}
      </motion.p>
    </motion.div>
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
    <motion.div
      className="z-10 flex flex-col gap-[3vh] sm:gap-[2vh]"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.h3
        variants={fadeInUp}
        className="text-[4.5vh] font-medium leading-tight text-white sm:text-[3.5vh]"
      >
        {title}
      </motion.h3>
      <motion.p
        variants={fadeInUp}
        className="text-[4vh] leading-tight text-white sm:text-[3vh]"
      >
        {String(description)}
      </motion.p>
    </motion.div>
  );
};

export const TextCard = ({ result }: { result: Record<string, unknown> }) => {
  return (
    <motion.div
      className="flex flex-col gap-[3vh] sm:gap-[2vh]"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <motion.p className="text-[4vh] leading-tight text-white sm:text-[3.5vh]">
        {result.value as string}
      </motion.p>
    </motion.div>
  );
};
