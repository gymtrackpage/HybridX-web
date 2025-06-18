import { cn } from "@/lib/utils";

interface DecorativeXProps {
  className?: string;
  strokeWidth?: number;
}

export function DecorativeX({ className, strokeWidth = 1 }: DecorativeXProps) {
  return (
    <svg
      className={cn(
        "absolute text-primary/10 dark:text-primary/5 pointer-events-none",
        className
      )}
      fill="none"
      viewBox="0 0 50 50" // Using a smaller viewBox for potentially sharper lines when scaled up
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      preserveAspectRatio="none" // Allows non-uniform scaling
    >
      <line x1="0" y1="0" x2="50" y2="50" />
      <line x1="0" y1="50" x2="50" y2="0" />
    </svg>
  );
}
