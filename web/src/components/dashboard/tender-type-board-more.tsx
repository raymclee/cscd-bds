import { X } from "lucide-react";
import { motion } from "motion/react";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { ownerTypeText } from "~/lib/helper";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionCardContent = motion.create(CardContent);

export function TenderTypeBoardMore() {
  const tenders = useAreaTenders();

  const customers = tenders
    ?.map((t) =>
      t?.developer
        ? { name: t?.developer, area: t?.area.name, type: 4 }
        : {
            name: t?.customer?.name,
            area: t?.area.name,
            type: t?.customer?.ownerType,
          },
    )
    .filter(Boolean);

  const totalTenders = tenders?.length || 0;
  const winTendersCount = tenders?.filter((t) => t?.status === 3).length || 0;

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
            useMapStore.setState({ moreTenderTypeBoardVisible: false });
          }}
        ></motion.div>

        <motion.button
          layoutId="tender-type-board-more-icon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="absolute right-6 top-6 cursor-pointer rounded-full border-2 border-gray-600 p-1 text-white hover:bg-gray-600"
          onClick={() => {
            useMapStore.setState({ moreTenderTypeBoardVisible: false });
          }}
        >
          <X size={14} />
        </motion.button>

        <MotionCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          layoutId="tender-type-board"
          className={cn(
            "mx-4 block h-[90vh] w-[800px] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <div className="flex items-center justify-between">
              <motion.span layoutId="tender-type-board-title">
                客户列表
              </motion.span>
            </div>
          </MotionCardHeader>
          <MotionCardContent className="h-[calc(100%-16px)]">
            <ScrollArea className="-mx-4 h-full px-4">
              <Table className="my-4 h-full">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="sticky top-0 bg-gray-900">
                  <TableRow className="items-center">
                    <TableHead className="w-[60px] text-center text-[0.7rem] text-gray-300">
                      序号
                    </TableHead>
                    <TableHead className="text-center text-[0.7rem] text-gray-300">
                      名称
                    </TableHead>
                    <TableHead className="w-[60px] text-center text-[0.7rem] text-gray-300">
                      区域
                    </TableHead>
                    <TableHead className="w-[150px] text-center text-[0.7rem] text-gray-300">
                      类型
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-white">
                  {customers?.map((customer, i) => (
                    <TableRow
                      className="cursor-pointer"
                      key={customer?.name || ""}
                    >
                      <TableCell className="text-center">{i + 1}</TableCell>
                      <TableCell>{customer?.name}</TableCell>
                      <TableCell className="text-center">
                        {customer?.area
                          ?.replace("地区", "")
                          .replace("区域", "")}
                      </TableCell>
                      <TableCell className="text-center">
                        {ownerTypeText(customer?.type)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </MotionCardContent>
        </MotionCard>
      </div>
    </>
  );
}
