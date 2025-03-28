import smallHeaderBg from "~/assets/operationv2/small-header.png";
import { ReactNode } from "react";

export function SmallHeader({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-6 overflow-hidden">
      <img
        src={smallHeaderBg}
        className="absolute inset-0 h-full w-auto object-cover"
      />
      <div className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center justify-center">
        <span className="text-sm font-bold text-white">{children}</span>
      </div>
    </div>
  );
}
