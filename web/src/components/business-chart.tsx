import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const chartData = [
  { month: "January", desktop: Math.floor(Math.random() * 500) },
  { month: "February", desktop: Math.floor(Math.random() * 500) },
  { month: "March", desktop: Math.floor(Math.random() * 500) },
  { month: "April", desktop: Math.floor(Math.random() * 500) },
  { month: "May", desktop: Math.floor(Math.random() * 500) },
  { month: "June", desktop: Math.floor(Math.random() * 500) },
];

const chartConfig = {
  desktop: {
    label: "对手",
    color: "var(--brand)",
  },
} satisfies ChartConfig;

export function BusinessChart({ className }: { className?: string }) {
  return (
    <ChartContainer config={chartConfig} className={className}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="desktop"
          type="linear"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
