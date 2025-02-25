import { Column, ColumnConfig } from '@ant-design/plots'
import * as HoverCard from '@radix-ui/react-hover-card'
import * as Tabs from '@radix-ui/react-tabs'
import { createLazyFileRoute } from '@tanstack/react-router'
import {
  operationsPageQuery,
  operationsPageQuery$data,
} from '__generated__/operationsPageQuery.graphql'
import dayjs from 'dayjs'
import { ReactNode, useEffect, useRef, useState, useTransition } from 'react'
import { graphql, usePreloadedQuery } from 'react-relay'
import { ProjectSelect } from '~/components/dashboard/project-select'
import { SubTitle } from '~/components/project/sub-title'
import { Rhino } from '~/components/rhino'
import { MaterialStatusIcon } from '~/components/ui/material-status-icon'
import { TextScramble } from '~/components/ui/text-scramble'
import {
  formatProjectAmount,
  materialStatusIconColor,
  percent,
} from '~/lib/helper'
import { cn } from '~/lib/utils'
import { zhCN } from 'date-fns/locale'

import instantMessage from '~/assets/instant_message.png'
import b1 from '~/assets/svg/box1.png'
import b2 from '~/assets/svg/box2.png'
import b3 from '~/assets/svg/box3.png'
import b4 from '~/assets/svg/box4.png'
import b5 from '~/assets/svg/box5.png'
import top from '~/assets/svg/top.png'

import consumptionBg from '~/assets/svg/consumption_bg.png'
import consumptionBg2 from '~/assets/svg/consumption_bg2.png'

import projectProgressTitle from '~/assets/svg/project_progress_title.png'

import leftArrow from '~/assets/svg/left_arrow.png'
import rightArrow from '~/assets/svg/right_arrow.png'

import projectManagementLeft from '~/assets/svg/project_management_left.png'
import projectDelay from '~/assets/svg/project_delay.png'

import basicInfoBg from '~/assets/svg/basic_info_bg.png'
import basicInfoRowBg from '~/assets/svg/basic_info_row_bg.png'
import projectOverviewTab from '~/assets/svg/project_overview_tab.png'
import projectOverviewTabSelected from '~/assets/svg/project_overview_tab_selected.png'
import projectOverviewTitle from '~/assets/svg/project_overview_title.png'

import costDivider from '~/assets/svg/cost_divider.png'
import costIncome from '~/assets/svg/cost_income.png'

import materialsAlertBg from '~/assets/svg/materials_alert_bg.png'

import materialsLostIcon from '~/assets/svg/materials_lost_icon.png'

import drawingBottom from '~/assets/svg/drawing_bottom.png'
import drawingCenter from '~/assets/svg/drawing_center.png'
import drawingLeft from '~/assets/svg/drawing_left.png'
import drawingRight from '~/assets/svg/drawing_right.png'

import productionManagement1 from '~/assets/svg/production_management_1.png'
import productionManagement2 from '~/assets/svg/production_management_2.png'
import productionManagement3 from '~/assets/svg/production_management_3.png'
import productionManagement4 from '~/assets/svg/production_management_4.png'

import componentBottom from '~/assets/svg/component_bottom.png'
import componentTop from '~/assets/svg/component_top.png'

import quality from '~/assets/svg/quality.png'
import markCircle from '~/assets/svg/mark_circle.png'

import { UpdateProjectInput } from '__generated__/useUpdateProjectMutation.graphql'
import { Pencil, Trash2 } from 'lucide-react'
import { Calendar } from '~/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { useUpdateProject } from '~/hooks/use-update-project'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Toaster } from '~/components/ui/sonner'
import { toast } from 'sonner'
import { useOnClickOutside } from 'usehooks-ts'
import { Switcher } from '~/components/switcher'
import { motion } from 'motion/react'
import { GlowEffect } from '~/components/ui/glow-effect'
import { Progress } from '~/components/ui/progress'
import { ProcessManagement } from '~/components/operation/process-management'
import { formatAmountWithCommas } from '~/lib/helper'
import { Project } from '~/lib/project'

export const Route = createLazyFileRoute(
  '/__auth/__dashboard/__scaled/operations',
)({
  component: RouteComponent,
})

// 轉成千分位

function RouteComponent() {
  const data = usePreloadedQuery<operationsPageQuery>(
    graphql`
      query operationsPageQuery($userId: ID!) {
        node(id: $userId) {
          ... on User {
            projects(
              where: { isFinishedNEQ: true }
              orderBy: [{ field: CODE }]
            ) {
              edges {
                node {
                  id
                  name
                  code
                  manager
                  owner
                  jzs
                  mcn
                  consultant
                  areas
                  fsDate
                  opDate
                  startDate
                  endDate
                  mntyr
                  conType
                  cje
                  yye
                  xjl
                  xmglfYs
                  xmglfLj
                  xmsjf
                  ownerApplyCount
                  ownerApplyAmount
                  ownerApproveCount
                  ownerApproveAmount
                  contractorApplyCount
                  contractorApplyAmount
                  contractorApproveCount
                  contractorApproveAmount
                  installProgress
                  effectiveContractAmount
                  vaApplyAmount
                  vaApproveAmount
                  accumulatedStatutoryDeductions
                  accumulatedNonStatutoryDeductions
                  accumulatedNonStatutoryDeductionsPeriod
                  totalContractAmount
                  aluminumPlateBudgetPercentage
                  aluminumBudgetPercentage
                  glassBudgetPercentage
                  ironBudgetPercentage
                  milestonePlanYear
                  milestonePlanMonth
                  milestoneDoneYear
                  milestoneDoneMonth
                  pmArea
                  pmYearTarget
                  pmMonthTarget
                  pmYearActual
                  pmMonthActual
                  pmTotal
                  pmYesterday
                  unitInventoryTotal
                  unitComponentTotal
                  unitComponentProduction
                  unitComponentInstallation
                  materialLoss
                  designRatedWeight
                  processingWeight
                  itemStockWeight
                  palletsInStock
                  partsInStock
                  qualityScore
                  qualityRanking
                  bulkMaterialsTotalOrderQuantity
                  bulkMaterialsCompletedQuantity
                  bulkMaterialsUncompletedQuantity
                  planTotalCount
                  planOverdueCount
                  planOverdueMonthCount
                  diagramBdTotalCount
                  diagramBdFinishCount
                  diagramConstructionTotalCount
                  diagramConstructionFinishCount
                  diagramProcessingFinishCount
                  diagramProcessingTotalCount
                  diagramCApprovalRatioNumerator
                  diagramCApprovalRatioDenominator
                  projectStaffs(
                    first: 3
                    orderBy: { field: CREATED_AT, direction: DESC }
                  ) {
                    edges {
                      node {
                        installation
                        management
                        design
                        createdAt
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  )

  return (
    <>
      <Operation data={data} />
      <div className="dark">
        <Toaster position="top-right" />
      </div>
    </>
  )
}

function Operation({ data }: { data: operationsPageQuery$data }) {
  const navigate = Route.useNavigate()

  const defaultCode =
    Route.useSearch().code ?? data.node?.projects?.edges?.at(0)?.node?.code

  const defaultProjectIdx = 0
  const pj =
    data.node?.projects?.edges?.find((item) => item?.node?.code === defaultCode)
      ?.node ?? data.node?.projects?.edges?.at(defaultProjectIdx)?.node

  const prevProject = pj
    ? data.node?.projects?.edges?.at(
        data.node?.projects?.edges?.findIndex(
          (item) => item?.node?.code === pj?.code,
        ) - 1,
      )?.node
    : data.node?.projects?.edges?.at(
        defaultProjectIdx > 0 ? defaultProjectIdx - 1 : defaultProjectIdx,
      )?.node

  const nextProject = pj
    ? data.node?.projects?.edges?.at(
        data.node?.projects?.edges?.findIndex(
          (item) => item?.node?.code === pj?.code,
        ) + 1,
      )?.node
    : data.node?.projects?.edges?.at(
        defaultProjectIdx < data.node?.projects?.edges?.length - 1
          ? defaultProjectIdx + 1
          : defaultProjectIdx,
      )?.node

  const projectsWithRank = data.node?.projects?.edges
    ?.filter((e) => !!e?.node?.qualityScore)
    .sort((a, b) => (b?.node?.qualityScore ?? 0) - (a?.node?.qualityScore ?? 0))
  const totalRanked = projectsWithRank?.length ?? 0
  const projectRankIdx =
    projectsWithRank?.indexOf(
      projectsWithRank?.find((e) => e?.node?.code === pj?.code),
    ) ?? 0
  const projectRank = projectRankIdx + 1

  useEffect(() => {
    const handleLeftKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate({
          to: '/operations',
          search: { code: prevProject?.code },
          replace: true,
        })
      }
    }

    document.addEventListener('keydown', handleLeftKeyDown)

    return () => {
      document.removeEventListener('keydown', handleLeftKeyDown)
    }
  }, [prevProject])

  useEffect(() => {
    const handleRightKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        navigate({
          to: '/operations',
          search: { code: nextProject?.code },
          replace: true,
        })
      }
    }

    document.addEventListener('keydown', handleRightKeyDown)

    return () => {
      document.removeEventListener('keydown', handleRightKeyDown)
    }
  }, [nextProject])

  const ownerApplyCount = pj?.ownerApplyCount ?? 0
  const ownerApproveCount = pj?.ownerApproveCount ?? 0
  const contractorApplyCount = pj?.contractorApplyCount ?? 0
  const contractorApproveCount = pj?.contractorApproveCount ?? 0
  const ownerApplyAmount = pj?.ownerApplyAmount ?? 0
  const ownerApproveAmount = pj?.ownerApproveAmount ?? 0
  const contractorApplyAmount = pj?.contractorApplyAmount ?? 0
  const contractorApproveAmount = pj?.contractorApproveAmount ?? 0
  const installProgress = pj?.installProgress ?? 0
  const effectiveContractAmount = pj?.effectiveContractAmount ?? 0
  const vaApplyAmount = pj?.vaApplyAmount ?? 0
  const vaApproveAmount = pj?.vaApproveAmount ?? 0
  const accumulatedStatutoryDeductions = pj?.accumulatedStatutoryDeductions ?? 0
  const accumulatedNonStatutoryDeductions =
    pj?.accumulatedNonStatutoryDeductions ?? 0
  const accumulatedNonStatutoryDeductionsPeriod =
    pj?.accumulatedNonStatutoryDeductionsPeriod ?? 0
  const contractBudgetRevenue =
    ownerApproveAmount +
    contractorApproveAmount +
    ownerApplyAmount +
    contractorApplyAmount -
    (vaApplyAmount + vaApproveAmount) -
    (accumulatedStatutoryDeductions + accumulatedNonStatutoryDeductions)
  const totalContractAmount = pj?.totalContractAmount ?? 0
  const aluminumPlateBudgetPercentage = pj?.aluminumPlateBudgetPercentage ?? 0
  const aluminumBudgetPercentage = pj?.aluminumBudgetPercentage ?? 0
  const glassBudgetPercentage = pj?.glassBudgetPercentage ?? 0
  const ironBudgetPercentage = pj?.ironBudgetPercentage ?? 0
  const milestonePlanYear = pj?.milestonePlanYear || 0
  const milestonePlanMonth = pj?.milestonePlanMonth || 0
  const milestoneDoneYear = pj?.milestoneDoneYear || 0
  const milestoneDoneMonth = pj?.milestoneDoneMonth || 0

  const unitInventoryTotal = pj?.unitInventoryTotal || 0
  const unitComponentTotal = pj?.unitComponentTotal || 0
  const unitComponentProduction = pj?.unitComponentProduction || 0
  const unitComponentInstallation = pj?.unitComponentInstallation || 0
  const materialLoss = pj?.materialLoss || 0
  const designRatedWeight = pj?.designRatedWeight || 0
  const processingWeight = pj?.processingWeight || 0
  const itemStockWeight = pj?.itemStockWeight || 0
  const palletsInStock = pj?.palletsInStock || 0
  const partsInStock = pj?.partsInStock || 0
  const qualityScore = pj?.qualityScore || 0
  const qualityRanking = pj?.qualityRanking || 0
  const bulkMaterialsTotalOrderQuantity =
    pj?.bulkMaterialsTotalOrderQuantity || 0
  const bulkMaterialsCompletedQuantity = pj?.bulkMaterialsCompletedQuantity || 0
  const bulkMaterialsUncompletedQuantity =
    pj?.bulkMaterialsUncompletedQuantity || 0
  const planTotalCount = pj?.planTotalCount || 0
  const planOverdueCount = pj?.planOverdueCount || 0
  const planOverdueMonthCount = pj?.planOverdueMonthCount || 0

  return (
    <>
      <div className="absolute left-[14em] top-[0.4em]">
        <ProjectSelect data={data} defaultCode={defaultCode} />
      </div>

      <img src={top} className="w-full" />

      <div className="grid grid-cols-[1fr_1.8fr_1fr] gap-x-24 px-6">
        <section className="space-y-3">
          <ProcessManagement project={pj} />

          <div>
            <SubTitle>合约收支</SubTitle>

            <div className="bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2 shadow-lg">
              <div className="flex">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div
                    className={cn(
                      'font-bold',
                      accumulatedNonStatutoryDeductionsPeriod > 50_0000
                        ? 'text-red-600'
                        : 'text-brand-project',
                    )}
                  >
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {formatAmountWithCommas(
                        formatProjectAmount(
                          accumulatedNonStatutoryDeductionsPeriod,
                        ),
                      )}
                    </TextScramble>
                    万
                  </div>
                  <div className="text-xxs font-semibold text-slate-400">
                    本期非法定扣款
                  </div>
                </div>
                <img src={costDivider} className="h-16 opacity-60" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className={'font-bold text-brand-project'}>
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {formatAmountWithCommas(
                        formatProjectAmount(accumulatedNonStatutoryDeductions),
                      )}
                    </TextScramble>
                    万
                  </div>
                  <div className="text-xxs font-semibold text-slate-400">
                    累计非法定扣款
                  </div>
                </div>
                <img src={costDivider} className="h-16 opacity-60" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div
                    className={cn(
                      'font-bold',
                      percent(
                        accumulatedNonStatutoryDeductions,
                        totalContractAmount,
                      ) > 2
                        ? 'text-red-600'
                        : 'text-brand-project',
                    )}
                  >
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {`${percent(
                        accumulatedNonStatutoryDeductions,
                        totalContractAmount,
                      )}`}
                    </TextScramble>
                    %
                  </div>
                  <div className="text-xxs font-semibold text-slate-400">
                    累计非法定扣款占比
                  </div>
                </div>
              </div>
              <div className="relative mt-2 h-14">
                <img
                  src={costIncome}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute right-14 top-1/2 -translate-y-1/2">
                  <div className="flex items-baseline text-lg font-bold text-brand-project">
                    <TextScramble characterSet="0123456789" key={pj?.code}>
                      {formatAmountWithCommas(
                        formatProjectAmount(contractBudgetRevenue),
                      )}
                    </TextScramble>
                    <span className="ml-1 text-sm">万</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubTitle>材料预算预警</SubTitle>
            <div className="bg-gradient-to-tr from-[#0a3256] to-transparent px-1 pb-2 pt-2 shadow-lg">
              <div className="mt-1">
                <div className="flex gap-8 px-1">
                  <div className="flex items-center gap-1">
                    <MaterialStatusIcon className="h-3 w-3 text-red-600" />
                    <span className="text-xxs text-red-200">已超预算</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialStatusIcon className="h-3 w-3 text-yellow-500" />
                    <span className="text-xxs text-red-200">可能超预算</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MaterialStatusIcon className="h-3 w-3 text-green-400" />
                    <span className="text-xxs text-red-200">未超预算</span>
                  </div>
                </div>
              </div>

              <div className="relative mt-2">
                <img
                  src={materialsAlertBg}
                  className="absolute inset-0 h-14 w-full"
                />

                <div className="relative flex h-14 grid-cols-4 justify-around">
                  <div className="mx-auto flex items-center gap-1 text-ellipsis text-nowrap pb-1">
                    <MaterialStatusIcon
                      className={cn(
                        'h-3 w-3',
                        materialStatusIconColor(aluminumPlateBudgetPercentage),
                      )}
                    />
                    <span className="text-xxs text-red-200">铝板</span>
                    <div
                      className={cn(
                        'text-xs font-bold',
                        materialStatusIconColor(aluminumPlateBudgetPercentage),
                      )}
                    >
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${formatAmountWithCommas(aluminumPlateBudgetPercentage)}`}
                      </TextScramble>
                      <span className="ml-0.5 text-xxs">%</span>
                    </div>
                  </div>
                  <div className="mx-auto flex items-center gap-1 text-ellipsis text-nowrap pb-1">
                    <MaterialStatusIcon
                      className={cn(
                        'h-3 w-3',
                        materialStatusIconColor(aluminumBudgetPercentage),
                      )}
                    />
                    <span className="text-xxs text-red-200">铝型材</span>
                    <div
                      className={cn(
                        'text-xs font-bold',
                        materialStatusIconColor(aluminumBudgetPercentage),
                      )}
                    >
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${formatAmountWithCommas(aluminumBudgetPercentage)}`}
                      </TextScramble>
                      <span className="ml-0.5 text-xxs">%</span>
                    </div>
                  </div>
                  <div className="mx-auto flex items-center gap-1 text-ellipsis text-nowrap pb-1">
                    <MaterialStatusIcon
                      className={cn(
                        'h-3 w-3',
                        materialStatusIconColor(glassBudgetPercentage),
                      )}
                    />
                    <span className="text-xxs text-red-200">玻璃</span>
                    <div
                      className={cn(
                        'text-xs font-bold',
                        materialStatusIconColor(glassBudgetPercentage),
                      )}
                    >
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${formatAmountWithCommas(glassBudgetPercentage)}`}
                      </TextScramble>
                      <span className="ml-0.5 text-xxs">%</span>
                    </div>
                  </div>
                  <div className="mx-auto flex items-center gap-1 text-ellipsis text-nowrap pb-1">
                    <MaterialStatusIcon
                      className={cn(
                        'h-3 w-3',
                        materialStatusIconColor(ironBudgetPercentage),
                      )}
                    />
                    <span className="text-xxs text-red-200">铁型材</span>
                    <div
                      className={cn(
                        'text-xs font-bold',
                        materialStatusIconColor(ironBudgetPercentage),
                      )}
                    >
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${formatAmountWithCommas(ironBudgetPercentage)}`}
                      </TextScramble>
                      <span className="ml-0.5 text-xxs">%</span>
                    </div>
                  </div>
                </div>

                {/* <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                  <StatusIcon className="w-3 h-3 text-green-600" />
                  <span className="text-[9px] text-red-200">其它材料</span>
                  <span className="text-xs font-bold text-green-600">16%</span>
                </div> */}
              </div>
            </div>
          </div>

          <div>
            <SubTitle>库存情况</SubTitle>
            <div className="flex gap-6 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 shadow-lg">
              <div className="relative h-[4.8rem] flex-1">
                <img src={consumptionBg} className="absolute inset-0 my-auto" />
                <div className="absolute left-1/4 right-0 top-1/2 grid w-36 -translate-y-1/2 grid-cols-2 items-center gap-y-0 text-xs">
                  <div className="basis-1/3 font-bold text-[#a1cae3]">
                    单元件
                  </div>
                  <div className="basis-2/3 text-right font-bold text-yellow-500">
                    <TextScramble
                      as="span"
                      characterSet="0123456789"
                      key={pj?.code}
                    >
                      {formatAmountWithCommas(unitInventoryTotal)}
                    </TextScramble>
                    <span className="ml-1 text-xs">件</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[4.8rem] flex-1">
                <img
                  src={consumptionBg2}
                  className="absolute inset-0 my-auto"
                />
                <div className="absolute left-1/4 right-0 top-1/2 grid w-36 -translate-y-1/2 grid-cols-2 items-center gap-y-0.5 text-xs">
                  <div className="basis-1/3 font-bold text-[#a1cae3]">卡板</div>
                  <div className="basis-2/3 text-right font-bold text-yellow-500">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {`${formatAmountWithCommas(palletsInStock)}`}
                    </TextScramble>
                  </div>

                  <div className="basis-1/3 font-bold text-[#a1cae3]">散件</div>
                  <div className="basis-2/3 text-right font-bold text-yellow-500">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {`${formatAmountWithCommas(partsInStock)}`}
                    </TextScramble>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubTitle>套裁耗损展示</SubTitle>
            <div className="flex h-[4.8rem] items-center gap-x-6 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 shadow-lg">
              <div className="relative flex-1 overflow-hidden">
                <img src={consumptionBg} />
                <div className="absolute left-1/4 right-0 top-1/2 grid w-36 -translate-y-1/2 grid-cols-2 items-center gap-y-0.5 text-xs">
                  <div className="basis-1/3 font-bold text-[#a1cae3]">
                    套裁损耗
                  </div>
                  <div className="basis-2/3 text-right font-bold text-yellow-500">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {`${formatAmountWithCommas(
                        designRatedWeight - processingWeight,
                      )}`}
                    </TextScramble>
                  </div>

                  <div className="basis-1/3 font-bold text-[#a1cae3]">
                    套裁损耗率
                  </div>
                  <div className="basis-2/3 text-right font-bold text-yellow-500">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {`${
                        designRatedWeight > 0
                          ? formatAmountWithCommas(
                              ((designRatedWeight - processingWeight) /
                                designRatedWeight) *
                                100,
                            )
                          : 0
                      }`}
                    </TextScramble>
                    %
                  </div>
                </div>
              </div>
              <div className="relative flex-1">
                <img src={consumptionBg2} />
                <div className="absolute left-1/4 right-0 top-1/2 grid w-36 -translate-y-1/2 grid-cols-2 items-center gap-y-0 text-xs">
                  <div className="basis-1/3 font-bold text-[#a1cae3]">
                    铝型材余料
                  </div>
                  <div className="basis-2/3 text-right font-bold text-yellow-500">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {`${formatAmountWithCommas(itemStockWeight)}`}
                    </TextScramble>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubTitle>项目物料损失</SubTitle>
            <div className="flex h-[5rem] items-center gap-6 bg-gradient-to-tr from-[#0a3256] to-transparent px-6 shadow-lg">
              <img src={materialsLostIcon} className="h-14 w-auto" />

              <div className="flex flex-1 items-baseline justify-between px-6">
                <span className="text-sm text-brand-project/70">
                  损失累计金额
                </span>
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  className="text-2xl font-bold text-brand-project"
                >
                  {formatAmountWithCommas(materialLoss)}
                </TextScramble>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-2">
          <img src={instantMessage} />
          <div className="mt-2 grid grid-cols-5 gap-x-3 overflow-hidden">
            {/* 成交额 */}
            <div className="relative flex justify-center">
              <img
                src={b1}
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute top-5 text-lg font-bold">成交额</div>
              <div className="relative h-60 pt-[110%] text-xl font-bold text-brand-project">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  as="span"
                >
                  {formatAmountWithCommas(formatProjectAmount(pj?.cje))}
                </TextScramble>
                <span className="ml-1 text-sm">万</span>
              </div>
            </div>

            {/* 营业额 */}
            <div className="relative flex justify-center">
              <img
                src={b2}
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute top-5 text-lg font-bold">营业额</div>
              <div className="relative h-60 pt-[110%] text-xl font-bold text-brand-project">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  as="span"
                >
                  {formatAmountWithCommas(formatProjectAmount(pj?.yye))}
                </TextScramble>
                <span className="ml-1 text-sm">万</span>
              </div>
            </div>

            {/* 现金流 */}
            <div className="relative flex justify-center">
              <img
                src={b3}
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute top-5 text-lg font-bold">现金流</div>
              <div className="relative h-60 pt-[110%] text-xl font-bold text-brand-project">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  as="span"
                >
                  {formatAmountWithCommas(formatProjectAmount(pj?.xjl))}
                </TextScramble>
                <span className="ml-1 text-sm">万</span>
              </div>
            </div>

            {/* 项目管理费 */}
            <div className="relative flex justify-center">
              <img
                src={b4}
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute top-5 text-lg font-bold">项目管理费</div>
              <div className="relative h-60 w-[80%] space-y-1 pt-[105%]">
                <div className="flex items-baseline justify-between">
                  <div className="text-xs">預算</div>
                  <div className="text-sm font-bold text-brand-project">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {formatAmountWithCommas(formatProjectAmount(pj?.xmglfYs))}
                    </TextScramble>
                    <span className="ml-0.5 text-xs">万</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-xs">累计</div>
                  <div className="text-left text-sm font-bold text-brand-project">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))}
                    </TextScramble>
                    <span className="ml-0.5 text-xs">万</span>
                  </div>
                </div>
              </div>
              {/* <div className="relative pt-[114%] text-xl font-bold text-brand-project">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  as="span"
                >
                  {formatAmountWithCommas(520)}
                </TextScramble>
                <span className="ml-1 text-sm">万</span>
              </div> */}
            </div>

            {/* 项目设计费 */}
            <div className="relative flex justify-center">
              <img
                src={b5}
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute top-5 text-lg font-bold">项目设计费</div>
              <div className="relative h-60 pt-[110%] text-xl font-bold text-brand-project">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  as="span"
                >
                  {formatAmountWithCommas(formatProjectAmount(pj?.xmsjf))}
                </TextScramble>
                <span className="ml-1 text-sm">万</span>
              </div>
            </div>
          </div>

          <img src={projectProgressTitle} className="mx-auto mt-3 w-[65%]" />
          {/* <img src={projectManagementTitle} className="mx-auto mt-2 w-44" /> */}

          <div className="relative">
            <img
              src={leftArrow}
              className="absolute -left-[4rem] top-1/2 h-12 w-auto -translate-y-1/2 cursor-pointer"
              onClick={() => {
                navigate({
                  to: '.',
                  search: { code: prevProject?.code },
                })
              }}
            />
            <img
              src={rightArrow}
              className="absolute -right-[4rem] top-1/2 h-12 w-auto -translate-y-1/2 cursor-pointer"
              onClick={() => {
                navigate({
                  to: '.',
                  search: { code: nextProject?.code },
                })
              }}
            />
            <div className="mt-2 flex gap-12">
              <div className="flex w-full flex-col">
                <div className="relative h-[2.5em]">
                  <img
                    src={projectManagementLeft}
                    className="absolute inset-0"
                  />
                  <div className="absolute left-20 top-1/2 -translate-y-1/2 text-sm font-bold">
                    年度里程碑指标
                  </div>
                  {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-yellow-500">
                    6%
                  </div> */}
                </div>
                <div className="relative flex h-[3em] w-[85%] items-center justify-around gap-6 self-end px-2 py-2.5 shadow-lg">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      累计完成
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${milestoneDoneYear}`}
                      </TextScramble>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      累计占比
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${percent(milestoneDoneYear, milestonePlanYear)}`}
                      </TextScramble>
                      <span className="ml-1 text-xs">%</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      当月完成
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${milestoneDoneMonth}`}
                      </TextScramble>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      当月占比
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${percent(milestoneDoneMonth, milestonePlanMonth)}`}
                      </TextScramble>
                      <span className="ml-1 text-xs">%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="relative h-[2.5em]">
                  <img src={projectDelay} className="absolute inset-0" />
                  <div className="absolute left-20 top-1/2 -translate-y-1/2 text-sm font-bold">
                    四位一体计划
                  </div>
                  <div className="absolute right-14 top-1/2 -translate-y-1/2 text-xxs text-white/50">
                    计划总数
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-yellow-500">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      as="span"
                    >
                      {`${planTotalCount}`}
                    </TextScramble>
                  </div>
                </div>
                <div className="relative flex h-[3em] w-[85%] items-center justify-evenly gap-6 self-end px-2 py-2.5 shadow-lg">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      累计超期
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${planOverdueCount}`}
                      </TextScramble>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      累计占比
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${percent(planOverdueCount / planTotalCount)}`}
                      </TextScramble>
                      <span className="ml-1 text-xs">%</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      当月超期
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${planOverdueMonthCount}`}
                      </TextScramble>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      当月占比
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      <TextScramble
                        characterSet="0123456789"
                        key={pj?.code}
                        as="span"
                      >
                        {`${percent(planOverdueMonthCount / planTotalCount)}`}
                      </TextScramble>
                      <span className="ml-1 text-xs">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img src={projectOverviewTitle} className="mx-auto mt-3 w-[65%]" />

          <div className="mt-2 flex gap-6">
            {/* <div className="flex h-[340px] flex-1 flex-col justify-center gap-4"> */}
            {/* <img src={projectOverviewLeft} /> */}
            {/* <div className="mx-auto h-full w-[85%]">
                <Rhino />
              </div>
              <img src={projectOverviewTab} className="mx-auto w-[80%]" /> */}
            <ProjectOverviewTab pj={pj} defaultCode={defaultCode} />
            {/* </div> */}
            <div className="relative flex-1">
              {/* <img src={basicInfo} className="mx-auto w-[90%]" /> */}
              <div className="mx-auto items-center overflow-hidden">
                <img src={basicInfoBg} className="absolute h-[340px] w-full" />
                <div className="relative mx-auto flex h-full w-[94%] flex-1 flex-col justify-center gap-1 pt-2.5">
                  <BasicInfoItem title="项目名称">
                    {pj?.name || '-'}
                  </BasicInfoItem>
                  <BasicInfoItem title="客户">{pj?.owner || '-'}</BasicInfoItem>
                  <BasicInfoItem title="建筑师">{pj?.jzs || '-'}</BasicInfoItem>
                  <BasicInfoItem title="总承包商">
                    {pj?.mcn || '-'}
                  </BasicInfoItem>
                  <BasicInfoItem title="幕墙顾问">
                    {pj?.consultant || '-'}
                  </BasicInfoItem>
                  <BasicInfoItem title="工程规模">
                    {pj?.areas ? (
                      <span className="text-brand-project">
                        {pj?.areas}m<sup>2</sup>
                      </span>
                    ) : (
                      '-'
                    )}
                  </BasicInfoItem>
                  <BasicInfoItem title="中标形式">
                    {pj?.conType || '-'}
                  </BasicInfoItem>
                  <BasicInfoItem title="开工日期">
                    {pj?.startDate ? dayjs(pj?.startDate).format('LL') : '-'}
                  </BasicInfoItem>
                  {/* <BasicInfoItem title="FS日期">
                    {pj?.fsDate ? dayjs(pj?.fsDate).format("LL") : "-"}
                  </BasicInfoItem> */}
                  <EditableBasicInfoItem
                    title="FS日期"
                    field="fsDate"
                    projectId={pj?.id}
                    value={pj?.fsDate}
                  >
                    {pj?.fsDate ? dayjs(pj?.fsDate).format('LL') : '-'}
                  </EditableBasicInfoItem>
                  <EditableBasicInfoItem
                    title="OP日期"
                    field="opDate"
                    projectId={pj?.id}
                    value={pj?.opDate}
                  >
                    {pj?.opDate ? dayjs(pj?.opDate).format('LL') : '-'}
                  </EditableBasicInfoItem>
                  <BasicInfoItem title="竣工日期">
                    {pj?.endDate ? dayjs(pj?.endDate).format('LL') : '-'}
                  </BasicInfoItem>
                  <BasicInfoItem title="维修保养期">
                    {pj?.mntyr || '-'}
                  </BasicInfoItem>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <DrawingProgress pj={pj} />

          <ProductionManagement pj={pj} />

          <div>
            <SubTitle>单元件与散料</SubTitle>
            <div className="space-y-2 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-1.5 shadow-lg">
              <div className="relative h-14">
                <img
                  src={componentTop}
                  className="absolute inset-0 h-auto w-full object-cover"
                />
                <div className="relative ml-24 grid h-full w-[70%] grid-cols-3 items-center pt-1">
                  <div className="text-center">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      className="font-bold text-brand-project-2"
                    >
                      {`${formatAmountWithCommas(unitComponentTotal)}`}
                    </TextScramble>
                    <div className="text-xxs opacity-80">总数 (件)</div>
                  </div>
                  <div className="text-center">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      className="font-bold text-brand-project-2"
                    >
                      {`${formatAmountWithCommas(unitComponentProduction)}`}
                    </TextScramble>
                    <div className="text-xxs opacity-80">生产数 (件)</div>
                  </div>
                  <div className="text-center">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      className="font-bold text-brand-project-2"
                    >
                      {`${formatAmountWithCommas(unitComponentInstallation)}`}
                    </TextScramble>
                    <div className="text-xxs opacity-80">安装数 (件)</div>
                  </div>
                </div>
              </div>

              <div className="relative h-14">
                <img
                  src={componentBottom}
                  className="absolute inset-0 h-auto w-full object-cover"
                />
                <div className="relative ml-24 grid h-full w-[70%] grid-cols-3 items-center pt-1">
                  <div className="text-center">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      className="font-bold text-brand-project-2"
                    >
                      {`${formatAmountWithCommas(bulkMaterialsTotalOrderQuantity)}`}
                    </TextScramble>
                    <div className="text-xxs opacity-80">订单总数量</div>
                  </div>
                  <div className="text-center">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      className="font-bold text-brand-project-2"
                    >
                      {`${formatAmountWithCommas(bulkMaterialsCompletedQuantity)}`}
                    </TextScramble>
                    <div className="text-xxs opacity-80">完成数量</div>
                  </div>
                  <div className="text-center">
                    <TextScramble
                      characterSet="0123456789"
                      key={pj?.code}
                      className="font-bold text-brand-project-2"
                    >
                      {`${formatAmountWithCommas(bulkMaterialsUncompletedQuantity)}`}
                    </TextScramble>
                    <div className="text-xxs opacity-80">未完成数量</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubTitle>近2季度 质量内审分数</SubTitle>
            {/* <div className="relative bg-gradient-to-tr from-[#0a3256] to-transparent shadow-lg"> */}
            <img src={quality} className="h-[6rem] w-full object-cover" />
            {/* </div> */}
          </div>

          <div>
            <SubTitle>近2季度 安全内审分数</SubTitle>
            {/* <div className="bg-gradient-to-tr from-[#0a3256] to-transparent shadow-lg"> */}
            {/* <img src={safty} className="h-[6rem] w-full object-cover" /> */}
            {/* </div> */}
            <div className="h-24 space-y-1 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 shadow-lg">
              <div className="flex h-24 gap-3">
                <div className="relative flex h-24 basis-1/4 items-center justify-center">
                  <div className="relative h-[64px] w-[64px] rounded-full">
                    <GlowEffect
                      colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
                      // colors={[
                      //   "#082f49",
                      //   "#0a3b5c",
                      //   "#0c476f",
                      //   "#0e5382",
                      //   "#0f5f95",
                      //   "#116ba8",
                      // ]}
                      // colors={["#082f49"]}
                      mode="colorShift"
                      blur="medium"
                      duration={4}
                    />
                    {/* <img
                      src={markCircle}
                      className="absolute inset-0 object-contain w-full h-full"
                    /> */}
                    <div className="relative flex h-full flex-col items-center justify-center rounded-full border-zinc-300/40 px-4 py-3 text-sm font-bold text-brand-project-2">
                      <FlippingCard
                        key={pj?.code}
                        front={qualityScore}
                        back={
                          <span>
                            <span
                              className={cn(
                                totalRanked - projectRank <= 3 &&
                                  'text-red-500',
                              )}
                            >
                              {projectRank}
                            </span>
                            <span>/</span>
                            <span>{totalRanked}</span>
                          </span>
                        }
                        animated={projectRankIdx > 0}
                      />
                      {/* {qualityScore} */}
                    </div>
                  </div>
                </div>
                <div className="basis-3/4 gap-y-2 space-y-1 py-2 pr-2 text-xxs text-white/70">
                  {/* <img src={safty} className="object-cover w-full h-full" /> */}
                  <div className="flex items-center justify-between">
                    <div>项目主要安全问题</div>
                    <div className="mr-2 text-[9px] text-brand/80">48%</div>
                  </div>
                  <Progress value={48} className="h-1 w-full bg-sky-950" />
                  <div className="flex items-center justify-between">
                    <div>项目近2季度工伤情况</div>
                    <div className="mr-2 text-[9px] text-brand/80">11%</div>
                  </div>
                  <Progress value={11} className="h-1 w-full bg-sky-950" />
                  <div className="flex items-center justify-between">
                    <div>项目千人工伤意外率 </div>
                    <div className="mr-2 text-[9px] text-brand/80">4%</div>
                  </div>
                  <Progress value={4} className="h-1 w-full bg-sky-950" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function DrawingProgress({ pj }: { pj: Project }) {
  const diagramProcessingFinishCount = pj?.diagramProcessingFinishCount || 0
  const diagramProcessingTotalCount = pj?.diagramProcessingTotalCount || 0
  const diagramCApprovalRatioNumerator = pj?.diagramCApprovalRatioNumerator || 0
  const diagramCApprovalRatioDenominator =
    pj?.diagramCApprovalRatioDenominator || 0
  const diagramBdTotalCount = pj?.diagramBdTotalCount || 0
  const diagramBdFinishCount = pj?.diagramBdFinishCount || 0
  const diagramConstructionTotalCount = pj?.diagramConstructionTotalCount || 0
  const diagramConstructionFinishCount = pj?.diagramConstructionFinishCount || 0

  return (
    <div>
      <SubTitle>图纸进度管理</SubTitle>
      <div className="bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-1.5 shadow-lg">
        <div className="flex gap-1">
          <div className="relative">
            <img src={drawingLeft} />
            <div className="absolute left-1/2 top-[3.75em] flex flex-col gap-y-[0.5em] text-xxs text-yellow-500">
              <TextScramble characterSet="0123456789" as="span">
                {`${formatAmountWithCommas(diagramBdFinishCount)}`}
              </TextScramble>

              <TextScramble characterSet="0123456789" as="span">
                {`${formatAmountWithCommas(diagramBdTotalCount)}`}
              </TextScramble>
            </div>
          </div>

          <div className="relative">
            <img src={drawingCenter} />
            <div className="absolute left-1/2 top-[3.75em] flex flex-col gap-y-[0.5em] text-xxs text-yellow-500">
              <TextScramble characterSet="0123456789" as="span">
                {`${formatAmountWithCommas(diagramConstructionFinishCount)}`}
              </TextScramble>

              <TextScramble characterSet="0123456789" as="span">
                {`${formatAmountWithCommas(diagramConstructionTotalCount)}`}
              </TextScramble>
            </div>
          </div>

          <div className="relative">
            <img src={drawingRight} />
            <div className="absolute left-1/2 top-[3.75em] flex flex-col gap-y-[0.5em] text-xxs text-yellow-500">
              <TextScramble characterSet="0123456789" as="span">
                {`${formatAmountWithCommas(diagramProcessingFinishCount)}`}
              </TextScramble>

              <TextScramble characterSet="0123456789" as="span">
                {`${formatAmountWithCommas(diagramProcessingTotalCount)}`}
              </TextScramble>
            </div>
          </div>
        </div>
        <div className="relative mt-0.5">
          <img src={drawingBottom} />
          <div className="absolute right-[7em] top-[1em] flex flex-col gap-y-[0.5em] text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" as="span">
              {`${formatAmountWithCommas(diagramCApprovalRatioNumerator)}`}
            </TextScramble>

            <TextScramble characterSet="0123456789" as="span">
              {`${formatAmountWithCommas(diagramCApprovalRatioDenominator)}`}
            </TextScramble>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductionManagement({ pj }: { pj: Project }) {
  const pmArea = pj?.pmArea || 0
  const pmYearTarget = pj?.pmYearTarget || 0
  const pmMonthTarget = pj?.pmMonthTarget || 0
  const pmYearActual = pj?.pmYearActual || 0
  const pmMonthActual = pj?.pmMonthActual || 0
  const pmTotal = pj?.pmTotal || 0
  const pmYesterday = pj?.pmYesterday || 0

  return (
    <div>
      <SubTitle>生产管理</SubTitle>
      <div className="space-y-1 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-1.5 shadow-lg">
        <div className="relative h-11">
          <img src={productionManagement1} className="absolute inset-0" />
          <div className="absolute left-1/2 top-[0.35rem] text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" key={pj?.code} as="span">
              {`${formatAmountWithCommas(pmArea)}`}
            </TextScramble>
          </div>
          <div className="absolute bottom-1.5 left-1/2 text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" key={pj?.code} as="span">
              {`${formatAmountWithCommas(pmTotal)}`}
            </TextScramble>
          </div>
        </div>
        <div className="relative h-11">
          <img src={productionManagement2} />
          <div className="absolute left-1/2 top-[0.35rem] text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" key={pj?.code} as="span">
              {`${formatAmountWithCommas(pmYearTarget)}`}
            </TextScramble>
          </div>
          <div className="absolute bottom-1.5 left-1/2 text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" key={pj?.code} as="span">
              {`${formatAmountWithCommas(pmYearActual)}`}
            </TextScramble>
          </div>
        </div>
        <div className="relative h-11">
          <img src={productionManagement3} />
          <div className="absolute left-1/2 top-[0.35rem] text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" key={pj?.code} as="span">
              {`${formatAmountWithCommas(pmMonthTarget)}`}
            </TextScramble>
          </div>
          <div className="absolute bottom-1.5 left-1/2 text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" key={pj?.code} as="span">
              {`${formatAmountWithCommas(pmMonthActual)}`}
            </TextScramble>
          </div>
        </div>
        <div className="relative h-7">
          <img src={productionManagement4} />
          <div className="absolute left-1/2 top-1.5 text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" key={pj?.code} as="span">
              {`${formatAmountWithCommas(pmYesterday)}`}
            </TextScramble>
          </div>
        </div>
      </div>
    </div>
  )
}

const FlippingCard = ({
  front,
  back,
  animated,
}: {
  front: string | number
  back: ReactNode
  animated: boolean
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (!animated) return
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [animated])

  return (
    <motion.div
      className="card-container rounded-full bg-sky-950"
      style={{
        // width: "36px",
        // height: "36px",
        perspective: '1000px', // Adds depth for 3D animation
        padding: '2.2rem',
      }}
    >
      <img
        src={markCircle}
        className="absolute inset-0 h-full w-auto object-contain"
      />
      <motion.div
        className="card"
        animate={{ rotateY: isFlipped ? 180 : 0 }} // Animates the flip
        transition={{ duration: 1 }} // Controls the flip speed
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d', // Enables 3D effect
        }}
      >
        {/* Front of the card */}
        <motion.div
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            width: '100%',
            height: '100%',
            // backgroundColor: "blue",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // borderRadius: 10,
            // border: "1px solid red",
          }}
        >
          {front}
        </motion.div>

        {/* Back of the card */}
        <motion.div
          style={{
            position: 'absolute',
            backfaceVisibility: 'hidden',
            width: '100%',
            height: '100%',
            // backgroundColor: "red",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            rotateY: 180,
            // borderRadius: 10,
            // border: "1px solid green",
          }}
        >
          {back}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function BasicInfoItem({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="relative py-1">
      <img
        src={basicInfoRowBg}
        className="absolute inset-0 mx-auto h-full w-full"
      />
      <div className="relative left-12 flex h-[15px] w-[19rem] items-center">
        <div className="w-20 text-xxs">{title}</div>
        <span className="line-clamp-1 flex-1 text-xxs text-brand-project">
          {children}
        </span>
      </div>
    </div>
  )
}

function EditableBasicInfoItem({
  projectId,
  title,
  children,
  field,
  value,
}: {
  projectId?: string
  field: 'fsDate' | 'opDate'
  title: string
  children: ReactNode
  value?: string
}) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [commitMutation, commitInFlight] = useUpdateProject()
  // const [date] = useState<Date>();

  const onEditing = (editing: boolean) => {
    setEditing(editing)
    setOpen(editing)
  }

  const onSubmit = (date: Date | undefined) => {
    if (commitInFlight || !projectId) return
    commitMutation({
      variables: {
        id: projectId,
        input: {
          [field]: date,
        },
      },
      onCompleted: () => {
        onEditing(false)
        setOpen(false)
        toast.success('已更新')
      },
    })
  }

  const onClear = () => {
    if (commitInFlight || !projectId) return
    const input: UpdateProjectInput = {}
    if (field == 'fsDate') {
      input.clearFsDate = true
    } else if (field == 'opDate') {
      input.clearOpDate = true
    }
    commitMutation({
      variables: {
        id: projectId,
        input,
      },
      onCompleted: () => {
        onEditing(false)
        setOpen(false)
        toast.success('已清除')
      },
    })
  }

  return (
    <div className="relative py-1">
      <img
        src={basicInfoRowBg}
        className="absolute inset-0 mx-auto h-full w-full"
      />
      <div className="group relative left-12 flex h-[15px] w-[19rem] items-center">
        <div className="w-20 text-xxs">{title}</div>
        <Popover open={open} onOpenChange={onEditing}>
          <PopoverTrigger asChild>
            <div className="flex flex-1 cursor-pointer items-center justify-between">
              {editing ? (
                <>
                  <span className="flex-1 rounded border border-brand-project bg-transparent px-1 text-xxs text-brand-project">
                    请选择日期&#44; 点击周围或ESC取消
                  </span>
                </>
              ) : (
                <>
                  <span className="line-clamp-1 text-xxs text-brand-project">
                    {children}
                  </span>

                  <Pencil
                    size={12}
                    className="text-brand-project opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="dark w-auto p-0">
            <Calendar
              locale={zhCN}
              className="rounded-lg border border-sky-900 bg-sky-800/50 font-bold text-white shadow-xl"
              classNames={{
                day_today: 'bg-sky-700 hover:bg-sky-600',
                day: cn(
                  buttonVariants({ variant: 'ghost' }),
                  'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-sky-900',
                ),
              }}
              mode="single"
              // selected={date}
              onSelect={onSubmit}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {value && !editing && (
          <Trash2
            size={12}
            className="ml-2 cursor-pointer text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={onClear}
          />
        )}
      </div>
    </div>
  )
}

function ProjectOverviewTab({
  pj,
  defaultCode,
}: {
  pj?: any
  defaultCode?: string
}) {
  const tabs = ['形象进度', 'BIM模型', '地盘人员分布']
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const [, startTransition] = useTransition()
  const { code } = Route.useSearch()

  const onChange = (tab: string) => {
    startTransition(() => {
      setSelectedTab(tab)
    })
  }

  return (
    <Tabs.Root
      className="relative mx-auto flex flex-1 flex-col p-1"
      defaultValue={selectedTab}
    >
      <div className="mx-auto w-[90%] flex-1 self-stretch overflow-hidden">
        <Tabs.Content value={tabs[0]} className="relative h-full">
          {<ProjectImage key={code} code={pj ? pj.code : defaultCode} />}
        </Tabs.Content>

        <Tabs.Content value={tabs[1]} className="relative h-[280px] w-full">
          <Rhino />
        </Tabs.Content>

        <Tabs.Content value={tabs[2]} className="h-[280px] w-full">
          <StaffDistribution
            data={pj?.projectStaffs?.edges?.map((edge: any) => edge.node)}
          />
        </Tabs.Content>
      </div>

      <Tabs.List className="relative mx-auto mt-4 grid h-8 w-[85%] grid-cols-3">
        <img src={projectOverviewTab} className="absolute inset-0 h-8 w-full" />
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab} value={tab} onClick={() => onChange(tab)}>
            <div className="relative flex h-8 items-center justify-center">
              {selectedTab == tab && (
                <img
                  src={projectOverviewTabSelected}
                  className="absolute inset-0 h-8"
                />
              )}
              <div className="relative text-xs">{tab}</div>
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

function StaffDistribution(props: { data: any }) {
  const data = []

  for (const node of props.data) {
    data.push({
      name: '安裝人員',
      number: node.installation
        ? formatAmountWithCommas(node.installation)
        : '0',
      month: dayjs(node.createdAt).format('YYYY年MMM'),
    })
    data.push({
      name: '管理人員',
      number: node.management ? formatAmountWithCommas(node.management) : '0',
      month: dayjs(node.createdAt).format('YYYY年MMM'),
    })
    data.push({
      name: '設計人員',
      number: node.design ? formatAmountWithCommas(node.design) : '0',
      month: dayjs(node.createdAt).format('YYYY年MMM'),
    })
  }

  const config = {
    theme: 'classicDark',
    data,
    xField: 'month',
    yField: 'number',
    colorField: 'name',
    group: true,
    // style: {
    //   inset: 5,
    // },
    y: {
      domain: [0, 0.5],
    },
    // axis: {
    //   x: {
    //     titleSroke: "white",
    //   },
    // },
    legend: {
      color: {
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
    // label: {
    //   fill: "white",
    //   position: "outside",
    // },
    onReady: ({ chart }) => {
      try {
        chart.on('afterrender', () => {
          chart.emit('legend:filter', {
            data: {
              channel: 'color',
              values: ['安裝人員', '管理人員', '設計人員'],
            },
          })
        })
      } catch (e) {
        console.error(e)
      }
    },
  } satisfies ColumnConfig
  return <Column {...config} />
}

function ProjectImage({ code }: { code?: string }) {
  const [error, setError] = useState(false)
  const [editing, setEditing] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  useOnClickOutside(ref, () => setEditing(false))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const res = await fetch(`/api/v1/projects/${code}/image`, {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        setEditing(false)
        setError(false)
        toast.success('上传成功')
      } else {
        toast.error('上传失败')
      }
    } catch (e) {
      console.error(e)
      toast.error('上传失败')
    }
  }

  return (
    <div className="group relative mx-auto h-[280px] w-full" ref={ref}>
      {error && !editing && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          没有图片
        </div>
      )}
      {!error && !editing && code && (
        <img
          src={`/static/projects/${code}/${code}.png?t=${Date.now()}`}
          className="mx-auto h-[280px] w-auto object-contain"
          onError={() => setError(true)}
        />
      )}

      {editing ? (
        <div className="flex h-full items-center px-2">
          <form onSubmit={onSubmit} className="dark">
            <Label htmlFor="picture">更换图片</Label>
            <Input
              type="file"
              name="files"
              placeholder="上传图片"
              required
              accept="image/png,image/jpeg,image/jpg"
            />
            <Button
              type="submit"
              variant="default"
              className="bg-sky-900 hover:bg-sky-700"
              size={'sm'}
            >
              上传
            </Button>
            <Button
              className="ml-2 mt-4 text-red-500 hover:bg-red-800/20"
              onClick={() => setEditing(false)}
              type="button"
              variant="ghost"
              size={'sm'}
            >
              取消
            </Button>
          </form>
        </div>
      ) : (
        <Button
          className="absolute right-0 top-0 bg-sky-900 opacity-0 hover:bg-sky-700 group-hover:opacity-100"
          onClick={() => setEditing(true)}
          size={'icon'}
        >
          <Pencil />
        </Button>
      )}
    </div>
  )
}
