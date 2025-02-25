import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export function useAutoScale() {
  const windowSize = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { width, height } = window.screen;
    if (ref.current) {
      const scale =
        width >= 1920 ? document.body.clientWidth / width : width / 1920;

      Object.assign(ref.current.style, {
        width: `${width > 1920 ? width : 1920}px`,
        height: `${height > 1080 ? height : 1080}px`,
        // width: "100vw",
        // height: "100vh",
        transform: `scale(${scale})`,
      });
    }
  }, [windowSize]);

  return ref;
}
