import { m } from "motion/react";
import { useMapStore } from "~/store/map";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { MapIndexPageQuery$data } from "__generated__/MapIndexPageQuery.graphql";
import { Card, CardContent, CardHeader } from "./ui/card";
import { cn } from "~/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { fetchQuery } from "relay-runtime";
import { MapIndexPageDistrictQuery } from "__generated__/MapIndexPageDistrictQuery.graphql";
import { districtsQuery } from "~/routes/__auth/__dashboard/__map/index.lazy";
import { fixAmount } from "~/lib/helper";
import { useRelayEnvironment } from "react-relay";

const MotionCard = m.create(Card);

export function TenderStatusList({ data }: { data: MapIndexPageQuery$data }) {
  const tenders = useAreaTenders(data);
  const selectedTenderStatus = useMapStore((s) => s.selectedTenderStatus);
  const filteredTenders = tenders?.filter(
    (t) => t?.status === selectedTenderStatus?.value,
  );
  const environment = useRelayEnvironment();
  const navigateToTender = useMapStore((state) => state.navigateToTender);

  return (
    <>
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        // className="absolute inset-0 flex items-center justify-center bg-black/50"
        className="fixed inset-0 bg-black/50"
        onClick={() => {
          useMapStore.setState({ selectedTenderStatus: null });
        }}
      ></motion.div> */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black/80 backdrop-blur"
        onClick={() => {
          useMapStore.setState({ selectedTenderStatus: null });
        }}
      >
        {/* <motion.div
          className="relative mx-auto h-full w-full overflow-hidden rounded-lg bg-white"
          layoutId={`tender-status-${selectedTenderStatus}`}
        > */}
        <MotionCard
          layoutId={`tender-status-${selectedTenderStatus?.value}`}
          className={cn(
            "mx-4 block h-[80vh] w-[clamp(400px,40vw,600px)] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <m.div
              layoutId={`tender-status-${selectedTenderStatus?.value}-status`}
            >
              {selectedTenderStatus?.status}项目
            </m.div>
            <m.div
              layoutId={`tender-status-${selectedTenderStatus?.value}-count`}
            >
              共{filteredTenders?.length || 0}个
            </m.div>
          </CardHeader>
          <CardContent className="h-full px-0 pb-8">
            <ScrollArea className="h-full px-4">
              <Table className="my-4 h-full">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="bg-brand/10">
                  <TableRow className="items-center">
                    <TableHead className="w-[55px] text-center text-[0.7rem] text-gray-300">
                      序号
                    </TableHead>
                    <TableHead className="text-[0.7rem] text-gray-300">
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
                  {filteredTenders?.map((tender, i) => (
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
                        useMapStore.setState({ selectedTenderStatus: null });
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
        </MotionCard>
        {/* </motion.div> */}
      </m.div>
    </>
  );
}
