import { Link, useNavigate, useSearch } from "@tanstack/react-router";
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
import { Tender } from "~/graphql/graphql";
import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import { fixAmount, tenderStatusText } from "~/lib/helper";
import { useMapV2Store } from "~/store";
import { Calendar } from "~/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button, buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useCallback } from "react";
import { DateRange } from "react-day-picker";
import { zhCN } from "date-fns/locale";
import { useDebounceCallback, useWindowSize } from "usehooks-ts";
import { flushSync } from "react-dom";

export function TenderList() {
  const tenders = useAreaTenders();

  const filteredTenders = useSearch({
    from: "/__auth/__dashboard/__amap/v2",
    select: (state) =>
      tenders
        ?.filter((t) =>
          state.q
            ? t?.name?.toLowerCase().includes(state.q.toLowerCase())
            : true,
        )
        .filter((t) =>
          state.status
            ? state.status === 0
              ? true
              : t?.status === state.status
            : true,
        )
        .filter((t) =>
          state.sd ? dayjs(t?.tenderDate).isAfter(dayjs(state.sd)) : true,
        )
        .filter((t) =>
          state.ed ? dayjs(t?.tenderDate).isBefore(dayjs(state.ed)) : true,
        ),
  });

  return (
    <>
      <div className="relative z-10 order-last min-h-[calc(100vh-6rem)] w-full rounded-lg bg-slate-900/60 backdrop-blur md:order-first">
        {/* 科技感装饰线条 */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        {/* <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" /> */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        {/* <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" /> */}

        <img
          src={subHeadTenderListSvg}
          alt="sub-head"
          className="mb-4 mt-2 h-8 w-full px-4"
        />
        <div className="sticky z-20 rounded bg-gradient-to-br from-sky-950 to-sky-900 px-4 py-2 md:top-[3.5rem]">
          <TenderListFilter />
        </div>

        <div className="flex justify-between px-6 pb-1 pt-2 text-sm text-slate-400">
          <div>当前显示: {filteredTenders?.length || 0} 个项目</div>
          <div>总计: {tenders?.length || 0} 个项目</div>
        </div>

        <div className="mt-0 space-y-1 pb-4">
          {filteredTenders.map((tender) => {
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
    from: "/__auth/__dashboard/__amap/v2",
    select: (state) => state.status,
  });
  const [startDate, endDate] = useSearch({
    from: "/__auth/__dashboard/__amap/v2",
    select: (state) => [state.sd, state.ed],
    structuralSharing: true,
  });
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
      });
    },
    [navigate],
  );

  const onDateSelect = useCallback(
    (value: DateRange | undefined) => {
      console.log(value);
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
      });
    },
    [navigate],
  );

  return (
    <div className="flex gap-2 pt-2 md:pt-0.5">
      <Input
        type="search"
        placeholder="搜索"
        className="h-8 border-sky-800 bg-transparent focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
        onChange={inputChange}
      />

      <Select value={String(status)} onValueChange={onStatusChange}>
        <SelectTrigger className="h-8 w-56 border-sky-800 bg-transparent focus:ring-sky-500 focus:ring-offset-0">
          <SelectValue placeholder="状态" />
        </SelectTrigger>
        <SelectContent className="border-sky-800 bg-sky-950 text-white">
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

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            // className="w-full h-8 bg-transparent border-sky-800 focus:ring-sky-500 focus:ring-offset-0"
            className="h-8 w-56 border-sky-800 bg-transparent hover:bg-transparent hover:text-white focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
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

      <Button
        variant="outline"
        size="icon"
        className="h-8 border-sky-800 bg-transparent p-2 hover:bg-transparent hover:text-white focus:ring-sky-500 focus:ring-offset-0 focus-visible:ring-sky-500 focus-visible:ring-offset-0"
        onClick={() => {
          navigate({
            to: ".",
          });
        }}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

function TenderListItem({ tender }: { tender: Tender }) {
  const d = useSearch({
    from: "/__auth/__dashboard/__amap/v2",
    select: (state) => state.d,
  });
  const t = useSearch({
    from: "/__auth/__dashboard/__amap/v2",
    select: (state) => state.t,
  });
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width && width < 768;
  const onMouseEnter = useDebounceCallback(() => {
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
      b.classList.add("scale-110");
    }

    if (tender?.id) {
      navigate({
        to: ".",
        search: (prev) => ({
          ...prev,
          t: undefined,
        }),
        replace: true,
      });

      setTimeout(() => {
        navigate({
          to: ".",
          search: (prev) => ({
            ...prev,
            t: tender?.id,
          }),
          replace: true,
        });
      }, 50);
    }

    useMapV2Store
      .getState()
      .map?.setCenter(tender?.geoCoordinate?.coordinates as [number, number]);
  }, 100);

  const onMouseLeave = useDebounceCallback(() => {
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
      b.classList.remove("scale-110");
    }
  }, 100);

  return (
    <Link
      key={tender?.id}
      // to="."
      search={
        !isMobile
          ? (prev) => ({
              ...prev,
              a: tender?.area?.code,
              p: tender?.province?.adcode,
              d: tender?.district?.adcode,
              c: tender?.city?.adcode,
              t: tender?.id,
            })
          : undefined
      }
      replace={!isMobile && !!t}
      to={isMobile ? "/tenders/$id" : "."}
      params={{ id: tender?.id }}
      className="group block"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative grid grid-cols-3 gap-4 overflow-hidden rounded-lg px-6 py-4 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-sky-950 group-hover:to-sky-700">
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

            <img
              src={tender?.images?.at(0)}
              alt={tender?.name}
              className="relative z-10 aspect-[5/3] rounded"
            />

            {/* Tech corner marker */}
            <div className="pointer-events-none absolute left-0 top-0 h-6 w-6 bg-gradient-to-br from-cyan-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </div>
        </div>

        <div className="relative z-10 col-span-2 space-y-1">
          <h2 className="group-hover:text-shadow-glow line-clamp-1 font-semibold transition-all duration-300 group-hover:text-white">
            {tender?.name}
          </h2>

          <div className="group-hover:text-shadow-sm text-sm transition-all duration-300 group-hover:text-blue-200">
            {tender?.tenderDate ? dayjs(tender?.tenderDate).format("LL") : "-"}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="group-hover:text-shadow-sm text-sm transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400">
              {tenderStatusText(tender?.status)}
            </div>
            <div className="group-hover:text-shadow-sm flex items-center text-sm transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400">
              {/* Data dot - positioned at edge */}
              <div className="group-hover:animate-pulse-dot mr-2 h-1.5 w-1.5 scale-0 rounded-full bg-cyan-400 opacity-0"></div>

              {tender?.estimatedAmount
                ? `¥${fixAmount(tender?.estimatedAmount)}亿`
                : "-"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
