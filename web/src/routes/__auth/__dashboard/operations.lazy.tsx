import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

// import PH from "~/assets/svg/header1.svg";
import b1 from "~/assets/svg/box1.png";
import b2 from "~/assets/svg/box2.png";
import b3 from "~/assets/svg/box3.png";
import b4 from "~/assets/svg/box4.png";
import b5 from "~/assets/svg/box5.png";
import top from "~/assets/svg/top.png";
// import instantMessage from "~/assets/instant_message.png";

import projectProgressTitle from "~/assets/svg/project_progress_title.png";
import projectManagementTitle from "~/assets/svg/project_management_title.png";

import projectManagementLeft from "~/assets/svg/project_management_left.png";
import projectManagementRight from "~/assets/svg/project_management_right.png";

import projectOverviewTitle from "~/assets/svg/project_overview_title.png";
import projectOverviewLeft from "~/assets/svg/project_overview_left.png";
import projectOverviewTab from "~/assets/svg/project_overview_tab.png";

import basicInfo from "~/assets/svg/basic_info.png";

import costManagement1 from "~/assets/svg/cost_management_1.png";
import costManagement2 from "~/assets/svg/cost_management_2.png";
import costManagement3 from "~/assets/svg/cost_management_3.png";

import costIncome from "~/assets/svg/cost_income.png";
import costDivider from "~/assets/svg/cost_divider.png";

import materialsAlertBg from "~/assets/svg/materials_alert_bg.png";

import stockLeft from "~/assets/svg/stock_left.png";
import stockRight from "~/assets/svg/stock_right.png";

import tailoringLeft from "~/assets/svg/tailoring_left.png";
import tailoringRight from "~/assets/svg/tailoring_right.png";

import materialsLostIcon from "~/assets/svg/materials_lost_icon.png";

import drawingLeft from "~/assets/svg/drawing_left.png";
import drawingCenter from "~/assets/svg/drawing_center.png";
import drawingRight from "~/assets/svg/drawing_right.png";
import drawingBottom from "~/assets/svg/drawing_bottom.png";

import productionManagement1 from "~/assets/svg/production_management_1.png";
import productionManagement2 from "~/assets/svg/production_management_2.png";
import productionManagement3 from "~/assets/svg/production_management_3.png";
import productionManagement4 from "~/assets/svg/production_management_4.png";

import componentTop from "~/assets/svg/component_top.png";
import componentBottom from "~/assets/svg/component_bottom.png";

import quality from "~/assets/svg/quality.png";
import safty from "~/assets/svg/safty.png";

import { StatusIcon } from "~/components/ui/status-icon";
import { SubTitle } from "~/components/project/sub-title";
import { ScrollArea } from "~/components/ui/scroll-area";
import { graphql, usePreloadedQuery } from "react-relay";
import { operationsPageQuery } from "__generated__/operationsPageQuery.graphql";

export const Route = createLazyFileRoute("/__auth/__dashboard/operations")({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<operationsPageQuery>(
    graphql`
      query operationsPageQuery {
        operations(last: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
          edges {
            node {
              id
              cjeYs
              cjeLj
              yyeYs
              yyeLj
              xjlYs
              xjlLj
              xmglf
              xmsjf
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  );

  const op = data.operations?.edges?.[0]?.node;

  return (
    <div className="min-h-screen">
      {/* <ProjectHeader /> */}
      {/* <header className="relative flex items-center justify-center h-20"> */}
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
              <div>
                <img
                  src={costManagement1}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <img
                  src={costManagement2}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="relative">
                <img
                  src={costManagement3}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div>
            <SubTitle>合约收支</SubTitle>

            <div className="bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2 shadow-lg">
              <div className="flex">
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="font-bold text-red-600">50万</div>
                  <div className="text-xxs font-semibold text-slate-400">
                    本期非法定扣款
                  </div>
                </div>
                <img src={costDivider} className="h-16 opacity-60" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="font-bold text-brand-project">120,658</div>
                  <div className="text-xxs font-semibold text-slate-400">
                    累计非法定扣款
                  </div>
                </div>
                <img src={costDivider} className="h-16 opacity-60" />
                <div className="flex flex-1 flex-col items-center justify-center">
                  <div className="font-bold text-red-600">2%</div>
                  <div className="text-xxs font-semibold text-slate-400">
                    累计非法定扣款占比
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <img
                  src={costIncome}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div>
            <SubTitle>材料预算预警</SubTitle>
            <div className="bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-2 shadow-lg">
              <div className="mt-1">
                <div className="flex gap-8 px-1">
                  <div className="flex items-center gap-1">
                    <StatusIcon className="h-3 w-3 text-red-600" />
                    <span className="text-xxs text-red-200">已超预算</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StatusIcon className="h-3 w-3 text-yellow-500" />
                    <span className="text-xxs text-red-200">可能超预算</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StatusIcon className="h-3 w-3 text-green-400" />
                    <span className="text-xxs text-red-200">未超预算</span>
                  </div>
                </div>
              </div>

              <div className="relative mt-2 h-14 p-2">
                <img src={materialsAlertBg} className="absolute inset-0" />

                <div className="relative flex h-full items-center justify-around">
                  <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                    <StatusIcon className="h-3 w-3 text-red-600" />
                    <span className="text-xxs text-red-200">铝板</span>
                    <span className="text-sm font-bold text-red-600">16%</span>
                  </div>
                  <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                    <StatusIcon className="h-3 w-3 text-yellow-500" />
                    <span className="text-xxs text-red-200">铝型材</span>
                    <span className="text-sm font-bold text-yellow-500">
                      2%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                    <StatusIcon className="h-3 w-3 text-green-600" />
                    <span className="text-xxs text-red-200">玻璃</span>
                    <span className="text-sm font-bold text-green-600">0%</span>
                  </div>
                  <div className="flex items-center gap-1 text-ellipsis text-nowrap">
                    <StatusIcon className="h-3 w-3 text-green-600" />
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
              <div className="relative w-[80%] space-y-1 pt-[106%]">
                <div className="flex items-baseline justify-between">
                  <div className="text-xs">全年預算</div>
                  <div className="text-sm font-bold text-brand-project">
                    {Intl.NumberFormat("en-US").format(op?.cjeYs ?? 0)}
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-xs">累计完成</div>
                  <div className="text-left text-sm font-bold text-brand-project">
                    {Intl.NumberFormat("en-US").format(op?.cjeLj ?? 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* 营业额 */}
            <div className="relative flex justify-center">
              <img src={b2} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">营业额</div>
              <div className="relative w-[80%] space-y-1 pt-[106%]">
                <div className="flex items-baseline justify-between">
                  <div className="text-xs">全年預算</div>
                  <div className="text-sm font-bold text-brand-project">
                    {Intl.NumberFormat("en-US").format(op?.yyeYs ?? 0)}
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-xs">累计完成</div>
                  <div className="text-left text-sm font-bold text-brand-project">
                    {Intl.NumberFormat("en-US").format(op?.yyeLj ?? 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* 现金流 */}
            <div className="relative flex justify-center">
              <img src={b3} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">现金流</div>
              <div className="relative w-[80%] space-y-1 pt-[106%]">
                <div className="flex items-baseline justify-between">
                  <div className="text-xs">全年預算</div>
                  <div className="text-sm font-bold text-brand-project">
                    {Intl.NumberFormat("en-US").format(op?.xjlYs ?? 0)}
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-xs">累计完成</div>
                  <div className="text-left text-sm font-bold text-brand-project">
                    {Intl.NumberFormat("en-US").format(op?.xjlLj ?? 0)}
                  </div>
                </div>
              </div>
            </div>

            {/* 项目管理费 */}
            <div className="relative flex justify-center">
              <img src={b4} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">项目管理费</div>
              <div className="relative pt-[114%] font-bold text-brand-project">
                {Intl.NumberFormat("en-US").format(op?.xmglf ?? 0)}
              </div>
            </div>

            {/* 项目设计费 */}
            <div className="relative flex justify-center">
              <img src={b5} className="absolute inset-0" />
              <div className="absolute top-5 text-lg font-bold">项目设计费</div>
              <div className="relative pt-[114%] font-bold text-brand-project">
                {Intl.NumberFormat("en-US").format(op?.xmsjf ?? 0)}
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
            <div className="flex flex-1 flex-col justify-center gap-4">
              <img src={projectOverviewLeft} className="mx-auto w-[85%]" />
              <img src={projectOverviewTab} className="mx-auto w-[80%]" />
            </div>
            <div className="flex-1">
              <img src={basicInfo} className="mx-auto w-[90%]" />
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
