import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

export function NewTenderBarChart({ data }: { data: any }) {
  const chartConfig = {
    amount: {
      label: "金额",
      // color: "hsl(var(--bar-chart-1))",
      color: "rgb(91, 143, 249)",
    },
    total: {
      label: "数量",
      // color: "hsl(var(--bar-chart-2))",
      color: "rgb(90, 216, 166)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-full aspect-auto">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          //   tickFormatter={(value) => {
          //     const date = new Date(value);
          //     return dayjs(date).format("MM月");
          //   }}
        />
        <YAxis
          dataKey="amount"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent indicator="dashed" className="bg-slate-900" />
          }
        />
        <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
