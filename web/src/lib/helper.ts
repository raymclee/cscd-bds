import { Maybe } from "~/graphql/graphql";

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
