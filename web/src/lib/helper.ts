import {
  AreaConnection,
  Maybe,
  Tender,
  TenderConnection,
} from "~/graphql/graphql";

export function ownerTypeText(typ: Maybe<number> | undefined): string {
  if (!typ) {
    return "";
  }
  switch (typ) {
    case 1:
      return "政府平台";
    case 2:
      return "央企国企";
    case 3:
      return "高科技企业";
    case 4:
      return "其他企业";
    default:
      return "";
  }
}

export const tenderStatusOptions = [
  { label: "跟进中", value: 1 },
  { label: "停止跟进", value: 2 },
  { label: "中标", value: 3 },
  { label: "失标", value: 4 },
  { label: "估价", value: 5 },
  { label: "已交标", value: 6 },
  { label: "数据作废", value: 7 },
];

export function tenderStatusText(status: Maybe<number> | undefined): string {
  if (!status) {
    return "";
  }
  switch (status) {
    case 1:
      return "跟进中";
    case 2:
      return "停止跟进";
    case 3:
      return "中标";
    case 4:
      return "失标";
    case 5:
      return "估价";
    case 6:
      return "已交标";
    case 7:
      return "数据作废";
    default:
      return "";
  }
}

export function fixAmount(amount: Maybe<number> | undefined): number {
  if (!amount) {
    return 0;
  }
  return Number((Math.abs(Number(amount)) / 1.0e8).toFixed(2));
}

export function findTenderWithLevel(
  adcode: number,
  level: string,
  tenders: TenderConnection,
) {
  switch (level) {
    case "province":
      return tenders.edges
        ?.map((e) => e?.node)
        .filter((t) => t?.province?.adcode === adcode);
    case "city":
      return tenders.edges
        ?.map((e) => e?.node)
        .filter((t) => t?.city?.adcode === adcode);
    case "district":
      return tenders.edges
        ?.map((e) => e?.node)
        .filter((t) => t?.district?.adcode === adcode);
  }
}

export function getDistrictZoomLevel(id: string) {
  let zoom = 5;
  if (id === "GA") {
    zoom = 10;
  } else if (id === "HD" || id === "HN") {
    zoom = 6;
  }
  return zoom;
}

export function visitTypeText(type: Maybe<number> | undefined): string {
  if (!type) {
    return "";
  }
  switch (type) {
    case 1:
      return "现场拜访";
    case 2:
      return "线上会议";
    default:
      return "";
  }
}

export function industryText(industry: Maybe<number> | undefined): string {
  if (!industry) {
    return "";
  }
  switch (industry) {
    case 1:
      return "互联网";
    case 2:
      return "金融";
    case 3:
      return "医疗";
    case 4:
      return "餐饮";
    case 5:
      return "制造";
    case 6:
      return "电商";
    case 7:
      return "科技";
    case 8:
      return "其他";
    case 9:
      return "物流";
    case 10:
      return "地产";
    case 11:
      return "政府";
    default:
      return "";
  }
}

export function customerSizeText(size: Maybe<number> | undefined): string {
  if (!size) {
    return "";
  }
  switch (size) {
    case 1:
      return "<10";
    case 2:
      return "10-100";
    case 3:
      return "100-1000";
    case 4:
      return "1000-10000";
    case 5:
      return ">10000";
    default:
      return "";
  }
}

export function isGAorHWOnly(areas: AreaConnection | undefined): boolean {
  return (
    areas?.edges?.every(
      (e) => e?.node?.code == "GA" || e?.node?.code == "HW",
    ) || false
  );
}

export function isGA(
  tender: Maybe<Tender> | Partial<Tender> | null | undefined,
): boolean {
  return tender?.area?.code === "GA";
}

export function isHW(
  tender: Maybe<Tender> | Partial<Tender> | null | undefined,
): boolean {
  return tender?.area?.code === "HW";
}
