import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const ShareIcon = ({
  label,
  icon,
  action,
}: {
  label: string;
  icon: React.ReactNode;
  action: (url: string) => void;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => action(window.location.href)}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F6] text-black hover:bg-[#F3F4F6]/80">
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
