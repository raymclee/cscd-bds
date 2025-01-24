export const biTitleMap = {
  "04441373-1ba3-4f91-bb35-bffbe03cdbd7": "业务数据监控",
  "51b503bf-4b55-4c12-b64a-f60345e5c8da": "线上线下产量分析填报",
  "f23556f4-ed58-4759-b5a4-9d3c56adba72": "预实对比及项目成本报表",
  "816b6712-4fde-47a8-9760-64a380d461b8": "远东香港现金流日报表",
};

export function getBiTitle(id: string) {
  return biTitleMap[id as keyof typeof biTitleMap] || "";
}
