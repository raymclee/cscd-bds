import {
  Link,
  useMatch,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import dayjs from "dayjs";
import subHeadTenderListSvg from "~/assets/dashboard/svg/sub-head-tender-list.svg";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Area, Tender } from "~/graphql/graphql";
import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import { classifyText, fixAmount, tenderStatusText } from "~/lib/helper";
import { useMapV2Store } from "~/store";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon, ImageOff, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { zhCN } from "date-fns/locale";
import { useDebounceCallback, useWindowSize } from "usehooks-ts";

export function TenderList() {
  const tenders = useAreaTenders();
  const { areas } = useMapV2Store.getState();
  const allTenders = useMemo(() => {
    return areas?.edges?.flatMap((a) =>
      a?.node?.tenders?.edges?.map((t) => t?.node),
    );
  }, [areas]);
  const { renderTime } = useRouteContext({
    from: "/__auth/__dashboard/__amap/",
  });

  return (
    <>
      <div className="relative z-10 order-last min-h-[calc(100vh-6rem)] w-full rounded-lg bg-slate-900/60 backdrop-blur md:order-first">
        {/* 科技感装饰线条 */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        {/* <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" /> */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        {/* <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" /> */}

        {/* 全息扫描效果 */}
        <div className="holographic-effect pointer-events-none absolute inset-0" />

        <img
          src={subHeadTenderListSvg}
          alt="sub-head"
          className="mb-4 mt-2 h-8 w-full px-4"
        />
        <div className="sticky z-20 rounded bg-gradient-to-br from-sky-950 to-sky-900 px-4 py-2 md:top-[3.5rem]">
          <TenderListFilter />
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-nowrap rounded-lg border border-sky-800/30 bg-sky-950/50 px-4 py-2 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sky-300">数据更新</span>
              <span className="text-sky-400">{renderTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sky-300">显示数量</span>
              <span className="text-cyan-400">{tenders?.length || 0}</span>
            </div>
            <div className="h-4 w-[1px] bg-gradient-to-b from-transparent via-sky-500/30 to-transparent"></div>
            <div className="flex items-center gap-2">
              <span className="text-sky-300">总项目数</span>
              <span className="text-cyan-400">{allTenders?.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-1 pb-4">
          {tenders.map((tender) => {
            if (!tender) return null;
            return <TenderListItem key={tender.id} tender={tender} />;
          })}
        </div>
      </div>
    </>
  );
}

function TenderListFilter() {
  const status = useSearch({
    from: "/__auth/__dashboard/__amap/",
    select: (state) => state.status,
  });
  const [startDate, endDate] = useSearch({
    from: "/__auth/__dashboard/__amap/",
    select: (state) => [state.sd, state.ed],
    structuralSharing: true,
  });
  const classify = useSearch({
    from: "/__auth/__dashboard/__amap/",
    select: (state) => state.classify,
  });
  // const [datepickerOpen, setDatepickerOpen] = useState(false);
  const navigate = useNavigate();

  const inputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      navigate({
        to: ".",
        search: (prev) => ({
          ...prev,
          q: e.target.value === "" ? undefined : e.target.value,
        }),
        replace: true,
        resetScroll: false,
      });
    },
    [navigate],
  );

  const onClassifyChange = useCallback(
    (value: string) => {
      navigate({
        to: ".",
        search: (prev) => ({
          ...prev,
          classify: value === "undefined" ? undefined : Number(value),
        }),
        resetScroll: false,
      });
    },
    [navigate],
  );

  const onStatusChange = useCallback(
    (value: string) => {
      navigate({
        to: ".",
        search: (prev) => ({
          ...prev,
          status: value === "undefined" ? undefined : Number(value),
        }),
        resetScroll: false,
      });
    },
    [navigate],
  );

  const onDateSelect = useCallback(
    (value: DateRange | undefined) => {
      const s: Record<string, string | undefined> = {};
      if (value?.from) {
        s.sd = dayjs(value?.from).format("YYYY-MM-DD");
      }
      if (value?.to) {
        s.ed = dayjs(value?.to).format("YYYY-MM-DD");
      }
      navigate({
        to: ".",
        search: (prev) => ({
          ...prev,
          ...s,
        }),
        resetScroll: false,
      });
      // if (value?.from && value?.to) {
      //   setDatepickerOpen(false);
      // }
    },
    [navigate],
  );

  // const closeDatepicker = useCallback(() => {
  //   setDatepickerOpen(false);
  // }, []);

  const filterDateText =
    startDate && endDate
      ? dayjs(endDate).diff(dayjs(startDate), "month") == 3
        ? "三個月內"
        : dayjs(endDate).diff(dayjs(startDate), "month") == 6
          ? "半年內"
          : dayjs(endDate).diff(dayjs(startDate), "month") == 12
            ? "一年內"
            : ""
      : "";

  const showFilter = status || classify || startDate || endDate;

  return (
    <>
      <div className="flex gap-2 pt-2 md:pt-0.5">
        <Input
          type="search"
          placeholder="搜索"
          className="h-8 border-sky-800 bg-transparent focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
          onChange={inputChange}
        />

        <Select value={String(classify)} onValueChange={onClassifyChange}>
          <SelectTrigger className="h-8 w-56 border-sky-800 bg-transparent focus:ring-sky-500 focus:ring-offset-0">
            <SelectValue placeholder="分类" />
          </SelectTrigger>
          <SelectContent className="border-sky-800 bg-sky-950 text-white">
            <SelectItem
              value="undefined"
              className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
              disabled
            >
              分类
            </SelectItem>
            <SelectItem
              value="1"
              className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
            >
              A类
            </SelectItem>
            <SelectItem
              value="2"
              className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
            >
              B类
            </SelectItem>
            <SelectItem
              value="3"
              className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
            >
              C类
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={String(status)} onValueChange={onStatusChange}>
          <SelectTrigger className="h-8 w-56 border-sky-800 bg-transparent focus:ring-sky-500 focus:ring-offset-0">
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent className="border-sky-800 bg-sky-950 text-white">
            <SelectItem
              value="undefined"
              className="hover:bg-sky-700 focus:bg-sky-700 focus:text-white"
              disabled
            >
              状态
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

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              // className="w-full h-8 bg-transparent border-sky-800 focus:ring-sky-500 focus:ring-offset-0"
              className="h-8 w-56 border-sky-800 bg-transparent hover:bg-transparent hover:text-white focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
              // onClick={() => setDatepickerOpen((prev) => !prev)}
            >
              <span>投标日期</span>
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="dark w-auto p-0" align="center">
            <Calendar
              locale={zhCN}
              mode="range"
              selected={{
                from: startDate ? new Date(startDate) : undefined,
                to: endDate ? new Date(endDate) : undefined,
              }}
              onSelect={onDateSelect}
              className="rounded-lg border border-sky-900 bg-sky-950 font-bold text-white shadow-xl"
              classNames={{
                day_today: "bg-sky-700 hover:bg-sky-600",
                day: cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-sky-900",
                ),
                day_selected: "bg-sky-700 hover:bg-sky-600",
                day_range_start: "bg-sky-700 hover:bg-sky-600",
                day_range_end: "bg-sky-700 hover:bg-sky-600",
                day_range_middle: "bg-slate-800 hover:bg-slate-700",
              }}
              footer={
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Link
                    to="."
                    search={(prev) => ({
                      ...prev,
                      sd: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
                      ed: dayjs().format("YYYY-MM-DD"),
                    })}
                    className="rounded-lg border border-sky-800 px-2 py-1"
                    replace
                    resetScroll={false}
                    // onClick={closeDatepicker}
                  >
                    一年內
                  </Link>
                  <Link
                    to="."
                    search={(prev) => ({
                      ...prev,
                      sd: dayjs().subtract(6, "month").format("YYYY-MM-DD"),
                      ed: dayjs().format("YYYY-MM-DD"),
                    })}
                    className="rounded-lg border border-sky-800 px-2 py-1"
                    replace
                    resetScroll={false}
                    // onClick={closeDatepicker}
                  >
                    半年內
                  </Link>
                  <Link
                    to="."
                    search={(prev) => ({
                      ...prev,
                      sd: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
                      ed: dayjs().format("YYYY-MM-DD"),
                    })}
                    className="rounded-lg border border-sky-800 px-2 py-1"
                    replace
                    resetScroll={false}
                    // onClick={closeDatepicker}
                  >
                    三個月內
                  </Link>
                </div>
              }
              // disabled={(date) =>
              //   date > new Date() || date < new Date("1900-01-01")
              // }
              // initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {showFilter && (
        // <div className="p-3 mt-4 border rounded-lg animate-fade-in border-sky-800/30 bg-sky-950/50">
        <div
          className={cn(
            "animate-fade-in relative mt-4 flex flex-wrap items-center gap-2 text-nowrap text-xs text-slate-400",
          )}
        >
          {/* 科技感装饰线条 */}
          {/* <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" /> */}

          <div className="relative flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
            <span className="animate-typewriter text-cyan-300">筛选中</span>
          </div>

          <div className="relative flex items-center gap-2">
            {status && (
              <>
                <div className="hidden h-4 w-[1px] animate-pulse bg-gradient-to-b from-transparent via-sky-500/30 to-transparent lg:block"></div>
                <div className="flex items-center gap-2">
                  <span className="animate-typewriter">状态：</span>
                  <span className="animate-typewriter text-cyan-300">
                    {tenderStatusText(status)}
                  </span>
                </div>
              </>
            )}

            {classify && (
              <>
                <div className="hidden h-4 w-[1px] animate-pulse bg-gradient-to-b from-transparent via-sky-500/30 to-transparent lg:block"></div>
                <div className="flex items-center gap-2">
                  <span className="animate-typewriter">分类：</span>
                  <span className="animate-typewriter text-cyan-300">
                    {classifyText(classify)}
                  </span>
                </div>
              </>
            )}

            {(startDate || endDate) && (
              <>
                <div className="h-4 w-[1px] animate-pulse"></div>
                <div className="flex items-center gap-2">
                  <span className="animate-typewriter">投标日期：</span>
                  <span className="animate-typewriter text-cyan-300">
                    {filterDateText
                      ? filterDateText
                      : `${dayjs(startDate).format("YYYY-MM-DD")}${endDate ? ` 至 ${dayjs(endDate).format("YYYY-MM-DD")}` : ""}`}
                  </span>
                </div>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="ml-auto h-6 w-auto border-sky-800 bg-transparent px-1 hover:bg-transparent hover:text-white focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
            onClick={() => {
              navigate({
                to: ".",
                search: (prev) => ({
                  ...prev,
                  q: undefined,
                  status: undefined,
                  sd: undefined,
                  ed: undefined,
                  classify: undefined,
                }),
                resetScroll: false,
              });
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        // </div>
      )}
    </>
  );
}

function TenderListItem({ tender }: { tender: Tender }) {
  const d = useSearch({
    from: "/__auth/__dashboard/__amap/",
    select: (state) => state.d,
  });
  const t = useSearch({
    from: "/__auth/__dashboard/__amap/",
    select: (state) => state.t,
  });
  const navigate = useNavigate({ from: "/" });
  const { width } = useWindowSize();
  const isMobile = Boolean(width && width < 768);

  const onMouseEnter = useCallback(() => {
    const { areas, getMarker, panToTender } = useMapV2Store.getState();

    const selectedArea = areas?.edges?.find(
      (a) => a?.node?.id === tender?.area?.id,
    );
    useMapV2Store.setState({
      selectedArea: selectedArea?.node as Area,
    });

    const marker = getMarker(tender?.id);
    if (marker) {
      marker.setOptions({
        zIndex: 13,
      });
    }
    const a = document.querySelector("#marker-" + tender?.id);
    const b = a?.closest(".amap-marker-label");
    if (b instanceof HTMLElement) {
      b.classList.add("scale-110");
    }

    if (tender?.id) {
      navigate({
        to: isMobile ? "/tenders/$id" : ".",
        search: !isMobile
          ? (prev) => ({
              ...prev,
              a: tender?.area?.code,
              p: tender?.activeProfile?.province?.adcode,
              d: tender?.activeProfile?.district?.adcode,
              c: tender?.activeProfile?.city?.adcode,
              t: tender?.id,
            })
          : undefined,
        params: {
          id: tender?.id,
        },
        replace: !isMobile && !!t,
        resetScroll: isMobile,
      });
      panToTender(tender?.id);
    }

    // if (tender?.activeProfile?.geoCoordinate?.length === 2) {
    //   const [lat, lng] = tender?.activeProfile?.geoCoordinate ?? [];
    //   if (lat && lng) {
    //     useMapV2Store
    //       .getState()
    //       .map?.setCenter([lng, lat] as [number, number], false, 300);
    //   }
    // }
  }, [navigate, tender?.id, tender?.activeProfile?.geoCoordinate, isMobile]);

  const onMouseLeave = useDebounceCallback(() => {
    if (!d || !tender?.activeProfile?.geoCoordinate?.length) return;
    const marker = useMapV2Store.getState().getMarker(tender?.id);
    if (marker) {
      marker.setOptions({
        zIndex: 12,
      });
    }
    const a = document.querySelector("#marker-" + tender?.id);
    const b = a?.closest(".amap-marker-label");
    if (b instanceof HTMLElement) {
      b.classList.remove("scale-110");
    }
  }, 100);

  return (
    <div
      key={tender?.id}
      // search={
      //   !isMobile
      //     ? (prev) => ({
      //         ...prev,
      //         a: tender?.area?.code,
      //         p: tender?.activeProfile?.province?.adcode,
      //         d: tender?.activeProfile?.district?.adcode,
      //         c: tender?.activeProfile?.city?.adcode,
      //         t: tender?.id,
      //       })
      //     : undefined
      // }
      // replace={!isMobile && !!t}
      // resetScroll={!isMobile}
      // to={isMobile ? "/tenders/$id" : "."}
      // params={{ id: tender?.id }}
      className="group block cursor-pointer"
      onClick={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative grid grid-cols-1 gap-2 overflow-hidden rounded-lg px-6 py-4 transition-all duration-300 md:grid-cols-3 lg:group-hover:scale-105 lg:group-hover:bg-gradient-to-br lg:group-hover:from-sky-950 lg:group-hover:to-sky-700">
        {/* Full card overlay effect */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Tech scan line */}
        <div className="group-hover:animate-scan-line pointer-events-none absolute inset-0 z-10 translate-y-full bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent opacity-0 group-hover:opacity-100"></div>

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
            <div className="absolute -inset-1 rounded bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            {/* Image border glow */}
            <div className="group-hover:animate-pulse-glow absolute -inset-0.5 rounded opacity-0 transition-all duration-300 group-hover:opacity-100"></div>

            {tender?.activeProfile?.images?.at(0) ? (
              <img
                src={tender?.activeProfile?.images?.at(0)}
                alt={tender?.activeProfile?.name || ""}
                className="relative z-10 aspect-[5/3] rounded"
              />
            ) : (
              <div className="flex aspect-[5/3] flex-col items-center justify-center rounded-lg bg-gray-500/50 text-white">
                <ImageOff className="mb-2 size-6" />
                <span className="text-xs">暂没图片</span>
              </div>
            )}

            {/* Tech corner marker */}
            <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 bg-gradient-to-br from-cyan-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-1 px-1 md:col-span-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="group-hover:text-shadow-glow line-clamp-1 w-[70%] font-semibold transition-all duration-300 group-hover:text-white">
              {tender?.activeProfile?.name}
            </h2>

            <span className="group-hover:text-shadow-glow text-xs">
              {tender.area.name}
            </span>
          </div>

          <div className="group-hover:text-shadow-sm text-sm transition-all duration-300 group-hover:text-blue-200">
            {tender?.activeProfile?.tenderDate
              ? dayjs(tender?.activeProfile?.tenderDate).format("LL")
              : tender?.activeProfile?.tenderClosingDate
                ? dayjs(tender?.activeProfile?.tenderClosingDate).format("LL")
                : "-"}
          </div>

          <div className="flex flex-1 items-end justify-between gap-2">
            <div className="group-hover:text-shadow-sm text-sm transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400">
              {tender?.activeProfile?.classify && (
                <span className="mr-2">
                  {classifyText(tender?.activeProfile?.classify)}
                </span>
              )}
              {tenderStatusText(tender?.activeProfile?.status)}
            </div>
            <div className="group-hover:text-shadow-sm flex items-center text-sm transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400">
              {/* Data dot - positioned at edge */}
              <div className="group-hover:animate-pulse-dot mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-cyan-400 opacity-0"></div>

              {tender?.activeProfile?.estimatedAmount
                ? `¥${fixAmount(tender?.activeProfile?.estimatedAmount)}亿`
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
