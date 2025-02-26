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
import { fixAmount } from "~/lib/helper";
import { cn } from "~/lib/utils";

export function NewTenderAmountChart({
  className,
  height,
  width,
  short = false,
  monthOffset = 0,
  percentageSize = "large",
}: {
  className?: string;
  height?: number;
  width?: number;
  short?: boolean;
  monthOffset?: number;
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
  const lastMonthAmount = fixAmount(
    lastMonth?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
  );

  const thisMonth = tenders?.filter((e) =>
    e?.createdAt.includes(thisMonthText),
  );
  const thisMonthAmount = fixAmount(
    thisMonth?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
  );

  const amountDiff = thisMonthAmount - lastMonthAmount;
  const amountPercent = (amountDiff / (lastMonthAmount || 1)) * 100;

  // const amountPercent =
  //   isFinite((thisMonthAmount || 1) / (lastMonthAmount || 1)) &&
  //   thisMonthAmount / lastMonthAmount > 0
  //     ? ((thisMonthAmount || 1) / (lastMonthAmount || 1)) * 100
  //     : 0;

  const chartData = [{ amountPercent, fill: "var(--color-amountPercent)" }];

  const chartConfig = {
    amountPercent: {
      color: "hsl(var(--bar-chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      // className={cn("aspect-square")}
      // className={
      //   cn("w-[60px] w-auto items-center")
      //   // "aspect-square h-full max-h-[250px] w-full flex-1",

      //   // className,
      // }
    >
      <RadialBarChart
        data={chartData}
        // startAngle={90}
        endAngle={(amountPercent / 100) * 360}
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
        <RadialBar dataKey="amountPercent" cornerRadius={100} />
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
                      {`${Number(chartData[0].amountPercent).toFixed(short ? 0 : 2)}%`}
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
