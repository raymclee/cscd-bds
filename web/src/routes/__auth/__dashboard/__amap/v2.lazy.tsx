import {
  createLazyFileRoute,
  Link,
  Outlet,
  useLocation,
  useMatch,
  useRouter,
} from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ChevronUp, Search } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  MapPin,
  Phone,
  MessageSquare,
  MoreVertical,
  Truck,
  Package,
} from "lucide-react";
import * as React from "react";

import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";
import { graphql } from "relay-runtime";
import { usePreloadedQuery } from "react-relay";
import dayjs from "dayjs";
import headSvg from "~/assets/dashboard/svg/head.svg";
import subHeadSvg from "~/assets/dashboard/svg/sub-head.svg";
import subHeadAmountSvg from "~/assets/dashboard/svg/sub-head-amount.svg";
import subHeadANewTenderSvg from "~/assets/dashboard/svg/sub-head-new-tender.svg";
import subHeadTenderListSvg from "~/assets/dashboard/svg/sub-head-tender-list.svg";
import subHeadRankingSvg from "~/assets/dashboard/svg/sub-head-ranking.svg";
import subHeadTenderTypeSvg from "~/assets/dashboard/svg/sub-head-tender-type.svg";
import { fixAmount, tenderStatusText } from "~/lib/helper";
import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";
import { UseEmblaCarouselType } from "embla-carousel-react";
import { useMapStore } from "~/store/map";
import { RankingCard } from "~/components/dashboardv2/ranking-card";
import { TenderAddedCard } from "~/components/dashboardv2/tender-added-card";
import { AmountSummaryCard } from "~/components/dashboardv2/amount-summary-card";
import { TenderTypeCard } from "~/components/dashboardv2/tender-type-card";
import { useMapV2Store } from "~/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { TenderDetailCard } from "~/components/dashboardv2/tender-detail-card";
import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";

export const districtsQuery = graphql`
  query v2PageDistrictQuery($adcode: Int!) {
    districts(where: { adcode: $adcode }) {
      edges {
        node {
          plots {
            edges {
              node {
                id
                name
                geoBounds
                colorHex
              }
            }
          }
        }
      }
    }
  }
`;

export const Route = createLazyFileRoute("/__auth/__dashboard/__amap/v2")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/* Search and Filters */}
      <div className="hidden px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by ID, status, departure, arrival..."
              className="border-slate-800 bg-slate-900 pl-10 text-white"
            />
          </div>

          <div className="flex gap-4">
            {[
              "Status: 3",
              "Vehicle: 2",
              "Total value: > $25k",
              "Load: 5",
              "Carrier: 5",
            ].map((filter) => (
              <DropdownMenu key={filter}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-slate-800 bg-slate-900 text-white"
                  >
                    {filter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Option 1</DropdownMenuItem>
                  <DropdownMenuItem>Option 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-4 md:px-6">
        {/* <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-white">
              Shipment Tracking
            </h1>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="text-white border-slate-800 bg-slate-900"
              >
                Map view
              </Button>
              <Button
                variant="outline"
                className="text-white border-slate-800 bg-slate-900"
              >
                List view
              </Button>
              <Button className="text-white bg-blue-600 hover:bg-blue-700">
                Add shipping
              </Button>
            </div>
          </div> */}

        <div className="relative grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {/* Shipment Details */}

          <TenderList />

          {/* Stats */}
          <div className="sticky z-[11] mb-6 w-full flex-1 self-start md:top-[4.5rem] lg:col-span-2 xl:col-span-3">
            {/* <div className="grid gap-6 lg:grid-cols-3">
              <div className="p-6 rounded-xl bg-black/50 backdrop-blur-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-green-500" />
                    <span className="text-slate-400">Total distance</span>
                  </div>
                </div>
                <div className="mb-2 text-3xl font-bold text-white">
                  400 miles
                </div>
                <div className="text-sm text-red-500">
                  +50 miles due to road repairs
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-900">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Package className="text-blue-500" />
                    <span className="text-slate-400">Total weight</span>
                  </div>
                </div>
                <div className="mb-2 text-3xl font-bold text-white">
                  15,000 lbs
                </div>
                <div className="text-sm text-green-500">
                  +500 lbs was added in Sioux City
                </div>
              </div>

              <div className="p-6 rounded-xl bg-slate-900">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="text-purple-500" />
                    <span className="text-slate-400">Total value</span>
                  </div>
                </div>
                <div className="mb-2 text-3xl font-bold text-white">$250k</div>
                <div className="text-sm text-slate-400">No updates</div>
              </div>
            </div> */}
            <CarouselDemo />
          </div>

          {/* <div className="p-6 rounded-xl bg-slate-900"> */}
          {/* Map placeholder - In a real application, you would integrate with a mapping service */}
          {/* <div className="flex h-[300px] items-center justify-center rounded-lg bg-slate-800">
                <span className="text-slate-400">Map View</span>
              </div> */}
          {/* </div> */}
        </div>
      </div>

      <ScrollToTopButton />
      <TenderDetailCard />

      <Outlet />
    </>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-8 right-8 z-40 rounded-full border-none bg-black/50 hover:bg-black/70 hover:text-white"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <ChevronUp size={44} />
    </Button>
  );
}

function TenderList() {
  const tenders = useAreaTenders();
  const { q, status, sort } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filteredTenders = tenders
    ?.filter((t) => {
      return q ? t?.name?.toLowerCase().includes(q.toLowerCase()) : true;
    })
    .filter((t) => {
      return status ? (status === 0 ? true : t?.status === status) : true;
    });

  return (
    <>
      <div className="relative z-10 order-last min-h-screen w-full rounded-lg bg-slate-950/30 backdrop-blur-lg md:order-first">
        <img
          src={subHeadTenderListSvg}
          alt="sub-head"
          className="mb-6 mt-2 h-8 w-full px-4"
        />
        <Tabs defaultValue="general">
          <div className="sticky top-12 rounded bg-sky-950 px-6 py-2 md:top-[3.5rem]">
            <div className="grid gap-2 pt-2 md:grid-cols-4 md:pt-0.5">
              <Input
                type="search"
                placeholder="搜索"
                className="col-span-2 h-8 w-full border-sky-800 bg-transparent focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
                onChange={(e) => {
                  navigate({
                    to: ".",
                    search: (prev) => ({
                      ...prev,
                      q: e.target.value,
                    }),
                    replace: true,
                  });
                }}
              />
              <Select
                value={String(status)}
                onValueChange={(value) => {
                  navigate({
                    to: ".",
                    search: (prev) => ({
                      ...prev,
                      status: value === "undefined" ? undefined : Number(value),
                    }),
                    replace: true,
                  });
                }}
              >
                <SelectTrigger className="h-8 w-full border-sky-800 bg-transparent focus:ring-sky-500 focus:ring-offset-0">
                  <SelectValue placeholder="状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undefined">全部</SelectItem>
                  <SelectItem value="1">跟进中</SelectItem>
                  <SelectItem value="2">停止跟进</SelectItem>
                  <SelectItem value="5">估价</SelectItem>
                  <SelectItem value="6">已交标</SelectItem>
                  <SelectItem value="3">中标</SelectItem>
                  <SelectItem value="4">失标</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-8 w-full border-sky-800 bg-transparent focus:ring-sky-500 focus:ring-offset-0">
                  <SelectValue placeholder="日期" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="undefined">全部</SelectItem>
                  <SelectItem value="1">华北</SelectItem>
                  <SelectItem value="2">华东</SelectItem>
                  <SelectItem value="3">华南</SelectItem>
                  <SelectItem value="4">西部</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between px-6 pb-1 pt-2 text-sm text-slate-400">
            <div>当前显示: {filteredTenders?.length || 0} 个项目</div>
            <div>总计: {tenders?.length || 0} 个项目</div>
          </div>
          <TabsContent value="general" className="mt-0">
            <div className="space-y-1">
              {filteredTenders?.map((tender) => (
                <Link
                  key={tender?.id}
                  // onClick={() => {
                  //   useMapV2Store.setState({ selectedTender: tender as any });
                  // }}
                  to="/tenders/$id"
                  params={{ id: tender?.id ?? "" }}
                  className="grid grid-cols-3 gap-4 rounded-lg px-6 py-4 transition-colors hover:bg-gradient-to-br hover:from-brand/40 hover:to-brand/10"
                >
                  <img
                    src={tender?.images?.at(0)}
                    alt={tender?.name}
                    className="aspect-[5/3] rounded"
                  />
                  <div className="col-span-2 space-y-1">
                    <h2 className="line-clamp-1 font-semibold">
                      {tender?.name}
                    </h2>
                    <div className="text-sm">
                      {tender?.tenderDate
                        ? dayjs(tender?.tenderDate).format("LL")
                        : "-"}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm">
                        {tenderStatusText(tender?.status)}
                      </div>
                      <div className="text-sm">
                        {tender?.estimatedAmount
                          ? `¥${fixAmount(tender?.estimatedAmount)}亿`
                          : "-"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function CarouselDemo() {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <Carousel
      plugins={[]}
      opts={{ loop: true }}
      setApi={setApi}
      className="px-8 2xl:px-0"
    >
      <CarouselContent>
        <CarouselItem className="lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4">
          <AmountSummaryCard />
        </CarouselItem>
        <CarouselItem className="lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4">
          <RankingCard />
        </CarouselItem>
        <CarouselItem className="lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4">
          <TenderAddedCard />
        </CarouselItem>
        <CarouselItem className="lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4">
          <TenderTypeCard />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="-left-0 h-full w-6 rounded border-none bg-slate-950/30 hover:bg-slate-950/50 2xl:hidden" />
      <CarouselNext className="-right-0 h-full w-6 rounded border-none bg-slate-950/30 hover:bg-slate-950/50 2xl:hidden" />
    </Carousel>
  );
}
