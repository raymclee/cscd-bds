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
  periods,
  height,
  width,
  className,
  short = false,
}: {
  periods: [string, string];
  height?: number;
  width?: number;
  className?: string;
  short?: boolean;
}) {
  const tenders = useAreaTenders();

  const lastMontDateFormat = periods[0];
  const lastMonth = tenders?.filter((e) =>
    e?.createdAt.includes(lastMontDateFormat),
  );
  const lastMonthCount = lastMonth?.length ?? 0;

  const thisMonthDateFormat = periods[1];
  const thisMonth = tenders?.filter((e) =>
    e?.createdAt.includes(thisMonthDateFormat),
  );
  const thisMonthCount = thisMonth?.length ?? 0;

  const countPercent = isFinite(lastMonthCount / thisMonthCount)
    ? (lastMonthCount / thisMonthCount) * 100
    : 0;

  const chartData = [{ countPercent, fill: "var(--color-countPercent)" }];

  const chartConfig = {
    countPercent: {
      color: "green",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("aspect-square")}
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
                      className="text-3xl font-bold fill-white"
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
