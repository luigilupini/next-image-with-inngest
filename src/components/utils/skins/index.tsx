import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  shape?: "big" | "small" | "dot";
  mask?: boolean;
};

export function Background({ className, shape = "dot", mask = true }: Props) {
  return (
    <div
      data-testid="background"
      className={cn("absolute inset-0 -z-10 ", className, {
        "bg-dot-black/[0.2] dark:bg-dot-white/[0.2]": shape === "dot",
        "bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.2]": shape === "small", // prettier-ignore
        "bg-grid-black/[0.2] dark:bg-grid-white/[0.2]": shape === "big",
      })}
    >
      {mask && <GradientMask />}
    </div>
  );
}

const GradientMask = () => (
  <div className="pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background)))]" />
);
