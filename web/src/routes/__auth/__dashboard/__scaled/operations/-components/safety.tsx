import { SubTitle } from "~/components/project/sub-title";
import { SmallHeader } from "./small-header";
import workingNumber from "~/assets/operationv2/safety-working-number.png";
import workingPersonNumber from "~/assets/operationv2/safety-working-person-number.png";
import saftyWorkingCircle from "~/assets/operationv2/safety-working-circle.png";
import saftyChart from "~/assets/operationv2/safety-chart.png";

export function Safety() {
  return (
    <div>
      <SubTitle>安全</SubTitle>

      <div className="mt-2">
        <SmallHeader>开工情况</SmallHeader>
        <div className="mt-2 flex items-center justify-center gap-x-2 overflow-hidden px-4">
          <div className="relative h-14 w-full">
            <img
              src={workingNumber}
              className="absolute inset-0 mx-auto h-full w-auto"
            />
            <div className="absolute left-[55%] top-[38%] -translate-x-1/2 -translate-y-1/2 font-mono text-xl font-bold">
              26
            </div>
          </div>
          <div className="relative h-14 w-full">
            <img
              src={workingPersonNumber}
              className="absolute inset-0 mx-auto h-full w-auto"
            />
            <div className="absolute left-[55%] top-[38%] -translate-x-1/2 -translate-y-1/2 font-mono text-xl font-bold">
              223
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <SmallHeader>开工申报</SmallHeader>
        <div className="mt-2 flex items-center justify-center px-4">
          <div className="relative h-16 w-[40%]">
            <img
              src={saftyWorkingCircle}
              className="absolute inset-0 mx-auto h-16 w-auto"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold">
              36%
            </div>
          </div>
          <div className="flex flex-1 gap-x-6">
            <div className="flex items-center gap-x-2">
              <span className="text-xs">· 当日完成</span>
              <span className="font-mono font-bold">26</span>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="text-xs">· 累计完成</span>
              <span className="font-mono font-bold">223</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <SmallHeader>安全巡查</SmallHeader>
        <div className="mt-2 px-4">
          <img src={saftyChart} className="mx-auto h-auto w-[80%]" />
        </div>
      </div>
    </div>
  );
}
