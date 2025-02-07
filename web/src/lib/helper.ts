import { TagProps } from "antd";
import {
  AreaConnection,
  InputMaybe,
  Maybe,
  Tender,
  TenderConnection,
} from "~/graphql/graphql";

export function percent(
  numerator?: number | null,
  denominator?: number | null,
): number {
  if (!numerator || !denominator) {
    return 0;
  }
  return Math.round((numerator / denominator) * 100 * 100) / 100;
}

export function projectTypeText(typ: Maybe<string> | undefined): string {
  if (!typ) {
    return "";
  }
  switch (typ) {
    case "GC":
      return "GC:830工程项目";
    case "SC":
      return "SC:830生产项目";
    case "YF":
      return "YF:830研发项目";
    default:
      return "";
  }
}

export const projectTypeOptions = [
  { label: "GC:830工程项目", value: "GC" },
  { label: "SC:830生产项目", value: "SC" },
  { label: "YF:830研发项目", value: "YF" },
];

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

export const ownerTypeOptions = [
  { label: "政府平台", value: 1 },
  { label: "央企国企", value: 2 },
  { label: "高科技企业", value: 3 },
  { label: "其他企业", value: 4 },
];

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

export function formatProjectAmount(amount: Maybe<number> | undefined): number {
  if (!amount) {
    return 0;
  }
  return Math.round(Number(Number(amount) / 1.0e4));
}

export function toActualAmount(amount: InputMaybe<number> | undefined): number {
  if (!amount) {
    return 0;
  }
  return amount * 1.0e8;
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

export function levelInvolvedText(level: Maybe<number> | undefined): string {
  if (!level) {
    return "";
  }
  switch (level) {
    case 1:
      return "区域";
    case 2:
      return "公司";
    case 3:
      return "集团";
    default:
      return "";
  }
}

export const levelInvolvedOptions = [
  { label: "区域", value: 1 },
  { label: "公司", value: 2 },
  { label: "集团", value: 3 },
];

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

export const visitTypeOptions = [
  { label: "现场拜访", value: 1 },
  { label: "线上会议", value: 2 },
];

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

export const industryOptions = [
  { label: "互联网", value: 1 },
  { label: "金融", value: 2 },
  { label: "医疗", value: 3 },
  { label: "餐饮", value: 4 },
  { label: "制造", value: 5 },
  { label: "电商", value: 6 },
  { label: "科技", value: 7 },
  { label: "其他", value: 8 },
  { label: "物流", value: 9 },
  { label: "地产", value: 10 },
  { label: "政府", value: 11 },
];

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

export const customerSizeOptions = [
  { label: "<10", value: 1 },
  { label: "10-100", value: 2 },
  { label: "100-1000", value: 3 },
  { label: "1000-10000", value: 4 },
  { label: ">10000", value: 5 },
];

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

export function tenderStatusTagColor(
  status: Maybe<number> | undefined,
): TagProps["color"] {
  if (!status) {
    return "default";
  }
  switch (status) {
    case 3:
      return "success";
    case 4:
      return "red";
    case 1:
    case 5:
    case 6:
      return "processing";
    case 2:
      return "warning";
  }
  return "default";
}

export function materialStatusIconColor(percentage?: number | null): string {
  if (!percentage) {
    return "text-gray-400";
  }
  if (percentage > 100) {
    console.log(percentage);
    return "text-red-600";
  } else if (percentage > 80) {
    return "text-yellow-500";
  } else {
    return "text-green-400";
  }
}

export function formatAmountWithCommas(amount: number) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
