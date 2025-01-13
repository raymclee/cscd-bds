import { MapIndexPageDistrictQuery } from "__generated__/MapIndexPageDistrictQuery.graphql";
import { fetchQuery, useRelayEnvironment } from "react-relay";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { fixAmount } from "~/lib/helper";
import { cn } from "~/lib/utils";
import { districtsQuery } from "~/routes/__auth/__dashboard/__map/index.lazy";
import { useMapStore } from "~/store/map";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { motion } from "motion/react";
import { Ellipsis } from "lucide-react";

const MotionCard = motion.create(Card);
const MotionCardHeader = motion.create(CardHeader);
const MotionEllipsis = motion.create(Ellipsis);

export function DashboardTenderList() {
  const navigateToTender = useMapStore((state) => state.navigateToTender);
  const environment = useRelayEnvironment();
  const tenders = useAreaTenders();

  return (
    <MotionCard
      layoutId="dashboard-tender-list-board"
      className={cn(
        // "h-[calc((100vh-100px)/3)] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
        "h-[18.8rem] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <MotionCardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        <div className="flex items-center justify-between">
          <motion.span layoutId="dashboard-tender-list-board-title">
            项目列表
          </motion.span>
          <MotionEllipsis
            layoutId="dashboard-tender-list-board-icon"
            className="cursor-pointer"
            onClick={() => {
              useMapStore.setState({
                moreDashboardTenderListBoardVisible: true,
              });
            }}
          />
        </div>
      </MotionCardHeader>
      <CardContent className="h-full px-0 pb-8">
        <ScrollArea className="h-full px-4">
          <Table className="my-4 h-full">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="bg-brand/10">
              <TableRow className="items-center">
                <TableHead className="w-[60px] text-center text-[0.7rem] text-gray-300">
                  序号
                </TableHead>
                <TableHead className="text-center text-[0.7rem] text-gray-300">
                  名称
                </TableHead>
                <TableHead className="w-[60px] text-center text-[0.7rem] text-gray-300">
                  区域
                </TableHead>
                <TableHead className="w-[80px] text-center text-[0.7rem] text-gray-300">
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
                    if (!tender?.district) return;
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
                  <TableCell>
                    {tender?.area.name.replace("地区", "").replace("区域", "")}
                  </TableCell>
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
    </MotionCard>
  );
}
