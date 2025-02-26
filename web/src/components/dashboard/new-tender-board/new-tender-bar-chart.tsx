import dayjs from "dayjs";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { fixAmount } from "~/lib/helper";

export function NewTenderBarChart() {
  const tenders = useAreaTenders();

  const now = dayjs();
  const lastMonthText = now.subtract(1, "month").format("YYYY-MM");
  const thisMonthText = now.format("YYYY-MM");

  const lastMonthTenders = tenders?.filter((e) =>
    e?.createdAt.includes(lastMonthText),
  );
  const thisMonthTenders = tenders?.filter((e) =>
    e?.createdAt.includes(thisMonthText),
  );

  const lastMonthAmount = lastMonthTenders?.reduce(
    (acc, cur) => acc + (cur?.estimatedAmount ?? 0),
    0,
  );
  const lastMonthCount = lastMonthTenders?.length ?? 0;
  const thisMonthAmount = thisMonthTenders?.reduce(
    (acc, cur) => acc + (cur?.estimatedAmount ?? 0),
    0,
  );
  const thisMonthCount = thisMonthTenders?.length ?? 0;

  const chartConfig = {
    amount: {
      label: "金额(亿元)",
      // color: "hsl(var(--bar-chart-1))",
      color: "rgb(91, 143, 249)",
    },
    total: {
      label: "数量(个)",
      // color: "hsl(var(--bar-chart-2))",
      color: "rgb(90, 216, 166)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-full">
      <BarChart
        accessibilityLayer
        data={[
          {
            month: "上月",
            amount: fixAmount(lastMonthAmount),
            total: lastMonthCount,
          },
          {
            month: "本月",
            amount: fixAmount(thisMonthAmount),
            total: thisMonthCount,
          },
        ]}
      >
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
