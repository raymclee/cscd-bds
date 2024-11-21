import { Maybe, Tender } from "~/graphql/graphql";

export function ownerType(typ: Maybe<number> | undefined): string {
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
