import { Column, ColumnConfig, Tiny } from "@ant-design/plots";
import { Ellipsis } from "lucide-react";
import { motion } from "motion/react";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { fixAmount } from "~/lib/helper";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { NewTenderAmountChart } from "./new-tender-amount-chart";
import { NewTenderTotalChart } from "./new-tender-total-chart";
import { NewTenderBarChart } from "./new-tender-board/new-tender-bar-chart";
import dayjs, { Dayjs } from "dayjs";

const MotionCard = motion.create(Card);
const MotionEllipsis = motion.create(Ellipsis);

export function NewTenderBoard() {
  const tenders = useAreaTenders();

  const lastMontDateFormat = `${new Date().getFullYear()}-${new Date().getMonth()}`;
  const lastMonth = tenders?.filter((e) =>
    e?.createdAt.includes(lastMontDateFormat),
  );
  const lastMonthAmount = fixAmount(
    lastMonth?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
  );
  const lastMonthCount = lastMonth?.length ?? 0;

  const thisMonthDateFormat = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
  const thisMonth = tenders?.filter((e) =>
    e?.createdAt.includes(thisMonthDateFormat),
  );
  const thisMonthAmount = fixAmount(
    thisMonth?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
  );
  const thisMonthCount = thisMonth?.length ?? 0;

  const now = dayjs();

  const thisMonthAmountPeriods = [now, now.subtract(1, "month")] as [
    Dayjs,
    Dayjs,
  ];

  return (
    <MotionCard
      layoutId="new-tender-board"
      className={cn(
        "h-[19rem] overflow-hidden rounded border border-brand bg-transparent pb-2 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        // "h-[calc((100vh-100px)/3)] overflow-hidden rounded border border-brand bg-transparent pb-2 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        <div className="flex items-center justify-between">
          <span>本月新增商机</span>
          <MotionEllipsis
            layoutId="new-tender-board-more-icon"
            className="cursor-pointer"
            onClick={() => {
              useMapStore.setState({ moreNewTenderBoardVisible: true });
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="flex h-full">
        {/* <div className="w-[40%]"><Tiny {...monthConfig} /></div> */}
        {/* <div className="w-[60%]"> */}
        {/* <Column {...barConfig} /> */}
        {/* </div> */}
        {/* <div className="flex flex-col items-stretch h-full justify-stretch"> */}
        {/* <AmountChart /> */}
        {/* <div className="flex flex-col flex-1 gap-1"> */}
        {/* <Tiny.Ring {...amountConfig} /> */}
        {/* <div className="relative w-full pb-[250px]">
              <div className="absolute inset-0 overflow-hidden">
                <NewTenderAmountChart
                  // className="w-full h-full scale-50"
                  periods={[
                    `${new Date().getFullYear()}-${new Date().getMonth()}`,
                    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
                  ]}
                />
              </div>
            </div> */}
        {/* <div className="w-full h-full">
              <NewTenderAmountChart
                // className="w-full h-full scale-50"
                periods={[
                  `${new Date().getFullYear()}-${new Date().getMonth()}`,
                  `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
                ]}
              />
            </div>
            <span className="text-xs text-gray-400">金额占比上升</span>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-1">
            <NewTenderTotalChart
              periods={[
                `${new Date().getFullYear()}-${new Date().getMonth()}`,
                `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
              ]}
            />
            <span className="text-xs text-gray-400">数量占比下降</span>
          </div>
        </div> */}

        <div className="flex h-[calc(100%-12px)] w-[45%] flex-col">
          <div className="relative mt-1 flex flex-1 justify-center">
            <div className="absolute -left-6 right-0 top-2">
              <NewTenderAmountChart
                height={80}
                width={80}
                short
                className="m-auto"
                // className="h-[80px] w-[80px]"
                // className="w-full h-full scale-50"
                periods={thisMonthAmountPeriods}
              />
            </div>
            <div className="absolute -left-6 bottom-4 right-0 text-center">
              <span className="text-xs text-gray-400">金额占比变化</span>
            </div>
          </div>

          <div className="relative flex flex-1 flex-col justify-center">
            <div className="absolute -left-6 right-0 top-2">
              <NewTenderTotalChart
                height={80}
                width={80}
                short
                className="m-auto"
                periods={thisMonthAmountPeriods}
              />
            </div>
            <div className="absolute -left-6 bottom-4 right-0 text-center">
              <span className="text-xs text-gray-400">数量占比变化</span>
            </div>
          </div>
        </div>

        {/* <Column {...barConfig} /> */}
        <div className="relative h-[calc(100%-12px)] flex-1">
          <div className="absolute -left-10 bottom-0 right-0 top-4">
            <NewTenderBarChart
              data={[
                {
                  month: "上月",
                  amount: lastMonthAmount,
                  total: lastMonthCount,
                },
                {
                  month: "本月",
                  amount: thisMonthAmount,
                  total: thisMonthCount,
                },
              ]}
            />
          </div>
        </div>
      </CardContent>
    </MotionCard>
  );
}
