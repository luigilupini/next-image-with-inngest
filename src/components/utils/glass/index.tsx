import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
}>;

export const GlassPane = ({ children, className }: Props) => {
  return (
    <div
      data-testid="glass-pane"
      className={cn("glass rounded-2xl", className)}
    >
      {children}
    </div>
  );
};
