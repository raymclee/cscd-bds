import { Column, ColumnConfig, Tiny } from "@ant-design/plots";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const monthAdded = 34;
const mountAddedAmount = 18;
const lastMonthAdded = 28;
const lastMonthAddedAmount = 15;

const chartData = [
  {
    month: "本月",
    amount: mountAddedAmount,
    total: monthAdded,
  },
  {
    month: "上月",
    amount: lastMonthAddedAmount,
    total: lastMonthAdded,
  },
];

const chartConfig = {
  amount: {
    label: "金額",
    color: "hsl(var(--chart-1))",
  },
  total: {
    label: "數量",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const barConfig = {
  data: [
    {
      name: "金額",
      月份: "本月",
      數量: mountAddedAmount,
    },
    {
      name: "金額",
      月份: "上月",
      數量: lastMonthAddedAmount,
    },
    {
      name: "數量",
      月份: "本月",
      數量: monthAdded,
    },
    {
      name: "數量",
      月份: "上月",
      數量: lastMonthAdded,
    },
  ],
  xField: "月份",
  yField: "數量",
  theme: "classicDark",
  colorField: "name",
  group: true,
  style: {
    inset: 5,
    width: 20,
    // color: "white",
  },
  legend: {
    color: {
      layout: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      },
    },
  },
  //   label: {
  //     fill: "white",
  //   },
  onReady: ({ chart }) => {
    try {
      chart.on("afterrender", () => {
        // chart.emit("legend:filter", {
        //   data: { channel: "color", values: ["London"] },
        // });
      });
    } catch (e) {
      console.error(e);
    }
  },
} satisfies ColumnConfig;

const percent = 0.7;

const monthConfig = {
  percent,
  theme: "classicDark",
  width: 90,
  height: 90,
  color: ["#E8EFF5", "#66AFF4"],
  annotations: [
    {
      type: "text",
      style: {
        text: `${percent * 100}%`,
        x: "50%",
        y: "50%",
        textAlign: "center",
        fontSize: 16,
        fontStyle: "bold",
        fill: "white",
      },
    },
  ],
};

export function NewTenderBoard() {
  return (
    <Card
      className={cn(
        "y h-[17rem] overflow-hidden rounded border border-brand bg-transparent pb-2 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        本月新增商機
      </CardHeader>
      <CardContent className="flex h-full">
        {/* <div className="w-[40%]"><Tiny {...monthConfig} /></div> */}
        {/* <div className="w-[60%]"> */}
        {/* <Column {...barConfig} /> */}
        {/* </div> */}
        <div className="flex w-[40%] flex-col items-center justify-center py-4">
          {/* <AmountChart /> */}
          <Tiny.Ring {...monthConfig} />
          <Tiny.Ring {...monthConfig} />
        </div>
        <Column {...barConfig} />
        {/* <ChartContainer
          config={chartConfig}
          className="h-full w-[60%] pb-6 pt-4"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              label={false}
              content={<ChartTooltipContent indicator="dashed" hideLabel />}
            />
            <Bar dataKey="amount" fill="#3cb8e6" radius={4} />
            <Bar dataKey="total" fill="#66AFF4" radius={4} />
          </BarChart>
        </ChartContainer> */}
      </CardContent>
    </Card>
  );
}

const amountChartData = [
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
];
const amountChartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function AmountChart() {
  return (
    <ChartContainer
      config={amountChartConfig}
      className="mx-auto aspect-square max-h-[100px]"
    >
      <RadialBarChart
        data={amountChartData}
        startAngle={0}
        endAngle={250}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="visitors" background cornerRadius={10} />
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
                      className="fill-foreground text-4xl font-bold"
                    >
                      {amountChartData[0].visitors.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
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
