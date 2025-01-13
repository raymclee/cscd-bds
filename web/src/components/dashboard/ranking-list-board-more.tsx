import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useMapStore } from "~/store/map";
import { TopCompetitors } from "./top-competitors";
import { useTopCompetitions } from "~/hooks/use-top-competitions";
import rankingIcon from "~/assets/svg/ranking_icon.png";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);

export function RankingListBoardMore({ tenderCount }: { tenderCount: number }) {
  const data = useTopCompetitions();

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
            "mx-4 block overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <div className="flex items-center justify-between">
              <motion.span layoutId="ranking-list-board-title">
                市场竞争龙虎榜
              </motion.span>
            </div>
          </MotionCardHeader>
          <MotionCardContent className="gap-4">
            <TopCompetitors className="mx-auto w-[90%] py-8" />

            {/* <ScrollArea className="-mx-4 h-[29rem]"> */}
            <div className="space-y-4 px-6">
              {data.topCompetitors.toSpliced(0, 3).map((competitor, i) => (
                <div
                  key={competitor.id}
                  className="grid grid-cols-[1fr_1fr_4fr_1fr] items-center gap-2 text-center"
                >
                  <div className="relative">
                    <img
                      src={rankingIcon}
                      className="h-auto w-full object-cover"
                    />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-brand-project-3">
                      {i + 4}
                    </div>
                  </div>
                  <div>{competitor.shortName}</div>
                  <div className="my-auto flex items-center justify-center">
                    <Progress
                      value={(competitor.wonTendersCount / tenderCount) * 100}
                      className="h-2 w-full text-brand"
                    />
                    {/* <progress
                        className="[&::-moz-progress-bar]:bg-project-brand h-2.5 w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-brand-project"
                        value={(competitor.wonTendersCount / tenderCount) * 100}
                        max={100}
                      /> */}
                  </div>
                  <div>
                    {((competitor.wonTendersCount / tenderCount) * 100).toFixed(
                      2,
                    )}
                    %
                  </div>
                </div>
              ))}
            </div>
            {/* </ScrollArea> */}
          </MotionCardContent>
        </MotionCard>
      </div>
    </>
  );
}
