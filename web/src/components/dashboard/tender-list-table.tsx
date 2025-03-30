import { MapIndexPageDistrictQuery } from "__generated__/MapIndexPageDistrictQuery.graphql";
import { fetchQuery, useRelayEnvironment } from "react-relay";
import { useAreaTenders } from "~/hooks/use-area-tenders";
import { fixAmount } from "~/lib/helper";
import { districtsQuery } from "~/routes/__auth/__dashboard/__scaled/__map/v1.lazy";
import { useMapStore } from "~/store/map";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "~/lib/utils";

export function TenderListTable({
  size = "small",
}: {
  size?: "small" | "large";
}) {
  const navigateToTender = useMapStore((state) => state.navigateToTender);
  const environment = useRelayEnvironment();
  const tenders = useAreaTenders();

  return (
    <Table className="my-4 h-full">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader className="sticky top-0 bg-gray-900">
        <TableRow className="items-center">
          <TableHead className="w-[50px] text-center text-[0.6em] text-gray-300">
            序号
          </TableHead>
          <TableHead className="text-center text-[0.6em] text-gray-300">
            名称
          </TableHead>
          <TableHead className="w-[60px] text-center text-[0.6em] text-gray-300">
            区域
          </TableHead>
          <TableHead className="w-[80px] text-center text-[0.6em] text-gray-300">
            <div>金额</div>
            (亿元)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className={cn(size === "small" && "text-xs")}>
        {tenders?.map((tender, i) => (
          <TableRow
            className="cursor-pointer"
            key={tender?.id}
            onClick={async () => {
              if (!tender?.district) return;
              const districts = await fetchQuery<MapIndexPageDistrictQuery>(
                environment,
                districtsQuery,
                {
                  adcode: tender?.district.adcode!,
                },
              ).toPromise();
              const plots =
                districts?.districts.edges?.flatMap((e) => e?.node?.plots) ||
                [];
              // @ts-expect-error
              navigateToTender(tender, plots);
            }}
          >
            <TableCell className="text-center">{i + 1}</TableCell>
            <TableCell className="text-center">{tender?.name}</TableCell>
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
  );
}
