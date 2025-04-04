import { createLazyFileRoute } from "@tanstack/react-router";
import * as HoverCard from "@radix-ui/react-hover-card";

// import PH from "~/assets/svg/header1.svg";
import b1 from "~/assets/svg/box1.png";
import b2 from "~/assets/svg/box2.png";
import b3 from "~/assets/svg/box3.png";
import b4 from "~/assets/svg/box4.png";
import b5 from "~/assets/svg/box5.png";
import top from "~/assets/svg/top.png";
// import instantMessage from "~/assets/instant_message.png";

import projectManagementTitle from "~/assets/svg/project_management_title.png";
import projectProgressTitle from "~/assets/svg/project_progress_title.png";

import projectManagementLeft from "~/assets/svg/project_management_left.png";
import projectManagementRight from "~/assets/svg/project_management_right.png";

import basicInfoBg from "~/assets/svg/basic_info_bg.png";
import basicInfoRowBg from "~/assets/svg/basic_info_row_bg.png";
import projectOverviewTab from "~/assets/svg/project_overview_tab.png";
import projectOverviewTabSelected from "~/assets/svg/project_overview_tab_selected.png";
import projectOverviewTitle from "~/assets/svg/project_overview_title.png";

import costManagement1 from "~/assets/svg/cost_management_1.png";
import costManagement2 from "~/assets/svg/cost_management_2.png";
import costManagement3 from "~/assets/svg/cost_management_3.png";

import costDivider from "~/assets/svg/cost_divider.png";
import costIncome from "~/assets/svg/cost_income.png";

import materialsAlertBg from "~/assets/svg/materials_alert_bg.png";

import stockLeft from "~/assets/svg/stock_left.png";
import stockRight from "~/assets/svg/stock_right.png";

import tailoringLeft from "~/assets/svg/tailoring_left.png";
import tailoringRight from "~/assets/svg/tailoring_right.png";

import materialsLostIcon from "~/assets/svg/materials_lost_icon.png";

import drawingBottom from "~/assets/svg/drawing_bottom.png";
import drawingCenter from "~/assets/svg/drawing_center.png";
import drawingLeft from "~/assets/svg/drawing_left.png";
import drawingRight from "~/assets/svg/drawing_right.png";

import productionManagement1 from "~/assets/svg/production_management_1.png";
import productionManagement2 from "~/assets/svg/production_management_2.png";
import productionManagement3 from "~/assets/svg/production_management_3.png";
import productionManagement4 from "~/assets/svg/production_management_4.png";

import componentBottom from "~/assets/svg/component_bottom.png";
import componentTop from "~/assets/svg/component_top.png";

import quality from "~/assets/svg/quality.png";
import safty from "~/assets/svg/safty.png";

import hmrtImg from "~/assets/hmrt.jpg";
import { SubTitle } from "../project/sub-title";
import { Skeleton } from "../ui/skeleton";
import { MaterialStatusIcon } from "../ui/status-icon";

export function OperationSkeleton() {
  return (
    <div className="min-h-dvh">
      <div className="absolute left-5 top-2">
        {/* <ProjectSelect projects={data} defaultCode={defaultCode} /> */}
      </div>

      <img src={top} className="w-full" />
      {/* </header> */}
      <div className="grid grid-cols-[1fr_1.8fr_1fr] gap-x-24 px-6">
        <section className="space-y-3">
          <div>
            <SubTitle>成本管理</SubTitle>
            {/* <img src={headerLeft1} /> */}
            {/* <div className="grid h-[calc(100%-36px)] grid-cols-[1fr_1fr_2fr] gap-x-4 bg-gradient-to-tr from-[#0a3256] to-transparent p-4">
                  <div className="bg-[#021734]"></div>
                  <div className="bg-[#021734]"></div>
                  <div className="bg-[#021734]"></div>
                </div> */}
            <div className="grid grid-cols-[1fr_1fr_1.525fr] gap-1 bg-gradient-to-tr from-[#0a3256] to-transparent p-2 shadow-lg">
              <div className="relative">
                <img
                  src={costManagement1}
                  className="absolute inset-0 h-full w-auto object-contain"
                />

                <div className="absolute left-0 right-0 top-[2.75rem]">
                  <div className="flex cursor-pointer items-center justify-between gap-4 px-2">
                    <div className="text-xs text-brand-project-3">业主VO</div>
                    <div className="text-xs font-bold text-brand-project-2">
                      <Skeleton className="h-1.5 w-12" />
                    </div>
                  </div>
                  <div className="mt-1 flex w-full cursor-pointer items-center justify-between gap-4 px-2">
                    <div className="text-xs text-brand-project-3">总包VO</div>
                    <div className="text-xs font-bold text-brand-project-2">
                      <Skeleton className="h-1.5 w-12" />
                    </div>
                  </div>

                  {/* <HoverCard.Root openDelay={100} closeDelay={100}>
                        <HoverCard.Trigger asChild> */}
                  <div className="mt-1 flex w-full items-center justify-between gap-4 px-2">
                    <div className="text-xs text-brand-project-3">分判VA</div>
                    <div className="text-xs font-bold text-brand-project-2">
                      <Skeleton className="h-1.5 w-12" />
                    </div>
                  </div>
                  {/* </HoverCard.Trigger>
                        <HoverCard.Content
                          side="right"
                          sideOffset={10}
                          align="start"
                          className="z-10 overflow-hidden rounded-lg bg-slate-800/5 px-6 py-4 shadow-2xl backdrop-blur-xl"
                        >
                          <h3 className="mb-2 text-sm font-bold underline">VA</h3>
                          <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm"></div>
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
                  <div className="flex w-full cursor-pointer items-center justify-between gap-4 px-2">
                    <div className="text-xs text-brand-project-3">业主VO</div>
                    <div className="text-xs font-bold text-brand-project-2">
                      <Skeleton className="h-1.5 w-12" />
                    </div>
                  </div>
                  <div className="mt-1 flex w-full cursor-pointer items-center justify-between gap-4 px-2">
                    <div className="text-xs text-brand-project-3">总包VO</div>
                    <div className="text-xs font-bold text-brand-project-2">
                      <Skeleton className="h-1.5 w-12" />
                    </div>
                  </div>

                  {/* <HoverCard.Root openDelay={100} closeDelay={100}>
                        <HoverCard.Trigger asChild> */}
                  <div className="mt-1 flex w-full items-center justify-between gap-4 px-2">
                    <div className="text-xs text-brand-project-3">分判VA</div>
                    <div className="text-xs font-bold text-brand-project-2">
                      <Skeleton className="h-1.5 w-12" />
                    </div>
                  </div>
                  {/* </HoverCard.Trigger>
                        <HoverCard.Content
                          side="right"
                          sideOffset={10}
                          align="start"
                          className="z-10 overflow-hidden rounded-lg bg-slate-800/5 px-6 py-4 shadow-2xl backdrop-blur-xl"
                        >
                          <h3 className="mb-2 text-sm font-bold underline">VA</h3>
                          <div className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm"></div>
                        </HoverCard.Content>
                      </HoverCard.Root> */}
                </div>
              </div>

              <div className="relative">
                <img
                  src={costManagement3}
                  className="h-full w-auto object-contain"
                />

                <div className="absolute left-0 right-0 top-[2.75rem] space-y-1">
                  <div className="grid w-full grid-cols-[1.2fr_2.2fr_1fr] gap-1 px-2">
                    <div className="text-xs text-brand-project-3">业主VO</div>
                    <div className="flex flex-1 items-center">
                      <progress
                        className="[&::-moz-progress-bar]:bg-project-brand h-1.5 w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-brand-project"
                        value={0}
                        max={100}
                      />
                    </div>
                    {/* <div className="h-1 w-[80px] bg-brand-project"></div> */}
                    <div className="text-xs font-bold text-brand-project-2">
                      {/* <Skeleton className="h-1.5 w-16" /> */}
                    </div>
                  </div>

                  <div className="grid w-full grid-cols-[1.2fr_2.2fr_1fr] gap-1 px-2">
                    <div className="text-xs text-brand-project-3">总包VO</div>
                    <div className="flex flex-1 items-center">
                      <progress
                        className="[&::-moz-progress-bar]:bg-project-brand h-1.5 w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-brand-project"
                        value={0}
                        max={100}
                      />
                    </div>
                    {/* <div className="h-1 w-[80px] bg-brand-project"></div> */}
                    <div className="text-xs font-bold text-brand-project-2">
                      {/* <Skeleton className="h-1.5 w-16" /> */}
                    </div>
                  </div>

                  <div className="grid w-full grid-cols-[1.2fr_2.2fr_1fr] gap-1 px-2">
                    <div className="text-xs text-brand-project-3">分判VA</div>
                    <div className="flex flex-1 items-center">
                      <progress
                        className="[&::-moz-progress-bar]:bg-project-brand h-1.5 w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:rounded-lg [&::-webkit-progress-value]:bg-brand-project"
                        value={0}
                        max={100}
                      />
                    </div>
                    <div className="text-xs font-bold text-brand-project-2">
                      {/* <Skeleton className="h-1.5 w-16" /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubTitle>合约收支</SubTitle>

            <div className="bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2 shadow-lg">
              <div className="flex">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="font-bold text-red-600">
                    <Skeleton className="h-1.5 w-16" />
                  </div>
                  <div className="text-xxs font-semibold text-slate-400">
                    本期非法定扣款
                  </div>
                </div>
                <img src={costDivider} className="h-16 opacity-60" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="font-bold text-brand-project">
                    <Skeleton className="h-1.5 w-16" />
                  </div>
                  <div className="text-xxs font-semibold text-slate-400">
                    累计非法定扣款
                  </div>
                </div>
                <img src={costDivider} className="h-16 opacity-60" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="font-bold text-red-600">
                    <Skeleton className="h-1.5 w-16" />
                  </div>
                  <div className="text-xxs font-semibold text-slate-400">
                    累计非法定扣款占比
                  </div>
                </div>
              </div>
              <div className="relative mt-2 h-14">
                <img
                  src={costIncome}
                  className="absolute inset-0 h-full w-full"
                />
                <div className="absolute right-14 top-1/2 -translate-y-1/2">
                  <div className="text-lg font-bold text-brand-project">
                    <Skeleton className="h-1.5 w-16" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubTitle>材料预算预警</SubTitle>
            <div className="bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2 shadow-lg">
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

              <div className="relative mt-2 h-14 p-2">
                <img src={materialsAlertBg} className="absolute inset-0" />

                <div className="relative flex h-full items-center justify-around">
                  <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                    <MaterialStatusIcon className="h-3 w-3 text-red-600" />
                    <span className="text-xxs text-red-200">铝板</span>
                    <span className="text-sm font-bold text-red-600">16%</span>
                  </div>
                  <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                    <MaterialStatusIcon className="h-3 w-3 text-yellow-500" />
                    <span className="text-xxs text-red-200">铝型材</span>
                    <span className="text-sm font-bold text-yellow-500">
                      2%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                    <MaterialStatusIcon className="h-3 w-3 text-green-600" />
                    <span className="text-xxs text-red-200">玻璃</span>
                    <span className="text-sm font-bold text-green-600">0%</span>
                  </div>
                  <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                    <MaterialStatusIcon className="h-3 w-3 text-green-600" />
                    <span className="text-xxs text-red-200">其它材料</span>
                    <span className="text-sm font-bold text-green-600">0%</span>
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
            <div className="flex h-20 gap-6 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2 shadow-lg">
              <div className="relative h-full flex-1">
                <img src={stockLeft} className="absolute inset-0 my-auto" />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 font-bold text-yellow-500">
                  <span>12</span>
                  <span className="ml-1 text-xs">件</span>
                </div>
              </div>
              <div className="relative h-full flex-1">
                <img src={stockRight} className="absolute inset-0 my-auto" />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 font-bold text-yellow-500">
                  <span>683</span>
                  <span className="ml-1 text-xs">
                    m<sup>2</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SubTitle>套裁耗损展示</SubTitle>
            <div className="flex h-20 items-center gap-6 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2 shadow-lg">
              <div className="flex-1">
                <img src={tailoringLeft} />
              </div>
              <div className="flex-1">
                <img src={tailoringRight} />
              </div>
            </div>
          </div>

          <div>
            <SubTitle>项目物料损失</SubTitle>
            <div className="flex h-20 items-center gap-6 bg-gradient-to-tr from-[#0a3256] to-transparent px-6 py-2 shadow-lg">
              <div>
                <img src={materialsLostIcon} className="w-14" />
              </div>
              <div className="flex flex-1 items-baseline justify-around">
                <span className="text-brand-project/70">损失累计金额</span>
                <span className="text-2xl font-bold text-brand-project">
                  1,450,118
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-2">
          {/* <img src={instantMessage} /> */}
          <div className="grid h-60 grid-cols-5 gap-x-2 pt-1 md:gap-x-4 xl:gap-x-6">
            {/* 成交额 */}
            <div className="relative flex justify-center">
              <img src={b1} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">成交额</div>
              <div className="relative pt-[114%] font-bold text-brand-project">
                <Skeleton className="h-1.5 w-16" />
              </div>
            </div>

            {/* 营业额 */}
            <div className="relative flex justify-center">
              <img src={b2} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">营业额</div>
              <div className="relative pt-[114%] font-bold text-brand-project">
                <Skeleton className="h-1.5 w-16" />
              </div>
            </div>

            {/* 现金流 */}
            <div className="relative flex justify-center">
              <img src={b3} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">现金流</div>
              <div className="relative pt-[114%] font-bold text-brand-project">
                <Skeleton className="h-1.5 w-16" />
              </div>
            </div>

            {/* 项目管理费 */}
            <div className="relative flex justify-center">
              <img src={b4} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">项目管理费</div>
              {/* <div className="relative w-[80%] space-y-1 pt-[106%]">
                    <div className="flex items-baseline justify-between">
                      <div className="text-xs">全年預算</div>
                      <div className="text-sm font-bold text-brand-project">
                      </div>
                    </div>
    
                    <div className="flex items-baseline justify-between">
                      <div className="text-xs">累计完成</div>
                      <div className="text-left text-sm font-bold text-brand-project">
                      </div>
                    </div>
                  </div> */}
              <div className="relative pt-[114%] font-bold text-brand-project">
                <Skeleton className="h-1.5 w-16" />
              </div>
            </div>

            {/* 项目设计费 */}
            <div className="relative flex justify-center">
              <img src={b5} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">项目设计费</div>
              <div className="relative pt-[114%] font-bold text-brand-project">
                <Skeleton className="h-1.5 w-16" />
              </div>
            </div>
          </div>
          <img src={projectProgressTitle} className="mx-auto mt-3 w-[65%]" />
          <img src={projectManagementTitle} className="mx-auto mt-2 w-44" />
          <div className="mt-4">
            <div className="mt-4 flex gap-12">
              <div className="flex w-full flex-col">
                <div className="relative h-9">
                  <img
                    src={projectManagementLeft}
                    className="absolute inset-0"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-yellow-500">
                    100
                  </div>
                </div>
                <div className="flex w-[85%] items-center justify-around gap-6 self-end bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2.5 shadow-lg">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      累计完成
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      199
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      累计占比
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      87%
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      当月完成
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      56
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      当月占比
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      65%
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <div className="relative h-9">
                  <img
                    src={projectManagementRight}
                    className="absolute inset-0"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-yellow-500">
                    6%
                  </div>
                </div>
                <div className="flex w-[85%] items-center justify-around gap-6 self-end bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2.5 shadow-lg">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      累计完成
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      199
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      累计占比
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      87%
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      当月完成
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      56
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <div className="text-xxs text-brand-project/50">
                      当月占比
                    </div>
                    <div className="text-sm font-bold text-brand-project">
                      65%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <img src={projectOverviewTitle} className="mx-auto mt-3 w-[65%]" />

          <div className="mt-4 flex gap-6">
            {/* <div className="flex h-[340px] flex-1 flex-col justify-center gap-4"> */}
            {/* <img src={projectOverviewLeft} /> */}
            {/* <div className="mx-auto h-full w-[85%]">
                    <Rhino />
                  </div>
                  <img src={projectOverviewTab} className="mx-auto w-[80%]" /> */}
            {/* <ProjectOverviewTab /> */}
            {/* </div> */}
            <div className="relative flex-1">
              {/* <img src={basicInfo} className="mx-auto w-[90%]" /> */}
              <div className="mx-auto items-center overflow-hidden">
                <img src={basicInfoBg} className="absolute h-[340px] w-full" />
                <div className="relative mx-auto flex h-full w-[94%] flex-1 flex-col justify-center gap-1 pt-2.5">
                  {/* <BasicInfoItem title="项目名称" value={pj?.name ?? "-"} />
                  <BasicInfoItem
                    title="客户"
                    value="Century Base Development Limited"
                  />
                  <BasicInfoItem
                    title="建筑师"
                    value="Zaha Hadid / Ronald Lu & Partners"
                  />
                  <BasicInfoItem title="总承包商" value="协兴建筑" />
                  <BasicInfoItem title="幕墙顾问" value="-" />
                  <BasicInfoItem title="工程规模" value="25401㎡" />
                  <BasicInfoItem title="中标形式" value="NSC" />
                  <BasicInfoItem title="开工日期" value="2019-01-01" />
                  <BasicInfoItem title="FS日期" value="2023-08-30" />
                  <BasicInfoItem title="OP日期" value="-" />
                  <BasicInfoItem title="竣工日期" value="2023-12-31" />
                  <BasicInfoItem title="维修保养期" value="18个月" /> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-2.5">
          <div>
            <SubTitle>图纸进度管理</SubTitle>
            <div className="bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-1.5 shadow-lg">
              <div className="flex gap-1">
                <div>
                  <img src={drawingLeft} />
                </div>
                <div>
                  <img src={drawingCenter} />
                </div>
                <div>
                  <img src={drawingRight} />
                </div>
              </div>
              <div className="mt-0.5">
                <img src={drawingBottom} />
              </div>
            </div>
          </div>

          <div>
            <SubTitle>生产管理</SubTitle>
            <div className="space-y-0.5 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-1.5 shadow-lg">
              <div>
                <img src={productionManagement1} />
              </div>
              <div>
                <img src={productionManagement2} />
              </div>
              <div>
                <img src={productionManagement3} />
              </div>
              <div>
                <img src={productionManagement4} />
              </div>
            </div>
          </div>

          <div>
            <SubTitle>单元件与散料</SubTitle>
            <div className="space-y-1 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-1.5 shadow-lg">
              <div>
                <img src={componentTop} />
              </div>
              <div>
                <img src={componentBottom} />
              </div>
            </div>
          </div>

          <div>
            <SubTitle>近2季度 质量内审分数</SubTitle>
            {/* <div className="relative bg-gradient-to-tr from-[#0a3256] to-transparent shadow-lg"> */}
            <img src={quality} />
            {/* </div> */}
          </div>

          <div>
            <SubTitle>近2季度 安全内审分数</SubTitle>
            {/* <div className="bg-gradient-to-tr from-[#0a3256] to-transparent shadow-lg"> */}
            <img src={safty} />
            {/* </div> */}
          </div>
        </section>
      </div>
    </div>
  );
}
