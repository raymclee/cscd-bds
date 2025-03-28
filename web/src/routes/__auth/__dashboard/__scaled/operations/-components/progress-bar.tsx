import { cn } from "~/lib/utils";

export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className="h-2 w-full rounded bg-gray-600">
      <div
        className={cn("h-full rounded bg-brand-project-2", className)}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
