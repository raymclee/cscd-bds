import { TextScramble } from "~/components/ui/text-scramble";
import { formatProjectAmount } from "~/lib/helper";

import b1 from "~/assets/svg/box1.png";
import b2 from "~/assets/svg/box2.png";
import b3 from "~/assets/svg/box3.png";
import b4 from "~/assets/svg/box4.png";
import b5 from "~/assets/svg/box5.png";

import { formatAmountWithCommas } from "~/lib/helper";
import { Project } from "~/lib/project";

export function Amounts({ pj }: { pj: Project }) {
  return (
    <div className="mt-2 grid grid-cols-5 gap-x-3 overflow-hidden">
      {/* 营业额 */}
      <div className="relative flex justify-center">
        <img
          src={b2}
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div className="absolute top-5 text-lg font-bold">营业额</div>

        <div className="relative h-60 w-full pt-[98%]">
          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年KPI</div>
            <div className="flex-1 text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfYs))} */}
                {formatAmountWithCommas(58357)}
              </TextScramble>
              <span className="ml-1 text-xxs">万</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                32
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">累计完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                76
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>
        </div>
      </div>

      {/* 现金流 */}
      <div className="relative flex justify-center">
        <img
          src={b3}
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div className="absolute top-5 text-lg font-bold">现金流</div>

        <div className="relative h-60 w-full pt-[98%]">
          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年KPI</div>
            <div className="flex-1 text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfYs))} */}
                {formatAmountWithCommas(10435)}
              </TextScramble>
              <span className="ml-1 text-xxs">万</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                46
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">累计完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                81
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>
        </div>
      </div>

      {/* 项目管理费 */}
      <div className="relative flex justify-center">
        <img
          src={b4}
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div className="absolute top-5 text-lg font-bold">管理费</div>

        <div className="relative h-60 w-full pt-[98%]">
          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年KPI</div>
            <div className="flex-1 text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfYs))} */}
                {formatAmountWithCommas(7041)}
              </TextScramble>
              <span className="ml-1 text-xxs">万</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                41
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">累计完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                87
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>
        </div>
      </div>

      {/* 项目设计费 */}
      <div className="relative flex justify-center">
        <img
          src={b5}
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div className="absolute top-5 text-lg font-bold">设计费</div>

        <div className="relative h-60 w-full pt-[98%]">
          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年KPI</div>
            <div className="flex-1 text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfYs))} */}
                {formatAmountWithCommas(68238)}
              </TextScramble>
              <span className="ml-1 text-xxs">万</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                28
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">累计完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                69
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>
        </div>
      </div>

      {/* 成交额 */}
      <div className="relative flex justify-center">
        <img
          src={b1}
          className="absolute inset-0 h-full w-full object-contain"
        />
        <div className="absolute top-5 text-lg font-bold">生产费</div>

        <div className="relative h-60 w-full pt-[98%]">
          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年KPI</div>
            <div className="flex-1 text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfYs))} */}
                {formatAmountWithCommas(10435)}
              </TextScramble>
              <span className="ml-1 text-xxs">万</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">当年完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                42
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>

          <div className="ml-6 mr-2 flex items-baseline justify-center">
            <div className="flex-1 text-xs">累计完成</div>
            <div className="flex-1 text-left text-sm font-bold text-brand-project">
              <TextScramble characterSet="0123456789" key={pj?.code} as="span">
                {/* {formatAmountWithCommas(formatProjectAmount(pj?.xmglfLj))} */}
                76
              </TextScramble>
              <span className="ml-0.5 text-xs">％</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
