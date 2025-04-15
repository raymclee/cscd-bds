import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { tenderStatusOptions, fixAmount } from "~/lib/helper";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import dayjs from "dayjs";
interface ProjectStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenders: any[]; // 类型可以根据实际tenders类型调整
}

export function ProjectStatusDialog({
  open,
  onOpenChange,
}: ProjectStatusDialogProps) {
  const tenders = useAreaTenders();

  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

  const tenderCount = tenders?.length || 0;

  // Calculate status percentages and group tenders by status
  const statusData = tenderStatusOptions
    .filter((o) => o.value !== 7)
    .map((option) => {
      const statusTenders =
        tenders?.filter((t) => t?.activeProfile?.status === option.value) || [];
      const percentage = tenderCount
        ? Math.round((statusTenders.length / tenderCount) * 100)
        : 0;

      return {
        label: option.label,
        value: option.value,
        percentage,
        count: statusTenders.length,
        tenders: statusTenders,
      };
    });

  // Filter tenders based on selected status
  const filteredTenders = selectedStatus
    ? tenders?.filter((t) => t?.activeProfile?.status === selectedStatus) || []
    : tenders || [];

  // Function to select or clear a status
  const toggleStatus = (status: number) => {
    setSelectedStatus((prevStatus) => (prevStatus === status ? null : status));
  };

  const gaView = filteredTenders?.every(
    (t) => t?.area.code == "GA" || t?.area.code == "HW",
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl overflow-hidden border-none bg-slate-900/95 text-white backdrop-blur [&>button]:hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Tech animation background elements */}
          <motion.div
            className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              backgroundPosition: ["0% 0%", "100% 0%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              backgroundPosition: ["100% 0%", "0% 0%"],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </motion.div>

        <DialogHeader className="relative">
          <DialogTitle className="flex items-center gap-2 text-xl text-brand">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              项目状态分析
            </motion.span>

            {/* Tech decoration */}
            <div className="relative flex-1 h-8 ml-4">
              {/* Main horizontal line */}
              <motion.div
                className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-brand via-brand/40 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Sliding light effect */}
              <motion.div
                className="absolute top-1/2 h-[2px] w-[30%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  left: ["-30%", "100%"],
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
              />

              {/* Digital numbers */}
              <div className="absolute -top-2 left-[85%] flex items-center gap-1 font-mono text-[8px] text-brand/70">
                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  01
                </motion.span>
                <motion.span
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  1010
                </motion.span>
              </div>

              <div className="absolute -bottom-2 left-[75%] flex items-center gap-1 font-mono text-[8px] text-cyan-400/70">
                <motion.span
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  0011
                </motion.span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-1">
          {/* Status Progress Bars */}
          <div className="space-y-4">
            <motion.h3
              className="text-lg font-semibold text-brand"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              项目状态分布
            </motion.h3>

            <div className="mt-2 space-y-1">
              <AnimatePresence>
                {statusData.map((status, index) => (
                  <motion.div
                    key={status.value}
                    className={`grid grid-cols-[120px_1fr_80px] items-center gap-4 rounded px-2 py-1 ${status.count > 0 ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      backgroundColor:
                        selectedStatus === status.value
                          ? "rgba(60,184,230,0.1)"
                          : "transparent",
                    }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                    onClick={() =>
                      status.count > 0 && toggleStatus(status.value)
                    }
                    whileHover={
                      status.count > 0
                        ? {
                            backgroundColor:
                              selectedStatus === status.value
                                ? "rgba(60,184,230,0.2)"
                                : "rgba(60,184,230,0.05)",
                          }
                        : {}
                    }
                  >
                    <div className="text-sm font-medium text-brand-project-3">
                      {status.label}
                    </div>
                    <div className="relative w-full h-2 overflow-hidden rounded-full bg-slate-700">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-brand to-brand-project"
                        initial={{ width: 0 }}
                        animate={{ width: `${status.percentage}%` }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.1 + 0.3,
                          ease: "easeOut",
                        }}
                      />

                      {/* Scanning effect */}
                      <motion.div
                        className="absolute top-0 w-4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          left: ["-10%", "110%"],
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.1,
                          repeat: Infinity,
                          repeatDelay: 4,
                        }}
                      />
                    </div>
                    <div className="text-sm font-bold text-right text-brand-project-2">
                      {status.percentage}% ({status.count})
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Projects Table */}
          <div className="space-y-2">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-brand">
                项目明细
                {selectedStatus && (
                  <span className="ml-2 text-sm font-normal text-brand-project-3">
                    (
                    {tenderStatusOptions.find((o) => o.value === selectedStatus)
                      ?.label || "未知"}
                    )
                  </span>
                )}
              </h3>

              {selectedStatus && (
                <motion.button
                  className="px-2 py-1 text-xs text-white transition-colors rounded bg-brand/20 hover:bg-brand/30"
                  onClick={() => setSelectedStatus(null)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  查看全部
                </motion.button>
              )}
            </motion.div>

            <ScrollArea className="h-[55vh] rounded border border-slate-800 bg-slate-950/50 backdrop-blur">
              <Table className="relative">
                <TableHeader className="bg-slate-900/80">
                  <TableRow className="border-slate-700/50 hover:bg-transparent">
                    {/* <TableHead className="w-[60px] text-brand">状态</TableHead>
                    <TableHead className="text-brand">项目名称</TableHead>
                    <TableHead className="text-right text-brand">
                      金额 (亿元)
                    </TableHead> */}
                    <TableHead className="w-[5rem] text-center text-brand">
                      序号
                    </TableHead>
                    <TableHead className="w-[10rem] text-center text-brand">
                      名称
                    </TableHead>
                    {gaView ? (
                      <>
                        <TableHead className="w-[6rem] text-center text-brand">
                          区域
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-brand">
                          业主
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-brand">
                          总包
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-brand">
                          则师
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-brand">
                          幕墙顾问
                        </TableHead>
                        <TableHead className="w-[8rem] text-center text-brand">
                          交标日期
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-brand">
                          面积
                        </TableHead>
                        {selectedStatus == 3 && (
                          <>
                            <TableHead className="w-[7rem] text-center text-brand">
                              中标日期
                            </TableHead>
                            <TableHead className="w-[9rem] text-center text-brand">
                              中标金额(亿元)
                            </TableHead>
                          </>
                        )}
                        {/* <TableHead className="w-[7rem] text-center text-brand">
                            中标日期
                        </TableHead>
                        <TableHead className="w-[9rem] text-center text-brand">
                            中标金额(亿元)
                        </TableHead> */}
                      </>
                    ) : (
                      <>
                        <TableHead className="w-[6rem] text-center text-brand">
                          区域
                        </TableHead>
                        <TableHead className="w-[8rem] text-center text-brand">
                          招标日期
                        </TableHead>
                        <TableHead className="w-[6rem] text-center text-brand">
                          金额(亿元)
                        </TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                  <AnimatePresence mode="wait">
                    {filteredTenders.length > 0 ? (
                      filteredTenders.map((tender, index) => (
                        <motion.tr
                          key={tender?.id || index}
                          className="border-b border-slate-800/50 hover:bg-slate-800/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{
                            duration: 0.15,
                            delay: Math.min(index * 0.01, 0.3),
                            ease: "easeOut",
                          }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {tender?.activeProfile?.name || "未命名项目"}
                          </TableCell>
                          {gaView ? (
                            <>
                              <TableCell>{tender?.area.name}</TableCell>
                              <TableCell>
                                {tender?.activeProfile?.developer}
                              </TableCell>
                              <TableCell>
                                {tender?.activeProfile?.contractor}
                              </TableCell>
                              <TableCell>
                                {tender?.activeProfile?.architect}
                              </TableCell>
                              <TableCell>
                                {tender?.activeProfile?.facadeConsultant}
                              </TableCell>
                              <TableCell>
                                {tender?.activeProfile?.tenderClosingDate
                                  ? dayjs(
                                      tender?.activeProfile?.tenderClosingDate,
                                    ).format("YYYY-MM-DD")
                                  : "-"}
                              </TableCell>
                              <TableCell>
                                {tender?.activeProfile?.constructionArea}
                              </TableCell>
                              {selectedStatus == 3 && (
                                <>
                                  <TableCell>
                                    {tender?.activeProfile?.tenderWinDate
                                      ? dayjs(
                                          tender?.activeProfile?.tenderWinDate,
                                        ).format("YYYY-MM-DD")
                                      : "-"}
                                  </TableCell>
                                  <TableCell>
                                    {fixAmount(
                                      tender?.activeProfile?.tenderWinAmount,
                                    )}
                                  </TableCell>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              <TableCell>{tender?.area.name}</TableCell>
                              <TableCell>
                                {tender?.activeProfile?.tenderDate
                                  ? dayjs(
                                      tender?.activeProfile?.tenderDate,
                                    ).format("YYYY-MM-DD")
                                  : "-"}
                              </TableCell>
                              <TableCell>
                                {fixAmount(
                                  tender?.activeProfile?.estimatedAmount,
                                )}
                              </TableCell>
                            </>
                          )}

                          {/* <TableCell className="font-medium">
                            {tenderStatusOptions.find(
                              (o) => o.value === tender?.activeProfile?.status,
                            )?.label || "未知"}
                          </TableCell>

                          <TableCell className="text-right">
                            {tender?.activeProfile?.estimatedAmount
                              ? fixAmount(
                                  tender?.activeProfile?.estimatedAmount,
                                )
                              : "-"}
                          </TableCell> */}
                        </motion.tr>
                      ))
                    ) : (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TableCell
                          colSpan={gaView ? 10 : 3}
                          className="py-8 text-sm text-center text-slate-400"
                        >
                          没有找到符合条件的项目
                        </TableCell>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
