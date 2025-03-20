import { Card, CardContent, CardHeader } from "../ui/card";
import headerSvg from "~/assets/dashboard/svg/sub-head-ranking.svg";

import numberOneSvg from "~/assets/dashboard/svg/ranking-number-one.svg";
import numberTwoSvg from "~/assets/dashboard/svg/ranking-number-two.svg";
import numberThreeSvg from "~/assets/dashboard/svg/ranking-number-three.svg";

export function RankingCard() {
  return (
    <Card className="h-56 border-none bg-slate-950/30 text-white backdrop-blur-lg">
      <CardHeader>
        <img
          src={headerSvg}
          alt="sub-head"
          className="h-8 w-full select-none"
        />
      </CardHeader>
      <CardContent className="py-2">
        <ul className="space-y-2">
          <li className="flex items-center gap-4">
            <img src={numberOneSvg} alt="number-one" className="h-6 w-6" />
            <div className="flex flex-1 flex-col">
              <span className="line-clamp-1 text-sm">
                中铁十一局集团有限公司
              </span>
            </div>
            <div className="text-sm">80%</div>
          </li>

          <li className="flex items-center gap-4">
            <img src={numberTwoSvg} alt="number-two" className="h-6 w-6" />
            <div className="flex flex-1 flex-col">
              <span className="line-clamp-1 text-sm">中铁建设集团有限公司</span>
            </div>
            <div className="text-sm">70%</div>
          </li>

          <li className="flex items-center gap-4">
            <img src={numberThreeSvg} alt="number-three" className="h-6 w-6" />
            <div className="flex flex-1 flex-col">
              <span className="line-clamp-1 text-sm">
                中国建筑第八工程局有限公司
              </span>
            </div>
            <div className="text-sm">60%</div>
          </li>

          <li className="flex items-center gap-4">
            <div className="w-6 text-center text-sm text-slate-400">4</div>
            <div className="flex flex-1 flex-col">
              <span className="line-clamp-1 text-sm">中国铁建股份有限公司</span>
            </div>
            <div className="text-sm">50%</div>
          </li>

          <li className="flex items-center gap-4">
            <div className="w-6 text-center text-sm text-slate-400">5</div>
            <div className="flex flex-1 flex-col">
              <span className="line-clamp-1 text-sm">中国建筑集团有限公司</span>
            </div>
            <div className="text-sm">40%</div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
