import no1 from "~/assets/svg/ranking_no_1.png";
import no2 from "~/assets/svg/ranking_no_2.png";
import no3 from "~/assets/svg/ranking_no_3.png";
import { useTopCompetitions } from "~/hooks/use-top-competitions";
import { cn } from "~/lib/utils";

export function TopCompetitors(props: { className?: string }) {
  const data = useTopCompetitions();

  return (
    <div className={cn("grid grid-cols-[1fr_1.4fr_1fr]", props.className)}>
      <div
        className={"relative flex flex-1 flex-col items-center justify-center"}
      >
        <img src={no2} className={cn("h-auto w-full scale-y-[1.1]")} />
        <div
          className={
            "absolute top-1/2 line-clamp-1 w-[70%] -translate-y-[100%] text-center text-xs"
          }
        >
          {data.topCompetitors?.[0]?.shortName || ""}
        </div>
      </div>
      <div
        className={"relative flex flex-1 flex-col items-center justify-center"}
      >
        <img src={no1} className={"h-auto w-full scale-y-[1.1]"} />
        <div
          className={
            "absolute top-1/2 line-clamp-1 w-[70%] -translate-y-[110%] text-center text-xs"
          }
        >
          {data.topCompetitors?.[1]?.shortName || ""}
        </div>
      </div>

      <div
        className={"relative flex flex-1 flex-col items-center justify-center"}
      >
        <img src={no3} className={cn("h-auto w-full scale-y-[1.1]")} />
        <div
          className={
            "absolute top-1/2 line-clamp-1 w-[70%] -translate-y-[100%] text-center text-xs"
          }
        >
          {data.topCompetitors?.[2]?.shortName || ""}
        </div>
      </div>
    </div>
  );
}
