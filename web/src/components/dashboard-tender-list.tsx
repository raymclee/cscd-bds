import { cn } from "~/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { fixAmount } from "~/lib/helper";
import { MapIndexPageQuery$data } from "__generated__/MapIndexPageQuery.graphql";
import { useMapStore } from "~/store/map";

export function DashboardTenderList({
  data,
}: {
  data: MapIndexPageQuery$data;
}) {
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
  return (
    <Card
      className={cn(
        "h-[clamp(17rem,30dvh,17rem)] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        项目例表
      </CardHeader>
      <CardContent className="h-full px-0">
        <ScrollArea className="h-full px-4">
          <Table className="my-4 h-full">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="bg-brand/10">
              <TableRow className="items-center">
                <TableHead className="w-[55px] text-[0.7rem] text-gray-300">
                  序号
                </TableHead>
                <TableHead className="text-[0.7rem] text-gray-300">
                  名称
                </TableHead>
                <TableHead className="w-[80px] text-[0.7rem] text-gray-300">
                  区域
                </TableHead>
                <TableHead className="w-[60px] text-right text-[0.7rem] text-gray-300">
                  金额
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs text-white">
              {tenders?.map((tender, i) => (
                <TableRow key={tender?.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="line-clamp-1 flex items-center text-ellipsis font-medium">
                    {tender?.name}
                  </TableCell>
                  <TableCell>{tender?.area.name}</TableCell>
                  <TableCell className="text-right">
                    {/* {new Intl.NumberFormat("zh-Hans-CN", {
                            style: "currency",
                            currency: "CNY",
                            trailingZeroDisplay: "auto",
                            maximumSignificantDigits: 2,
                            compactDisplay: "short",
                            unitDisplay: "short",
                          }).format(tender?.estimatedAmount! / 100000000)} */}
                    {fixAmount(tender?.estimatedAmount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}