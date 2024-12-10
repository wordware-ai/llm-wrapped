import { shareOptions } from "@/config/share-config";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const ShareButtons = () => {
  return (
    <div className="flex justify-center gap-6">
      {shareOptions.map((option, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <button
              onClick={() => option.action(window.location.href)}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3F4F6] text-black hover:bg-[#F3F4F6]/80">
                {option.icon}
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Share on {option.label}</span>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
