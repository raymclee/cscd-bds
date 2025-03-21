import {
  createLazyFileRoute,
  Outlet,
  useMatch,
  useMatches,
  useNavigate,
  useParams,
  useSearch,
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
                    customer {
                      id
                      name
                      ownerType
                      area {
                        id
                        name
                      }
                    }
                    followingSales {
                      id
                      name
                    }
                    images
                    fullAddress
                    tenderDate
                    discoveryDate
                    contractor
                    designUnit
                    tenderForm
                    keyProject
                    contractForm
                    tenderingAgency
                    consultingFirm
                    facadeConsultant
                    contractForm
                    timeLimitRating
                    sizeAndValueRating
                    creditAndPaymentRating
                    customerRelationshipRating
                    competitivePartnershipRating
                    timeLimitRatingOverview
                    sizeAndValueRatingOverview
                    creditAndPaymentRatingOverview
                    customerRelationshipRatingOverview
                    competitivePartnershipRatingOverview
                    tenderWinCompany
                    tenderCode
                    developer
                    architect
                    tenderClosingDate
                    constructionArea
                    tenderWinAmount
                    tenderWinDate
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
                    geoCoordinate {
                      coordinates
                    }
                    geoBounds
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

function useMapRouting({ enabled = true }: { enabled?: boolean }) {
  const search = useSearch({ from: "/__auth/__dashboard/__amap" });
  const tenderId = useParams({
    from: "/__auth/__dashboard/__amap/tenders/$id",
    shouldThrow: false,
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (search.d) {
      useMapV2Store.getState().renderAdcode(String(search.d));
    } else if (search.c) {
      useMapV2Store.getState().renderAdcode(String(search.c));
    } else if (search.p) {
      useMapV2Store.getState().renderAdcode(String(search.p));
    } else if (search.a) {
      useMapV2Store.getState().renderArea();
    } else if (!tenderId) {
      useMapV2Store.getState().renderAreas();
    }
  }, [enabled, search.a, search.c, search.d, search.p, tenderId]);

  useEffect(() => {
    if (!search.a) {
      return;
    }
    const unsub = useMapV2Store.subscribe((state, prevState) => {
      if (
        prevState.areas?.edges?.length !== state.areas?.edges?.length &&
        search.a
      ) {
        const area = state.areas?.edges?.find(
          (e) => e?.node?.code === search.a,
        );
        if (area?.node) {
          useMapV2Store.setState({ selectedArea: area.node });
        }
      }
    });

    return () => {
      unsub();
    };
  }, [search.a]);
}

function RouteComponent() {
  const container = useRef<HTMLDivElement>(null);
  const initMap = useMapV2Store.use.initMap();
  const map = useMapV2Store.use.map();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const preload = Route.useLoaderData();
  const data = usePreloadedQuery<AmapPageQuery>(query, preload);

  useMapRouting({ enabled: !loading });

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
      useMapV2Store.setState({
        areas: null,
      });
    };
  }, []);

  useEffect(() => {
    map?.on("complete", () => {
      setLoading(false);
    });
  }, [map]);

  return (
    <>
      <div className="relative">
        <nav className="sticky top-0 z-20 h-14 bg-slate-950/60 backdrop-blur">
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
