import { motion } from "motion/react";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Minus, X } from "lucide-react";
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
import { NewTenderAmountChart } from "./new-tender-amount-chart";
import { NewTenderTotalChart } from "./new-tender-total-chart";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);
const MotionMinus = motion.create(Minus);

export function NewTenderBoardMore() {
  const thisMonthAmountPeriods = [
    `${new Date().getFullYear()}-${new Date().getMonth()}`,
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
  ] as [string, string];

  const lastMonthAmountPeriods = [
    `${new Date().getFullYear()}-${new Date().getMonth() - 2}`,
    `${new Date().getFullYear()}-${new Date().getMonth() - 1}`,
  ] as [string, string];

  const thisMountTotalPeriods = [
    `${new Date().getFullYear()}-${new Date().getMonth()}`,
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
  ] as [string, string];

  const lastMonthTotalPeriods = [
    `${new Date().getFullYear()}-${new Date().getMonth() - 2}`,
    `${new Date().getFullYear()}-${new Date().getMonth() - 1}`,
  ] as [string, string];

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

        <motion.button
          layoutId="new-tender-board-more"
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
            "mx-4 flex w-[clamp(400px,90vw,1800px)] flex-col items-stretch justify-center overflow-hidden rounded border border-transparent bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
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
                    {thisMonthAmountPeriods[0]} 與 {thisMonthAmountPeriods[1]}{" "}
                    對比
                  </div>

                  <NewTenderAmountChart periods={thisMonthAmountPeriods} />
                  <span className="text-center text-gray-400">
                    金额占比变化
                  </span>
                </div>
              </div>

              {/* <Divider className="w-[80%] bg-slate-600" /> */}
              <div className="mx-auto mb-8 h-px w-[90%] bg-slate-700"></div>

              <div className="flex flex-1">
                <div className={cn("flex h-full w-full flex-1 flex-col gap-4")}>
                  <div className="px-4 py-2 font-bold text-white">
                    {lastMonthAmountPeriods[0]} 與 {lastMonthAmountPeriods[1]}{" "}
                    對比
                  </div>

                  <NewTenderAmountChart periods={lastMonthAmountPeriods} />
                  <span className="text-center text-gray-400">
                    金额占比变化
                  </span>
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col overflow-hidden rounded border border-brand">
              <div className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 px-3 py-2 font-bold text-white">
                數量佔比
              </div>

              <div className="flex flex-1 pt-4">
                <div className="flex h-full w-full flex-1 flex-col gap-4">
                  <div className="px-4 py-2 font-bold text-white">
                    {thisMountTotalPeriods[0]} 與 {thisMountTotalPeriods[1]}{" "}
                    對比
                  </div>

                  <NewTenderTotalChart periods={thisMountTotalPeriods} />
                  <span className="text-center text-gray-400">
                    数量占比变化
                  </span>
                </div>
              </div>

              {/* <Divider className="w-[80%] bg-slate-600" /> */}
              <div className="mx-auto mb-8 h-px w-[90%] bg-slate-700"></div>

              <div className="flex flex-1">
                <div className="flex h-full w-full flex-1 flex-col gap-4">
                  <div className="px-4 py-2 font-bold text-white">
                    {lastMonthTotalPeriods[0]} 與 {lastMonthTotalPeriods[1]}{" "}
                    對比
                  </div>

                  <NewTenderTotalChart periods={lastMonthTotalPeriods} />
                  <span className="text-center text-gray-400">
                    数量占比变化
                  </span>
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col gap-4">
              <div className="flex-1 overflow-hidden rounded border border-brand">
                <div>
                  <div className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 px-3 py-2 font-bold text-white">
                    月度數量金額對比數據
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden rounded border border-brand">
                <div className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 px-3 py-2 font-bold text-white">
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
