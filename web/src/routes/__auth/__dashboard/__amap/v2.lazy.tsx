import { createLazyFileRoute, Link } from "@tanstack/react-router";
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
import { v2PageQuery } from "__generated__/v2PageQuery.graphql";
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

export const V2IndexPageQuery = graphql`
  query v2PageQuery(
    $userId: ID!
    $orderBy: [TenderOrder!]
    $first: Int
    $last: Int # $visitOrderBy: [VisitRecordOrder!]
  ) {
    node(id: $userId) {
      ... on User {
        areas {
          edges {
            node {
              id
              name @required(action: NONE)
              code
              createdAt
              center {
                coordinates
              }
              provinces {
                edges {
                  node {
                    id
                    name
                    adcode
                    center {
                      coordinates
                    }
                  }
                }
              }
              tenders(
                orderBy: $orderBy
                first: $first
                last: $last
                where: { statusNEQ: 7, approvalStatus: 2 }
              ) @connection(key: "MapIndexPageQuery_tenders") {
                edges {
                  node {
                    id
                    name
                    status
                    createdAt
                    estimatedAmount
                    customer {
                      id
                      name
                      ownerType
                      area {
                        id
                        name
                      }
                    }
                    followingSales {
                      id
                      name
                    }
                    images
                    fullAddress
                    tenderDate
                    discoveryDate
                    contractor
                    designUnit
                    tenderForm
                    keyProject
                    contractForm
                    tenderingAgency
                    consultingFirm
                    facadeConsultant
                    contractForm
                    timeLimitRating
                    sizeAndValueRating
                    creditAndPaymentRating
                    customerRelationshipRating
                    competitivePartnershipRating
                    timeLimitRatingOverview
                    sizeAndValueRatingOverview
                    creditAndPaymentRatingOverview
                    customerRelationshipRatingOverview
                    competitivePartnershipRatingOverview
                    tenderWinCompany
                    tenderCode
                    developer
                    architect
                    tenderClosingDate
                    constructionArea
                    tenderWinAmount
                    tenderWinDate
                    area {
                      code
                      name
                    }
                    province {
                      adcode
                      name
                    }
                    city {
                      name
                      adcode
                    }
                    district {
                      name
                      adcode
                    }
                    geoCoordinate {
                      coordinates
                    }
                    geoBounds
                    # visitRecords(orderBy: $visitOrderBy) {
                    #   edges {
                    #     node {
                    #       visitType
                    #       nextStep
                    #       commPeople
                    #       commContent
                    #       date
                    #       customer {
                    #         name
                    #       }
                    #       tender {
                    #         id
                    #         name
                    #       }
                    #     }
                    #   }
                    # }
                  }
                }
              }
            }
          }
        }
      }
    }

    topCompetitors {
      id
      shortName
      wonTendersCount
    }

    users {
      edges {
        node {
          id
          name
        }
      }
    }

    customers {
      edges {
        node {
          id
          name
          ownerType
        }
      }
    }
  }
`;

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
  const preload = Route.useLoaderData();
  const data = usePreloadedQuery<v2PageQuery>(V2IndexPageQuery, preload);
  const map = useMapV2Store.use.map();
  const renderAreas = useMapV2Store.use.renderAreas();

  useEffect(() => {
    map?.on("complete", () => {
      //TODO: fix type
      renderAreas(data.node?.areas as any);
    });
  }, [data.node?.areas, renderAreas, map]);

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
      <div className="px-6 py-4">
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
          <div className="sticky top-20 z-[11] mb-6 w-full flex-1 self-start lg:col-span-2 xl:col-span-3">
            {/* <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-xl bg-black/50 p-6 backdrop-blur-lg">
                <div className="mb-4 flex items-center justify-between">
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

              <div className="rounded-xl bg-slate-900 p-6">
                <div className="mb-4 flex items-center justify-between">
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

              <div className="rounded-xl bg-slate-900 p-6">
                <div className="mb-4 flex items-center justify-between">
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
  const preload = Route.useLoaderData();
  const data = usePreloadedQuery<v2PageQuery>(V2IndexPageQuery, preload);

  const tenders = data.node?.areas?.edges?.flatMap((a) =>
    a?.node?.tenders.edges?.map((t) => t?.node),
  );

  return (
    <>
      <div className="relative z-10 order-last min-h-screen w-full rounded-lg bg-slate-950/30 backdrop-blur-lg md:order-first">
        <img
          src={subHeadTenderListSvg}
          alt="sub-head"
          className="mb-6 mt-2 h-8 w-full px-4"
        />
        <Tabs defaultValue="general">
          <div className="sticky top-[17rem] rounded bg-slate-900 px-6 py-2 md:top-[4rem]">
            {/* <TabsList className="flex flex-wrap gap-2 bg-slate-900">
        <TabsTrigger value="general" className="font-bold">
          华北
        </TabsTrigger>
        <TabsTrigger value="tracking" className="font-bold">
          华东
        </TabsTrigger>
        <TabsTrigger value="chat" className="font-bold">
          华南
        </TabsTrigger>
        <TabsTrigger value="documents" className="font-bold">
          西部
        </TabsTrigger>
      </TabsList> */}
            <div className="flex items-center justify-center gap-2">
              <div>
                <Input
                  placeholder="搜索"
                  className="h-8 w-48 border-slate-700 bg-slate-900 focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
                />
              </div>
              <Select>
                <SelectTrigger className="h-8 w-24 border-slate-700 bg-slate-900 focus:ring-sky-500 focus:ring-offset-0">
                  <SelectValue placeholder="华北" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="华北">华北</SelectItem>
                  <SelectItem value="华东">华东</SelectItem>
                  <SelectItem value="华南">华南</SelectItem>
                  <SelectItem value="西部">西部</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="h-8 w-24 border-slate-700 bg-slate-900 focus:ring-sky-500 focus:ring-offset-0">
                  <SelectValue placeholder="时间" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="华北">华北</SelectItem>
                  <SelectItem value="华东">华东</SelectItem>
                  <SelectItem value="华南">华南</SelectItem>
                  <SelectItem value="西部">西部</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <TabsContent value="general" className="py-2">
            <div className="space-y-1">
              {tenders?.toSpliced(0, 20)?.map((tender) => (
                <Link
                  key={tender?.id}
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
