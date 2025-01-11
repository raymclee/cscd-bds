import { motion } from "motion/react";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Minus, X } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "~/components/ui/chart";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  PolarGrid,
  RadialBarChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { fixAmount } from "~/lib/helper";
import { NewTenderAmountChart } from "./new-tender-amount-chart";
import { NewTenderTotalChart } from "./new-tender-total-chart";
import dayjs, { Dayjs } from "dayjs";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);
const MotionMinus = motion.create(Minus);

export function NewTenderBoardMore() {
  const now = dayjs();

  const thisMonthAmountPeriods = [now, now.subtract(1, "month")] as [
    Dayjs,
    Dayjs,
  ];

  const lastMonthAmountPeriods = [
    now.subtract(1, "month"),
    now.subtract(2, "month"),
  ] as [Dayjs, Dayjs];

  const thisMountTotalPeriods = [now, now.subtract(1, "month")] as [
    Dayjs,
    Dayjs,
  ];

  const lastMonthTotalPeriods = [
    now.subtract(1, "month"),
    now.subtract(2, "month"),
  ] as [Dayjs, Dayjs];

  return (
    <>
      <div className="fixed bottom-32 left-0 right-0 top-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur"
          onClick={() => {
            useMapStore.setState({ moreNewTenderBoardVisible: false });
          }}
        ></motion.div>

        <motion.button
          layoutId="new-tender-board-more-icon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute right-6 top-6 cursor-pointer rounded-full border-2 border-gray-600 p-1 text-white hover:bg-gray-600"
          onClick={() => {
            useMapStore.setState({ moreNewTenderBoardVisible: false });
          }}
        >
          <X size={14} />
        </motion.button>

        <MotionCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          layoutId="new-tender-board"
          className={cn(
            "mx-4 flex w-[clamp(90%,90%,1800px)] flex-col items-stretch justify-center overflow-hidden rounded border border-transparent bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <MotionCardContent className="my-auto grid h-[95vh] grid-cols-[1fr_1fr_2.5fr] gap-4 p-4">
            <div className="flex h-full flex-col overflow-hidden rounded border border-brand">
              <div className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 px-3 py-2 font-bold text-white">
                金額佔比
              </div>

              <div className="flex flex-1 pt-4">
                <div className={cn("flex h-full w-full flex-1 flex-col gap-4")}>
                  <div className="px-4 py-2 font-bold text-white">
                    {thisMonthAmountPeriods[0].format("M月")} 與{" "}
                    {thisMonthAmountPeriods[1].format("M月")} 對比
                  </div>

                  <div className="text-center">
                    <NewTenderAmountChart periods={thisMonthAmountPeriods} />
                    <span className="text-gray-400">金额占比变化</span>
                  </div>
                </div>
              </div>

              {/* <Divider className="w-[80%] bg-slate-600" /> */}
              <div className="mx-auto mb-8 h-px w-[90%] bg-slate-700"></div>

              <div className="flex flex-1">
                <div className={cn("flex h-full w-full flex-1 flex-col gap-4")}>
                  <div className="px-4 py-2 font-bold text-white">
                    {lastMonthAmountPeriods[0].format("M月")} 與{" "}
                    {lastMonthAmountPeriods[1].format("M月")} 對比
                  </div>

                  <div className="text-center">
                    <NewTenderAmountChart periods={lastMonthAmountPeriods} />
                    <span className="text-gray-400">金额占比变化</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col overflow-hidden rounded border border-brand">
              <div className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 px-3 py-2 font-bold text-white">
                數量佔比
              </div>

              <div className="flex flex-1 pt-4">
                <div className="flex w-full flex-1 flex-col gap-4">
                  <div className="px-4 py-2 font-bold text-white">
                    {thisMountTotalPeriods[0].format("M月")} 與{" "}
                    {thisMountTotalPeriods[1].format("M月")} 對比
                  </div>

                  <div className="text-center">
                    <NewTenderTotalChart periods={thisMountTotalPeriods} />
                    <span className="text-gray-400">数量占比变化</span>
                  </div>
                </div>
              </div>

              {/* <Divider className="w-[80%] bg-slate-600" /> */}
              <div className="mx-auto mb-8 h-px w-[90%] bg-slate-700"></div>

              <div className="flex flex-1">
                <div className="flex h-full w-full flex-1 flex-col gap-4">
                  <div className="px-4 py-2 font-bold text-white">
                    {lastMonthTotalPeriods[0].format("M月")} 與{" "}
                    {lastMonthTotalPeriods[1].format("M月")} 對比
                  </div>

                  <div className="text-center">
                    <NewTenderTotalChart periods={lastMonthTotalPeriods} />
                    <span className="text-gray-400">数量占比变化</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col gap-4">
              <div className="flex-1 overflow-hidden rounded border border-brand">
                <div className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 px-3 py-2 font-bold text-white">
                  月度數量金額對比數據
                </div>

                <div className="relative flex h-full items-center justify-center pr-6">
                  <MonthlyAmountChart />
                </div>
              </div>

              <div className="flex-1 overflow-hidden rounded border border-brand">
                <div className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 px-3 py-2 font-bold text-white">
                  本月度數量金額對比數據
                </div>

                <div className="relative flex h-full items-center justify-center px-6">
                  <DailyTotalChart />
                </div>
              </div>
            </div>
          </MotionCardContent>
        </MotionCard>
      </div>
    </>
  );
}

function MonthlyAmountChart() {
  const tenders = useAreaTenders();
  const now = dayjs();

  const data = Array.from({ length: 12 }).map((_, index) => {
    const month = now.subtract(index, "month");
    const monthTenders = tenders?.filter((e) =>
      e?.createdAt.includes(month.format("YYYY-MM")),
    );
    const monthAmount = fixAmount(
      monthTenders?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
    );
    const monthCount = monthTenders?.length ?? 0;

    return {
      month: index === 0 ? "本月" : index === 1 ? "上月" : month.format("M月"),
      amount: monthAmount,
      total: monthCount,
    };
  });

  const chartConfig = {
    amount: {
      label: "金额(亿)",
      color: "hsl(var(--bar-chart-1))",
    },
    total: {
      label: "数量(个)",
      color: "hsl(var(--bar-chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="my-auto h-[340px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid
          vertical={false}
          horizontalFill={["#555555", "#444444"]}
          fillOpacity={0.4}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
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

function DailyTotalChart() {
  const areaTenders = useAreaTenders();
  const now = dayjs();

  const data = Array.from({ length: now.daysInMonth() }).map((_, index) => {
    const day = now.date(index + 1);

    const dayTenders = areaTenders?.filter((e) =>
      e?.createdAt.includes(day.format("YYYY-MM-DD")),
    );

    const dayAmount = fixAmount(
      dayTenders?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
    );
    const dayCount = dayTenders?.length ?? 0;

    return {
      day: `${day.format("D")}`,
      amount: dayAmount,
      total: dayCount,
    };
  });

  const chartConfig = {
    amount: {
      label: "金额(亿)",
      color: "hsl(var(--bar-chart-1))",
    },
    total: {
      label: "数量(个)",
      color: "hsl(var(--bar-chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="my-auto h-[340px] w-full">
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid
          vertical={false}
          horizontalFill={["#555555", "#444444"]}
          fillOpacity={0.4}
        />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
          className="bg-white fill-white stroke-orange-500 text-white"
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent indicator="dashed" className="bg-slate-900" />
          }
        />
        <Area
          dataKey="amount"
          type="natural"
          fill="var(--color-amount)"
          fillOpacity={0.4}
          stroke="var(--color-amount)"
          stackId="a"
        />
        <Area
          dataKey="total"
          type="natural"
          fill="var(--color-total)"
          fillOpacity={0.4}
          stroke="var(--color-total)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
