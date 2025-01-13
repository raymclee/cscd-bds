import { Pie, PieConfig } from "@ant-design/plots";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { motion } from "motion/react";
import { Ellipsis } from "lucide-react";
import { useMapStore } from "~/store/map";

const MotionCard = motion.create(Card);
const MotionEllipsis = motion.create(Ellipsis);

export function TenderTypeBoard() {
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
    <MotionCard
      layoutId="tender-type-board"
      className={cn(
        // "h-[calc((100vh-100px)/3)] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        "h-[18.8rem] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        <div className="flex items-center justify-between">
          <motion.span layoutId="tender-type-board-title">
            项目商机类型金额占比
          </motion.span>
          <MotionEllipsis
            layoutId="tender-type-board-more-icon"
            className="cursor-pointer"
            onClick={() => {
              useMapStore.setState({ moreTenderTypeBoardVisible: true });
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="flex h-full items-center justify-center gap-2">
        {/* <div className="w-[24%] rounded bg-gradient-to-b from-brand/40 to-transparent p-6">
          <div className="flex flex-col items-center gap-4 justify-evenly">
            <Tiny.Ring {...winConfig} />
            <Tiny.Ring {...loseConfig} />
          </div>
        </div> */}
        <div className="h-full flex-1">
          <Pie {...config} />
        </div>
      </CardContent>
    </MotionCard>
  );
}
