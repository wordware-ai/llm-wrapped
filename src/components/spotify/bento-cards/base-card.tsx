import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type CardWrapperProps = {
  children: React.ReactNode;
  gridConfig: {
    colSpan: number;
    rowSpan: number;
  };
  theme: {
    backgroundColor: string;
    textColor: string;
  };
  className?: string;
};

export function CardWrapper({
  children,
  gridConfig,
  theme,
  className,
}: CardWrapperProps) {
  console.log({
    rowSpan: gridConfig.rowSpan,
    colSpan: gridConfig.colSpan,
  });
  return (
    <Card
      className={cn(
        `col-span-${gridConfig.colSpan}`,
        `row-span-${gridConfig.rowSpan}`,
        theme.backgroundColor,
        theme.textColor,
        className,
      )}
    >
      {children}
    </Card>
  );
}
