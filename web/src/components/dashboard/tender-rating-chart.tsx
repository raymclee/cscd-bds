import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { Tender } from "~/graphql/graphql";

const chartConfig = {
  rating: {
    label: "评分",
    color: "var(--brand)",
  },
} satisfies ChartConfig;

const scale = 20;

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
    {
      month: "资信及付款",
      rating: (creditAndPaymentRating ?? 0) * scale,
    },
    { month: "规模及价值", rating: (sizeAndValueRating ?? 0) * scale },
    { month: "中标原则及时限", rating: (timeLimitRating ?? 0) * scale },
    { month: "客情关系", rating: (customerRelationshipRating ?? 0) * scale },
    {
      month: "竞争合作关系",
      rating: (competitivePartnershipRating ?? 0) * scale,
    },
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
            {/* <ChartTooltip
              cursor={false}
              contentStyle={{ color: "white" }}
              wrapperClassName="text-white"
              content={
                <ChartTooltipContent
                  cursor={false}
                  className="text-white border-0 bg-black/70"
                />
              }
            /> */}
            <PolarGrid
              // radialLines={false}
              className="fill-[--brand] opacity-20"
              // polarRadius={[50, 60, 70, 80, 90, 100]}
              polarRadius={[1, 2, 3, 4, 5].map((x) => x * 15.7)}
            />
            {/* <PolarRadiusAxis angle={30} domain={[0, 3]} tickCount={5} /> */}
            <PolarAngleAxis
              tickSize={6}
              dataKey="month"
              tick={({ x, y, textAnchor, value, index, ...props }) => {
                const data = chartData[index];
                return (
                  <text
                    x={x}
                    y={index === 0 ? y - 8 : y}
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    {...props}
                    className="flex flex-col"
                  >
                    <tspan className="fill-gray-300">
                      {data.rating / 20 || 0}
                    </tspan>
                    <tspan
                      x={x}
                      dy={"1rem"}
                      fontSize={12}
                      className="fill-gray-300"
                    >
                      {data.month}
                    </tspan>
                  </text>
                );
              }}
            />
            <Radar dataKey="rating" fill="var(--brand)" fillOpacity={0.5} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xl">
        <div className="flex items-center gap-2 font-bold leading-none text-white">
          <span className="text-xl">总分:</span>{" "}
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
