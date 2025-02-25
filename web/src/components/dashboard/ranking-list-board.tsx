import { Ellipsis } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { TopCompetitors } from "./top-competitors";

const MotionCard = motion.create(Card);
const MotionEllipsis = motion.create(Ellipsis);

export function RankingListBoard() {
  return (
    <MotionCard
      layoutId="ranking-list-board"
      className={cn(
        // "h-[calc((100vh-100px)/3)] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        "h-[calc(90vh/3)] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
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

      <CardContent className="flex h-full w-full items-stretch justify-center gap-2 overflow-hidden px-4">
        <TopCompetitors />
      </CardContent>
    </MotionCard>
  );
}
