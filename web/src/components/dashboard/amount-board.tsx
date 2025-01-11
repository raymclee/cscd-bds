import { Wallet } from "lucide-react";
import { motion } from "motion/react";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { fixAmount } from "~/lib/helper";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";

const statusItems = [
  { status: "跟进中", value: 1 },
  { status: "停止跟进", value: 2 },
  { status: "估价", value: 5 },
  { status: "已交标", value: 6 },
  { status: "中标", value: 3 },
  { status: "失标", value: 4 },
];

export function AmountBoard() {
  const tenders = useAreaTenders();

  const totalAmount = fixAmount(
    tenders?.reduce(
      (acc, inc) => (inc?.estimatedAmount ? acc + inc?.estimatedAmount : acc),
      0,
    ),
  );

  const tenderCount = tenders?.length || 0;

  const processingAmount = fixAmount(
    tenders
      ?.filter((t) => t?.status === 1)
      .reduce(
        (acc, inc) => (inc?.estimatedAmount ? acc + inc?.estimatedAmount : acc),
        0,
      ),
  );

  return (
    <div className="@container">
      <Card
        className={cn(
          "flex h-[36rem] flex-col overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          // "flex h-[calc(((100vh-100px)/3)*2)] flex-col overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        )}
      >
        <CardHeader className="font-bold text-white bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700">
          <div className="flex items-center justify-between">
            商机汇总总金额
            {/* <Link to="/tenders">
              <RectangleEllipsis />
            </Link> */}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 py-4">
          <div className="flex-1">
            <div className="p-px rounded bg-gradient-to-b from-brand/40 to-transparent">
              <div className="flex items-center justify-between px-6 py-4 rounded">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">¥</span>
                  <span className="text-4xl font-black text-white">
                    {totalAmount}
                  </span>
                  <span className="hidden font-medium text-brand @xs:block">
                    亿元
                  </span>
                </div>

                <div className="p-2 rounded-full bg-brand/30">
                  <Wallet className="w-10 h-10 text-brand" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs text-right text-brand/70">
                单位: 项目数量
              </div>
              <div className="mt-2 space-y-4 text-sm text-brand">
                {statusItems.map(({ status, value }) => {
                  const tends = tenders?.filter((t) => t?.status === value);
                  const percentage =
                    tends?.length && tenders?.length
                      ? Math.round((tends?.length / tenders?.length) * 100)
                      : 0;
                  const count = tends?.length || 0;
                  return (
                    <motion.div
                      layoutId={`tender-status-${value}`}
                      key={status}
                      className="flex items-center justify-between mt-2 cursor-pointer gap-x-4"
                      onClick={() => {
                        useMapStore.setState({
                          selectedTenderStatus: { status, value },
                        });
                      }}
                    >
                      <motion.div
                        className="w-24"
                        layoutId={`tender-status-${value}-status`}
                      >
                        {status}
                      </motion.div>
                      <motion.div
                        className="w-8 text-white"
                        layoutId={`tender-status-${value}-count`}
                      >
                        {count}
                      </motion.div>
                      <Progress
                        value={percentage}
                        className="h-2 w-[80%] text-brand"
                      />
                      <div className="w-12 text-right">{percentage}%</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="h-[5.5rem]">
            <div className="flex items-center justify-between h-full gap-6">
              <div className="flex-1 h-full overflow-hidden rounded bg-gradient-to-b from-brand/40 to-transparent">
                <div className="flex flex-col h-full rounded">
                  <div className="flex items-center justify-center flex-1 gap-1">
                    <span className="text-2xl font-bold">
                      {processingAmount}
                    </span>
                    <span className="pt-2 text-sm font-medium text-brand">
                      亿元
                    </span>
                  </div>
                  <div className="py-1 text-xs text-center bg-gray-500/50">
                    跟进中的金额(亿元)
                  </div>
                </div>
              </div>

              <div className="flex-1 h-full overflow-hidden rounded bg-gradient-to-b from-brand/40 to-transparent">
                <div className="flex flex-col h-full rounded">
                  <div className="flex items-center justify-center flex-1 gap-1">
                    <span className="text-2xl font-bold">{tenderCount}</span>
                    <span className="pt-2 text-sm font-medium text-brand">
                      个项目
                    </span>
                  </div>
                  <div className="py-1 text-xs text-center bg-gray-500/50">
                    总体情况
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
