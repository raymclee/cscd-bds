import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Tender } from "~/graphql/graphql";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 285 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 203 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 264 },
];

const chartConfig = {
  rating: {
    label: "评分",
    color: "var(--brand)",
  },
} satisfies ChartConfig;

type TenderRatingChartProps = Pick<
  Tender,
  | "timeLimitRating"
  | "sizeAndValueRating"
  | "creditAndPaymentRating"
  | "customerRelationshipRating"
  | "competitivePartnershipRating"
>;

export function TenderRatingChart({
  timeLimitRating,
  sizeAndValueRating,
  creditAndPaymentRating,
  customerRelationshipRating,
  competitivePartnershipRating,
}: TenderRatingChartProps) {
  const chartData = [
    { month: "资信及付款", rating: creditAndPaymentRating },
    { month: "规模及价值", rating: sizeAndValueRating },
    { month: "中标原则及时限", rating: timeLimitRating },
    { month: "客情关系", rating: customerRelationshipRating },
    { month: "竞争合作关系", rating: competitivePartnershipRating },
  ];

  return (
    <Card className="mt-8 border-0 bg-transparent">
      {/* <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart - Grid Filled</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader> */}
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
          <RadarChart data={chartData} className="text-white">
            <ChartTooltip
              cursor={false}
              contentStyle={{ color: "white" }}
              wrapperClassName="text-white"
              content={
                <ChartTooltipContent
                  //   hideLabel
                  className="border-0 bg-black/70 text-white"
                />
              }
            />
            <PolarGrid className="fill-[--brand] opacity-20" />
            <PolarAngleAxis dataKey="month" />
            <Radar dataKey="rating" fill="var(--brand)" fillOpacity={0.5} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-white">
          总分:{" "}
          {(sizeAndValueRating || 0) +
            (timeLimitRating || 0) +
            (creditAndPaymentRating || 0) +
            (customerRelationshipRating || 0) +
            (competitivePartnershipRating || 0)}
        </div>
      </CardFooter>
    </Card>
  );
}
