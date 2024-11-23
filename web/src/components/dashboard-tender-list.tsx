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
import {
  MapIndexPageDistrictQuery,
  MapIndexPageDistrictQuery$data,
} from "__generated__/MapIndexPageDistrictQuery.graphql";
import { fetchQuery, useRelayEnvironment } from "react-relay";
import { districtsQuery } from "~/routes/__auth/__dashboard/__map/index.lazy";
import { useAreaTenders } from "~/hooks/use-area-tenders";

export function DashboardTenderList({
  data,
}: {
  data: MapIndexPageQuery$data;
}) {
  const navigateToTender = useMapStore((state) => state.navigateToTender);
  const environment = useRelayEnvironment();
  const tenders = useAreaTenders(data);

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
                <TableHead className="w-[55px] text-center text-[0.7rem] text-gray-300">
                  序号
                </TableHead>
                <TableHead className="text-center text-[0.7rem] text-gray-300">
                  名称
                </TableHead>
                <TableHead className="w-[80px] text-center text-[0.7rem] text-gray-300">
                  区域
                </TableHead>
                <TableHead className="w-[70px] text-center text-[0.7rem] text-gray-300">
                  <div>金额</div>
                  (亿元)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs text-white">
              {tenders?.map((tender, i) => (
                <TableRow
                  className="cursor-pointer"
                  key={tender?.id}
                  onClick={async () => {
                    const districts =
                      await fetchQuery<MapIndexPageDistrictQuery>(
                        environment,
                        districtsQuery,
                        {
                          adcode: tender?.district.adcode!,
                        },
                      ).toPromise();
                    const plots =
                      districts?.districts.edges?.flatMap(
                        (e) => e?.node?.plots,
                      ) || [];
                    // @ts-expect-error
                    navigateToTender(tender, plots);
                  }}
                >
                  <TableCell className="text-center">{i + 1}</TableCell>
                  <TableCell>{tender?.name}</TableCell>
                  <TableCell>{tender?.area.name}</TableCell>
                  <TableCell className="text-center">
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
