import {
  createLazyFileRoute,
  Outlet,
  useMatch,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import { AmapPageQuery } from "__generated__/AmapPageQuery.graphql";
import { useEffect, useRef, useState } from "react";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import headSvg from "~/assets/dashboard/svg/head.svg";
import { useMapV2Store } from "~/store";

export const query = graphql`
  query AmapPageQuery(
    $userId: ID!
    $orderBy: [TenderOrder!]
    $first: Int
    $last: Int # $visitOrderBy: [VisitRecordOrder!]
  ) {
    node(id: $userId) {
      ... on User {
        areas {
          edges {
            node {
              id
              name @required(action: NONE)
              code
              createdAt
              center {
                coordinates
              }
              provinces {
                edges {
                  node {
                    id
                    name
                    adcode
                    center {
                      coordinates
                    }
                  }
                }
              }
              tenders(
                orderBy: $orderBy
                first: $first
                last: $last
                where: { statusNEQ: 7, approvalStatus: 2 }
              ) @connection(key: "MapIndexPageQuery_tenders") {
                edges {
                  node {
                    id
                    name
                    status
                    createdAt
                    estimatedAmount
                    tenderDate
                    images
                    customer {
                      ownerType
                    }
                    area {
                      code
                      name
                    }

                    province {
                      adcode
                      name
                    }
                    city {
                      name
                      adcode
                    }
                    district {
                      name
                      adcode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    topCompetitors {
      id
      shortName
      wonTendersCount
    }

    users {
      edges {
        node {
          id
          name
        }
      }
    }

    customers {
      edges {
        node {
          id
          name
          ownerType
        }
      }
    }
  }
`;

export const Route = createLazyFileRoute("/__auth/__dashboard/__amap")({
  component: RouteComponent,
});

function M() {
  const lastPath = useMatches({
    select(matches) {
      console.log(matches);
      return matches.at(-1)?.fullPath.replace("/v2", "");
    },
  });

  console.log(lastPath);
  useEffect(() => {
    if (lastPath === "") {
      useMapV2Store.getState().renderAreas();
    } else if (lastPath?.startsWith("/areas")) {
      useMapV2Store.getState().renderArea();
    }
  }, [lastPath]);

  return <></>;
}

function RouteComponent() {
  const container = useRef<HTMLDivElement>(null);
  const initMap = useMapV2Store.use.initMap();
  const map = useMapV2Store.use.map();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const preload = Route.useLoaderData();
  const data = usePreloadedQuery<AmapPageQuery>(query, preload);

  useEffect(() => {
    useMapV2Store.setState({ areas: data.node?.areas as any });
  }, [data.node?.areas?.edges?.length]);

  useEffect(() => {
    if (!container.current) {
      return;
    }
    initMap(container.current, navigate);

    return () => {
      map?.destroy();
    };
  }, []);

  useEffect(() => {
    map?.on("complete", () => {
      console.log("onComplete");
      setLoading(false);
    });
  }, [map]);

  return (
    <>
      {!loading && <M />}
      <div className="relative">
        <nav className="sticky top-0 z-20 h-14 bg-slate-950/30 backdrop-blur-3xl">
          <img
            src={headSvg}
            alt="head"
            className="mx-auto h-full w-full object-cover lg:w-[70%]"
          />
        </nav>
        <Outlet />
      </div>
      <div ref={container} id="map" className="fixed inset-0"></div>
    </>
  );
}
