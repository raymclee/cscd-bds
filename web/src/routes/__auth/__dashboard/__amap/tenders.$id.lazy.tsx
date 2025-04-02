import { createLazyFileRoute, notFound } from "@tanstack/react-router";
import { tendersIdPageQuery } from "__generated__/tendersIdPageQuery.graphql";
import { useEffect, useRef } from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import { TenderDetail } from "./-components/tender-detail";

import { Tender } from "~/graphql/graphql";
import { tenderStatusBoundColor } from "~/lib/color";
export const Route = createLazyFileRoute(
  "/__auth/__dashboard/__amap/tenders/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const preload = Route.useLoaderData();
  const data = usePreloadedQuery<tendersIdPageQuery>(
    graphql`
      query tendersIdPageQuery($id: ID!) {
        node(id: $id) {
          ... on Tender {
            id
            area {
              id
              code
              name
            }
            followingSales {
              id
              name
            }
            activeProfile {
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
              geoCoordinate
            }
          }
        }
      }
    `,
    preload,
  );
  const mapRef = useRef<AMap.Map>();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    mapRef.current = new AMap.Map(mapContainerRef.current, {
      mapStyle: "amap://styles/blue",
    });

    mapRef.current.add(new AMap.TileLayer.Satellite());

    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!data.node || !data.node?.activeProfile?.geoCoordinate) {
      return;
    }

    const tender = data.node as Tender;
    const map = mapRef.current;

    if (tender?.geoBounds) {
      const polygon = new AMap.Polygon();
      polygon.setOptions({
        fillColor: tenderStatusBoundColor(tender!),
        strokeColor: tenderStatusBoundColor(tender!),
        fillOpacity: 0.35,
        strokeWeight: 2,
      });
      polygon.setPath(tender.geoBounds as AMap.LngLatLike[]);
      const pBounds = polygon.getBounds();
      const offsetY = tender.name && tender.name?.length > 10 ? -20 : -10;
      // @ts-expect-error
      new AMapUI.SimpleMarker({
        // @ts-expect-error
        iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
        label: {
          content: `
           <div id="marker-${tender.id}" class="relative flex flex-col p-2 overflow-hidden border rounded-lg shadow-lg backdrop-blur-sm bg-sky-950 border-blue-500/30 group">
            <!-- Holographic scan effect -->
            <div class="absolute inset-0 z-10 overflow-hidden pointer-events-none">
              <div class="absolute inset-0 holographic-effect"></div>
            </div>
            
            <!-- Tech scan line -->
            <div class="absolute inset-0 translate-y-full opacity-0 pointer-events-none group-hover:animate-scan-line bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent"></div>
            
            <!-- Corner borders - top left and top right -->
            <div class="group-hover:bg-corner-border-glow absolute left-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            <div class="group-hover:bg-corner-border-glow absolute right-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            
            <!-- Corner borders - bottom left and bottom right -->
            <div class="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            <div class="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            
            <div class="relative z-10 text-sm font-medium text-center transition-all duration-300 text-wrap group-hover:text-shadow-glow group-hover:text-blue-200 line-clamp-2">${tender.name}</div>
          </div>
          `,
          offset: new AMap.Pixel(-80, offsetY),
        },
        map,
        position: pBounds?.getCenter(),
      });
    } else if (tender?.activeProfile?.geoCoordinate?.length == 2) {
      const offsetY = tender.name && tender.name?.length > 10 ? -35 : -25;
      // @ts-expect-error
      const label = new AMapUI.SimpleMarker({
        // @ts-expect-error
        iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
        label: {
          content: `
          <div id="marker-${tender.id}" class="w-[10rem] relative overflow-hidden rounded-lg backdrop-blur-sm bg-sky-950 border border-blue-500/30 shadow-lg group px-2 py-1.5">
            <!-- Holographic scan effect -->
            <div class="absolute inset-0 z-10 overflow-hidden pointer-events-none">
              <div class="absolute inset-0 holographic-effect"></div>
            </div>
            
            <!-- Tech scan line -->
            <div class="absolute inset-0 translate-y-full opacity-0 pointer-events-none group-hover:animate-scan-line bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent"></div>
            
            <!-- Corner borders - top left and top right -->
            <div class="group-hover:bg-corner-border-glow absolute left-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            <div class="group-hover:bg-corner-border-glow absolute right-0 top-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            
            <!-- Corner borders - bottom left and bottom right -->
            <div class="group-hover:bg-corner-border-glow absolute bottom-0 left-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            <div class="group-hover:bg-corner-border-glow absolute bottom-0 right-0 h-[2px] w-4 bg-transparent opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
            
            <div class="relative z-10 text-sm font-medium text-center transition-all duration-300 text-wrap group-hover:text-shadow-glow group-hover:text-blue-200 line-clamp-2">${tender.activeProfile?.name}</div>
          </div>
          `,
          offset: new AMap.Pixel(-235, offsetY),
        },
        map,
        position: new AMap.LngLat(
          tender.activeProfile?.geoCoordinate?.[1]!,
          tender.activeProfile?.geoCoordinate?.[0]!,
        ),
        extData: {
          tenderId: tender.id,
        },
      });

      const circleMarker = new AMap.CircleMarker({
        center: new AMap.LngLat(
          tender.activeProfile?.geoCoordinate?.[1]!,
          tender.activeProfile?.geoCoordinate?.[0]!,
        ),
        radius: 20 + Math.random() * 10, //3D视图下，CircleMarker半径不要超过64px
        fillColor: tenderStatusBoundColor(tender!),
        strokeColor: tenderStatusBoundColor(tender!),
        fillOpacity: 0.35,
        strokeWeight: 2,
        strokeOpacity: 1,
        zIndex: 15,
        bubble: true,
        cursor: "pointer",
      });
      map?.add(circleMarker);
    }

    const [lat, lng] = data.node?.activeProfile?.geoCoordinate as [
      number,
      number,
    ];
    mapRef.current?.setZoomAndCenter(15, [lng, lat], false, 600);
  }, [data.node]);

  if (!data.node) {
    throw notFound();
  }

  return (
    <>
      <div
        ref={mapContainerRef}
        className="sticky z-20 top-14 aspect-video"
      ></div>
      <TenderDetail tender={data.node as Tender} />
    </>
  );
}
