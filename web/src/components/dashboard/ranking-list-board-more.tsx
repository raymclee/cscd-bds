import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useMapStore } from "~/store/map";
import { rankingListBoard_competitors$key } from "__generated__/rankingListBoard_competitors.graphql";
import { TopCompetitors } from "./top-competitors";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);

export function RankingListBoardMore({
  competitors,
}: {
  competitors: rankingListBoard_competitors$key;
}) {
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
            useMapStore.setState({ moreRankingListBoardVisible: false });
          }}
        ></motion.div>

        <motion.button
          layoutId="ranking-list-board-more-icon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute right-6 top-6 cursor-pointer rounded-full border-2 border-gray-600 p-1 text-white hover:bg-gray-600"
          onClick={() => {
            useMapStore.setState({ moreRankingListBoardVisible: false });
          }}
        >
          <X size={14} />
        </motion.button>

        <MotionCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          layoutId="ranking-list-board"
          className={cn(
            "mx-4 block h-[90vh] w-[60%] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <div className="flex items-center justify-between">
              <motion.span layoutId="ranking-list-board-title">
                市场竞争龙虎榜
              </motion.span>
            </div>
          </MotionCardHeader>
          <MotionCardContent className="grid h-[calc(100%-48px)] grid-cols-4 gap-4 p-4">
            <TopCompetitors competitors={competitors} className="w-full" />
          </MotionCardContent>
        </MotionCard>
      </div>
    </>
  );
}
