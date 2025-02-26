import { X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { TenderListTable } from "./tender-list-table";
import { ScrollArea } from "../ui/scroll-area";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);

export function DashboardTenderListBoardMore() {
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
            useMapStore.setState({
              moreDashboardTenderListBoardVisible: false,
            });
          }}
        ></motion.div>

        <motion.button
          layoutId="dashboard-tender-list-board-icon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute right-6 top-6 cursor-pointer rounded-full border-2 border-gray-600 p-1 text-white hover:bg-gray-600"
          onClick={() => {
            useMapStore.setState({
              moreDashboardTenderListBoardVisible: false,
            });
          }}
        >
          <X size={14} />
        </motion.button>

        <MotionCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          layoutId="dashboard-tender-list-board"
          className={cn(
            "mx-4 block h-[90vh] w-[800px] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <div className="flex items-center justify-between">
              <motion.span layoutId="dashboard-tender-list-board-title">
                项目列表
              </motion.span>
            </div>
          </MotionCardHeader>
          <MotionCardContent className="h-[calc(100%-16px)]">
            <ScrollArea className="-mx-4 h-full px-4">
              <TenderListTable size="large" />
            </ScrollArea>
          </MotionCardContent>
        </MotionCard>
      </div>
    </>
  );
}
