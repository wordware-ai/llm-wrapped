import { shareOptions } from "@/config/share-config";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const ShareButtons = ({ copyLink }: { copyLink?: boolean }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center gap-6">
        {shareOptions
          .filter((option) => option.label !== "Copy Link" || copyLink)
          .map((option, index) => (
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
                <span>{option.label}</span>
              </TooltipContent>
            </Tooltip>
          ))}
      </div>
    </div>
  );
};
