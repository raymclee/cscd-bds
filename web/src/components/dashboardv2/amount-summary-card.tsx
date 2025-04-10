import { fixAmount } from "~/lib/helper";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import headerSvg from "~/assets/dashboard/svg/sub-head-amount.svg";
import { Wallet } from "lucide-react";

export function AmountSummaryCard() {
  const tenders = useAreaTenders();

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

            <div className="rounded-full bg-brand/30 p-2">
              <Wallet className="h-8 w-8 text-brand" />
            </div>
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
    </Card>
  );
}
