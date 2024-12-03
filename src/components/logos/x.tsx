import { cn } from "@/lib/utils";

export function XLogo({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.2019 2H30.1087L19.3887 14.2841L32 31H22.1254L14.3913 20.8619L5.54174 31H0.631901L12.0981 17.8608L0 2H10.1252L17.1162 11.2666L25.2019 2ZM23.4797 28.0554H26.1987L8.64785 4.78995H5.73013L23.4797 28.0554Z"
        fill="currentColor"
      />
    </svg>
  );
}
