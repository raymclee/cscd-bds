import { Project } from "~/lib/project";
import { SubTitle } from "~/components/project/sub-title";

import contractCostTopBg from "~/assets/operationv2/contact-cost-top-bg.png";
import dayFrame from "~/assets/operationv2/contact-cost-day-frame.png";
import contractCostDifferentAmount from "~/assets/operationv2/contract-cost-different-amount.png";
import { formatAmountWithCommas } from "~/lib/helper";
import { SmallHeader } from "./small-header";
import contractCostAmountChart from "~/assets/operationv2/contract-cost-amount-chart.png";

export function ContractCost({ project }: { project: Project }) {
  return (
    <div>
      <SubTitle>合约成本</SubTitle>

      <div className="relative h-20 overflow-hidden">
        <img
          src={contractCostTopBg}
          className="absolute inset-0 h-full w-full object-fill"
        />

        <div className="flex h-full items-center gap-6 px-4 text-sm">
          <span>上期粮收款延误</span>
          <div className="flex h-full gap-2 py-3">
            <div className="relative flex h-full w-12">
              <img src={dayFrame} className="absolute inset-0 h-full w-12" />
              <div className="mx-auto flex items-center justify-center text-3xl font-bold">
                0
              </div>
            </div>

            <div className="relative flex h-auto w-12">
              <img src={dayFrame} className="absolute inset-0 h-full w-12" />
              <div className="mx-auto flex items-center justify-center text-3xl font-bold text-red-600">
                1
              </div>
            </div>

            <div className="relative flex h-auto w-12">
              <img src={dayFrame} className="absolute inset-0 h-full w-12" />
              <div className="mx-auto flex items-center justify-center text-3xl font-bold text-red-600">
                6
              </div>
            </div>
            {/* <img src={dayFrame} className="h-auto w-12" />
              <img src={dayFrame} className="h-auto w-12" /> */}
          </div>
          <span className="ml-4 text-3xl font-bold">天</span>
        </div>
      </div>

      <img
        src={contractCostDifferentAmount}
        className="mt-2 h-[3rem] w-full object-cover"
      />
      <div className="flex items-center justify-between bg-gradient-to-tr from-[#0a3256] to-transparent p-2 px-6 text-xs shadow-lg">
        <div className="space-y-1">
          <div className="grid grid-cols-2 items-center gap-2">
            <span>业主VO已评估</span>
            <span className="font-mono text-sm font-bold text-brand-project-2">
              {formatAmountWithCommas(16)}
            </span>
          </div>

          <div className="grid grid-cols-2 items-center gap-2">
            <span>总包VO已评估</span>
            <span className="font-mono text-sm font-bold text-brand-project-2">
              {formatAmountWithCommas(28)}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="grid grid-cols-2 items-center gap-2">
            <span>总包累计扣款</span>
            <span className="font-mono text-sm font-bold text-brand-project-2">
              {formatAmountWithCommas(18117)}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center gap-2">
            <span>分判VA</span>
            <span className="font-mono text-sm font-bold text-brand-project-2">
              {formatAmountWithCommas(0)}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="grid grid-cols-2 items-center gap-2">
            <span>补料</span>
            <span className="font-mono text-sm font-bold text-brand-project-2">
              {formatAmountWithCommas(7)}
            </span>
          </div>

          <div className="grid grid-cols-2 items-center gap-2">
            <span>执修费</span>
            <span className="font-mono text-sm font-bold text-brand-project-2">
              {formatAmountWithCommas(68000)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <SmallHeader>结算进度</SmallHeader>

        <div className="relative mt-2 flex h-[4rem] items-center justify-center py-4">
          <div className="relative flex-1">
            <img
              src={contractCostAmountChart}
              className="absolute left-1/2 top-1/2 mx-auto h-[4rem] -translate-x-1/2 -translate-y-1/2"
            />
            <div className="absolute left-[52%] -translate-x-1/2 -translate-y-[60%] text-center font-bold text-brand-project">
              76%
            </div>
          </div>

          <div className="mx-auto flex flex-1 flex-col gap-2 text-sm">
            <div className="grid grid-cols-2 items-center gap-4">
              <span className="text-xs text-gray-400">· 当年竣工款已回收</span>
              <span className="font-mono font-bold">
                {formatAmountWithCommas(36779)}
              </span>
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <span className="text-xs text-gray-400">· 当年竣工款kpi</span>
              <span className="font-mono font-bold">
                {formatAmountWithCommas(289600)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
