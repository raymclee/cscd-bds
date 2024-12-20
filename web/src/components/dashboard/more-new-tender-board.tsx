import { motion } from "motion/react";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Minus } from "lucide-react";
import { ChartConfig, ChartContainer } from "~/components/ui/chart";
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  PolarGrid,
  RadialBarChart,
} from "recharts";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { fixAmount } from "~/lib/helper";
import { Divider } from "antd";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);
const MotionMinus = motion.create(Minus);

export function MoreNewTenderBoard() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
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

        <MotionCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          layoutId="new-tender-board"
          className={cn(
            "mx-4 block h-[90vh] w-[clamp(400px,90vw,1800px)] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <div className="flex items-center justify-between">
              <motion.span layoutId="new-tender-board-title">
                月度商机
              </motion.span>
              <MotionMinus
                layoutId="new-tender-board-icon"
                className="cursor-pointer"
                onClick={() => {
                  useMapStore.setState({ moreNewTenderBoardVisible: false });
                }}
              />
            </div>
          </MotionCardHeader>
          <MotionCardContent className="grid h-[calc(100%-48px)] grid-cols-4 gap-4 p-4">
            <div className="flex h-full flex-col overflow-hidden rounded bg-slate-900">
              <div className="bg-slate-800 px-3 py-2 font-bold text-white">
                金額佔比
              </div>

              <div className="flex flex-1">
                <ThisMonthAmountBoard />
              </div>

              <Divider className="w-[80%] bg-slate-600" />

              <div className="flex flex-1">
                <ThisMonthAmountBoard />
              </div>
            </div>
            <div className="flex h-full flex-col overflow-hidden rounded bg-slate-900">
              <div className="bg-slate-800 px-3 py-2 font-bold text-white">
                數量佔比
              </div>

              <div className="flex flex-1">
                <ThisMonthAmountBoard />
              </div>

              <Divider className="w-[80%] bg-slate-600" />

              <div className="flex flex-1">
                <ThisMonthAmountBoard />
              </div>
            </div>
            <div className="col-span-2 flex h-full flex-col gap-4">
              <div className="flex-1 overflow-hidden rounded bg-slate-900">
                <div>
                  <div className="bg-slate-800 px-3 py-2 font-bold text-white">
                    月度數量金額對比數據
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden rounded bg-slate-900">
                <div className="bg-slate-800 px-3 py-2 font-bold text-white">
                  本月度數量金額對比數據
                </div>
              </div>
            </div>
          </MotionCardContent>
        </MotionCard>
      </div>
    </>
  );
}

function ThisMonthAmountBoard() {
  const tenders = useAreaTenders();

  const lastMontDateFormat = `${new Date().getFullYear()}-${new Date().getMonth()}`;
  const lastMonth = tenders?.filter((e) =>
    e?.createdAt.includes(lastMontDateFormat),
  );
  const lastMonthAmount = fixAmount(
    lastMonth?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
  );

  const thisMonthDateFormat = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
  const thisMonth = tenders?.filter((e) =>
    e?.createdAt.includes(thisMonthDateFormat),
  );
  const thisMonthAmount = fixAmount(
    thisMonth?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
  );

  const amountPercent = (thisMonthAmount / lastMonthAmount) * 100;

  const chartData = [{ amountPercent, fill: "var(--color-amountPercent)" }];

  const chartConfig = {
    amountPercent: {
      color: "red",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        // startAngle={90}
        endAngle={(amountPercent / 100) * 360}
        innerRadius={80}
        outerRadius={120}
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
                      className="fill-white text-3xl font-bold"
                    >
                      {`${Number(chartData[0].amountPercent).toFixed(2)}%`}
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
