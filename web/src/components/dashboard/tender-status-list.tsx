import { MapIndexPageDistrictQuery } from "__generated__/MapIndexPageDistrictQuery.graphql";
import { m } from "motion/react";
import { useRelayEnvironment } from "react-relay";
import { fetchQuery } from "relay-runtime";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { fixAmount, isGAOnly } from "~/lib/helper";
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
import { useRouteContext } from "@tanstack/react-router";
import dayjs from "dayjs";

const MotionCard = m.create(Card);

type TenderStatusListProps = {
  gaOnly: boolean;
};

export function TenderStatusList({ gaOnly }: TenderStatusListProps) {
  const tenders = useAreaTenders();
  const selectedTenderStatus = useMapStore((s) => s.selectedTenderStatus);
  const filteredTenders = tenders?.filter(
    (t) => t?.status === selectedTenderStatus?.value,
  );
  const environment = useRelayEnvironment();
  const navigateToTender = useMapStore((state) => state.navigateToTender);
  const total = fixAmount(
    filteredTenders?.reduce(
      (acc, inc) => (inc?.estimatedAmount ? acc + inc.estimatedAmount : acc),
      0,
    ) || 0,
  );

  const gaTendersOnly = tenders?.every((t) => t?.area.code == "GA");
  const gaView = gaOnly || gaTendersOnly;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur"
          onClick={() => {
            useMapStore.setState({ selectedTenderStatus: null });
          }}
        ></m.div>

        <MotionCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          layoutId={`tender-status-${selectedTenderStatus?.value}`}
          className={cn(
            "mx-4 block h-[80vh] overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
            gaView
              ? "w-[clamp(400px,80vw,1200px)]"
              : "w-[clamp(400px,40vw,600px)]",
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between overflow-hidden bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
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
          <CardContent className="h-full px-0 pb-16">
            <ScrollArea className="h-full px-4">
              <Table className="my-4 h-full">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="bg-brand/10">
                  <TableRow className="items-center">
                    <TableHead className="w-[4rem] text-center text-gray-300">
                      序号
                    </TableHead>
                    <TableHead className="w-[12rem] text-center text-gray-300">
                      名称
                    </TableHead>
                    {gaView ? (
                      <>
                        <TableHead className="w-[7rem] text-center text-gray-300">
                          业主
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-gray-300">
                          总包
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-gray-300">
                          则师
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-gray-300">
                          幕墙顾问
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-gray-300">
                          交标日期
                        </TableHead>
                        <TableHead className="w-[7rem] text-center text-gray-300">
                          面积
                        </TableHead>
                        {selectedTenderStatus?.value == 3 && (
                          <>
                            <TableHead className="w-[7rem] text-center text-gray-300">
                              中标日期
                            </TableHead>
                            <TableHead className="w-[9rem] text-center text-gray-300">
                              中标金额(亿元)
                            </TableHead>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <TableHead className="w-[6rem] text-center text-gray-300">
                          区域
                        </TableHead>

                        <TableHead className="w-[6rem] text-center text-gray-300">
                          <div>金额</div>
                          (亿元)
                        </TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody className="text-white">
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
                      {gaView ? (
                        <>
                          <TableCell className="text-center">
                            {tender?.developer}
                          </TableCell>
                          <TableCell className="text-center">
                            {tender?.contractor}
                          </TableCell>
                          <TableCell className="text-center">
                            {tender?.architect}
                          </TableCell>
                          <TableCell className="text-center">
                            {tender?.facadeConsultant}
                          </TableCell>
                          <TableCell className="text-center">
                            {tender?.tenderClosingDate
                              ? dayjs(tender.tenderClosingDate).format("LL")
                              : "-"}
                          </TableCell>
                          <TableCell className="text-center">
                            {tender?.constructionArea}
                          </TableCell>
                          {selectedTenderStatus?.value == 3 && (
                            <>
                              <TableCell className="text-center">
                                {tender?.tenderWinDate
                                  ? dayjs(tender.tenderWinDate).format("LL")
                                  : "-"}
                              </TableCell>
                              <TableCell className="text-center">
                                {fixAmount(tender?.tenderWinAmount)}
                              </TableCell>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <TableCell className="text-center">
                            {tender?.area.name}
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
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {(!gaView || (gaView && selectedTenderStatus?.value == 3)) && (
                <div className="flex w-full justify-end gap-x-4 pr-4 text-sm">
                  <div>合计: </div>
                  <div>{total}亿元</div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </MotionCard>
      </div>
    </>
  );
}
