import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Tiny } from "@ant-design/plots";
import no1 from "~/assets/svg/ranking_no_1.svg";
import no2 from "~/assets/svg/ranking_no_2.svg";
import no3 from "~/assets/svg/ranking_no_3.svg";
import { graphql, useFragment } from "react-relay";
import {
  rankingListBoard_competitors$data,
  rankingListBoard_competitors$key,
} from "__generated__/rankingListBoard_competitors.graphql";

const imagesMap = {
  1: no2,
  2: no1,
  3: no3,
};

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

export function RankingListBoard(props: {
  competitors: rankingListBoard_competitors$key;
}) {
  const data = useFragment(
    graphql`
      fragment rankingListBoard_competitors on Query {
        topCompetitors {
          id
          shortName
          wonTendersCount
        }
      }
    `,
    props.competitors,
  );

  return (
    <Card
      className={cn(
        "h-[clamp(17rem,30dvh,17rem)] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        市场竞争龙虎榜
      </CardHeader>

      <CardContent className="flex h-full w-full items-stretch justify-center gap-6 px-2">
        {/* <div className="flex-1">
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
        </div> */}

        {data.topCompetitors.map((c, i) => {
          if (i >= 3) return null;
          return (
            <div
              className="relative flex flex-1 flex-col items-center justify-center"
              key={c.id}
            >
              <img
                src={imagesMap[(i + 1) as keyof typeof imagesMap]}
                className={cn(
                  "absolute inset-0 h-full w-full",
                  i === 1 && "scale-[1.35]",
                )}
              />
              <div
                className={cn(
                  "absolute top-1/2 z-[1] line-clamp-1 w-[70%] text-center text-xs",
                  i === 1 ? "-translate-y-[100%]" : "-translate-y-[80%]",
                )}
              >
                {c.shortName}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
