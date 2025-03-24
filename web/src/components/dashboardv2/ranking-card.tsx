import { Card, CardContent, CardHeader } from "../ui/card";
import headerSvg from "~/assets/dashboard/svg/sub-head-ranking.svg";

import numberOneSvg from "~/assets/dashboard/svg/ranking-number-one.svg";
import numberTwoSvg from "~/assets/dashboard/svg/ranking-number-two.svg";
import numberThreeSvg from "~/assets/dashboard/svg/ranking-number-three.svg";
import { useLoaderData } from "@tanstack/react-router";
import { usePreloadedQuery } from "react-relay";
import { query } from "~/routes/__auth/__dashboard/__amap.lazy";
import { AmapPageQuery } from "__generated__/AmapPageQuery.graphql";

const numberMap = {
  1: numberOneSvg,
  2: numberTwoSvg,
  3: numberThreeSvg,
};

export function RankingCard() {
  const preload = useLoaderData({ from: "/__auth/__dashboard/__amap" });
  const data = usePreloadedQuery<AmapPageQuery>(query, preload);

  return (
    <Card className="relative h-56 border-none bg-slate-900/60 text-white backdrop-blur">
      {/* 科技感装饰线条 */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />

      {/* 全息扫描效果 */}
      <div className="holographic-effect pointer-events-none absolute inset-0" />

      <CardHeader>
        <img
          src={headerSvg}
          alt="sub-head"
          className="h-8 w-full select-none"
        />
      </CardHeader>
      <CardContent className="py-2">
        <ul className="space-y-2">
          {data.competitors.edges?.slice(0, 5).map((e, index) => (
            <li className="flex items-center gap-4" key={e?.node?.id}>
              {index < 3 ? (
                <img
                  src={numberMap[(index + 1) as 1 | 2 | 3]}
                  alt={`number-${index + 1}`}
                  className="h-6 w-6"
                />
              ) : (
                <div className="w-6 text-center text-sm text-slate-400">
                  {index + 1}
                </div>
              )}
              <div className="flex flex-1 flex-col">
                <span className="line-clamp-1 text-sm">{e?.node?.name}</span>
              </div>
              <div className="text-sm">80%</div>
            </li>
          ))}
          {/* <li className="flex items-center gap-4">
            <img src={numberOneSvg} alt="number-one" className="w-6 h-6" />
            <div className="flex flex-col flex-1">
              <span className="text-sm line-clamp-1">
                中铁十一局集团有限公司
              </span>
            </div>
            <div className="text-sm">80%</div>
          </li>

          <li className="flex items-center gap-4">
            <img src={numberTwoSvg} alt="number-two" className="w-6 h-6" />
            <div className="flex flex-col flex-1">
              <span className="text-sm line-clamp-1">中铁建设集团有限公司</span>
            </div>
            <div className="text-sm">70%</div>
          </li>

          <li className="flex items-center gap-4">
            <img src={numberThreeSvg} alt="number-three" className="w-6 h-6" />
            <div className="flex flex-col flex-1">
              <span className="text-sm line-clamp-1">
                中国建筑第八工程局有限公司
              </span>
            </div>
            <div className="text-sm">60%</div>
          </li>

          <li className="flex items-center gap-4">
            <div className="w-6 text-sm text-center text-slate-400">4</div>
            <div className="flex flex-col flex-1">
              <span className="text-sm line-clamp-1">中国铁建股份有限公司</span>
            </div>
            <div className="text-sm">50%</div>
          </li>

          <li className="flex items-center gap-4">
            <div className="w-6 text-sm text-center text-slate-400">5</div>
            <div className="flex flex-col flex-1">
              <span className="text-sm line-clamp-1">中国建筑集团有限公司</span>
            </div>
            <div className="text-sm">40%</div>
          </li> */}
        </ul>
      </CardContent>
    </Card>
  );
}
