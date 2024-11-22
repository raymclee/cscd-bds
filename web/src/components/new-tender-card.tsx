import { Column, ColumnConfig, Tiny } from "@ant-design/plots";
import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { MapIndexPageQuery$data } from "__generated__/MapIndexPageQuery.graphql";
import { fixAmount } from "~/lib/helper";
import { useMapStore } from "~/store/map";

export function NewTenderBoard({ data }: { data: MapIndexPageQuery$data }) {
  const selectedArea = useMapStore((state) => state.selectedArea);
  const currentAreaNode = useMapStore((state) => state.currentAreaNode);

  const nodeProps = currentAreaNode?.getProps();

  const adcodes = currentAreaNode
    ?.getSubFeatures()
    ?.map((f: any) => f.properties.adcode);

  const allTenders = data.areas.edges?.flatMap((e) => e?.node?.tenders) || [];

  const tenders =
    nodeProps?.level === "province" || nodeProps?.level === "city"
      ? allTenders.filter((t) => {
          switch (nodeProps?.level) {
            case "province":
            case "city":
              return (
                adcodes?.includes(t?.city?.adcode) ||
                adcodes?.includes(t?.district.adcode)
              );
          }
        })
      : selectedArea
        ? selectedArea?.tenders
        : allTenders;

  const lastMontDateFormat = `${new Date().getFullYear()}-${new Date().getMonth()}`;
  const lastMonth = tenders?.filter((e) =>
    e?.createdAt.includes(lastMontDateFormat),
  );
  const lastMonthAmount = fixAmount(
    lastMonth?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
  );
  const lastMonthCount = lastMonth?.length ?? 0;

  const thisMonthDateFormat = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
  const thisMonth = tenders?.filter((e) =>
    e?.createdAt.includes(thisMonthDateFormat),
  );
  const thisMonthAmount = fixAmount(
    thisMonth?.reduce((acc, cur) => acc + (cur?.estimatedAmount ?? 0), 0),
  );
  const thisMonthCount = thisMonth?.length ?? 0;

  const barConfig = {
    data: [
      {
        name: "金额(亿)",
        月份: "上月",
        數量: lastMonthAmount,
      },
      {
        name: "金额(亿)",
        月份: "本月",
        數量: thisMonthAmount,
      },
      {
        name: "数量(个)",
        月份: "上月",
        數量: lastMonthCount,
      },
      {
        name: "数量(个)",
        月份: "本月",
        數量: thisMonthCount,
      },
    ],
    xField: "月份",
    yField: "數量",
    theme: "classicDark",
    colorField: "name",
    group: true,
    style: {
      inset: 5,
      width: 20,
      // color: "white",
    },
    legend: {
      color: {
        layout: {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        },
      },
    },
  } satisfies ColumnConfig;

  const amountPercent = thisMonthAmount / lastMonthAmount;
  const amountConfig = {
    percent: isFinite(amountPercent) ? amountPercent || 1 : 1,
    width: 80,
    height: 80,
    innerRadius: 0.65,
    color: ["#E8EFF5", "#dc2626"],
    annotations: [
      {
        type: "text",
        style: {
          text: isFinite(amountPercent)
            ? `${Math.round(amountPercent * 100)}%`
            : "0%",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 16,
          fontStyle: "bold",
          fill: "white",
        },
      },
    ],
  };

  const totalPercent = lastMonthCount / thisMonthCount;
  const totalConfig = {
    percent: isFinite(totalPercent) ? totalPercent || 1 : 1,
    width: 80,
    height: 80,
    innerRadius: 0.65,
    color: ["#E8EFF5", "#109618"],
    annotations: [
      {
        type: "text",
        style: {
          text: isFinite(totalPercent)
            ? `${Math.round(totalPercent * 100)}%`
            : "0%",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 16,
          fontStyle: "bold",
          fill: "white",
        },
      },
    ],
  };

  return (
    <Card
      className={cn(
        "h-[clamp(18rem,31dvh,18rem)] overflow-hidden rounded border border-brand bg-transparent pb-2 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        本月新增商机
      </CardHeader>
      <CardContent className="flex h-full">
        {/* <div className="w-[40%]"><Tiny {...monthConfig} /></div> */}
        {/* <div className="w-[60%]"> */}
        {/* <Column {...barConfig} /> */}
        {/* </div> */}
        <div className="flex w-[40%] flex-col items-center justify-around py-4">
          {/* <AmountChart /> */}
          <div className="flex flex-col items-center justify-center gap-1">
            <Tiny.Ring {...amountConfig} />
            <span className="text-xs text-gray-400">金額佔比上升</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Tiny.Ring {...totalConfig} />
            <span className="text-xs text-gray-400">數量佔比下降</span>
          </div>
        </div>
        <Column {...barConfig} />
      </CardContent>
    </Card>
  );
}
