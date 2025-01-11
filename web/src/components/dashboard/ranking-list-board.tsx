import { rankingListBoard_competitors$key } from "__generated__/rankingListBoard_competitors.graphql";
import { graphql, useFragment } from "react-relay";
import no1 from "~/assets/svg/ranking_no_1.svg";
import no2 from "~/assets/svg/ranking_no_2.svg";
import no3 from "~/assets/svg/ranking_no_3.svg";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { motion } from "motion/react";
import { Ellipsis } from "lucide-react";
import { useMapStore } from "~/store/map";

const MotionCard = motion.create(Card);
const MotionEllipsis = motion.create(Ellipsis);

const imagesMap = {
  1: no1,
  2: no2,
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

  const [first, second, third] = data.topCompetitors || [
    undefined,
    undefined,
    undefined,
  ];

  return (
    <MotionCard
      layoutId="ranking-list-board"
      className={cn(
        // "h-[calc((100vh-100px)/3)] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        "h-[18.5rem] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        <div className="flex items-center justify-between">
          <motion.span layoutId="ranking-list-board-title">
            市场竞争龙虎榜
          </motion.span>
          <MotionEllipsis
            layoutId="ranking-list-board-more-icon"
            className="cursor-pointer"
            onClick={() => {
              useMapStore.setState({
                moreRankingListBoardVisible: true,
              });
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="flex h-full w-full items-stretch justify-center gap-4 overflow-hidden px-4">
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

        <div
          className={
            "relative flex flex-1 flex-col items-center justify-center"
          }
        >
          <img src={no2} className={cn("h-full w-full scale-y-[1.1]")} />
          <div
            className={
              "absolute top-1/2 line-clamp-1 w-[70%] -translate-y-[100%] text-center text-xs"
            }
          >
            {data.topCompetitors?.[0]?.shortName || ""}
          </div>
        </div>
        <div
          className={
            "relative flex flex-1 flex-col items-center justify-center"
          }
        >
          <img
            src={no1}
            className={"h-full w-full scale-x-[1.2] scale-y-[1.3]"}
          />
          <div
            className={
              "absolute top-1/2 line-clamp-1 w-[70%] -translate-y-[110%] text-center text-xs"
            }
          >
            {data.topCompetitors?.[1]?.shortName || ""}
          </div>
        </div>

        <div
          className={
            "relative flex flex-1 flex-col items-center justify-center"
          }
        >
          <img src={no3} className={cn("h-full w-full scale-y-[1.1]")} />
          <div
            className={
              "absolute top-1/2 line-clamp-1 w-[70%] -translate-y-[100%] text-center text-xs"
            }
          >
            {data.topCompetitors?.[2]?.shortName || ""}
          </div>
        </div>
      </CardContent>
    </MotionCard>
  );
}
