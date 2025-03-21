import { Card, CardContent, CardHeader } from "../ui/card";
import headerSvg from "~/assets/dashboard/svg/sub-head-ranking.svg";

import numberOneSvg from "~/assets/dashboard/svg/ranking-number-one.svg";
import numberTwoSvg from "~/assets/dashboard/svg/ranking-number-two.svg";
import numberThreeSvg from "~/assets/dashboard/svg/ranking-number-three.svg";

export function RankingCard() {
  return (
    <Card className="h-56 text-white border-none bg-slate-950/60 backdrop-blur">
      <CardHeader>
        <img
          src={headerSvg}
          alt="sub-head"
          className="w-full h-8 select-none"
        />
      </CardHeader>
      <CardContent className="py-2">
        <ul className="space-y-2">
          <li className="flex items-center gap-4">
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
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
