import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const ShareIcon = ({
  label,
  icon,
  action,
  size = "size-10",
}: {
  label: string;
  icon: React.ReactNode;
  action: (url: string) => void;
  size?: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => action(window.location.href)}
          className="flex flex-col items-center gap-2"
        >
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-[#F3F4F6] text-black hover:bg-[#F3F4F6]/80",
              size,
            )}
          >
            {icon}
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{label}</span>
      </TooltipContent>
    </Tooltip>
  );
};
