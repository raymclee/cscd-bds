import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ImageOff } from "lucide-react";
import dayjs from "dayjs";
import { fixAmount, isGA, isHW } from "~/lib/helper";

export function MapTenderList() {
  const tenderList = useMapStore((state) => state.tenderList);
  const tenderListVisible = useMapStore((state) => state.tenderListVisible);
  const map = useMapStore((state) => state.map);

  const tenderListHovering = useMapStore((state) => state.tenderListHovering);
  const setTenderListHovering = useMapStore(
    (state) => state.setTenderListHovering,
  );

  // React.useEffect(() => {
  //   setHovering(0);
  // }, [tenderList.length]);

  return (
    <>
      <div
        className={cn(
          // "left-4 top-[7vh] h-full space-y-2 transition xl:absolute xl:w-[440px]",
          // tenderListVisible && "mt-[60vh] xl:mt-0",
          "absolute bottom-[9.6rem] left-4 top-[3.2rem] w-[440px] space-y-2 transition",
          !tenderListVisible && "-translate-x-[110%]",
        )}
      >
        <Card
          className={cn(
            "h-full pb-4 overflow-hidden text-white border rounded border-brand bg-black/60 shadow-dashboard-card drop-shadow-2xl backdrop-blur-xl",
          )}
        >
          <CardHeader className="font-bold text-white bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700">
            项目列表
          </CardHeader>

          <CardContent className="h-full px-0">
            <ScrollArea className="h-full pb-6">
              <div className="px-4 py-2 space-y-4">
                {tenderList.map((tender, i) => {
                  const isGAorHWTender = isGA(tender) || isHW(tender);
                  return (
                    <div
                      key={tender?.id}
                      className={cn(
                        "flex items-center p-2 transition-shadow rounded-md cursor-pointer gap-x-4 hover:bg-brand/50",
                        (tenderListHovering === i ||
                          tenderListHovering === tender?.id) &&
                          "ring ring-white",
                      )}
                      onClick={() => {
                        useMapStore.setState({
                          tenderListVisible: false,
                          selectedTender: tender,
                        });
                      }}
                      onMouseEnter={(e) => {
                        if (tender?.geoBounds) {
                          const polygon = new AMap.Polygon();
                          polygon.setPath(
                            tender.geoBounds as AMap.LngLatLike[],
                          );
                          const bounds = polygon.getBounds();
                          if (bounds) {
                            map?.setCenter(bounds.getCenter(), false, 600);
                          }
                        } else if (tender?.geoCoordinate?.coordinates) {
                          map?.setCenter(
                            tender.geoCoordinate.coordinates as AMap.LngLatLike,
                            false,
                            600,
                          );
                        }
                        const a = document.querySelector(
                          "#marker-" + tender?.id,
                        );
                        const b = a?.closest(".amap-marker-label");
                        if (b instanceof HTMLElement) {
                          b.style.background = "#dc2626";
                        }
                        setTenderListHovering(tender?.id || 0);
                      }}
                      onMouseLeave={(e) => {
                        const a = document.querySelector(
                          "#marker-" + tender?.id,
                        );
                        const b = a?.closest(".amap-marker-label");
                        if (b instanceof HTMLElement) {
                          b.style.background = "";
                        }
                        // setTenderListHovering(null);
                      }}
                    >
                      <div className="w-[40%]">
                        {tender?.images && tender.images.length > 0 ? (
                          <Carousel>
                            <CarouselContent>
                              {tender?.images?.map((image, i) => (
                                <CarouselItem key={["list", i].join("-")}>
                                  <img
                                    src={image}
                                    className="aspect-[4/3] h-full w-full rounded object-cover"
                                    alt={tender?.name}
                                  />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                          </Carousel>
                        ) : (
                          <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-md bg-gray-300 text-gray-600">
                            <ImageOff className="mb-2" />
                            <span className="text-xs">暂没图片</span>
                          </div>
                        )}
                      </div>
                      <div className="w-[60%] space-y-2 py-1">
                        <h3 className="font-bold line-clamp-1">
                          {tender?.name}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-300">
                            {isGAorHWTender ? "交标日期" : "预计招标日期"}
                          </div>
                          <div>
                            {isGAorHWTender
                              ? tender?.tenderClosingDate &&
                                dayjs(tender?.tenderClosingDate).format("LL")
                              : tender?.tenderDate
                                ? dayjs(tender?.tenderDate).format("LL")
                                : "-"}
                          </div>
                        </div>
                        <div className="flex items-baseline justify-between text-sm">
                          <div className="text-gray-300">招标形式</div>
                          <div>{tender?.tenderForm || "-"}</div>
                        </div>
                        <div className="flex items-baseline justify-between text-sm">
                          <div className="text-gray-300">预计金额</div>
                          <div>
                            {tender?.estimatedAmount
                              ? `${fixAmount(tender?.estimatedAmount)} 亿`
                              : "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
