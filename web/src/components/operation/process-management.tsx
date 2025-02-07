import * as HoverCard from "@radix-ui/react-hover-card";
import { SubTitle } from "~/components/project/sub-title";
import {
  formatAmountWithCommas,
  formatProjectAmount,
  percent,
} from "~/lib/helper";

import costManagement1 from "~/assets/svg/cost_management_1.png";
import costManagement2 from "~/assets/svg/cost_management_2.png";
import costManagement3 from "~/assets/svg/cost_management_3.png";
import { Project } from "~/lib/project";

export function ProcessManagement({ project }: { project: Project }) {
  const ownerApplyCount = project?.ownerApplyCount ?? 0;
  const ownerApproveCount = project?.ownerApproveCount ?? 0;
  const contractorApplyCount = project?.contractorApplyCount ?? 0;
  const contractorApproveCount = project?.contractorApproveCount ?? 0;
  const ownerApplyAmount = project?.ownerApplyAmount ?? 0;
  const ownerApproveAmount = project?.ownerApproveAmount ?? 0;
  const contractorApplyAmount = project?.contractorApplyAmount ?? 0;
  const contractorApproveAmount = project?.contractorApproveAmount ?? 0;
  const installProgress = project?.installProgress ?? 0;
  const effectiveContractAmount = project?.effectiveContractAmount ?? 0;
  const vaApproveAmount = project?.vaApproveAmount ?? 0;

  return (
    <div>
      <SubTitle>成本管理</SubTitle>

      <div className="grid grid-cols-[1fr_1fr_1.525fr] gap-1 bg-gradient-to-tr from-[#0a3256] to-transparent p-2 shadow-lg">
        <div className="relative">
          <img
            src={costManagement1}
            className="absolute inset-0 h-full w-auto object-contain"
          />

          <div className="absolute left-0 right-0 top-[2.75rem]">
            <HoverCard.Root openDelay={100} closeDelay={100}>
              <HoverCard.Trigger>
                <div className="flex cursor-pointer items-center justify-between gap-4 px-2">
                  <div className="text-xs text-brand-project-3">业主VO</div>
                  <div className="line-clamp-1 flex-1 text-right text-xs font-bold text-brand-project-2">
                    {formatAmountWithCommas(
                      formatProjectAmount(ownerApplyAmount),
                    )}
                    万
                  </div>
                </div>
                <div className="w mt-1 flex cursor-pointer items-center justify-between gap-4 px-2">
                  <div className="text-xs text-brand-project-3">总包VO</div>
                  <div className="line-clamp-1 flex-1 text-right text-xs font-bold text-brand-project-2">
                    {formatAmountWithCommas(
                      formatProjectAmount(contractorApplyAmount),
                    )}
                    万
                  </div>
                </div>
              </HoverCard.Trigger>
              <HoverCard.Content
                side="right"
                sideOffset={10}
                align="start"
                className="z-10 overflow-hidden rounded-lg border border-slate-700 bg-slate-800/5 px-6 py-4 shadow-dashboard-card backdrop-blur-xl"
              >
                <h3 className="mb-2 text-sm font-bold underline">累计VO情况</h3>
                <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm">
                  <div className="col-span-2">安装进度</div>
                  <div className="text-brand-project">{installProgress}%</div>
                  <div className="col-span-2">有效合约总额(A)</div>
                  <div className="text-brand-project">
                    {formatAmountWithCommas(
                      formatProjectAmount(effectiveContractAmount),
                    )}
                    万
                  </div>
                  <div className="col-span-2 text-brand-project-2">
                    申请数量
                  </div>
                  <div className="text-brand-project">
                    {contractorApplyCount + ownerApplyCount}个
                  </div>
                  <div className="col-span-2 text-brand-project-2">
                    申请总额(B)
                  </div>
                  <div className="text-brand-project">
                    {formatProjectAmount(
                      contractorApplyAmount + ownerApplyAmount,
                    )}
                    万
                  </div>
                  <div className="col-span-2 text-brand-project-2">
                    申请总额占比(B/A)
                  </div>
                  <div className="text-brand-project">
                    {percent(
                      contractorApproveAmount + ownerApproveAmount,
                      effectiveContractAmount,
                    )}
                    %
                  </div>
                  <div className="col-span-2">批复数量</div>
                  <div className="text-brand-project">
                    {contractorApproveCount + ownerApproveCount}个
                  </div>
                  <div className="col-span-2">批复总额(C)</div>
                  <div className="text-brand-project">
                    {formatProjectAmount(
                      contractorApproveAmount + ownerApproveAmount,
                    )}
                    万
                  </div>
                  <div className="col-span-2">批复总额占比(C/A)</div>
                  <div className="text-brand-project">
                    {percent(
                      contractorApproveAmount + ownerApproveAmount,
                      contractorApplyAmount + ownerApplyAmount,
                    )}
                    %
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard.Root>

            {/* <HoverCard.Root openDelay={100} closeDelay={100}>
          <HoverCard.Trigger asChild> */}
            <div className="mt-1 flex items-center justify-between gap-4 px-2">
              <div className="text-xs text-brand-project-3">分判VA</div>
              <div className="line-clamp-1 flex-1 text-right text-xs font-bold text-brand-project-2">
                {/* {formatAmountWithCommas(op?.xmsjf ?? 0)} */}
                {`${formatAmountWithCommas(
                  formatProjectAmount(vaApproveAmount),
                )}万`}
              </div>
            </div>
            {/* </HoverCard.Trigger>
          <HoverCard.Content
            side="right"
            sideOffset={10}
            align="start"
            className="z-10 px-6 py-4 overflow-hidden rounded-lg shadow-2xl bg-slate-800/5 backdrop-blur-xl"
          >
            <h3 className="mb-2 text-sm font-bold underline">VA</h3>
            <div className="grid grid-cols-3 text-sm gap-x-8 gap-y-2"></div>
          </HoverCard.Content>
        </HoverCard.Root> */}
          </div>
        </div>

        <div className="relative">
          <img
            src={costManagement2}
            className="absolute inset-0 h-full w-auto object-contain"
          />

          <div className="absolute left-0 right-0 top-[2.75rem]">
            <HoverCard.Root openDelay={100} closeDelay={100}>
              <HoverCard.Trigger>
                <div className="flex w-full cursor-pointer items-center justify-between gap-4 px-2">
                  <div className="text-xs text-brand-project-3">业主VO</div>
                  <div className="line-clamp-1 flex-1 text-right text-xs font-bold text-brand-project-2">
                    {/* {formatAmountWithCommas(op?.xmsjf ?? 0)} */}
                    {formatAmountWithCommas(
                      formatProjectAmount(ownerApproveAmount),
                    )}
                    万
                  </div>
                </div>
                <div className="mt-1 flex w-full cursor-pointer items-center justify-between gap-4 px-2">
                  <div className="text-xs text-brand-project-3">总包VO</div>
                  <div className="line-clamp-1 flex-1 text-right text-xs font-bold text-brand-project-2">
                    {formatAmountWithCommas(
                      formatProjectAmount(contractorApproveAmount),
                    )}
                    万
                  </div>
                </div>
              </HoverCard.Trigger>
              <HoverCard.Content
                side="right"
                sideOffset={10}
                align="start"
                className="z-10 overflow-hidden rounded-lg border border-slate-700 bg-slate-800/5 px-6 py-4 shadow-dashboard-card backdrop-blur-xl"
              >
                <h3 className="mb-2 text-sm font-bold underline">累计VO情况</h3>
                <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm">
                  <div className="col-span-2">安装进度</div>
                  <div className="text-brand-project">{installProgress}%</div>
                  <div className="col-span-2">有效合约总额(A)</div>
                  <div className="text-brand-project">
                    {formatAmountWithCommas(
                      formatProjectAmount(effectiveContractAmount),
                    )}
                    万
                  </div>
                  <div className="col-span-2">申请数量</div>
                  <div className="text-brand-project">
                    {contractorApplyCount + ownerApplyCount}个
                  </div>
                  <div className="col-span-2">申请总额(B)</div>
                  <div className="text-brand-project">
                    {formatProjectAmount(
                      contractorApplyAmount + ownerApplyAmount,
                    )}
                    万
                  </div>
                  <div className="col-span-2">申请总额占比(B/A)</div>
                  <div className="text-brand-project">
                    {percent(
                      contractorApproveAmount + ownerApproveAmount,
                      effectiveContractAmount,
                    )}
                    %
                  </div>
                  <div className="col-span-2 text-brand-project-2">
                    批复数量
                  </div>
                  <div className="text-brand-project">
                    {contractorApproveCount + ownerApproveCount}个
                  </div>
                  <div className="col-span-2 text-brand-project-2">
                    批复总额(C)
                  </div>
                  <div className="text-brand-project">
                    {formatProjectAmount(
                      contractorApproveAmount + ownerApproveAmount,
                    )}
                    万
                  </div>
                  <div className="col-span-2 text-brand-project-2">
                    批复总额占比(C/A)
                  </div>
                  <div className="text-brand-project">
                    {percent(
                      contractorApproveAmount + ownerApproveAmount,
                      contractorApplyAmount + ownerApplyAmount,
                    )}
                    %
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard.Root>

            {/* <HoverCard.Root openDelay={100} closeDelay={100}>
          <HoverCard.Trigger asChild> */}
            <div className="mt-1 flex w-full items-center justify-between gap-4 px-2">
              <div className="text-xs text-brand-project-3">分判VA</div>
              <div className="line-clamp-1 flex-1 text-right text-xs font-bold text-brand-project-2">
                {/* {formatAmountWithCommas(op?.xmsjf ?? 0)} */}
                {formatAmountWithCommas(formatProjectAmount(vaApproveAmount))}万
              </div>
            </div>
            {/* </HoverCard.Trigger>
          <HoverCard.Content
            side="right"
            sideOffset={10}
            align="start"
            className="z-10 px-6 py-4 overflow-hidden rounded-lg shadow-2xl bg-slate-800/5 backdrop-blur-xl"
          >
            <h3 className="mb-2 text-sm font-bold underline">VA</h3>
            <div className="grid grid-cols-3 text-sm gap-x-8 gap-y-2"></div>
          </HoverCard.Content>
        </HoverCard.Root> */}
          </div>
        </div>

        <div className="relative">
          <img src={costManagement3} className="h-full w-auto object-contain" />

          <div className="absolute left-0 right-0 top-[2.75rem] space-y-1">
            <div className="grid w-full grid-cols-[1.2fr_2.2fr_1fr] gap-1.5 px-2">
              <div className="line-clamp-1 text-xs text-brand-project-3">
                业主VO
              </div>
              <div className="flex flex-1 items-center">
                <progress
                  className="[&::-moz-progress-bar]:bg-project-brand h-1.5 w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-brand-project"
                  value={percent(ownerApproveAmount, ownerApplyAmount)}
                  max={100}
                />
              </div>
              {/* <div className="h-1 w-[80px] bg-brand-project"></div> */}
              <div className="text-xs font-bold text-brand-project-2">
                {percent(ownerApproveAmount, ownerApplyAmount)}%
              </div>
            </div>

            <div className="grid w-full grid-cols-[1.2fr_2.2fr_1fr] gap-1.5 px-2">
              <div className="line-clamp-1 text-xs text-brand-project-3">
                总包VO
              </div>
              <div className="flex flex-1 items-center">
                <progress
                  className="[&::-moz-progress-bar]:bg-project-brand h-1.5 w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-brand-project"
                  value={percent(
                    contractorApproveAmount,
                    contractorApplyAmount,
                  )}
                  max={100}
                />
              </div>
              {/* <div className="h-1 w-[80px] bg-brand-project"></div> */}
              <div className="text-xs font-bold text-brand-project-2">
                {percent(contractorApproveAmount, contractorApplyAmount)}%
              </div>
            </div>

            <div className="grid w-full grid-cols-[1.2fr_2.2fr_1fr] gap-1.5 px-2">
              <div className="line-clamp-1 text-xs text-brand-project-3">
                分判VA
              </div>
              <div className="flex flex-1 items-center">
                <progress
                  className="[&::-moz-progress-bar]:bg-project-brand h-1.5 w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-brand-project"
                  value={percent(vaApproveAmount, vaApproveAmount)}
                  max={100}
                />
              </div>
              <div className="text-xs font-bold text-brand-project-2">
                {percent(vaApproveAmount, vaApproveAmount)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
