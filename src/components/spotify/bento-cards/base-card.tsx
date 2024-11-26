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
  return (
    <Card
      className={cn(
        `col-span-${gridConfig.colSpan}`.replace("col-span-", "col-span-"),
        `row-span-${gridConfig.rowSpan}`.replace("row-span-", "row-span-"),
        theme.backgroundColor,
        theme.textColor,
        className,
      )}
    >
      {children}
    </Card>
  );
}
