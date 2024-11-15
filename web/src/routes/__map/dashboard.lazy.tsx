import { createLazyFileRoute } from "@tanstack/react-router";
import { BadgeJapaneseYen, ChartPie, Layers, Layers2Icon } from "lucide-react";
import { useEffect } from "react";
import { MyBarChart } from "~/components/bar-chart";
import { BidChart } from "~/components/bid-chart";
import { BusinessChart } from "~/components/business-chart";
import { PercentageChart } from "~/components/percentage-chart";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useMapStore } from "~/store/map";

export const Route = createLazyFileRoute("/__map/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const initMap = useMapStore((s) => s.initMap);

  useEffect(() => {
    initMap("map", {
      mapStyle: "amap://styles/darkblue",
    });
  }, []);

  return (
    <div className="bg-dashboard min-h-screen relative">
      <div id="map" className="absolute inset-0"></div>
      <div className="bg-dashboard-head z-10 w-full absolute h-[80px] bg-cover bg-center flex justify-center items-center text-white">
        <div className="text-4xl font-semibold select-none text-ellipsis whitespace-nowrap">
          遠東幕牆市場投標地圖
        </div>
      </div>

      <div className="flex gap-2 pt-[6.5rem] px-8">
        <div className="space-y-2 h-full w-[20%]">
          <Card className="bg-transparent border border-brand drop-shadow-2xl overflow-hidden rounded-none h-[16rem] shadow-dashboard-card">
            <CardHeader className="text-white font-bold text-lg bg-[linear-gradient(90deg,#0a3144,#17778e,#092537)]">
              新增商機數
            </CardHeader>
            <CardContent className="mt-4">
              <div className="flex justify-evenly items-center">
                <div className="space-y-2">
                  <div className="backdrop-blur bg-brand/40 p-4 rounded-full flex justify-center items-center">
                    <BadgeJapaneseYen className="text-brand w-14 h-14" />
                  </div>
                  <div className="text-center text-gray-300">
                    <span className="text-3xl mr-2 font-bold">0.8</span>
                    億元
                  </div>
                  <div className="text-center text-gray-300">金額</div>
                </div>

                <div className="space-y-2">
                  <div className="backdrop-blur bg-brand/40 p-4 rounded-full flex justify-center items-center">
                    <Layers className="text-brand w-14 h-14" />
                  </div>
                  <div className="text-center text-gray-300">
                    <span className="text-3xl mr-2 font-bold">1</span>個
                  </div>
                  <div className="text-center text-gray-300">數量</div>
                </div>

                <div className="space-y-2">
                  <div className="backdrop-blur bg-brand/40 p-4 rounded-full flex justify-center items-center">
                    <ChartPie className="text-brand w-14 h-14" />
                  </div>
                  <div className="text-center text-gray-300">
                    <span className="text-3xl mr-2 font-bold">27</span>%
                  </div>
                  <div className="text-center text-gray-300">比例</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border border-brand overflow-hidden rounded-none h-[16rem] shadow-dashboard-card">
            <CardHeader className="text-white font-bold text bg-[linear-gradient(90deg,#0a3144,#17778e,#092537)]">
              商機匯總總金額
            </CardHeader>
            <CardContent className="mt-8">
              <BidChart />
            </CardContent>
          </Card>

          <Card className="bg-transparent border border-brand overflow-hidden rounded-none h-[16rem] shadow-dashboard-card">
            <CardHeader className="text-white font-bold text-lg bg-[linear-gradient(90deg,#0a3144,#17778e,#092537)]">
              項目商機類型金額占比
            </CardHeader>
            <CardContent className="mt-8">
              <PercentageChart />
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-2">
          {/* <Card className="bg-transparent border border-brand drop-shadow-2xl overflow-hidden rounded-none h-full shadow-dashboard-card">
            <CardContent className="mt-8">
              <div id="map"></div>
            </CardContent>
          </Card> */}
        </div>

        <div className="space-y-2 w-[20%]">
          <Card className="bg-transparent border border-brand drop-shadow-2xl overflow-hidden rounded-none h-[24.5rem] shadow-dashboard-card">
            <CardHeader className="text-white font-bold text-lg bg-[linear-gradient(90deg,#0a3144,#17778e,#092537)]">
              市場競爭龍虎榜
            </CardHeader>
            <CardContent className="mt-8">
              <BusinessChart />
            </CardContent>
          </Card>

          <Card className="bg-transparent border border-brand drop-shadow-2xl overflow-hidden rounded-none h-[24.5rem] shadow-dashboard-card">
            <CardHeader className="text-white font-bold text-lg bg-[linear-gradient(90deg,#0a3144,#17778e,#092537)]">
              項目列表
            </CardHeader>
            <CardContent className="mt-4">
              <ScrollArea>
                <Table>
                  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                  <TableHeader className="">
                    <TableRow className="items-center text-gray-300">
                      <TableHead className="w-[100px]">序號</TableHead>
                      <TableHead>項目名稱</TableHead>
                      <TableHead>項目區域</TableHead>
                      <TableHead className="text-center">
                        <div>預計金額</div>
                        (億元)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-white">
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell className="font-medium">
                        珠海國際大廈
                      </TableCell>
                      <TableCell>珠海</TableCell>
                      <TableCell className="text-center">3.12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell className="font-medium">
                        珠海國際大廈
                      </TableCell>
                      <TableCell>珠海</TableCell>
                      <TableCell className="text-center">3.12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell className="font-medium">
                        珠海國際大廈
                      </TableCell>
                      <TableCell>珠海</TableCell>
                      <TableCell className="text-center">3.12</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell className="font-medium">
                        珠海國際大廈
                      </TableCell>
                      <TableCell>珠海</TableCell>
                      <TableCell className="text-center">3.12</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
