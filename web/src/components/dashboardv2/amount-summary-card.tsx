import { Wallet } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import headerSvg from "~/assets/dashboard/svg/sub-head-amount.svg";
import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import { fixAmount } from "~/lib/helper";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ProjectStatusDialog } from "./project-status-dialog";

export function AmountSummaryCard() {
  const tenders = useAreaTenders();
  const [showStatusModal, setShowStatusModal] = useState(false);

  const totalAmount = fixAmount(
    tenders?.reduce(
      (acc, inc) =>
        inc?.activeProfile?.estimatedAmount
          ? acc + inc?.activeProfile?.estimatedAmount
          : acc,
      0,
    ),
  );

  const tenderCount = tenders?.length || 0;

  const processingAmount = fixAmount(
    tenders
      ?.filter((t) => t?.activeProfile?.status === 1)
      .reduce(
        (acc, inc) =>
          inc?.activeProfile?.estimatedAmount
            ? acc + inc?.activeProfile?.estimatedAmount
            : acc,
        0,
      ),
  );

  return (
    <Card className="relative h-56 border-none bg-slate-900/60 text-white backdrop-blur">
      {/* 科技感装饰线条 */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

      {/* 全息扫描效果 */}
      <div className="holographic-effect pointer-events-none absolute inset-0" />

      <CardHeader>
        <img
          src={headerSvg}
          alt="sub-head"
          className="h-8 w-full select-none"
        />
      </CardHeader>
      <CardContent className="py-2">
        <div className="rounded bg-gradient-to-b from-brand/40 to-transparent p-px">
          <div className="flex items-center justify-between rounded px-6 py-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">¥</span>
              <span className="text-3xl font-black text-white">
                {totalAmount}
              </span>
              <span className="font-medium text-brand">亿元</span>
            </div>

            <motion.button
              className="relative cursor-pointer rounded-full border border-brand/30 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 p-2"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStatusModal(true)}
            >
              {/* 内部发光效果 */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  boxShadow: [
                    "0 0 10px 2px rgba(60,184,230,0.2) inset",
                    "0 0 15px 4px rgba(60,184,230,0.5) inset",
                    "0 0 10px 2px rgba(60,184,230,0.2) inset",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* 外部发光效果 */}
              <motion.div
                className="absolute -inset-1 rounded-full opacity-60"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  boxShadow: [
                    "0 0 5px 0px rgba(60,184,230,0.3)",
                    "0 0 10px 2px rgba(60,184,230,0.6)",
                    "0 0 5px 0px rgba(60,184,230,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* 脉冲环 */}
              <motion.div
                className="absolute inset-0 z-0 rounded-full"
                initial={{ opacity: 0.5 }}
                animate={{
                  opacity: [0.5, 0, 0.5],
                  scale: [1, 1.5, 1],
                  border: [
                    "1px solid rgba(60,184,230,0.2)",
                    "1px solid rgba(60,184,230,0.8)",
                    "1px solid rgba(60,184,230,0.2)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* 数据线 */}
              <motion.div
                className="absolute -left-5 top-1/2 h-[1px] w-5 bg-cyan-400"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.div
                className="absolute -right-5 top-1/2 h-[1px] w-5 bg-blue-400"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              />

              {/* 中心Wallet图标 */}
              <div className="relative z-10 flex items-center justify-center">
                <Wallet className="h-8 w-8 text-brand" />

                {/* 图标闪光效果 */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      "radial-gradient(circle, rgba(60,184,230,0) 0%, rgba(60,184,230,0) 100%)",
                      "radial-gradient(circle, rgba(60,184,230,0.3) 10%, rgba(60,184,230,0) 70%)",
                      "radial-gradient(circle, rgba(60,184,230,0) 0%, rgba(60,184,230,0) 100%)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex h-full items-center justify-between gap-4">
            <div className="h-full flex-1 overflow-hidden rounded bg-gradient-to-b from-brand/40 to-transparent">
              <div className="flex h-full flex-col rounded">
                <div className="flex flex-1 items-baseline justify-center gap-1 py-1">
                  <span className="text-lg font-bold">{processingAmount}</span>
                  <span className="pt-2 text-sm font-medium text-brand">
                    亿元
                  </span>
                </div>
                <div className="line-clamp-1 bg-gray-500/50 py-1 text-center text-xxs">
                  跟进中的金额(亿元)
                </div>
              </div>
            </div>

            <div className="h-full flex-1 overflow-hidden rounded bg-gradient-to-b from-brand/40 to-transparent">
              <div className="flex h-full flex-col rounded">
                <div className="flex flex-1 items-baseline justify-center gap-1 py-1">
                  <span className="text-lg font-bold">{tenderCount}</span>
                  <span className="pt-2 text-sm font-medium text-brand">
                    个项目
                  </span>
                </div>
                <div className="line-clamp-1 bg-gray-500/50 py-1 text-center text-xxs">
                  总体情况
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 项目状态弹窗 */}
      <ProjectStatusDialog
        open={showStatusModal}
        onOpenChange={setShowStatusModal}
        tenders={tenders}
      />
    </Card>
  );
}
