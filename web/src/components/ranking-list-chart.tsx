import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tiny } from "@ant-design/plots";

const percent = 25.68;

const config = {
  percent: percent / 100,
  width: 150,
  height: 150,
  innerRadius: 0.7,
  color: ["#E8EFF5", "#3cb8e6"],
  annotations: [
    {
      type: "text",
      style: {
        text: `${percent}%`,
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

export function RankingListChart() {
  return (
    <Card
      className={cn(
        "h-[clamp(17rem,30dvh,17rem)] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        市场竞争龙虎榜
      </CardHeader>

      <CardContent className="flex h-full items-center">
        <div className="flex-1">
          <div className="space-y-1">
            <h3 className="text-brand">数据对比</h3>
            <div className="text-sm text-brand/60">
              {new Date().getFullYear()}年{new Date().getMonth() - 6}月 -{" "}
              {new Date().getFullYear()}年{new Date().getMonth()}月
            </div>
          </div>
          <p className="my-4 text-5xl">25.68%</p>
          <div className="text-sm">
            <span className="text-lg text-red-600">&uarr;0.69%</span>
            <p className="text-brand/60">与同行业中标率占比增长10.5</p>
            <p className="text-xs text-brand/60">
              (截至今日完成进度数据分析情况)
            </p>
          </div>
        </div>
        <div>
          <Tiny.Ring {...config} />
        </div>
      </CardContent>
    </Card>
  );
}
