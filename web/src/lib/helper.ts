import { Maybe, Tender } from "~/graphql/graphql";

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
  tenders: Partial<Tender>[],
) {
  switch (level) {
    case "province":
      return tenders.filter((t) => t.province?.adcode === adcode);
    case "city":
      return tenders.filter((t) => t.city?.adcode === adcode);
    case "district":
      return tenders.filter((t) => t.district?.adcode === adcode);
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
