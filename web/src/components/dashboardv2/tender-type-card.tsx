import { useAreaTenders } from "~/hooks/dashboardv2/use-area-tenders";
import { Card, CardContent, CardHeader } from "../ui/card";
import headerSvg from "~/assets/dashboard/svg/sub-head-tender-type.svg";
import { Pie, PieConfig } from "@ant-design/plots";

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
    data.push({ type: "央企国企", value: government });
  }
  if (highTech > 0) {
    data.push({ type: "高科技企业", value: highTech });
  }
  if (csoe > 0) {
    data.push({ type: "政府平台", value: csoe });
  }
  if (other > 0) {
    data.push({ type: "其他企业", value: other });
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
    tooltip: {
      name: "数量",
      field: "value",
    },
  } satisfies PieConfig;

  return (
    <Card className="h-56 text-white border-none bg-slate-950/30 backdrop-blur-lg">
      <CardHeader>
        <img
          src={headerSvg}
          alt="sub-head"
          className="w-full h-8 select-none"
        />
      </CardHeader>
      <CardContent className="h-full px-0 -mt-5">
        <Pie {...config} />
      </CardContent>
    </Card>
  );
}
