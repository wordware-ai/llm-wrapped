import { cn } from "@/lib/utils";
import { useLottie, type LottieOptions } from "lottie-react";

interface Animation1Props {
  animationData: LottieOptions["animationData"];
  className?: string;
}

export const Animation = ({ animationData, className }: Animation1Props) => {
  const options: LottieOptions = {
    animationData,
    loop: false,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return <div className={cn("absolute", className)}>{View}</div>;
};
