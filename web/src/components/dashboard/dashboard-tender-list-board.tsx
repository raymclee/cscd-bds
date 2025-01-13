import { Ellipsis } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { TenderListTable } from "./tender-list-table";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionEllipsis = motion.create(Ellipsis);

export function DashboardTenderListBoard() {
  return (
    <MotionCard
      layoutId="dashboard-tender-list-board"
      className={cn(
        // "h-[calc((100vh-100px)/3)] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        "h-[calc(90vh/3)] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        <div className="flex items-center justify-between">
          <motion.span layoutId="dashboard-tender-list-board-title">
            项目列表
          </motion.span>
          <MotionEllipsis
            layoutId="dashboard-tender-list-board-icon"
            className="cursor-pointer"
            onClick={() => {
              useMapStore.setState({
                moreDashboardTenderListBoardVisible: true,
              });
            }}
          />
        </div>
      </MotionCardHeader>
      <CardContent className="h-full px-0 pb-8">
        <ScrollArea className="h-full px-4">
          <TenderListTable />
        </ScrollArea>
      </CardContent>
    </MotionCard>
  );
}
