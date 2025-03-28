import { SubTitle } from "~/components/project/sub-title";
import { cn } from "~/lib/utils";
import { ProgressBar } from "./progress-bar";

export function Quality() {
  return (
    <div>
      <SubTitle>质量</SubTitle>

      <div className="mt-2">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 px-2 text-sm">
          <div className="text-xs">试水记录</div>
          <ProgressBar value={86} />
          <div className="font-mono font-bold text-brand-project">86%</div>

          <div className="text-xs">样板检查</div>
          <ProgressBar value={54} className="bg-purple-800" />
          <div className="font-mono font-bold text-brand-project">54%</div>

          <div className="text-xs">重要工序检查</div>
          <ProgressBar value={66} className="bg-green-700" />
          <div className="font-mono font-bold text-brand-project">66%</div>

          <div className="text-xs">来货检查</div>
          <ProgressBar value={42} className="bg-sky-500" />
          <div className="font-mono font-bold text-brand-project">42%</div>
        </div>
      </div>
    </div>
  );
}
