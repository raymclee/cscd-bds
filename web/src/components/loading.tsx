import { Spin } from "antd";

export function Loading() {
  return (
    <div className="flex min-h-80 items-center justify-center">
      <Spin />
    </div>
  );
}
