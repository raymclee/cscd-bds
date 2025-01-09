import { createLazyFileRoute, useLayoutEffect } from "@tanstack/react-router";
import { MapIndexPageDistrictQuery } from "__generated__/MapIndexPageDistrictQuery.graphql";
import { MapIndexPageQuery } from "__generated__/MapIndexPageQuery.graphql";
import { AnimatePresence } from "motion/react";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import { fetchQuery, graphql } from "relay-runtime";
import { useShallow } from "zustand/shallow";
import { AmountBoard } from "~/components/dashboard/amount-board";
import { DashboardTenderList } from "~/components/dashboard/dashboard-tender-list";
import { MapTenderDetail } from "~/components/dashboard/map-tender-detail";
import { MapTenderList } from "~/components/dashboard/map-tender-list";
import { NewTenderBoardMore } from "~/components/dashboard/new-tender-board-more";
import { NewTenderBoard } from "~/components/dashboard/new-tender-board";
import { RankingListBoard } from "~/components/dashboard/ranking-list-board";
import { TenderStatusList } from "~/components/dashboard/tender-status-list";
import { TenderTypeBoard } from "~/components/dashboard/tender-type-board";
import { TenderTypeBoardMore } from "~/components/dashboard/tender-type-board-more";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Area } from "~/graphql/graphql";
import { getDistrictColor, tenderStatusBoundColor } from "~/lib/color";
import {
  findTenderWithLevel,
  fixAmount,
  getDistrictZoomLevel,
  isGAorHWOnly,
} from "~/lib/helper";
import { cn } from "~/lib/utils";
import { useMapStore } from "~/store/map";
import { RankingListBoardMore } from "~/components/dashboard/ranking-list-board-more";
import { DashboardTenderListMore } from "~/components/dashboard/dashboard-tender-list-more";
import { useRef } from "react";
import { useWindowSize } from "usehooks-ts";

export const Route = createLazyFileRoute("/__auth/__dashboard/__map/")({
  component: RouteComponent,
});

export const mapIndexPageQuery = graphql`
  query MapIndexPageQuery(
    $userId: ID!
    $orderBy: [TenderOrder!]
    $first: Int
    $last: Int
    $visitOrderBy: VisitRecordOrder
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
                where: { statusNEQ: 7 }
              ) @connection(key: "MapIndexPageQuery_tenders") {
                edges {
                  node {
                    id
                    name
                    status
                    createdAt
                    estimatedAmount
                    customer {
                      name
                      ownerType
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
                    visitRecords(orderBy: $visitOrderBy) {
                      edges {
                        node {
                          visitType
                          nextStep
                          commPeople
                          commContent
                          date
                          customer {
                            name
                          }
                          tender {
                            id
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    ...rankingListBoard_competitors
  }
`;

export const districtsQuery = graphql`
  query MapIndexPageDistrictQuery($adcode: Int!) {
    districts(where: { adcode: $adcode }) {
      edges {
        node {
          plots {
            edges {
              node {
                id
                name
                geoBounds
                colorHex
              }
            }
          }
        }
      }
    }
  }
`;

function RouteComponent() {
  const [
    map,
    dashboardVisible,
    selectedArea,
    navigations,
    pop,
    selectedTenderStatus,
    moreNewTenderBoardVisible,
    moreTenderTypeBoardVisible,
    moreRankingListBoardVisible,
    moreDashboardTenderListBoardVisible,
  ] = useMapStore(
    useShallow((state) => [
      state.map,
      state.dashboardVisible,
      state.selectedArea,
      state.navigations,
      state.pop,
      state.selectedTenderStatus,
      state.moreNewTenderBoardVisible,
      state.moreTenderTypeBoardVisible,
      state.moreRankingListBoardVisible,
      state.moreDashboardTenderListBoardVisible,
    ]),
  );
  const satelliteLayer = useMapStore((state) => state.satelliteLayer);
  const tenderViewTender = useMapStore((state) => state.tenderViewTender);
  const environment = Route.useRouteContext().RelayEnvironment;

  const data = usePreloadedQuery<MapIndexPageQuery>(
    mapIndexPageQuery,
    Route.useLoaderData(),
  );

  const areas = data.node?.areas?.edges?.map((e) => e?.node);
  const gaOnly = isGAorHWOnly(data.node?.areas as any);

  React.useEffect(() => {
    map?.on("complete", () => {
      //切换区域

      switch2AreaNode(100000);
    });
  }, [map]);

  //加载区域
  const loadAreaNode = React.useCallback(
    (adcode: number, callback: (error: any, areaNode?: any) => void) => {
      useMapStore
        .getState()
        .districtExplorer.loadAreaNode(adcode, (error: any, areaNode: any) => {
          if (error) {
            if (callback) {
              callback(error);
            }

            console.error(error);

            return;
          }

          if (callback) {
            callback(null, areaNode);
          }
        });
    },
    [data.node, map],
  );

  const onFeatureOrMarkerClick = React.useCallback(
    async (props: any) => {
      switch2AreaNode(props.adcode, props.childrenNum > 0);

      if (props.childrenNum == 0) {
        const districts = await fetchQuery<MapIndexPageDistrictQuery>(
          environment,
          districtsQuery,
          {
            adcode: props.adcode,
          },
        ).toPromise();

        const mapCircles: AMap.CircleMarker[] | any[] | AMap.Polygon[] = [];

        for (const plot of districts?.districts.edges
          ?.map((e) => e?.node)
          .flatMap((d) => d?.plots.edges)
          .map((e) => e?.node) || []) {
          const polygon = new AMap.Polygon();

          polygon.setPath(plot?.geoBounds as AMap.LngLatLike[]);
          polygon.setOptions({
            fillColor: plot?.colorHex,
            fillOpacity: 0.35,
            strokeColor: plot?.colorHex,
            strokeWeight: 2,
          });

          // @ts-expect-error
          const label = new AMapUI.SimpleMarker({
            // @ts-expect-error
            iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
            label: {
              content: `
            <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
              <div class="text-sm font-medium text-center text-wrap">${plot?.name}</div>
            </div>
            `,
              offset: new AMap.Pixel(-100, 30),
            },
            map,
            position: polygon.getBounds()?.getCenter(),
          });

          mapCircles.push(polygon);
          mapCircles.push(label);
        }

        const tenders =
          findTenderWithLevel(
            props.adcode,
            props.level,
            useMapStore.getState().selectedArea?.tenders!,
          ) || [];

        for (const [i, tender] of tenders.entries()) {
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
            const label = new AMapUI.SimpleMarker({
              // @ts-expect-error
              iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
              label: {
                content: `
              <div id="marker-${tender.id}" class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
                <div class="text-sm font-medium text-center text-wrap">${tender.name}</div>
              </div>
              `,
                offset: new AMap.Pixel(-80, offsetY),
              },
              map,
              position: pBounds?.getCenter(),
              extData: {
                tenderId: tender.id,
              },
            });
            label.on("click", () => {
              useMapStore.setState({
                tenderListHovering: i,
                selectedTender: tender,
                tenderListVisible: false,
              });
            });
            label.on("mouseover", () => {
              label.setOptions({ zIndex: 13 });
              useMapStore.setState({
                tenderListHovering: i,
              });
            });
            label.on("mouseout", () => {
              label.setOptions({ zIndex: 12 });
            });
            mapCircles.push(polygon);
            mapCircles.push(label);
          } else if (tender?.geoCoordinate?.coordinates) {
            const offsetY = tender.name && tender.name?.length > 10 ? -20 : -10;
            // @ts-expect-error
            const label = new AMapUI.SimpleMarker({
              // @ts-expect-error
              iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
              label: {
                content: `
              <div id="marker-${tender.id}" class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
                <div class="text-sm font-medium text-center text-wrap">${tender.name}</div>
              </div>
              `,
                offset: new AMap.Pixel(-80, offsetY),
              },
              map,
              position: new AMap.LngLat(
                tender.geoCoordinate?.coordinates[0],
                tender.geoCoordinate?.coordinates[1],
              ),
              extData: {
                tenderId: tender.id,
              },
            });
            label.on("click", () => {
              useMapStore.setState({
                tenderListHovering: i,
                selectedTender: tender,
                tenderListVisible: false,
              });
            });
            label.on("mouseover", () => {
              label.setOptions({ zIndex: 13 });
              useMapStore.setState({
                tenderListHovering: i,
              });
            });
            label.on("mouseout", () => {
              label.setOptions({ zIndex: 12 });
            });

            const circleMarker = new AMap.CircleMarker({
              center: new AMap.LngLat(
                tender.geoCoordinate?.coordinates[0],
                tender.geoCoordinate?.coordinates[1],
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
            mapCircles.push(circleMarker);
            mapCircles.push(label);
            // map?.add(circleMarker);
          }
        }

        const center =
          tenders?.length > 0 && tenders[0]?.geoCoordinate
            ? tenders[0]?.geoCoordinate?.coordinates
            : props.center;
        map?.setZoomAndCenter(15, center, false, 600);
        map?.addLayer(satelliteLayer!);
        for (const circle of mapCircles) {
          // circle.setMap(map);
          map?.add(circle);
        }
        useMapStore.setState({
          tenderListVisible: true,
          tenderList: tenders,
          dashboardVisible: false,
          mapCircles,
        });
      }
    },
    [data.node, map],
  );

  //绘制marker
  const renderMarker = React.useCallback(
    (props: any, hidable = false) => {
      if (props.adcode === useMapStore.getState().currentAreaNode?.adcode) {
        return;
      }

      const selectedArea = useMapStore.getState().selectedArea;
      const tendersWithinArea = selectedArea?.tenders.edges?.map(
        (e) => e?.node,
      );

      const adcodes = [
        ...(tendersWithinArea?.map((t) => t?.province?.adcode) || []),
        ...(tendersWithinArea?.map((t) => t?.city?.adcode) || []),
        ...(tendersWithinArea?.map((t) => t?.district?.adcode) || []),
      ].filter(Boolean);

      if (!adcodes.includes(props.adcode)) {
        return;
      }
      // tendersWithinArea?.map(t => t.)

      const tenderWithInLocation = tendersWithinArea
        ?.map((t) => {
          switch (props.level) {
            case "province":
              if (t?.province?.adcode === props.adcode) return t;
            case "city":
              if (t?.city?.adcode === props.adcode) return t;
            case "district":
              if (t?.district?.adcode === props.adcode) return t;
          }
        })
        .filter(Boolean);

      const projectCount = tenderWithInLocation?.length || 0;
      const projectAmount = fixAmount(
        tenderWithInLocation?.reduce(
          (acc, inc) =>
            inc?.estimatedAmount ? acc + inc?.estimatedAmount : acc,
          0,
        ),
      );

      // if (projectCount < 0) {
      //   return;
      // }
      // @ts-expect-error
      const marker = new AMapUI.SimpleMarker({
        // @ts-expect-error
        iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
        label: {
          content: `
          <div class="flex flex-col gap-1 p-0.5 text-xs shadow-2xl">
            <div class="font-medium">${props.name}(${projectCount})</div>
            ${typeof projectAmount === "number" && projectAmount > 0 ? `<div>${projectAmount}亿</div>` : ""}
          </div>
          `,
          offset: new AMap.Pixel(-50, 0),
        },
        map,
        position: props.centroid || props.center,
        extData: {
          hidable,
          adcode: props.adcode,
        },
      });

      marker.on("click", () => {
        const area = areas?.find((d) =>
          d?.provinces?.edges
            ?.map((e) => e?.node)
            .map((p) => p?.adcode)
            .includes(props.adcode),
        ) as Area;
        if (area) {
          useMapStore.setState({ selectedArea: area });
        }
        useMapStore.getState().push({ name: props.name, adcode: props.adcode });
        onFeatureOrMarkerClick(props);
      });
      marker.on("mouseover", () => {
        marker.setOptions({ zIndex: 13 });
      });
      marker.on("mouseout", () => {
        marker.setOptions({ zIndex: 12 });
      });
      useMapStore.setState((state) => ({
        markers: [...state.markers, marker],
      }));
    },
    [data.node, map, onFeatureOrMarkerClick],
  );

  const switch2AreaNode = React.useCallback(
    (adcode: number, zoomeToNode = true, callback?: () => void) => {
      // if (
      //   currentAreaNode &&
      //   "" + currentAreaNode.getAdcode() === "" + adcode
      // ) {
      //   return;
      // }
      const { map, satelliteLayer } = useMapStore.getState();

      map?.removeLayer(satelliteLayer!);
      map?.remove(useMapStore.getState().markers);
      useMapStore.setState({ dashboardVisible: true });

      if (adcode === 100000) {
        const markers: AMap.Marker[] = [];
        for (const area of data.node?.areas?.edges?.map((e) => e?.node) || []) {
          const amount = fixAmount(
            area?.tenders?.edges
              ?.map((e) => e?.node)
              .reduce(
                (acc, inc) =>
                  inc?.estimatedAmount ? acc + inc.estimatedAmount : acc,
                0,
              ),
          );

          //@ts-expect-error
          const marker = new AMapUI.SimpleMarker({
            // @ts-expect-error
            iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
            label: {
              content: `
              <div class="flex flex-col">
                <div class="text-lg font-bold">${area?.name}</div>
                <div class="flex items-baseline gap-3">
                  <div>
                    项目:<span class="ml-1 text-lg font-bold">${area?.tenders?.edges?.length}</span>
                  </div>
                  ${
                    amount > 0
                      ? `<div>
                        金额:
                        <span class="mx-1 text-lg font-bold">
                          ${`${amount}亿`}
                        </span>
                      </div>`
                      : ""
                  }
                </div>
                <div></div>
              </div>
          `,
              // offset: new AMap.Pixel(-40, 40),
            },
            map,
            position: area?.center?.coordinates,
            extData: {
              home: true,
            },
          });

          marker.on("click", () => {
            const { markers, districtExplorer } = useMapStore.getState();
            map?.remove(markers);

            districtExplorer.clearFeaturePolygons();

            districtExplorer.loadMultiAreaNodes(
              area?.provinces?.edges?.map((e) => e?.node).map((p) => p?.adcode),
              (error: any, areaNodes: any) => {
                for (const [i, areaNode] of areaNodes.entries()) {
                  const props = areaNode.getProps();

                  const fillColor = getDistrictColor(
                    props.adcode,
                    props.childrenNum,
                  );
                  const strokeColor = getDistrictColor(
                    props.adcode,
                    props.childrenNum,
                  );
                  renderMarker(props, true);

                  districtExplorer.renderParentFeature(areaNode, {
                    cursor: "default",
                    bubble: true,
                    strokeColor,
                    // strokeColor: areaNode.getSubFeatures().length ? "black" : "white", //线颜色
                    // strokeColor: areaNode.getSubFeatures().length ? "black" : "", //线颜色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 1, //线宽
                    // fillColor: "", //填充色
                    fillColor,
                    //   fillColor: "black",
                    //   fillColor: areaNode.getParentFeature() ? "black" : null,
                    fillOpacity: 0.5, //填充透明度
                  });
                }
              },
            );

            if (area) {
              const zoom = getDistrictZoomLevel(area?.code);
              useMapStore.setState({ selectedArea: area as Area });
              useMapStore.getState().push({ name: area.name });
              map?.setZoomAndCenter(
                zoom,
                area.center?.coordinates as [number, number],
                false,
                600,
              );
            }
          });
          markers.push(marker);
        }
        useMapStore.setState({ markers });
      }

      loadAreaNode(adcode, function (error: any, areaNode: any) {
        if (error) {
          return;
        }

        useMapStore.setState({ currentAreaNode: areaNode });
        // currentAreaNode = areaNode;

        //设置当前使用的定位用节点
        useMapStore
          .getState()
          .districtExplorer.setAreaNodesForLocating([areaNode]);

        refreshAreaNode(areaNode, zoomeToNode, adcode === 100000);
      });
    },
    [data.node, map, renderMarker],
  );

  //绘制某个区域的边界
  const renderAreaPolygons = React.useCallback(
    (
      areaNode: any,
      zoomeToNode: boolean,
      topLevel: boolean,
      clear: boolean = true,
    ) => {
      const { map, districtExplorer, push } = useMapStore.getState();
      //更新地图视野
      if (zoomeToNode) {
        map?.setBounds(areaNode.getBounds(), false, [140, 0, 20, 20]);
      }

      if (clear) {
        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons();
      }

      //绘制子区域
      districtExplorer.renderSubFeatures(
        areaNode,
        function (feature: any, i: number) {
          const props = feature.properties;

          if (!topLevel) {
            renderMarker(props, true);
          }

          const colorIndex = topLevel ? 0 : i;
          const strokeColor = getDistrictColor(
            feature.properties.adcode,
            colorIndex,
          );
          const fillColor = getDistrictColor(
            feature.properties.adcode,
            colorIndex,
          );

          return {
            cursor: "default",
            bubble: true,
            strokeColor: strokeColor, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.5, //填充透明度
          };
        },
      );

      const props = areaNode.getProps();

      if (props.adcode !== 100000) {
        push({ name: props.name, adcode: props.adcode });
      }

      if (!topLevel) {
        renderMarker(props);
      }

      //绘制父区域;
      districtExplorer.renderParentFeature(areaNode, {
        cursor: "default",
        bubble: true,
        // strokeColor: "white", //线颜色
        strokeColor:
          props.adcode !== 100000 && areaNode.getSubFeatures().length
            ? ""
            : "#3cb8e6", //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 2, //线宽
        // fillColor, //填充色
        fillColor: "",
        //   fillColor: "black",
        //   fillColor: areaNode.getParentFeature() ? "black" : null,
        // fillOpacity: 0.5, //填充透明度
      });
    },
    [data.node, map, renderMarker],
  );

  //切换区域后刷新显示内容
  const refreshAreaNode = React.useCallback(
    (areaNode: any, zoomeToNode: boolean, topLevel: boolean) => {
      useMapStore.getState().districtExplorer.setHoverFeature(null);

      renderAreaPolygons(areaNode, zoomeToNode, topLevel);
    },
    [data.node, map, renderAreaPolygons],
  );

  const renderArea = React.useCallback(
    (area: Area) => {
      const { map, districtExplorer } = useMapStore.getState();

      map?.remove(useMapStore.getState().markers);
      useMapStore.setState({ dashboardVisible: true });

      districtExplorer.clearFeaturePolygons();
      districtExplorer.setHoverFeature(null);

      districtExplorer.loadMultiAreaNodes(
        area.provinces?.edges?.map((e) => e?.node).map((p) => p?.adcode),
        (error: any, areaNodes: any) => {
          for (const [i, areaNode] of areaNodes.entries()) {
            const props = areaNode.getProps();

            const fillColor = getDistrictColor(props.adcode, props.childrenNum);
            const strokeColor = getDistrictColor(
              props.adcode,
              props.childrenNum,
            );
            renderMarker(props, true);

            districtExplorer.renderParentFeature(areaNode, {
              cursor: "default",
              bubble: true,
              strokeColor,
              // strokeColor: areaNode.getSubFeatures().length
              //   ? ""
              //   : "#3cb8e6", //线颜色
              // strokeColor: areaNode.getSubFeatures().length ? "black" : "", //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              // fillColor: "", //填充色
              fillColor,
              //   fillColor: "black",
              //   fillColor: areaNode.getParentFeature() ? "black" : null,
              fillOpacity: 0.5, //填充透明度
            });
          }
        },
      );

      const zoom = getDistrictZoomLevel(area.code);
      map?.setZoomAndCenter(
        zoom,
        area.center?.coordinates as [number, number],
        false,
        600,
      );
    },
    [data.node, map, map, renderMarker],
  );

  return (
    <>
      {/* <div className="absolute flex h-[96px] w-full items-center justify-center bg-dashboard-head bg-cover bg-center text-white">
        <div className="text-3xl font-bold select-none text-ellipsis whitespace-nowrap">
          远东幕墙市场拓展地图
        </div>
      </div> */}

      <div
        className={cn(
          "fixed bottom-[5vh] left-1/2 -translate-x-1/2 transition",
          !tenderViewTender && "translate-y-[10vh]",
        )}
      >
        <Breadcrumb className="mt-px">
          <BreadcrumbList className="rounded bg-gradient-to-r from-sky-900 to-sky-600 px-3 py-2">
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-pointer select-none"
                onClick={() => {
                  // switch2AreaNode(district.adcode[0]);
                  // setSelectedArea(null);
                  // resetNaivgation();
                  map?.remove(satelliteLayer!);
                  // map?.remove(polygonsRef.current);
                  switch2AreaNode(100000);
                  useMapStore.setState((state) => {
                    for (const cir of state.mapCircles) {
                      cir.remove();
                    }
                    return {
                      tenderViewVisible: null,
                      selectedTender: null,
                      tenderListVisible: false,
                      tenderViewTender: null,
                      tenderListHovering: 0,
                      tenderList: [],
                      selectedArea: null,
                      navigations: [],
                      mapCircles: [],
                    };
                  });
                  // setVisible(!visible);
                }}
              >
                全国
              </BreadcrumbLink>
            </BreadcrumbItem>
            {tenderViewTender && (
              <>
                <BreadcrumbSeparator></BreadcrumbSeparator>
                <BreadcrumbItem className="line-clamp-1 max-w-48">
                  <BreadcrumbLink className="cursor-pointer select-none">
                    {tenderViewTender?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div
        className={cn(
          "fixed bottom-[5vh] left-1/2 -translate-x-1/2 transition",
          navigations.length < 1 && "translate-y-[10vh]",
        )}
      >
        <Breadcrumb className="mt-px">
          <BreadcrumbList className="rounded bg-gradient-to-r from-sky-900 to-sky-600 px-3 py-2">
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-pointer select-none"
                onClick={() => {
                  // switch2AreaNode(district.adcode[0]);
                  // setSelectedArea(null);
                  // resetNaivgation();
                  map?.remove(satelliteLayer!);
                  // map?.remove(polygonsRef.current);
                  switch2AreaNode(100000);
                  useMapStore.setState((state) => {
                    for (const cir of state.mapCircles) {
                      cir.remove();
                    }
                    return {
                      selectedTender: null,
                      tenderListVisible: false,
                      tenderListHovering: 0,
                      tenderList: [],
                      selectedArea: null,
                      navigations: [],
                      mapCircles: [],
                    };
                  });
                  // setVisible(!visible);
                }}
              >
                全国
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                className={cn(
                  "select-none",
                  navigations.length > 1 && "cursor-pointer",
                )}
                onClick={() => {
                  if (navigations.length < 2) {
                    return;
                  }
                  // switch2AreaNode(district.adcode[0]);
                  // setVisible(true);
                  // resetNaivgation();
                  pop(0);
                  map?.remove(satelliteLayer!);
                  // map?.remove(polygonsRef.current);
                  // setSelectedDistrict(selectedDistrict);
                  renderArea(selectedArea!);
                  useMapStore.setState({
                    selectedTender: null,
                    tenderListVisible: false,
                    tenderListHovering: 0,
                    tenderList: [],
                    currentAreaNode: null,
                  });
                }}
              >
                {selectedArea?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {navigations
              .filter((n) => !!n.adcode)
              ?.map((navigation, i) => {
                // const node = countryTree.children.find(
                //   (node) =>
                //     node.children?.find((n) => n.adcode === adcode || n)?.adcode,
                // );
                // console.log("found", node);
                // if (!node) {
                //   return null;
                // }
                return (
                  <React.Fragment key={[navigation.adcode, i].join("-")}>
                    <BreadcrumbSeparator></BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        // className="max-w-[6rem] cursor-pointer overflow-hidden text-ellipsis text-nowrap"
                        className={cn(
                          "select-none",
                          navigations.length != i + 2 && "cursor-pointer",
                        )}
                        onClick={() => {
                          if (navigations.length == i + 2) {
                            return;
                          }
                          // map?.remove(polygonsRef.current);
                          map?.remove(satelliteLayer!);
                          pop(i);
                          switch2AreaNode(navigation.adcode || 100000);
                          useMapStore.setState({
                            selectedTender: null,
                            tenderListVisible: false,
                            tenderList: [],
                            tenderListHovering: 0,
                          });
                        }}
                      >
                        {navigation.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <MapTenderList />
      <MapTenderDetail />

      {/* <div className="mt-16 grid grid-cols-3 gap-2 px-2"> */}
      {/* <div className="grid place-content-between gap-2 px-4 pb-4 md:grid-cols-2 lg:grid-cols-3 xl:mt-0 xl:pt-[12vh] 2xl:pt-[8vh]"> */}
      <div
        className={cn(
          "absolute left-0 top-[4.5rem] w-[clamp(380px,20vw,380px)] space-y-2 self-end transition",
          !dashboardVisible && "-translate-x-[110%]",
        )}
      >
        <AmountBoard />

        <NewTenderBoard />
      </div>

      <div
        className={cn(
          "absolute right-0 top-[4.5rem] w-[clamp(380px,20vw,380px)] space-y-2 self-end transition",
          !dashboardVisible && "translate-x-[110%]",
        )}
      >
        <TenderTypeBoard />

        <RankingListBoard competitors={data} />

        <DashboardTenderList />
      </div>
      {/* </div> */}

      <AnimatePresence>
        {selectedTenderStatus && <TenderStatusList gaOnly={gaOnly} />}
      </AnimatePresence>
      <AnimatePresence>
        {moreNewTenderBoardVisible && <NewTenderBoardMore />}
      </AnimatePresence>
      <AnimatePresence>
        {moreTenderTypeBoardVisible && <TenderTypeBoardMore />}
      </AnimatePresence>
      <AnimatePresence>
        {moreRankingListBoardVisible && <RankingListBoardMore />}
      </AnimatePresence>
      <AnimatePresence>
        {moreDashboardTenderListBoardVisible && <DashboardTenderListMore />}
      </AnimatePresence>
    </>
  );
}

function LeftBoard() {
  const dashboardVisible = useMapStore((state) => state.dashboardVisible);
  const windowSize = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { width, height } = window.screen;
    if (ref.current) {
      const scale =
        width >= 1920 ? document.body.clientWidth / width : width / 1920;

      Object.assign(ref.current.style, {
        // height: `${height > 1080 ? height : 1080}px`,
        // width: "100vw",
        // height: "100vh",
        top: "0",
        left: "0",
        // transform: `scale(${document.body.clientWidth / width})`,
        height: ref.current.clientHeight / document.body.clientHeight,
      });
    }
  }, [windowSize, ref]);
  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 top-0 w-[clamp(380px,20vw,380px)] space-y-2 transition",
        !dashboardVisible && "-translate-x-[110%]",
      )}
    >
      <AmountBoard />

      <NewTenderBoard />
    </div>
  );
}
