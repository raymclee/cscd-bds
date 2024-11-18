import { Column, ColumnConfig, Tiny } from "@ant-design/plots";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";

const monthAdded = 34;
const mountAddedAmount = 18;
const lastMonthAdded = 28;
const lastMonthAddedAmount = 15;

const barConfig = {
  data: [
    {
      name: "金额(亿)",
      月份: "本月",
      數量: mountAddedAmount,
    },
    {
      name: "金额(亿)",
      月份: "上月",
      數量: lastMonthAddedAmount,
    },
    {
      name: "数量(个)",
      月份: "本月",
      數量: monthAdded,
    },
    {
      name: "数量(个)",
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
} satisfies ColumnConfig;

const amountConfig = {
  percent: lastMonthAddedAmount / mountAddedAmount,
  width: 80,
  height: 80,
  innerRadius: 0.65,
  color: ["#E8EFF5", "#dc2626"],
  annotations: [
    {
      type: "text",
      style: {
        text: `${Math.round((lastMonthAddedAmount / mountAddedAmount) * 100)}%`,
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

const totalConfig = {
  percent: lastMonthAdded / monthAdded,
  width: 80,
  height: 80,
  innerRadius: 0.65,
  color: ["#E8EFF5", "#109618"],
  annotations: [
    {
      type: "text",
      style: {
        text: `${Math.round((lastMonthAdded / monthAdded) * 100)}%`,
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
        "h-[clamp(19rem,34dvh,19rem)] overflow-hidden rounded border border-brand bg-transparent pb-2 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        本月新增商机
      </CardHeader>
      <CardContent className="flex h-full">
        {/* <div className="w-[40%]"><Tiny {...monthConfig} /></div> */}
        {/* <div className="w-[60%]"> */}
        {/* <Column {...barConfig} /> */}
        {/* </div> */}
        <div className="flex w-[40%] flex-col items-center justify-around py-4">
          {/* <AmountChart /> */}
          <div className="flex flex-col items-center justify-center gap-1">
            <Tiny.Ring {...amountConfig} />
            <span className="text-xs text-gray-400">金額佔比上升</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Tiny.Ring {...totalConfig} />
            <span className="text-xs text-gray-400">數量佔比下降</span>
          </div>
        </div>
        <Column {...barConfig} />
      </CardContent>
    </Card>
  );
}
