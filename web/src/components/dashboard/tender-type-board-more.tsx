import { Pie, PieConfig } from "@ant-design/plots";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { motion } from "motion/react";
import { Minus, X } from "lucide-react";
import { useMapStore } from "~/store/map";
const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);
const MotionMinus = motion.create(Minus);

export function TenderTypeBoardMore() {
  const tenders = useAreaTenders();

  const totalTenders = tenders?.length || 0;
  const winTendersCount = tenders?.filter((t) => t?.status === 3).length || 0;

  const winPercent = isFinite(winTendersCount / totalTenders)
    ? winTendersCount / totalTenders || 1
    : 1;
  const winConfig = {
    percent: winPercent,
    width: 70,
    height: 70,
    innerRadius: 0.65,
    color: ["#E8EFF5", "#3cb8e6"],
    annotations: [
      {
        type: "text",
        style: {
          text: `赢单率\n${winPercent === 1 ? "0" : Math.round(winPercent * 100)}%`,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 10,
          // fontStyle: "bold",
          fill: "white",
        },
      },
    ],
  };

  const lostTendersCount = tenders?.filter((t) => t?.status === 4).length || 0;
  const lostPercent = isFinite(lostTendersCount / totalTenders)
    ? lostTendersCount / totalTenders || 1
    : 1;

  const loseConfig = {
    percent: lostPercent,
    width: 70,
    height: 70,
    innerRadius: 0.65,
    color: ["#E8EFF5", "#3cb8e6"],
    annotations: [
      {
        type: "text",
        style: {
          text: `丢单率\n${lostPercent === 1 ? "0" : Math.round(lostPercent * 100)}%`,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 10,
          // fontStyle: "bold",
          fill: "white",
        },
      },
    ],
  };

  let government = 0;
  let csoe = 0;
  let highTech = 0;
  let other = 0;

  for (const t of tenders || []) {
    switch (t?.customer?.ownerType) {
      case 1:
        government += 1;
        break;
      case 2:
        csoe += 1;
        break;
      case 3:
        highTech += 1;
        break;
      default:
        other += 1;
        break;
    }
  }

  const config = {
    data: [
      { type: "央企国企", value: government },
      { type: "高科技企业", value: highTech },
      { type: "政府平台", value: csoe },
      { type: "其他企业", value: other },
    ],
    theme: "classicDark",
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    // innerRadius: 0.35,
    label: {
      text: (d: { type: string; value: number }) => `${d.type}\n ${d.value}个`,
      position: "outside",
      // transform: [
      //   {
      //     type: "overlapHide",
      //     priority: (a, b) => {
      //       console.log({ a, b });
      //       return a.value < b.value;
      //     },
      //   },
      // ],
      transform: [{ type: "overlapDodgeY", maxIterations: 1 }],
      // transform: [{ type: "overlapHide", priority: (a, b) => a < b }],
    },
    // label: false,
    // legend: {
    //   color: {
    //     title: false,
    //     position: "right",
    //   },
    // },
    tooltip: {
      name: "数量",
      field: "value",
    },
  } satisfies PieConfig;

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
            useMapStore.setState({ moreTenderTypeBoardVisible: false });
          }}
        ></motion.div>

        <motion.button
          layoutId="tender-type-board-more-icon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute right-6 top-6 cursor-pointer rounded-full border-2 border-gray-600 p-1 text-white hover:bg-gray-600"
          onClick={() => {
            useMapStore.setState({ moreTenderTypeBoardVisible: false });
          }}
        >
          <X size={14} />
        </motion.button>

        <MotionCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          layoutId="tender-type-board"
          className={cn(
            "mx-4 block h-[90vh] w-[90%] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <div className="flex items-center justify-between">
              <motion.span layoutId="tender-type-board-title">
                项目商机类型金额占比
              </motion.span>
            </div>
          </MotionCardHeader>
          <MotionCardContent className="grid h-[calc(100%-48px)] grid-cols-4 gap-4 p-4"></MotionCardContent>
        </MotionCard>
      </div>
    </>
  );
}
