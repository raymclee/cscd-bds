import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ChartConfig, ChartContainer } from "~/components/ui/chart";
import { Skeleton } from "~/components/ui/skeleton";

const chartConfig = {
  revenue: {
    label: "營業額",
    color: "red",
  },
} satisfies ChartConfig;

function fixAmount(amount: number): number {
  return Number((Math.abs(Number(amount)) / 1.0e4).toFixed(2));
}

export function AgentChart({ chartData }: { chartData: any[] }) {
  return (
    <Card className="pt-4">
      <CardHeader>
        <CardTitle>年度营业额</CardTitle>
        <CardDescription>显示过去6年的总营业额</CardDescription>
      </CardHeader>
      <CardContent className="mt-4 -ml-4">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            // margin={{
            //   left: 12,
            //   right: 12,
            // }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              //   tickCount={}
              tickFormatter={(value) => `${fixAmount(value)}萬`}
            />
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            /> */}
            <Area
              dataKey="revenue"
              type="linear"
              fill="var(--color-brand)"
              fillOpacity={0.4}
              stroke="var(--color-brand)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
