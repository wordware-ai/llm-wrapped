import { cn } from "@/lib/utils";

export const StreamedText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return <div className={cn("text-2xl text-white", className)}>{text}</div>;
};
