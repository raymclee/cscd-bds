import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import { Card, CardContent, CardHeader } from "../ui/card";
import headerSvg from "~/assets/dashboard/svg/sub-head-tender-type.svg";
import { Pie as AntdPie, PieConfig } from "@ant-design/plots";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

export function TenderTypeCard() {
  const tenders = useAreaTenders();

  let government = 0;
  let csoe = 0;
  let highTech = 0;
  let other = 0;

  for (const t of tenders || []) {
    switch (t?.customer?.ownerType) {
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

  const data = [];

  if (government > 0) {
    data.push({
      type: "央企国企",
      value: government,
      fill: "hsl(var(--chart-1))",
    });
  }
  if (highTech > 0) {
    data.push({
      type: "高科技企业",
      value: highTech,
      fill: "hsl(var(--chart-2))",
    });
  }
  if (csoe > 0) {
    data.push({ type: "政府平台", value: csoe, fill: "hsl(var(--chart-3))" });
  }
  if (other > 0) {
    data.push({ type: "其他企业", value: other, fill: "hsl(var(--chart-4))" });
  }

  const config = {
    data,
    theme: "classicDark",
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    // innerRadius: 0.35,
    label: {
      text: (d: { type: string; value: number }) => `${d.type}\n ${d.value}个`,
      position: "outside",
      // transform: [
      //   {
      //     type: "overlapHide",
      //     priority: (a, b) => {
      //       console.log({ a, b });
      //       return a.value < b.value;
      //     },
      //   },
      // ],
      transform: [{ type: "overlapDodgeY", maxIterations: 1 }],
      // transform: [{ type: "overlapHide", priority: (a, b) => a < b }],
    },
    // label: false,
    // legend: {
    //   color: {
    //     title: false,
    //     position: "right",
    //   },
    // },
    legend: {
      color: {
        layout: {
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        },
      },
    },
    tooltip: {
      name: "数量",
      field: "value",
    },
  } satisfies PieConfig;

  const chartConfig = {
    // type: {
    // label: "類型",
    // },
    央企国企: {
      label: "央企国企",
      color: "hsl(var(--chart-1))",
    },
    高科技企业: {
      label: "高科技企业",
      color: "hsl(var(--chart-2))",
    },
    政府平台: {
      label: "政府平台",
      color: "hsl(var(--chart-3))",
    },
    其他企业: {
      label: "其他企业",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="relative h-56 border-none bg-slate-900/60 text-white backdrop-blur">
      {/* 科技感装饰线条 */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

      {/* 全息扫描效果 */}
      <div className="holographic-effect pointer-events-none absolute inset-0" />

      <CardHeader>
        <img
          src={headerSvg}
          alt="sub-head"
          className="h-8 w-full select-none"
        />
      </CardHeader>
      <CardContent className="dark -mt-5 h-full px-0">
        <AntdPie {...config} className="pb-2" />
        {/* <ChartContainer
          config={chartConfig}
          className="mx-auto pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartLegend
              content={<ChartLegendContent className="text-xxs" />}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="value" nameKey="type"></Pie>
          </PieChart>
        </ChartContainer> */}
      </CardContent>
    </Card>
  );
}
