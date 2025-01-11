import { topCompetitors_competitors$key } from "__generated__/topCompetitors_competitors.graphql";
import { graphql, useFragment } from "react-relay";
import no1 from "~/assets/svg/ranking_no_1.svg";
import no2 from "~/assets/svg/ranking_no_2.svg";
import no3 from "~/assets/svg/ranking_no_3.svg";
import { cn } from "~/lib/utils";

export function TopCompetitors(props: {
  competitors: topCompetitors_competitors$key;
  className?: string;
}) {
  const data = useFragment(
    graphql`
      fragment topCompetitors_competitors on Query {
        topCompetitors {
          id
          shortName
          wonTendersCount
        }
      }
    `,
    props.competitors,
  );

  return (
    <div className={cn("flex", props.className)}>
      <div
        className={"relative flex flex-1 flex-col items-center justify-center"}
      >
        <img src={no2} className={cn("h-full w-full scale-y-[1.1]")} />
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
        <img
          src={no1}
          className={"h-full w-full scale-x-[1.2] scale-y-[1.3]"}
        />
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
        <img src={no3} className={cn("h-full w-full scale-y-[1.1]")} />
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
