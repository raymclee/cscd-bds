import { useMapV2Store } from "~/store";

import { useNavigate, useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import { ImageOff, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { TenderRatingChart } from "~/components/dashboard/tender-rating-chart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { fixAmount, isGA, ownerTypeText } from "~/lib/helper";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Tender } from "~/graphql/graphql";

export function TenderDetailFrame() {
  // const tender = useLocation({ select: (location) => location.state.tender });
  const tenderId = useSearch({
    from: "/__auth/__dashboard/__amap/v2",
    select: (sp) => sp.t,
  });

  const tender = useMapV2Store
    .getState()
    .areas?.edges?.flatMap((a) => a?.node?.tenders.edges?.map((t) => t?.node))
    .find((t) => t?.id === tenderId);

  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      {tender && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3, type: "spring", bounce: 0 }}
          className={cn("fixed right-4 z-40 w-[440px] space-y-2")}
        >
          {/* 隐藏按钮 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute -left-12 top-4"
          >
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-full border border-brand/30 bg-slate-900/60 text-white backdrop-blur hover:bg-slate-800/60"
              onClick={() => {
                // 这里添加隐藏逻辑
                navigate({
                  to: ".",
                  search: (prev) => ({ ...prev, t: undefined }),
                  replace: true,
                });
              }}
            >
              {/* 科技感装饰 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 hover:opacity-100" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-300 hover:opacity-100" />

              {/* 扫描线效果 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />

              {/* 边框发光效果 */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 transition-opacity duration-300 hover:opacity-100" />

              <ChevronRight className="relative h-5 w-5" />
            </Button>
          </motion.div>

          <div
            className={cn(
              "relative h-[calc(100vh-6rem)] overflow-hidden rounded-lg border border-brand/30 bg-slate-900/60 pb-4 text-white backdrop-blur",
              //   "animate-border-glow",
            )}
          >
            {/* 科技感装饰线条 */}
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

            {/* 全息扫描效果 */}
            <div className="holographic-effect pointer-events-none absolute inset-0" />

            <TenderDetail tender={tender} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TenderDetail({ tender }: { tender: Tender }) {
  const isGATender = isGA(tender);

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="line-clamp-1 font-semibold">{tender?.name}</div>
          {/* {!tenderViewTender && (
                <button
                    className="cursor-pointer"
                    onClick={() => {
                    useMapStore.setState({
                        tender: null,
                        tenderListVisible: true,
                    });
                    }}
                >
                    <Undo2 />
                </button>
                )} */}
        </div>
      </div>
      <div className="relative h-full px-6 py-4">
        {tender?.images && tender?.images?.length > 0 ? (
          <Carousel>
            <CarouselContent className="min-h-[220px]">
              {tender?.images?.map((image, i) => (
                <CarouselItem key={i}>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <img
                      src={image}
                      className="aspect-[16/9] rounded-lg"
                      alt={tender?.name}
                    />
                    <div className="group-hover:animate-scan-line absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex aspect-[16/9] flex-col items-center justify-center rounded-lg bg-slate-800/50 text-white">
            <ImageOff className="mb-2 h-16 w-16" />
            暂没图片
          </div>
        )}

        {isGATender ? (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-3">
              <div className="text-gray-400">项目名称</div>
              <div className="col-span-2">{tender?.name}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">项目地址</div>
              <div className="col-span-2">{tender?.fullAddress || "-"}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">项目编号</div>
              <div className="col-span-2">{tender?.tenderCode || "-"}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">业主</div>
              <div className="col-span-2">{tender?.developer || "-"}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">总包单位</div>
              <div className="col-span-2">{tender?.contractor || "-"}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">則師</div>
              <div className="col-span-2">{tender?.architect || "-"}</div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">幕牆顧問</div>
              <div className="col-span-2">
                {tender?.facadeConsultant || "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">交標日期</div>
              <div className="col-span-2">
                {tender?.tenderClosingDate
                  ? dayjs(tender.tenderClosingDate).format("LL")
                  : "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">負責同事</div>
              <div className="col-span-2">
                {tender?.followingSales && tender?.followingSales?.length > 0
                  ? tender?.followingSales?.map((s) => s.name).join(", ")
                  : "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">面積</div>
              <div className="col-span-2">
                {tender?.constructionArea || "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">中標日期</div>
              <div className="col-span-2">
                {tender?.tenderWinDate
                  ? dayjs(tender.tenderWinDate).format("LL")
                  : "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">中標金額</div>
              <div className="col-span-2">
                {tender?.tenderWinAmount
                  ? `${fixAmount(tender?.tenderWinAmount)} 亿`
                  : "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">最後出標金額</div>
              <div className="col-span-2">
                {tender?.lastTenderAmount
                  ? `${fixAmount(tender.lastTenderAmount)} 亿`
                  : "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">中標對手</div>
              <div className="col-span-2">
                {tender?.tenderWinCompany || "-"}
              </div>
            </div>
          </div>
        ) : (
          <Tabs key={tender?.id} defaultValue="detail" className="mt-4 w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 text-white">
              <TabsTrigger
                value="detail"
                className="cursor-pointer data-[state=active]:bg-brand/70 data-[state=active]:text-white"
              >
                基本信息
              </TabsTrigger>
              <TabsTrigger
                value="rating"
                className="cursor-pointer data-[state=active]:bg-brand/70 data-[state=active]:text-white"
              >
                项目评分
              </TabsTrigger>
              {/* <TabsTrigger
    value="follow-up"
    className="data-[state=active]:bg-brand/70 data-[state=active]:text-white"
  >
    跟进情况
  </TabsTrigger> */}
            </TabsList>
            <ScrollArea className="-mx-4 h-[60vh] px-4 pb-6">
              <TabsContent value="detail" className="mt-4 space-y-3">
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">项目名称</div>
                  <div className="col-span-2">{tender?.name}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">项目地址</div>
                  <div className="col-span-2">{tender?.fullAddress}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">业主</div>
                  <div className="col-span-2">
                    {tender?.customer?.name || "-"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">总包单位</div>
                  <div className="col-span-2">{tender?.contractor || "-"}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">业主类型</div>
                  <div className="col-span-2">
                    {ownerTypeText(tender?.customer?.ownerType) || "-"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">设计单位</div>
                  <div className="col-span-2">{tender?.designUnit || "-"}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">预计金额</div>
                  <div className="col-span-2">
                    {tender?.estimatedAmount
                      ? `${fixAmount(tender?.estimatedAmount)} 亿`
                      : "-"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">幕墙顾问</div>
                  <div className="col-span-2">
                    {tender?.facadeConsultant || "-"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">咨询公司</div>
                  <div className="col-span-2">
                    {tender?.consultingFirm || "-"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">招标代理</div>
                  <div className="col-span-2">
                    {tender?.tenderingAgency || "-"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">招标形式</div>
                  <div className="col-span-2">{tender?.tenderForm || "-"}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">预计招标日期</div>
                  <div className="col-span-2">
                    {tender?.tenderDate
                      ? dayjs(tender.tenderDate).format("LL")
                      : "-"}
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="text-gray-400">合同形式</div>
                  <div className="col-span-2">
                    {tender?.contractForm || "-"}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="rating" className="mt-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">规模及价值</div>
                    <div className="col-span-2">
                      {tender?.sizeAndValueRatingOverview || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">资信及付款</div>
                    <div className="col-span-2">
                      {tender?.creditAndPaymentRatingOverview || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">中标原则及时限</div>
                    <div className="col-span-2">
                      {tender?.timeLimitRatingOverview || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">客情关系</div>
                    <div className="col-span-2">
                      {tender?.customerRelationshipRatingOverview || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">竞争合作关系</div>
                    <div className="col-span-2">
                      {tender?.competitivePartnershipRatingOverview || "-"}
                    </div>
                  </div>
                </div>
                <TenderRatingChart
                  sizeAndValueRating={tender?.sizeAndValueRating}
                  creditAndPaymentRating={tender?.creditAndPaymentRating}
                  timeLimitRating={tender?.timeLimitRating}
                  customerRelationshipRating={
                    tender?.customerRelationshipRating
                  }
                  competitivePartnershipRating={
                    tender?.competitivePartnershipRating
                  }
                />
              </TabsContent>
              {/* <TabsContent value="follow-up" className="">
    {tender?.visitRecords?.edges &&
    tender?.visitRecords?.edges?.length < 1 ? (
      <div className="mt-8 flex items-center justify-center">
        没有拜访记录
      </div>
    ) : (
      tender?.visitRecords?.edges
        ?.map((e) => e?.node)
        .map((record) => (
          <div className="mt-4 space-y-2">
            <div className="grid grid-cols-3">
              <div className="text-gray-400">日期</div>
              <div className="col-span-2">
                {dayjs(record?.date).format("LL")}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">沟通对象</div>
              <div className="col-span-2">
                {record?.commPeople}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">沟通形式</div>
              <div className="col-span-2">
                {visitTypeText(record?.visitType)}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">沟通内容</div>
              <div className="col-span-2">
                {record?.commContent}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">下一步计划</div>
              <div className="col-span-2">
                {record?.nextStep || "-"}
              </div>
            </div>
          </div>
        ))
    )}
  </TabsContent> */}
            </ScrollArea>
          </Tabs>
        )}
      </div>
    </>
  );
}
