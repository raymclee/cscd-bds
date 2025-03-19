import { createLazyFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
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
      <nav className="sticky top-0 z-20 h-16">
        <img
          src={headSvg}
          alt="head"
          className="mx-auto h-[80%] w-full object-cover lg:w-[70%]"
        />
      </nav>

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

        <div className="relative flex flex-wrap gap-1 lg:gap-6">
          {/* Shipment Details */}
          <div className="z-10 order-last min-h-screen w-full rounded-xl bg-black/30 p-6 backdrop-blur-lg lg:order-first lg:w-[35%]">
            <img
              src={subHeadSvg}
              alt="sub-head"
              className="-mt-4 mb-2 h-12 w-full"
            />
            <Tabs defaultValue="general">
              <div className="sticky top-[17rem] lg:top-[7rem]">
                <TabsList className="flex flex-wrap gap-2 bg-slate-800">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
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
                  {tenders?.map((tender) => (
                    <div
                      key={tender?.id}
                      className="grid grid-cols-3 gap-2 py-2"
                    >
                      <img
                        src={tender?.images?.at(0)}
                        alt={tender?.name}
                        className="aspect-video rounded-md"
                      />
                      <div className="col-span-2">
                        <div>{tender?.name}</div>
                        <div>
                          {tender?.tenderDate
                            ? dayjs(tender?.tenderDate).format("LL")
                            : "-"}
                        </div>
                      </div>
                    </div>
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

function CarouselDemo() {
  const [api, setApi] = React.useState<CarouselApi>();

  // useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   api.

  // }, [api])
  return (
    <Carousel plugins={[]} opts={{ loop: true }} setApi={setApi}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="lg:basis-1/3">
            <Card className="border-none bg-black/30 text-white backdrop-blur-lg">
              <CardHeader>
                <img
                  src={subHeadAmountSvg}
                  alt="sub-head"
                  className="h-12 w-full"
                />
              </CardHeader>
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
        <CarouselNext /> */}
    </Carousel>
  );
}

// function CarouselDApiDemo() {
//   const [api, setApi] = React.useState<CarouselApi>();
//   const [current, setCurrent] = React.useState(0);
//   const [count, setCount] = React.useState(0);

//   React.useEffect(() => {
//     if (!api) {
//       return;
//     }

//     setCount(api.scrollSnapList().length);
//     setCurrent(api.selectedScrollSnap() + 1);

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1);
//     });
//   }, [api]);

//   return (
//     <div className="sticky top-[5rem] z-10 self-start lg:grid-cols-3">
//       <Carousel setApi={setApi} className="w-full">
//         <CarouselContent>
//           {Array.from({ length: 5 }).map((_, index) => (
//             <CarouselItem key={index}>
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <span className="text-4xl font-semibold">{index + 1}</span>
//                 </CardContent>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         {/* <CarouselPrevious />
//         <CarouselNext /> */}
//       </Carousel>
//       <div className="py-2 text-center text-sm text-muted-foreground">
//         Slide {current} of {count}
//       </div>
//     </div>
//   );
// }
