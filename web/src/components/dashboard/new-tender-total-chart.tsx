import dayjs from "dayjs";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "~/components/ui/chart";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { cn } from "~/lib/utils";

export function NewTenderTotalChart({
  height,
  width,
  className,
  short = false,
  monthOffset = 0,
  percentageSize = "large",
}: {
  monthOffset?: number;
  height?: number;
  width?: number;
  className?: string;
  short?: boolean;
  percentageSize?: "small" | "large";
}) {
  const tenders = useAreaTenders();
  const now = dayjs();
  const lastMonthText = now
    .subtract(1 + monthOffset, "month")
    .format("YYYY-MM");
  const thisMonthText = now.subtract(monthOffset, "month").format("YYYY-MM");

  const lastMonth = tenders?.filter((e) =>
    e?.createdAt.includes(lastMonthText),
  );
  const lastMonthCount = lastMonth?.length ?? 0;

  const thisMonth = tenders?.filter((e) =>
    e?.createdAt.includes(thisMonthText),
  );
  const thisMonthCount = thisMonth?.length ?? 0;

  const countPercent =
    isFinite((lastMonthCount || 1) / (thisMonthCount || 1)) &&
    lastMonthCount / thisMonthCount > 1
      ? ((lastMonthCount || 1) / (thisMonthCount || 1)) * 100
      : 0;

  const chartData = [{ countPercent, fill: "var(--color-countPercent)" }];

  const chartConfig = {
    countPercent: {
      color: "hsl(var(--chart-red-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      // className={cn("aspect-square")}
      // className="mx-auto aspect-square max-h-[250px] flex-1"
    >
      <RadialBarChart
        data={chartData}
        // startAngle={90}
        endAngle={(countPercent / 100) * 360}
        innerRadius={80}
        outerRadius={120}
        style={{ height, width }}
        className={className}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-gray-800 last:fill-gray-700"
          //   className="fill-gray-800"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="countPercent" cornerRadius={100} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className={cn(
                        "fill-white font-bold",
                        percentageSize === "large" ? "text-3xl" : "text-2xl",
                      )}
                    >
                      {`${Number(chartData[0].countPercent).toFixed(short ? 0 : 2)}%`}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-gray-400"
                    >
                      百分比
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
