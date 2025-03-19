import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
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
import { fixAmount } from "~/lib/helper";
import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";
import { UseEmblaCarouselType } from "embla-carousel-react";
import { useMapStore } from "~/store/map";

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

  const tenders = data.node?.areas?.edges?.flatMap((a) =>
    a?.node?.tenders.edges?.map((t) => t?.node),
  );

  return (
    <>
      {/* Navigation */}
      {/* <nav className="sticky top-0 z-20 h-14 border-b border-slate-800 bg-[#0A1428] px-6 py-4">
        <img src={HeadBg} alt="head" className="absolute left-0 top-0 w-full" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
              <div className="text-2xl text-white">🚚</div>
              <div className="flex space-x-6">
                {[
                  "Dashboard",
                  "Shipments",
                  "Tracking",
                  "Invoices",
                  "Products",
                  "Notifications",
                ].map((item, index) => (
                  <button
                    key={item}
                    className={`text-sm ${
                      index === 1 ? "bg-slate-800 text-white" : "text-slate-400"
                    } rounded-lg px-4 py-2`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop" />
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
            <div className="text-right">
                <div className="text-sm font-medium text-white">
                  Donna Kendrik
                </div>
                <div className="text-xs text-slate-400">Logistics manager</div>
              </div>
          </div>
        </div>
      </nav> */}

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
      <div className="px-6 py-6">
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

        <div className="relative flex flex-wrap gap-1 md:gap-6">
          {/* Shipment Details */}
          <div className="z-10 order-last min-h-screen w-full rounded-lg bg-black/30 p-6 backdrop-blur-lg md:order-first md:w-[50%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]">
            <img
              src={subHeadTenderListSvg}
              alt="sub-head"
              className="-mt-4 mb-6 h-8 w-full"
            />
            <Tabs defaultValue="general">
              <div className="sticky top-[17rem] lg:top-[6rem]">
                <TabsList className="flex flex-wrap gap-2 bg-slate-800">
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
                </TabsList>
              </div>
              <TabsContent value="general" className="mt-4">
                {/* <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-400">Shipping ID</div>
                      <div className="text-white">NYP-234GA</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 bg-slate-800"
                    >
                      In transit
                    </Button>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div className="text-white">New York, NY</div>
                      <div className="text-sm text-slate-400">
                        03/12/2024 10:00 AM
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <div className="text-white">Atlanta, GA</div>
                      <div className="text-sm text-slate-400">
                        03/13/2024 02:00 PM
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="space-y-4">
                  {tenders?.toSpliced(0, 20)?.map((tender) => (
                    <Link
                      key={tender?.id}
                      to="/tenders/$id"
                      params={{ id: tender?.id ?? "" }}
                      className="grid grid-cols-3 gap-4 py-2"
                    >
                      <img
                        src={tender?.images?.at(0)}
                        alt={tender?.name}
                        className="aspect-video rounded-md"
                      />
                      <div className="col-span-2">
                        <h2 className="line-clamp-1 font-semibold">
                          {tender?.name}
                        </h2>
                        <div className="text-sm text-slate-300">
                          {tender?.tenderDate
                            ? dayjs(tender?.tenderDate).format("LL")
                            : "-"}
                        </div>
                        <div className="text-sm text-slate-300">
                          {tender?.estimatedAmount
                            ? `¥${fixAmount(tender?.estimatedAmount)}亿`
                            : "-"}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Stats */}
          <div className="sticky top-[5.5rem] z-[11] mb-6 w-full flex-1 self-start">
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
    </>
  );
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

function usePrevNextButtons(
  emblaApi: CarouselApi | undefined,
  onButtonClick?: (emblaApi: CarouselApi) => void,
): UsePrevNextButtonsType {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    setPrevBtnDisabled(!emblaApi?.canScrollPrev());
    setNextBtnDisabled(!emblaApi?.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

function CarouselDemo() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(api);

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   onScroll(api);
  //   api
  //     .on("reInit", onScroll)
  //     .on("scroll", onScroll)
  //     .on("slideFocus", onScroll);
  // }, [api]);

  // const onScroll = useCallback((emblaApi: CarouselApi) => {
  //   if (!emblaApi) {
  //     return;
  //   }
  //   const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
  //   setScrollProgress(progress * 100);
  // }, []);

  return (
    <Carousel plugins={[]} opts={{ loop: true }} setApi={setApi} className="">
      <CarouselContent>
        {[
          subHeadAmountSvg,
          subHeadRankingSvg,
          subHeadTenderTypeSvg,
          subHeadANewTenderSvg,
        ].map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
            <Card className="border-none bg-black/30 text-white backdrop-blur-lg">
              <CardHeader>
                <img
                  src={item}
                  alt="sub-head"
                  className="h-8 w-full select-none"
                />
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-4xl font-semibold">{1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="invisible border-none bg-[#071925] md:visible" /> */}
      {/* <CarouselNext className="invisible border-none bg-[#071925] md:visible" /> */}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-none bg-black/50 hover:bg-black/70 hover:text-white"
            disabled={prevBtnDisabled}
            onClick={onPrevButtonClick}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-none bg-black/50 hover:bg-black/70 hover:text-white"
            disabled={nextBtnDisabled}
            onClick={onNextButtonClick}
          >
            <ChevronRight />
          </Button>
        </div>

        {/* <div className="relative h-1 w-full max-w-[90%] self-center justify-self-end overflow-hidden rounded bg-neutral-500">
          <div
            className="absolute -left-full bottom-0 top-0 w-full bg-white"
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div> */}
        <div className="mr-[calc((2.6rem-1.4rem)/2*-1)] flex flex-wrap items-center justify-end">
          {scrollSnaps.map((_, index) => (
            <div key={index} className="h-10 w-10" />
          ))}
        </div>
      </div>
    </Carousel>
  );
}

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

function useDotButton(emblaApi: CarouselApi | undefined): UseDotButtonType {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: CarouselApi) => {
    setScrollSnaps(emblaApi?.scrollSnapList() ?? []);
  }, []);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    setSelectedIndex(emblaApi?.selectedScrollSnap() ?? 0);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
}

type PropType = ComponentPropsWithRef<"button">;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};
