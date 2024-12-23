import { Pie, PieConfig } from "@ant-design/plots";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { motion } from "motion/react";
import { Minus } from "lucide-react";
import { useMapStore } from "~/store/map";
const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);
const MotionMinus = motion.create(Minus);

export function RankingListBoardMore() {
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
            useMapStore.setState({ moreRankingListBoardVisible: false });
          }}
        ></motion.div>

        <MotionCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          layoutId="ranking-list-board"
          className={cn(
            "mx-4 block h-[90vh] w-[clamp(400px,90vw,1800px)] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <div className="flex items-center justify-between">
              <motion.span layoutId="ranking-list-board-title">
                市场竞争龙虎榜
              </motion.span>
              <MotionMinus
                layoutId="ranking-list-board-icon"
                className="cursor-pointer"
                onClick={() => {
                  useMapStore.setState({ moreRankingListBoardVisible: false });
                }}
              />
            </div>
          </MotionCardHeader>
          <MotionCardContent className="grid h-[calc(100%-48px)] grid-cols-4 gap-4 p-4"></MotionCardContent>
        </MotionCard>
      </div>
    </>
  );
}
