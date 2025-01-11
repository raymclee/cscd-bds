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
    <MotionCard
      layoutId="ranking-list-board"
      className={cn(
        // "h-[calc((100vh-100px)/3)] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        "h-[17.9rem] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="font-bold text-white bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700">
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

      <CardContent className="flex items-stretch justify-center w-full h-full gap-4 px-4 overflow-hidden">
        <div
          className={
            "relative flex flex-col items-center justify-center flex-1"
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
            "relative flex flex-col items-center justify-center flex-1"
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
            "relative flex flex-col items-center justify-center flex-1"
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
