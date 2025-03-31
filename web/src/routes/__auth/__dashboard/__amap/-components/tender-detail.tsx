import { useMapV2Store } from "~/store";

import { useNavigate, useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import { ImageOff, ChevronRight } from "lucide-react";
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
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";

export function TenderDetailFrame() {
  const tenderId = useSearch({
    from: "/__auth/__dashboard/__amap/",
    select: (sp) => sp.t,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const tender = useMapV2Store
    .getState()
    .areas?.edges?.flatMap((a) => a?.node?.tenders.edges?.map((t) => t?.node))
    .find((t) => t?.id === tenderId);

  const navigate = useNavigate();

  useOnClickOutside(containerRef, () => {
    navigate({
      to: ".",
      search: (prev) => ({ ...prev, t: undefined }),
      replace: true,
    });
  });

  return (
    <AnimatePresence>
      {tender && (
        <motion.div
          ref={containerRef}
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
              className="relative w-10 h-10 text-white border rounded-full border-brand/30 bg-slate-900/60 backdrop-blur hover:bg-slate-800/60"
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
              <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:opacity-100" />
              <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 hover:opacity-100" />

              {/* 扫描线效果 */}
              <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hover:opacity-100" />

              {/* 边框发光效果 */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 transition-opacity duration-300 hover:opacity-100" />

              <ChevronRight className="relative w-5 h-5" />
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
            <div className="absolute inset-0 pointer-events-none holographic-effect" />

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
        <div className="flex items-center justify-between px-6 py-4 mt-4 md:mt-0">
          <div className="font-semibold line-clamp-1">
            {tender?.activeProfile?.name}
          </div>
        </div>
      </div>
      <div className="relative h-full px-6">
        {tender?.activeProfile?.images &&
        tender?.activeProfile?.images?.length > 0 ? (
          <Carousel>
            <CarouselContent className="md:min-h-[220px]">
              {tender?.activeProfile?.images?.map((image, i) => (
                <CarouselItem key={i}>
                  <div className="relative group">
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:opacity-100" />
                    <img
                      src={image}
                      className="aspect-[16/9] rounded-lg"
                      alt={tender?.activeProfile?.name || ""}
                    />
                    <div className="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 group-hover:animate-scan-line bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-cyan-500/0 group-hover:opacity-100" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex aspect-[16/9] flex-col items-center justify-center rounded-lg bg-slate-800/50 text-white">
            <ImageOff className="w-16 h-16 mb-2" />
            暂没图片
          </div>
        )}

        {isGATender ? <GAInfo tender={tender} /> : <SHInfo tender={tender} />}
      </div>
    </>
  );
}

function SHInfo({ tender }: { tender: Tender }) {
  return (
    <Tabs
      key={tender?.id}
      defaultValue="detail"
      className="flex flex-col w-full mt-4 overflow-hidden"
    >
      <TabsList className="grid w-full grid-cols-2 text-white bg-gradient-to-br from-sky-950 to-sky-900">
        <TabsTrigger
          value="detail"
          className="cursor-pointer data-[state=active]:bg-slate-800/70 data-[state=active]:text-white"
        >
          基本信息
        </TabsTrigger>
        <TabsTrigger
          value="rating"
          className="cursor-pointer data-[state=active]:bg-slate-800/70 data-[state=active]:text-white"
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
      <ScrollArea className="-mx-4 px-4 pb-6 md:h-[58vh]">
        <TabsContent value="detail" className="mt-4 space-y-2">
          <div className="grid grid-cols-3">
            <div className="text-gray-400">项目名称</div>
            <div className="col-span-2">{tender?.activeProfile?.name}</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">项目地址</div>
            <div className="col-span-2">
              {tender?.activeProfile?.fullAddress}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">业主</div>
            <div className="col-span-2">
              {tender?.activeProfile?.customer?.name || "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">总包单位</div>
            <div className="col-span-2">
              {tender?.activeProfile?.contractor || "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">业主类型</div>
            <div className="col-span-2">
              {ownerTypeText(tender?.activeProfile?.customer?.ownerType) || "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">设计单位</div>
            <div className="col-span-2">
              {tender?.activeProfile?.designUnit || "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">预计金额</div>
            <div className="col-span-2">
              {tender?.activeProfile?.estimatedAmount
                ? `${fixAmount(tender?.activeProfile?.estimatedAmount)} 亿`
                : "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">幕墙顾问</div>
            <div className="col-span-2">
              {tender?.activeProfile?.facadeConsultant || "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">咨询公司</div>
            <div className="col-span-2">
              {tender?.activeProfile?.consultingFirm || "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">招标代理</div>
            <div className="col-span-2">
              {tender?.activeProfile?.tenderingAgency || "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">招标形式</div>
            <div className="col-span-2">
              {tender?.activeProfile?.tenderForm || "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">预计招标日期</div>
            <div className="col-span-2">
              {tender?.activeProfile?.tenderDate
                ? dayjs(tender.activeProfile.tenderDate).format("LL")
                : "-"}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-gray-400">合同形式</div>
            <div className="col-span-2">
              {tender?.activeProfile?.contractForm || "-"}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="rating" className="mt-4">
          <div className="space-y-3">
            <div className="grid grid-cols-3">
              <div className="text-gray-400">规模及价值</div>
              <div className="col-span-2">
                {tender?.activeProfile?.sizeAndValueRatingOverview || "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">资信及付款</div>
              <div className="col-span-2">
                {tender?.activeProfile?.creditAndPaymentRatingOverview || "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">中标原则及时限</div>
              <div className="col-span-2">
                {tender?.activeProfile?.timeLimitRatingOverview || "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">客情关系</div>
              <div className="col-span-2">
                {tender?.activeProfile?.customerRelationshipRatingOverview ||
                  "-"}
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-gray-400">竞争合作关系</div>
              <div className="col-span-2">
                {tender?.activeProfile?.competitivePartnershipRatingOverview ||
                  "-"}
              </div>
            </div>
          </div>
          <TenderRatingChart
            sizeAndValueRating={tender?.activeProfile?.sizeAndValueRating}
            creditAndPaymentRating={
              tender?.activeProfile?.creditAndPaymentRating
            }
            timeLimitRating={tender?.activeProfile?.timeLimitRating}
            customerRelationshipRating={
              tender?.activeProfile?.customerRelationshipRating
            }
            competitivePartnershipRating={
              tender?.activeProfile?.competitivePartnershipRating
            }
          />
        </TabsContent>
        {/* <TabsContent value="follow-up" className="">
{tender?.visitRecords?.edges &&
tender?.visitRecords?.edges?.length < 1 ? (
<div className="flex items-center justify-center mt-8">
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
  );
}

function GAInfo({ tender }: { tender: Tender }) {
  return (
    <div className="mt-4 space-y-3">
      <div className="grid grid-cols-3">
        <div className="text-gray-400">项目名称</div>
        <div className="col-span-2">{tender?.activeProfile?.name}</div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">项目地址</div>
        <div className="col-span-2">
          {tender?.activeProfile?.fullAddress || "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">项目编号</div>
        <div className="col-span-2">
          {tender?.activeProfile?.tenderCode || "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">业主</div>
        <div className="col-span-2">
          {tender?.activeProfile?.developer || "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">总包单位</div>
        <div className="col-span-2">
          {tender?.activeProfile?.contractor || "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">则師</div>
        <div className="col-span-2">
          {tender?.activeProfile?.architect || "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">幕牆顧問</div>
        <div className="col-span-2">
          {tender?.activeProfile?.facadeConsultant || "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">交標日期</div>
        <div className="col-span-2">
          {tender?.activeProfile?.tenderClosingDate
            ? dayjs(tender.activeProfile?.tenderClosingDate).format("LL")
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
          {tender?.activeProfile?.constructionArea || "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">中標日期</div>
        <div className="col-span-2">
          {tender?.activeProfile?.tenderWinDate
            ? dayjs(tender.activeProfile?.tenderWinDate).format("LL")
            : "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">中標金額</div>
        <div className="col-span-2">
          {tender?.activeProfile?.tenderWinAmount
            ? `${fixAmount(tender?.activeProfile?.tenderWinAmount)} 亿`
            : "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">最後出標金額</div>
        <div className="col-span-2">
          {tender?.activeProfile?.lastTenderAmount
            ? `${fixAmount(tender?.activeProfile?.lastTenderAmount)} 亿`
            : "-"}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-gray-400">中標對手</div>
        <div className="col-span-2">
          {tender?.activeProfile?.tenderWinCompany || "-"}
        </div>
      </div>
    </div>
  );
}
