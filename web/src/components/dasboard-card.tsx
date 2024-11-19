import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";

export function DashboardCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "h-[clamp(17rem,30dvh,17rem)] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        className,
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        {title}
      </CardHeader>
      <CardContent className="h-full">{children}</CardContent>
    </Card>
  );
}
