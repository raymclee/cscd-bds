import { Card, CardContent, CardHeader } from "../ui/card";
import headerSvg from "~/assets/dashboard/svg/sub-head-new-tender.svg";
import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { fixAmount } from "~/lib/helper";

export function TenderAddedCard() {
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
  const lastMonthTotal = lastMonthTenders?.length ?? 0;
  const thisMonthAmount = thisMonthTenders?.reduce(
    (acc, cur) => acc + (cur?.estimatedAmount ?? 0),
    0,
  );
  const thisMonthTotal = thisMonthTenders?.length ?? 0;

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

  const chartData = [
    {
      month: "上月",
      amount: fixAmount(lastMonthAmount),
      total: lastMonthTotal,
    },
    {
      month: "本月",
      amount: fixAmount(thisMonthAmount),
      total: thisMonthTotal,
    },
  ];

  return (
    <Card className="h-56 text-white border-none bg-slate-950/60 backdrop-blur">
      <CardHeader>
        <img
          src={headerSvg}
          alt="sub-head"
          className="w-full h-8 select-none"
        />
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer
          config={chartConfig}
          //   className="aspect-auto h-32 w-full max-w-[85%]"
          className="w-full h-32"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -12,
            }}
            maxBarSize={20}
          >
            {/* <CartesianGrid horizontal={false} /> */}
            <XAxis
              dataKey="amount"
              type="number"
              //   tickLine={false}
              //   tickMargin={10}
              //   axisLine={false}
              hide
            />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  className="bg-slate-900"
                />
              }
            />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={4}>
              <LabelList
                dataKey="amount"
                position="insideLeft"
                className="fill-white"
                // offset={8}
                // fontSize={12}
              />
            </Bar>
            <Bar dataKey="total" fill="var(--color-total)" radius={4}>
              <LabelList
                dataKey="total"
                position="insideLeft"
                className="fill-white"
                // offset={8}
                // fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
