import {
  createLazyFileRoute,
  Link,
  Outlet,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { ChevronUp, ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent } from "~/components/ui/tabs";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { graphql } from "relay-runtime";
import subHeadTenderListSvg from "~/assets/dashboard/svg/sub-head-tender-list.svg";
import { AmountSummaryCard } from "~/components/dashboardv2/amount-summary-card";
import { RankingCard } from "~/components/dashboardv2/ranking-card";
import { TenderAddedCard } from "~/components/dashboardv2/tender-added-card";
import { TenderDetailCard } from "~/components/dashboardv2/tender-detail-card";
import { TenderTypeCard } from "~/components/dashboardv2/tender-type-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import { fixAmount, tenderStatusText } from "~/lib/helper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { motion } from "motion/react";
import "~/styles/tech-animations.css";

const MotionCarousel = motion(Carousel);
const MotionCarouselContent = motion(CarouselContent);
const MotionCarouselItem = motion(CarouselItem);
const MotionCarouselPrevious = motion(CarouselPrevious);
const MotionCarouselNext = motion(CarouselNext);
const MotionButton = motion(Button);

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
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed z-40 border-none rounded-full bottom-8 right-8 bg-slate-950/60 hover:bg-slate-950/50 hover:text-white"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <ChevronUp size={44} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="dark">
          <p>回到顶部</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function TenderList() {
  const tenders = useAreaTenders();
  const { q, status, sort } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filteredTenders = tenders
    ?.filter(
      (t) =>
        q !== undefined && t?.name?.toLowerCase().includes(q.toLowerCase()),
    )
    .filter((t) =>
      status ? (status === 0 ? true : t?.status === status) : true,
    );

  return (
    <>
      <div className="relative z-10 order-last min-h-[calc(100vh-6rem)] w-full rounded-lg bg-slate-950/60 backdrop-blur md:order-first">
        <img
          src={subHeadTenderListSvg}
          alt="sub-head"
          className="w-full h-8 px-4 mt-2 mb-6"
        />
        <div className="sticky top-12 z-20 rounded bg-sky-950 px-6 py-2 md:top-[3.5rem]">
          <div className="grid gap-2 pt-2 md:grid-cols-4 md:pt-0.5">
            <Input
              type="search"
              placeholder="搜索"
              className="w-full h-8 col-span-2 bg-transparent border-sky-800 focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
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
              <SelectTrigger className="w-full h-8 bg-transparent border-sky-800 focus:ring-sky-500 focus:ring-offset-0">
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent className="text-white border-sky-800 bg-sky-950">
                <SelectItem
                  value="undefined"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  全部
                </SelectItem>
                <SelectItem
                  value="1"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  跟进中
                </SelectItem>
                <SelectItem
                  value="2"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  停止跟进
                </SelectItem>
                <SelectItem
                  value="5"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  估价
                </SelectItem>
                <SelectItem
                  value="6"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  已交标
                </SelectItem>
                <SelectItem
                  value="3"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  中标
                </SelectItem>
                <SelectItem
                  value="4"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  失标
                </SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full h-8 bg-transparent border-sky-800 focus:ring-sky-500 focus:ring-offset-0">
                <SelectValue placeholder="日期" />
              </SelectTrigger>
              <SelectContent className="text-white border-sky-800 bg-sky-950">
                <SelectItem
                  value="undefined"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  全部
                </SelectItem>
                <SelectItem
                  value="1"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  华北
                </SelectItem>
                <SelectItem
                  value="2"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  华东
                </SelectItem>
                <SelectItem
                  value="3"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  华南
                </SelectItem>
                <SelectItem
                  value="4"
                  className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
                >
                  西部
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between px-6 pt-2 pb-1 text-sm text-slate-400">
          <div>当前显示: {filteredTenders?.length || 0} 个项目</div>
          <div>总计: {tenders?.length || 0} 个项目</div>
        </div>

        <div className="pb-4 mt-0 space-y-1">
          {filteredTenders?.map((tender) => (
            <Link
              key={tender?.id}
              to="/tenders/$id"
              params={{ id: tender?.id ?? "" }}
              className="block group"
            >
              <div className="relative grid grid-cols-3 gap-4 px-6 py-4 overflow-hidden transition-all duration-300 rounded-lg group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-sky-950 group-hover:to-sky-700">
                {/* Full card overlay effect */}
                <div className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-br from-blue-900/30 to-cyan-900/20 group-hover:opacity-100"></div>

                {/* Tech scan line */}
                <div className="absolute inset-0 z-10 translate-y-full opacity-0 pointer-events-none group-hover:animate-scan-line bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent group-hover:opacity-100"></div>

                {/* Corner borders - top left */}
                <div className="group-hover:bg-corner-border-glow absolute left-0 top-0 h-[2px] w-10 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                <div className="group-hover:bg-corner-border-glow absolute left-0 top-0 h-10 w-[2px] bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

                {/* Corner borders - top right */}
                <div className="group-hover:bg-corner-border-glow absolute right-0 top-0 h-[2px] w-10 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                <div className="group-hover:bg-corner-border-glow absolute right-0 top-0 h-10 w-[2px] bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

                {/* Corner borders - bottom left */}
                <div className="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-[2px] w-10 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                <div className="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-10 w-[2px] bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

                {/* Corner borders - bottom right */}
                <div className="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-[2px] w-10 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
                <div className="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-10 w-[2px] bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

                <div className="relative z-10">
                  {/* Image effects container */}
                  <div className="relative">
                    {/* Image glow effect */}
                    <div className="absolute transition-opacity duration-300 rounded opacity-0 -inset-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 group-hover:opacity-100"></div>

                    {/* Image border glow */}
                    <div className="group-hover:animate-pulse-glow absolute -inset-0.5 rounded opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

                    <img
                      src={tender?.images?.at(0)}
                      alt={tender?.name}
                      className="relative z-10 aspect-[5/3] rounded"
                    />

                    {/* Tech corner marker */}
                    <div className="absolute top-0 left-0 w-6 h-6 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-br from-cyan-500/50 to-transparent group-hover:opacity-100"></div>
                  </div>
                </div>

                <div className="relative z-10 col-span-2 space-y-1">
                  <h2 className="font-semibold transition-all duration-300 group-hover:text-shadow-glow line-clamp-1 group-hover:text-white">
                    {tender?.name}
                  </h2>

                  <div className="text-sm transition-all duration-300 group-hover:text-shadow-sm group-hover:text-blue-200">
                    {tender?.tenderDate
                      ? dayjs(tender?.tenderDate).format("LL")
                      : "-"}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm transition-all duration-300 group-hover:text-shadow-sm group-hover:scale-110 group-hover:text-cyan-400">
                      {tenderStatusText(tender?.status)}
                    </div>
                    <div className="text-sm transition-all duration-300 group-hover:text-shadow-sm group-hover:scale-110 group-hover:text-cyan-400">
                      {tender?.estimatedAmount
                        ? `¥${fixAmount(tender?.estimatedAmount)}亿`
                        : "-"}
                    </div>
                  </div>

                  {/* Data dot - positioned at edge */}
                  <div className="group-hover:animate-pulse-dot absolute -right-4 bottom-2.5 h-1.5 w-1.5 scale-0 rounded-full bg-cyan-400 opacity-0"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function CarouselDemo() {
  const search = useSearch({ from: "/__auth/__dashboard/__amap" });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const visible = Boolean(isCollapsed || !!search.d);

  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          y: visible ? [0, -50, -300] : 0,
          opacity: visible ? [1, 0.7, 0] : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        style={{
          willChange: "transform, opacity",
          position: "relative",
        }}
      >
        {/* Glitch overlay effect */}
        <motion.div
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: visible ? [0, 0.7, 0] : 0,
            clipPath: visible
              ? [
                  "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  "polygon(0 5%, 100% 0, 100% 95%, 0 100%)",
                  "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                ]
              : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{
            duration: visible ? 0.2 : 0,
            times: visible ? [0, 0.5, 1] : [0, 1],
            ease: "easeOut",
          }}
          style={{
            background:
              "linear-gradient(125deg, rgba(0,212,255,0.2) 0%, rgba(0,91,188,0.2) 100%)",
            mixBlendMode: "color-dodge",
          }}
        />

        <motion.div
          animate={{
            x: visible ? ["0%", "0.2%", "0%"] : "0%",
            filter: visible
              ? ["hue-rotate(0deg)", "hue-rotate(5deg)", "hue-rotate(0deg)"]
              : "hue-rotate(0deg)",
          }}
          transition={{
            duration: 0.1,
            repeat: 0,
          }}
          style={{
            willChange: "transform, filter",
          }}
        >
          <Carousel
            plugins={[]}
            opts={{ loop: true }}
            className="px-8 2xl:px-0"
          >
            <CarouselContent>
              {[
                <AmountSummaryCard key="amount" />,
                <RankingCard key="ranking" />,
                <TenderAddedCard key="tender" />,
                <TenderTypeCard key="type" />,
              ].map((card, index) => (
                <MotionCarouselItem
                  key={index}
                  className="lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: visible
                      ? [
                          "brightness(100%)",
                          "brightness(120%)",
                          "brightness(100%)",
                        ]
                      : "brightness(100%)",
                  }}
                  transition={{
                    delay: index * 0.02,
                    duration: 0.15,
                    filter: {
                      duration: 0.1,
                      repeat: 0,
                    },
                  }}
                >
                  {card}
                </MotionCarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="w-6 h-full border-none rounded -left-0 bg-slate-950/30 hover:bg-slate-950/50 hover:text-white 2xl:hidden" />
            <CarouselNext className="w-6 h-full border-none rounded -right-0 bg-slate-950/30 hover:bg-slate-950/50 hover:text-white 2xl:hidden" />
          </Carousel>
        </motion.div>
      </motion.div>

      {/* Tech button container with positioning */}
      <div className="flex justify-end mt-2">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                {/* Tech circle decoration around button */}
                <motion.div
                  className="pointer-events-none absolute -inset-1.5 rounded-full opacity-60"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(0,150,255,0.5)",
                      "0 0 8px rgba(0,150,255,0.7)",
                      "0 0 0 rgba(0,150,255,0.5)",
                    ],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                {/* Digital circuit lines */}
                <motion.div
                  className="absolute w-6 h-px origin-right bg-blue-400 pointer-events-none opacity-70"
                  style={{ right: "100%", top: "40%" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 0.7, 0.4] }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.div
                  className="absolute w-6 h-px origin-right pointer-events-none bg-cyan-400 opacity-70"
                  style={{ right: "100%", top: "60%" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 0.5, 0.7] }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />

                <MotionButton
                  size="icon"
                  variant="outline"
                  className="relative border-none rounded-full bg-slate-950/60 hover:bg-slate-950/50 hover:text-white"
                  onClick={toggleCollapse}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    boxShadow: "0 0 15px 2px rgba(0,180,255,0.5)",
                    backgroundColor: "rgba(10, 20, 30, 0.8)",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: visible ? 180 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    {<ChevronUp />}
                  </motion.div>
                </MotionButton>
              </div>
            </TooltipTrigger>
            <TooltipContent className="dark">
              <p>{visible ? "展开" : "收起"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
}
