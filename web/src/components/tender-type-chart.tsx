import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Pie, PieConfig, Tiny } from "@ant-design/plots";
import { Tender } from "~/graphql/graphql";
import { useMapStore } from "~/store/map";
import { MapIndexPageQuery$data } from "__generated__/MapIndexPageQuery.graphql";

const data = [
  { type: "央企国企", value: 40 },
  { type: "高科技企业", value: 21 },
  { type: "政府平台", value: 30 },
  { type: "其他企业", value: 15 },
];

const winConfig = {
  percent: 0.6,
  width: 70,
  height: 70,
  innerRadius: 0.65,
  color: ["#E8EFF5", "#3cb8e6"],
  annotations: [
    {
      type: "text",
      style: {
        text: `赢单率\n${60}%`,
        x: "50%",
        y: "50%",
        textAlign: "center",
        fontSize: 10,
        // fontStyle: "bold",
        fill: "white",
      },
    },
  ],
};

const loseConfig = {
  percent: 0.4,
  width: 70,
  height: 70,
  innerRadius: 0.65,
  color: ["#E8EFF5", "#3cb8e6"],
  annotations: [
    {
      type: "text",
      style: {
        text: `丢单率\n${40}%`,
        x: "50%",
        y: "50%",
        textAlign: "center",
        fontSize: 10,
        // fontStyle: "bold",
        fill: "white",
      },
    },
  ],
};

type Props = {
  data: MapIndexPageQuery$data;
};

export function TenderTypeChart({ data }: Props) {
  const selectedArea = useMapStore((s) => s.selectedArea);
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

  let government = 0;
  let csoe = 0;
  let highTech = 0;
  let other = 0;

  for (const t of tenders || []) {
    switch (t?.customer.ownerType) {
      case 1:
        government += 1;
        break;
      case 2:
        csoe += 1;
        break;
      case 3:
        highTech += 1;
        break;
      default:
        other += 1;
        break;
    }
  }

  const config = {
    data: [
      { type: "央企国企", value: government },
      { type: "高科技企业", value: highTech },
      { type: "政府平台", value: csoe },
      { type: "其他企业", value: other },
    ],
    theme: "classicDark",
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    // innerRadius: 0.35,
    label: {
      text: (d: { type: string; value: number }) => `${d.type}\n ${d.value}`,
      position: "outside",
    },
    // label: false,
    // legend: false,
    tooltip: {
      name: "数量",
      field: "value",
    },
  } satisfies PieConfig;

  return (
    <Card
      className={cn(
        "h-[clamp(17rem,30dvh,17rem)] overflow-hidden rounded border border-brand bg-transparent pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        项目商机类型金额占比
      </CardHeader>

      <CardContent className="flex h-full items-center justify-center gap-2">
        <div className="w-[24%] rounded bg-gradient-to-b from-brand/40 to-transparent p-6">
          <div className="flex flex-col items-center justify-evenly gap-4">
            <Tiny.Ring {...winConfig} />
            <Tiny.Ring {...loseConfig} />
          </div>
        </div>
        <div className="h-full flex-1">
          <Pie {...config} />
        </div>
      </CardContent>
    </Card>
  );
}
