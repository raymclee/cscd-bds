import { SubTitle } from "~/components/project/sub-title";
import { TextScramble } from "~/components/ui/text-scramble";

import alarm from "~/assets/operationv2/drawing-progress-alarm.png";
import rowBg from "~/assets/operationv2/drawing-progress-row.png";
import componentBottom from "~/assets/operationv2/progress-component-bottom.png";
import componentTop from "~/assets/operationv2/progress-component-top.png";
import designCircle from "~/assets/operationv2/progress-design-circle.png";
import separator from "~/assets/operationv2/progress-design-separator.png";
import drawingBottom from "~/assets/svg/drawing_bottom.png";
import drawingCenter from "~/assets/svg/drawing_center.png";
import drawingLeft from "~/assets/svg/drawing_left.png";
import drawingRight from "~/assets/svg/drawing_right.png";

import { formatAmountWithCommas } from "~/lib/helper";

import { Project } from "~/lib/project";
import { ProgressBar } from "./progress-bar";
import { SmallHeader } from "./small-header";

export function Progress({ pj }: { pj: Project }) {
  const diagramProcessingFinishCount = pj?.diagramProcessingFinishCount || 0;
  const diagramProcessingTotalCount = pj?.diagramProcessingTotalCount || 0;
  const diagramCApprovalRatioNumerator =
    pj?.diagramCApprovalRatioNumerator || 0;
  const diagramCApprovalRatioDenominator =
    pj?.diagramCApprovalRatioDenominator || 0;
  const diagramBdTotalCount = pj?.diagramBdTotalCount || 0;
  const diagramBdFinishCount = pj?.diagramBdFinishCount || 0;
  const diagramConstructionTotalCount = pj?.diagramConstructionTotalCount || 0;
  const diagramConstructionFinishCount =
    pj?.diagramConstructionFinishCount || 0;

  return (
    <div>
      <SubTitle>进度</SubTitle>
      <div className="mt-2">
        <SmallHeader>图纸进度</SmallHeader>

        <div className="mt-1 flex gap-1">
          <div className="relative">
            <img src={drawingLeft} />
            <div className="absolute left-1/2 top-[2.5rem] flex flex-col gap-y-[0.5em] text-xxs text-yellow-500">
              <span>
                <TextScramble characterSet="0123456789" as="span">
                  {`${formatAmountWithCommas(diagramBdFinishCount)}`}
                </TextScramble>
                <span className="ml-1">份</span>
              </span>

              <span>
                <TextScramble characterSet="0123456789" as="span">
                  {`${formatAmountWithCommas(diagramBdTotalCount)}`}
                </TextScramble>
                <span className="ml-1">份</span>
              </span>
            </div>
          </div>

          <div className="relative">
            <img src={drawingCenter} />
            <div className="absolute left-1/2 top-[2.5rem] flex flex-col gap-y-[0.5em] text-xxs text-yellow-500">
              <span>
                <TextScramble characterSet="0123456789" as="span">
                  {`${formatAmountWithCommas(diagramConstructionFinishCount)}`}
                </TextScramble>
                <span className="ml-1">份</span>
              </span>

              <span>
                <TextScramble characterSet="0123456789" as="span">
                  {`${formatAmountWithCommas(diagramConstructionTotalCount)}`}
                </TextScramble>
                <span className="ml-1">份</span>
              </span>
            </div>
          </div>

          <div className="relative">
            <img src={drawingRight} />
            <div className="absolute left-1/2 top-[2.5rem] flex flex-col gap-y-[0.5em] text-xxs text-yellow-500">
              <span>
                <TextScramble characterSet="0123456789" as="span">
                  {`${formatAmountWithCommas(diagramProcessingFinishCount)}`}
                </TextScramble>
                <span className="ml-1">份</span>
              </span>

              <span>
                <TextScramble characterSet="0123456789" as="span">
                  {`${formatAmountWithCommas(diagramProcessingTotalCount)}`}
                </TextScramble>
                <span className="ml-1">份</span>
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-1">
          <img src={drawingBottom} />
          <div className="absolute right-[5rem] top-[0.75rem] flex flex-col gap-y-[0.5rem] text-xxs text-yellow-500">
            <TextScramble characterSet="0123456789" as="span">
              {`${formatAmountWithCommas(diagramCApprovalRatioNumerator)}`}
            </TextScramble>

            <TextScramble characterSet="0123456789" as="span">
              {`${formatAmountWithCommas(diagramCApprovalRatioDenominator)}`}
            </TextScramble>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <SmallHeader>设计方案常态化评审</SmallHeader>

        <div className="flex items-center px-8">
          <div className="relative w-[34%]">
            <img src={designCircle} className="h-24 w-auto" />
            <div className="absolute left-[2.15rem] top-8">
              <span className="font-mono text-lg font-bold text-brand-project">
                45%
              </span>
            </div>
          </div>

          <div className="mr-8 flex flex-1 items-center justify-between">
            <div className="flex flex-col items-center gap-1">
              <div className="font-mono text-xl font-bold text-brand-project">
                16
              </div>
              <div className="text-xs">已完成</div>
            </div>

            <img src={separator} className="h-14 w-auto" />

            <div className="flex flex-col items-center gap-1">
              <div className="font-mono text-xl font-bold text-brand-project">
                16
              </div>
              <div className="text-xs">已完成</div>
            </div>

            <img src={separator} className="h-14 w-auto" />

            <div className="flex flex-col items-center gap-1">
              <div className="font-mono text-xl font-bold text-brand-project">
                16
              </div>
              <div className="text-xs">已完成</div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-44">
        <SmallHeader>评审进展</SmallHeader>

        <div className="relative mt-2 grid grid-cols-3 gap-x-2 gap-y-3 pl-8 text-xs">
          <img
            src={rowBg}
            className="pointer-events-none absolute left-2 top-12 h-8 w-[90%]"
          />
          <img
            src={rowBg}
            className="pointer-events-none absolute left-2 top-[6.5rem] h-8 w-[90%]"
          />

          <div></div>
          <div>预计完成时间</div>
          <div>实际完成时间</div>
          <div>设计方案评审</div>
          <div className="font-mono font-bold text-brand-project">
            2025-01-21
          </div>
          <div className="flex items-center font-mono font-bold text-red-500">
            2025-02-26
            <img src={alarm} className="ml-2 h-4 w-auto" />
          </div>
          <div className="relative">项目策划评审</div>
          <div className="relative font-mono font-bold text-brand-project">
            2025-02-26
          </div>
          <div className="relative font-mono font-bold text-brand-project">
            2025-02-26
          </div>
          <div>项目生产启动会评审</div>
          <div className="font-mono font-bold text-brand-project">
            2025-02-26
          </div>
          <div className="font-mono font-bold text-brand-project">
            2025-02-26
          </div>
          <div>交楼方案评审</div>
          <div className="font-mono font-bold text-brand-project">
            2025-02-26
          </div>
          <div className="font-mono font-bold text-brand-project">
            2025-02-26
          </div>
        </div>
      </div>

      <div className="mt-2">
        <SmallHeader>当年里程碑完成情况</SmallHeader>

        <div className="mt-2 grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-4 gap-y-2 px-4 text-xs">
          <div>已完成</div>
          <div className="font-mono font-bold text-brand-project-2">228</div>
          <ProgressBar value={71} className="bg-green-600" />
          <div className="font-mono font-bold text-brand-project">71%</div>

          <div>已延误</div>
          <div className="font-mono font-bold text-brand-project-2">63</div>
          <ProgressBar value={81} className="bg-red-600" />
          <div className="font-mono font-bold text-brand-project">43%</div>

          <div>即将延误</div>
          <div className="font-mono font-bold text-brand-project-2">0</div>
          <ProgressBar value={0} className="bg-red-600" />
          <div className="font-mono font-bold text-brand-project">0%</div>
        </div>
      </div>

      <div className="mt-4">
        <SmallHeader>四位一体计划延误情况</SmallHeader>

        <div className="mt-2 grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-4 gap-y-2 px-4 text-xs">
          <div>已完成</div>
          <div className="font-mono font-bold text-brand-project-2">52</div>
          <ProgressBar value={92} className="bg-green-600" />
          <div className="font-mono font-bold text-brand-project">92%</div>

          <div>已延误</div>
          <div className="font-mono font-bold text-brand-project-2">25</div>
          <ProgressBar value={36} className="bg-red-600" />
          <div className="font-mono font-bold text-brand-project">36%</div>
        </div>
      </div>

      <div className="mt-2">
        <SmallHeader>生产及安装进度</SmallHeader>
        <div className="space-y-2 bg-gradient-to-tr from-[#0a3256] to-transparent px-2 py-1.5 shadow-lg">
          <div className="relative h-14">
            <img
              src={componentTop}
              className="absolute inset-0 h-auto w-full object-cover"
            />
            <div className="relative ml-24 grid h-full w-[70%] grid-cols-3 items-center pt-1">
              <div className="text-center">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  className="font-bold text-brand-project-2"
                >
                  {`${formatAmountWithCommas(16)}`}
                </TextScramble>
                <div className="text-xxs opacity-80">总数 (件)</div>
              </div>
              <div className="text-center">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  className="font-bold text-brand-project-2"
                >
                  {`${formatAmountWithCommas(5)}`}
                </TextScramble>
                <div className="text-xxs opacity-80">生产数 (件)</div>
              </div>
              <div className="text-center">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  className="font-bold text-brand-project-2"
                >
                  {`${formatAmountWithCommas(11)}`}
                </TextScramble>
                <div className="text-xxs opacity-80">安装数 (件)</div>
              </div>
            </div>
          </div>

          <div className="relative h-14">
            <img
              src={componentBottom}
              className="absolute inset-0 h-auto w-full object-cover"
            />
            <div className="relative ml-24 grid h-full w-[70%] grid-cols-3 items-center pt-1">
              <div className="text-center">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  className="font-bold text-brand-project-2"
                >
                  {`${formatAmountWithCommas(10000)}`}
                </TextScramble>
                <div className="text-xxs opacity-80">总面积（平方米）</div>
              </div>
              <div className="text-center">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  className="font-bold text-brand-project-2"
                >
                  {`${formatAmountWithCommas(6000)}`}
                </TextScramble>
                <div className="text-xxs opacity-80">生产面积（平方米）</div>
              </div>
              <div className="text-center">
                <TextScramble
                  characterSet="0123456789"
                  key={pj?.code}
                  className="font-bold text-brand-project-2"
                >
                  {`${formatAmountWithCommas(1268)}`}
                </TextScramble>
                <div className="text-xxs opacity-80">安装面积（平方米）</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
