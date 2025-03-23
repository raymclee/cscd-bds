import {
  createLazyFileRoute,
  Link,
  Outlet,
  useLocation,
  useParams,
  useRouterState,
  useSearch,
} from "@tanstack/react-router";
import { ChevronUp, ChevronDown, ChevronRight } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent } from "~/components/ui/tabs";

import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";
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
import { AnimatePresence, motion } from "motion/react";
import "~/styles/tech-animations.css";
import { cn } from "~/lib/utils";
import { useMapV2Store } from "~/store";
import { Tender } from "~/graphql/graphql";

const MotionCarouselItem = motion.create(CarouselItem);
const MotionButton = motion.create(Button);

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
      {/* Main Content */}
      <div className="py-4 md:px-6">
        <div className="relative grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <TenderList />
          <Cards />
        </div>
      </div>

      <ScrollToTopButton />
      {/* <TenderDetailCard /> */}
      <TenderDetail />
      <Navigator />
    </>
  );
}

function Navigator() {
  const areas = useMapV2Store.use.areas();
  const { selectedArea, province, city, district } = Route.useSearch({
    structuralSharing: false,
    select(state) {
      const selectedArea = areas?.edges?.find(
        (a) => a?.node?.code === state.a,
      )?.node;
      const province = selectedArea?.tenders?.edges?.find(
        (t) => t?.node?.province?.adcode === state.p,
      )?.node?.province;
      const city = selectedArea?.tenders?.edges?.find(
        (t) => t?.node?.city?.adcode === state.c,
      )?.node?.city;
      const district = selectedArea?.tenders?.edges?.find(
        (t) => t?.node?.district?.adcode === state.d,
      )?.node?.district;
      return {
        selectedArea,
        province,
        city,
        district,
      };
    },
  });

  if (!selectedArea) return null;

  const tabs = [
    {
      id: 0,
      label: selectedArea?.name,
      search: {
        a: selectedArea?.code,
      } as Record<string, string | number | undefined>,
    },
  ];

  if (province) {
    tabs.push({
      id: 1,
      label: province?.name,
      search: {
        a: selectedArea?.code,
        p: province?.adcode,
      },
    });
  }

  if (city) {
    tabs.push({
      id: 2,
      label: city?.name,
      search: {
        a: selectedArea?.code,
        p: province?.adcode,
        c: city?.adcode,
      },
    });
  }

  if (district) {
    tabs.push({
      id: 3,
      label: district?.name,
      search: {
        a: selectedArea?.code,
        p: province?.adcode,
        c: city?.adcode,
        d: district?.adcode,
      },
    });
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      }}
      className="fixed bottom-0 z-40 transform -translate-x-1/2 left-1/2"
    >
      {/* Backdrop glow */}
      <motion.div
        className="absolute rounded-full -inset-1 opacity-60"
        animate={{
          boxShadow: [
            "0 0 10px 2px rgba(0,150,255,0.4)",
            "0 0 15px 4px rgba(0,150,255,0.6)",
            "0 0 10px 2px rgba(0,150,255,0.4)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Container */}
      <div className="fixed flex items-center justify-center h-10 px-4 -translate-x-1/2 border rounded-full bottom-6 left-1/2 gap-x-2 border-blue-500/30 bg-slate-900/60 backdrop-blur-md">
        {/* Holographic scan effect */}
        <div className="absolute inset-0 z-10 overflow-hidden rounded-full">
          <div className="absolute inset-0 holographic-effect"></div>
        </div>

        {/* Digital circuit lines - left side */}
        <motion.div
          className="absolute w-10 h-px origin-right pointer-events-none bg-cyan-400"
          style={{ right: "100%", top: "35%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.8, 0.5] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div
          className="absolute w-16 h-px origin-right bg-blue-400 pointer-events-none"
          style={{ right: "100%", top: "65%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.5, 0.7] }}
          transition={{ duration: 0.7, delay: 0.1 }}
        />

        {/* Digital circuit lines - right side */}
        <motion.div
          className="absolute w-10 h-px origin-left pointer-events-none bg-cyan-400"
          style={{ left: "100%", top: "35%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.8, 0.5] }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.div
          className="absolute w-16 h-px origin-left bg-blue-400 pointer-events-none"
          style={{ left: "100%", top: "65%" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.5, 0.7] }}
          transition={{ duration: 0.7, delay: 0.1 }}
        />

        <Link to=".">
          <MotionButton
            className={cn(
              "relative z-20 overflow-hidden border-none hover:bg-transparent hover:text-white",
              // activeTab === tab.id
              //   ? "text-white"
              //   : "text-slate-400 hover:text-slate-200",
            )}
            whileHover={{
              scale: 1.25,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            variant={"ghost"}
            size={"sm"}
          >
            全国
          </MotionButton>
        </Link>
        <ChevronRight className="w-4 h-4" />

        {tabs.map((tab, i) => (
          <Fragment key={tab.id}>
            {i > 0 && <ChevronRight className="w-4 h-4" />}
            <Link to="." search={tab.search} disabled={i === tabs.length - 1}>
              <MotionButton
                disabled={i === tabs.length - 1}
                variant={"ghost"}
                size={"sm"}
                // onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative z-20 overflow-hidden border-none hover:bg-transparent hover:text-white",
                  // activeTab === tab.id
                  //   ? "text-white"
                  //   : "text-slate-400 hover:text-slate-200",
                )}
                whileHover={{
                  scale: 1.25,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active tab indicator with data flow animation */}
                {/* {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-lg animate-data-flow -z-10"
                    initial={{ borderRadius: 8 }}
                    animate={{ borderRadius: 8 }}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )} */}

                {/* Tab content */}
                <span className="relative z-10">{tab.label}</span>

                {/* Active tab scan line */}
                {/* {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 -z-[5] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
                    animate={{
                      y: ["100%", "-100%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                )} */}

                {/* Tech corners for active tab */}
                {/* {activeTab === tab.id && ( */}
                {/* <> */}
                {/* Top left corner */}
                {/* <motion.div
                      className="absolute left-0 top-0 h-[2px] w-[8px] bg-cyan-400"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute left-0 top-0 h-[8px] w-[2px] bg-cyan-400"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    /> */}

                {/* Top right corner */}
                {/* <motion.div
                      className="absolute right-0 top-0 h-[2px] w-[8px] bg-cyan-400"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute right-0 top-0 h-[8px] w-[2px] bg-cyan-400"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    /> */}

                {/* Bottom left corner */}
                {/* <motion.div
                      className="absolute bottom-0 left-0 h-[2px] w-[8px] bg-cyan-400"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-[8px] w-[2px] bg-cyan-400"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    /> */}

                {/* Bottom right corner */}
                {/* <motion.div
                  className="absolute bottom-0 right-0 h-[2px] w-[8px] bg-cyan-400"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 h-[8px] w-[2px] bg-cyan-400"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                /> */}
                {/* </>
                )} */}
              </MotionButton>
            </Link>
          </Fragment>
        ))}
      </div>
    </motion.div>
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
          <div className="fixed z-40 bottom-8 right-8">
            <div className="relative">
              {/* Backdrop glow */}
              <motion.div
                className="absolute rounded-full -inset-1 opacity-60"
                animate={{
                  boxShadow: [
                    "0 0 10px 2px rgba(0,150,255,0.4)",
                    "0 0 15px 4px rgba(0,150,255,0.6)",
                    "0 0 10px 2px rgba(0,150,255,0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
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
                variant="outline"
                size="icon"
                className="relative border-none rounded-full bg-slate-950/60 hover:bg-slate-950/50 hover:text-white"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                whileHover={{
                  boxShadow: "0 0 15px 2px rgba(0,180,255,0.5)",
                  backgroundColor: "rgba(10, 20, 30, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Holographic scan effect */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none">
                  <div className="absolute inset-0 holographic-effect"></div>
                </div>

                <ChevronUp size={44} className="relative z-10" />
              </MotionButton>
            </div>
          </div>
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
  const { q, status, sort, t, d } = Route.useSearch();
  const navigate = Route.useNavigate();

  const filteredTenders = tenders
    ?.filter((t) =>
      q ? t?.name?.toLowerCase().includes(q.toLowerCase()) : true,
    )
    .filter((t) =>
      status ? (status === 0 ? true : t?.status === status) : true,
    );

  return (
    <>
      <div className="relative z-10 order-last min-h-[calc(100vh-6rem)] w-full rounded-lg bg-slate-900/60 backdrop-blur md:order-first">
        <img
          src={subHeadTenderListSvg}
          alt="sub-head"
          className="w-full h-8 px-4 mt-2 mb-4"
        />
        <div className="sticky z-20 rounded bg-gradient-to-br from-sky-950 to-sky-900 px-6 py-2 md:top-[3.5rem]">
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
                    q: e.target.value === "" ? undefined : e.target.value,
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
              to="."
              search={(prev) => ({
                ...prev,
                a: tender?.area?.code,
                p: tender?.province?.adcode,
                d: tender?.district?.adcode,
                c: tender?.city?.adcode,
                t: tender?.id,
              })}
              replace={!!t}
              className="block group"
              onMouseOver={(e) => {
                if (!d || !tender?.geoCoordinate?.coordinates) return;
                const marker = useMapV2Store.getState().getMarker(tender?.id);
                if (marker) {
                  marker.setOptions({
                    zIndex: 13,
                  });
                }
                const a = document.querySelector("#marker-" + tender?.id);
                const b = a?.closest(".amap-marker-label");
                if (b instanceof HTMLElement) {
                  b.classList.add("scale-125");
                }

                useMapV2Store
                  .getState()
                  .map?.setCenter(
                    tender?.geoCoordinate?.coordinates as [number, number],
                    false,
                    300,
                  );
              }}
              onMouseLeave={() => {
                if (!d || !tender?.geoCoordinate?.coordinates) return;
                const marker = useMapV2Store.getState().getMarker(tender?.id);
                if (marker) {
                  marker.setOptions({
                    zIndex: 12,
                  });
                }
                const a = document.querySelector("#marker-" + tender?.id);
                const b = a?.closest(".amap-marker-label");
                if (b instanceof HTMLElement) {
                  b.classList.remove("scale-125");
                }
              }}
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

function Cards() {
  const show = useSearch({
    from: "/__auth/__dashboard/__amap",
    select(state) {
      return Boolean(state.d || state.t);
    },
  });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const visible = Boolean(!isCollapsed && !show);

  return (
    <>
      <div
        className={cn(
          "sticky mb-6 w-full flex-1 self-start md:top-[4.5rem] lg:col-span-2 xl:col-span-3",
          show ? "z-auto" : "z-[11]",
        )}
      >
        <AnimatePresence mode="wait">
          {!show && (
            <motion.div
              variants={{
                initial: { y: "-100%", opacity: 0 },
                visible: { y: "0", opacity: 1 },
                exit: { y: "-100%", opacity: 0 },
              }}
              initial="initial"
              animate={"visible"}
              exit="exit"
              // className="fixed z-40 transform -translate-x-1/2 bottom-6 left-1/2"
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
                    <CarouselItem
                      key={index}
                      className="lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                      // initial={{ opacity: 0, y: 20 }}
                      // animate={{
                      //   opacity: 1,
                      //   y: 0,
                      //   filter: visible
                      //     ? [
                      //         "brightness(100%)",
                      //         "brightness(120%)",
                      //         "brightness(100%)",
                      //       ]
                      //     : "brightness(100%)",
                      // }}
                      // transition={{
                      //   delay: index * 0.02,
                      //   duration: 0.15,
                      //   filter: {
                      //     duration: 0.1,
                      //     repeat: 0,
                      //   },
                      // }}
                    >
                      {card}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="w-6 h-full border-none rounded -left-0 bg-slate-950/30 hover:bg-slate-950/50 hover:text-white 2xl:hidden" />
                <CarouselNext className="w-6 h-full border-none rounded -right-0 bg-slate-950/30 hover:bg-slate-950/50 hover:text-white 2xl:hidden" />
              </Carousel>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech button container with positioning */}
        {/* <div className="flex justify-end mt-2">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative"> */}
        {/* Tech circle decoration around button */}
        {/* <motion.div
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
                  /> */}

        {/* Digital circuit lines */}
        {/* <motion.div
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
                      {<ChevronDown />}
                    </motion.div>
                  </MotionButton>
                </div>
              </TooltipTrigger>
              <TooltipContent className="dark">
                <p>{visible ? "收起" : "展开"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div> */}
      </div>
    </>
  );
}

function TenderDetail() {
  // const tender = useLocation({ select: (location) => location.state.tender });
  const tenderId = Route.useSearch({ select: (sp) => sp.t });

  if (tenderId) {
    const tender = useMapV2Store
      .getState()
      .areas?.edges?.flatMap((a) => a?.node?.tenders.edges?.map((t) => t?.node))
      .find((t) => t?.id === tenderId);
    return (
      <div className="fixed top-0 right-0 z-50 text-9xl">{tender?.name}</div>
    );
  }

  return <></>;
}
