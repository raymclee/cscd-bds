import { Tender } from "~/graphql/graphql";

export const colors = [
  "#3366cc", // 0
  "#dc3912", // 1
  "#ff9900", // 2
  "#109644", // 3
  "#990077", // 4
  "#0099c6", // 5
  "#dd4477", // 6
  "#66aa00", // 7
  "#b82e2e", // 8
  "#316395", // 9
  "#994499", // 10
  "#22aa99", // 11
  "#aaaa11", // 12
  "#6633cc", // 13
  "#e67300", // 14
  "#8b0707", // 15
  "#651067", // 16
  "#329262", // 17
  "#5574a6", // 18
  "#3b3eac", // 19
];

export function getDistrictColor(code: number, i?: number): string {
  let fillColor = "";
  let strokeColor = "";

  switch (code) {
    //華西
    case 540000: //西藏
    case 650000: //新疆
    case 620000: //甘肃
    case 630000: //青海
    case 510000: //四川
    case 530000: //云南
    case 640000: //宁夏
    case 610000: //陕西
    case 500000: //重庆
    case 520000: //貴州
    case 450000: //广西
      fillColor = colors[3];
      strokeColor = colors[3];
      break;
    //華北
    case 150000: //内蒙古
    case 230000: //黑龙江
    case 220000: //吉林
    case 210000: //辽宁
    case 110000: //北京
    case 130000: //河北
    case 140000: //山西
    case 120000: //天津
    case 370000: //山东
      fillColor = colors[4];
      strokeColor = colors[4];
      break;
    //華東
    case 320000: //江苏
    case 310000: //上海
    case 340000: //安徽
    case 330000: //浙江
    case 410000: //河南
    case 350000: //福建
      fillColor = colors[6];
      strokeColor = colors[6];
      break;
    //華南
    case 430000: //湖南
    case 440000: //广东
    case 360000: //江西
    case 420000: //湖北
    case 460000: //海南
    case 710000: //台湾
      fillColor = colors[12];
      strokeColor = colors[12];
      break;
    case 810000: //香港
    case 820000: //澳门
      fillColor = colors[14];
      strokeColor = colors[14];
      break;
  }

  if (i) {
    fillColor = colors[colors.length - 1 - (i % colors.length)];
    strokeColor = colors[colors.length - 1 - (i % colors.length)];
  }

  return fillColor || colors[0];
}

export function tenderStatusBoundColor(tender: Partial<Tender>): string {
  switch (tender.status) {
    case 1:
    case 5:
    case 6:
      return tender.keyProject ? "#ffc60a" : "#35bd4b";
    case 3:
      return "#f54a45";
    default:
      return "#000";
  }
}
