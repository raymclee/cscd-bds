import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ImageOff, Undo2 } from "lucide-react";
import { fixAmount, isGA, ownerTypeText, visitTypeText } from "~/lib/helper";
import dayjs from "dayjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TenderRatingChart } from "./tender-rating-chart";

export function MapTenderDetail() {
  const selectedTender = useMapStore((state) => state.selectedTender);
  const tenderViewTender = useMapStore((state) => state.tenderViewTender);

  const isGATender = isGA(selectedTender);

  return (
    <div
      className={cn(
        // "left-4 top-[7vh] h-full space-y-2 transition xl:absolute xl:w-[440px]",
        // selectedTender && "mt-[60vh] xl:mt-0",
        "absolute left-4 top-10 w-[440px] space-y-2 transition",
        !selectedTender && "-translate-x-[110%]",
      )}
    >
      <Card
        className={cn(
          "h-[94.5dvh] overflow-hidden rounded border border-brand bg-black/60 pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur-xl",
        )}
      >
        <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
          <div className="flex items-center justify-between">
            <div className="line-clamp-1">{selectedTender?.name}</div>
            {!tenderViewTender && (
              <button
                onClick={() => {
                  useMapStore.setState({
                    selectedTender: null,
                    tenderListVisible: true,
                  });
                }}
              >
                <Undo2 />
              </button>
            )}
          </div>
        </CardHeader>

        <CardContent className="h-full py-4">
          {selectedTender?.images && selectedTender?.images?.length > 0 ? (
            <Carousel>
              <CarouselContent className="min-h-[220px]">
                {selectedTender?.images?.map((image, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={image}
                      className="aspect-[16/9] rounded"
                      alt={selectedTender?.name}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex aspect-[16/9] flex-col items-center justify-center text-white">
              <ImageOff className="mb-2 h-16 w-16" />
              暂没图片
            </div>
          )}

          {isGATender ? (
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-3">
                <div className="text-gray-400">项目名称</div>
                <div className="col-span-2">{selectedTender?.name}</div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">项目地址</div>
                <div className="col-span-2">
                  {selectedTender?.fullAddress || "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">项目编号</div>
                <div className="col-span-2">
                  {selectedTender?.tenderCode || "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">业主</div>
                <div className="col-span-2">
                  {selectedTender?.developer || "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">总包单位</div>
                <div className="col-span-2">
                  {selectedTender?.contractor || "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">則師</div>
                <div className="col-span-2">
                  {selectedTender?.architect || "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">幕牆顧問</div>
                <div className="col-span-2">
                  {selectedTender?.facadeConsultant || "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">交標日期</div>
                <div className="col-span-2">
                  {selectedTender?.tenderClosingDate
                    ? dayjs(selectedTender.tenderClosingDate).format("LL")
                    : "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">負責同事</div>
                <div className="col-span-2">
                  {selectedTender?.followingSales &&
                  selectedTender?.followingSales?.length > 0
                    ? selectedTender?.followingSales
                        ?.map((s) => s.name)
                        .join(", ")
                    : "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">面積</div>
                <div className="col-span-2">
                  {selectedTender?.constructionArea || "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">中標日期</div>
                <div className="col-span-2">
                  {selectedTender?.tenderWinDate
                    ? dayjs(selectedTender.tenderWinDate).format("LL")
                    : "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">中標金額</div>
                <div className="col-span-2">
                  {selectedTender?.tenderWinAmount
                    ? `${fixAmount(selectedTender?.tenderWinAmount)} 亿`
                    : "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">最後出標金額</div>
                <div className="col-span-2">
                  {selectedTender?.lastTenderAmount
                    ? `${fixAmount(selectedTender.lastTenderAmount)} 亿`
                    : "-"}
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-gray-400">中標對手</div>
                <div className="col-span-2">
                  {selectedTender?.tenderWinCompany || "-"}
                </div>
              </div>
            </div>
          ) : (
            <Tabs
              key={selectedTender?.id}
              defaultValue="detail"
              className="mt-4 w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 text-white">
                <TabsTrigger
                  value="detail"
                  className="data-[state=active]:bg-brand/70 data-[state=active]:text-white"
                >
                  基本信息
                </TabsTrigger>
                <TabsTrigger
                  value="rating"
                  className="data-[state=active]:bg-brand/70 data-[state=active]:text-white"
                >
                  项目评分
                </TabsTrigger>
                <TabsTrigger
                  value="follow-up"
                  className="data-[state=active]:bg-brand/70 data-[state=active]:text-white"
                >
                  跟进情况
                </TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[480px]">
                <TabsContent value="detail" className="mt-4 space-y-2">
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">项目名称</div>
                    <div className="col-span-2">{selectedTender?.name}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">项目地址</div>
                    <div className="col-span-2">
                      {selectedTender?.fullAddress}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">业主</div>
                    <div className="col-span-2">
                      {selectedTender?.customer?.name || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">总包单位</div>
                    <div className="col-span-2">
                      {selectedTender?.contractor || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">业主类型</div>
                    <div className="col-span-2">
                      {ownerTypeText(selectedTender?.customer?.ownerType) ||
                        "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">设计单位</div>
                    <div className="col-span-2">
                      {selectedTender?.designUnit || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">预计金额</div>
                    <div className="col-span-2">
                      {selectedTender?.estimatedAmount
                        ? `${fixAmount(selectedTender?.estimatedAmount)} 亿`
                        : "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">幕墙顾问</div>
                    <div className="col-span-2">
                      {selectedTender?.facadeConsultant || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">咨询公司</div>
                    <div className="col-span-2">
                      {selectedTender?.consultingFirm || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">招标代理</div>
                    <div className="col-span-2">
                      {selectedTender?.tenderingAgency || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">招标形式</div>
                    <div className="col-span-2">
                      {selectedTender?.tenderForm || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">预计招标日期</div>
                    <div className="col-span-2">
                      {selectedTender?.tenderDate
                        ? dayjs(selectedTender.tenderDate).format("LL")
                        : "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">合同形式</div>
                    <div className="col-span-2">
                      {selectedTender?.contractForm || "-"}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="rating" className="mt-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">规模及价值</div>
                      <div className="col-span-2">
                        {selectedTender?.sizeAndValueRatingOverview || "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">资信及付款</div>
                      <div className="col-span-2">
                        {selectedTender?.creditAndPaymentRatingOverview || "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">中标原则及时限</div>
                      <div className="col-span-2">
                        {selectedTender?.timeLimitRatingOverview || "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">客情关系</div>
                      <div className="col-span-2">
                        {selectedTender?.customerRelationshipRatingOverview ||
                          "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">竞争合作关系</div>
                      <div className="col-span-2">
                        {selectedTender?.competitivePartnershipRatingOverview ||
                          "-"}
                      </div>
                    </div>
                  </div>
                  <TenderRatingChart
                    sizeAndValueRating={selectedTender?.sizeAndValueRating}
                    creditAndPaymentRating={
                      selectedTender?.creditAndPaymentRating
                    }
                    timeLimitRating={selectedTender?.timeLimitRating}
                    customerRelationshipRating={
                      selectedTender?.customerRelationshipRating
                    }
                    competitivePartnershipRating={
                      selectedTender?.competitivePartnershipRating
                    }
                  />
                </TabsContent>
                <TabsContent value="follow-up" className="">
                  {selectedTender?.visitRecords?.edges &&
                  selectedTender?.visitRecords?.edges?.length < 1 ? (
                    <div className="mt-8 flex items-center justify-center">
                      没有拜访记录
                    </div>
                  ) : (
                    selectedTender?.visitRecords?.edges
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
                </TabsContent>
              </ScrollArea>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
