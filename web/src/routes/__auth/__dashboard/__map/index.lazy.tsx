import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { MapIndexPageDistrictQuery } from "__generated__/MapIndexPageDistrictQuery.graphql";
import { MapIndexPageQuery } from "__generated__/MapIndexPageQuery.graphql";
import { ImageOff, Undo2 } from "lucide-react";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import { fetchQuery, graphql } from "relay-runtime";
import { useShallow } from "zustand/shallow";
import { AmountBoard } from "~/components/amount-board";
import { DashboardTenderList } from "~/components/dashboard-tender-list";
import { NewTenderBoard } from "~/components/new-tender-card";
import { RankingListChart } from "~/components/ranking-list-chart";
import { TenderRatingChart } from "~/components/tender-rating-chart";
import { TenderTypeChart } from "~/components/tender-type-chart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getDistrictColor, tenderStatusBoundColor } from "~/lib/color";
import {
  findTenderWithLevel,
  fixAmount,
  getDistrictZoomLevel,
  ownerType,
} from "~/lib/helper";
import { cn } from "~/lib/utils";
import { StoreArea, useMapStore } from "~/store/map";
import { TenderStatusList } from "~/components/tender-status-list";
import { AnimatePresence } from "motion/react";

export const Route = createLazyFileRoute("/__auth/__dashboard/__map/")({
  component: RouteComponent,
});

const query = graphql`
  query MapIndexPageQuery {
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
            id
            name
            adcode
            center @required(action: NONE) {
              coordinates
            }
          }
          tenders {
            id
            name
            status
            createdAt
            estimatedAmount
            customer {
              ownerType
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
            area {
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
            visitRecords {
              visitType
              nextStep
              commPeople
              commContent
              date
              customer {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const districtsQuery = graphql`
  query MapIndexPageDistrictQuery($adcode: Int!) {
    districts(where: { adcode: $adcode }) {
      edges {
        node {
          plots {
            id
            name
            geoBounds
            colorHex
          }
        }
      }
    }
  }
`;

function RouteComponent() {
  const [
    map,
    districtExplorer,
    setCurrentAreaNode,
    dashboardVisible,
    setDashboardVisible,
    selectedArea,
    setSelectedArea,
    navigations,
    push,
    pop,
    selectedTenderStatus,
  ] = useMapStore(
    useShallow((state) => [
      state.map,
      state.districtExplorer,
      state.setCurrentAreaNode,
      state.dashboardVisible,
      state.setDashboardVisible,
      state.selectedArea,
      state.setSelectedArea,
      state.navigations,
      state.push,
      state.pop,
      state.selectedTenderStatus,
    ]),
  );
  const satelliteLayer = useMapStore((state) => state.satelliteLayer);
  const environment = Route.useRouteContext().RelayEnvironment;
  const tenderViewTender = useMapStore((state) => state.tenderViewTender);

  const data = usePreloadedQuery<MapIndexPageQuery>(
    query,
    Route.useLoaderData(),
  );

  const areas = data.areas.edges?.map((e) => e?.node);

  React.useEffect(() => {
    map?.on("complete", () => {
      //切换区域

      switch2AreaNode(100000);
    });
  }, [map]);

  function switch2AreaNode(
    adcode: number,
    zoomeToNode = true,
    callback?: () => void,
  ) {
    // if (
    //   currentAreaNode &&
    //   "" + currentAreaNode.getAdcode() === "" + adcode
    // ) {
    //   return;
    // }

    map?.removeLayer(satelliteLayer!);
    setDashboardVisible(true);
    map?.remove(useMapStore.getState().markers);

    if (adcode === 100000) {
      const markers: AMap.Marker[] = [];
      for (const area of data.areas?.edges?.map((e) => e?.node) || []) {
        const amount = fixAmount(
          area?.tenders?.reduce(
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
                    项目:<span class="ml-1 font-bold text-lg">${area?.tenders?.length}</span>
                  </div>
                  <div>
                    金额:<span class="mx-1 font-bold text-lg">${amount}</span>亿
                  </div>
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
          map?.remove(markers);

          districtExplorer.clearFeaturePolygons();

          districtExplorer.loadMultiAreaNodes(
            area?.provinces?.map((p) => p?.adcode),
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
            setSelectedArea(area as StoreArea);
            push({ name: area.name });
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

      setCurrentAreaNode(areaNode);
      // currentAreaNode = areaNode;

      //设置当前使用的定位用节点
      districtExplorer.setAreaNodesForLocating([areaNode]);

      refreshAreaNode(areaNode, zoomeToNode, adcode === 100000);
    });
  }

  //加载区域
  function loadAreaNode(
    adcode: number,
    callback: (error: any, areaNode?: any) => void,
  ) {
    districtExplorer.loadAreaNode(adcode, (error: any, areaNode: any) => {
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
  }

  const onFeatureOrMarkerClick = async (props: any) => {
    const selectedArea = useMapStore.getState().selectedArea;

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
        .flatMap((d) => d?.plots) || []) {
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
              <div class="font-medium text-center text-sm text-wrap">${plot?.name}</div>
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
          selectedArea?.tenders!,
        ) || [];

      for (const [i, tender] of tenders.entries()) {
        if (tender.geoBounds) {
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
              <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
                <div class="font-medium text-center text-sm text-wrap">${tender.name}</div>
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
        } else if (tender.geoCoordinate?.coordinates) {
          const offsetY = tender.name && tender.name?.length > 10 ? -20 : -10;
          // @ts-expect-error
          const label = new AMapUI.SimpleMarker({
            // @ts-expect-error
            iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
            label: {
              content: `
              <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
                <div class="font-medium text-center text-sm text-wrap">${tender.name}</div>
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
        tenders?.length > 0
          ? tenders[0].geoCoordinate?.coordinates
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
  };

  //绘制某个区域的边界
  function renderAreaPolygons(
    areaNode: any,
    zoomeToNode: boolean,
    topLevel: boolean,
    clear: boolean = true,
  ) {
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
  }

  //绘制marker
  function renderMarker(props: any, hidable = false) {
    if (props.adcode === useMapStore.getState().currentAreaNode?.adcode) {
      return;
    }

    const selectedArea = useMapStore.getState().selectedArea;
    const tendersWithinArea = selectedArea?.tenders;

    const adcodes = [
      ...(tendersWithinArea?.map((t) => t?.province.adcode) || []),
      ...(tendersWithinArea?.map((t) => t?.city?.adcode) || []),
      ...(tendersWithinArea?.map((t) => t?.district.adcode) || []),
    ];

    if (!adcodes.includes(props.adcode)) {
      return;
    }
    // tendersWithinArea?.map(t => t.)

    const tenderWithInLocation = tendersWithinArea
      ?.map((t) => {
        switch (props.level) {
          case "province":
            if (t.province.adcode === props.adcode) return t;
          case "city":
            if (t.city?.adcode === props.adcode) return t;
          case "district":
            if (t.district.adcode === props.adcode) return t;
        }
      })
      .filter(Boolean);

    const projectCount = tenderWithInLocation?.length || 0;
    const projectAmount = fixAmount(
      tenderWithInLocation?.reduce(
        (acc, inc) => (inc?.estimatedAmount ? acc + inc?.estimatedAmount : acc),
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
        <div class="flex flex-col gap-1 text-xs">
          <div class="font-medium">${props.name}(${projectCount})</div>
          ${projectAmount > 0 ? `<div>${projectAmount}亿</div>` : ""}
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
        d?.provinces?.map((p) => p?.adcode).includes(props.adcode),
      ) as StoreArea;
      if (area) {
        setSelectedArea(area);
      }
      push({ name: props.name, adcode: props.adcode });
      onFeatureOrMarkerClick(props);
    });
    marker.on("mouseover", () => {
      marker.setOptions({ zIndex: 13 });
    });
    marker.on("mouseout", () => {
      marker.setOptions({ zIndex: 12 });
    });
    useMapStore.setState((state) => ({
      ...state,
      markers: [...state.markers, marker],
    }));
  }

  //切换区域后刷新显示内容
  function refreshAreaNode(
    areaNode: any,
    zoomeToNode: boolean,
    topLevel: boolean,
  ) {
    districtExplorer.setHoverFeature(null);

    renderAreaPolygons(areaNode, zoomeToNode, topLevel);
  }

  function renderArea(area: StoreArea) {
    setDashboardVisible(true);
    map?.remove(useMapStore.getState().markers);
    districtExplorer.clearFeaturePolygons();
    districtExplorer.setHoverFeature(null);

    districtExplorer.loadMultiAreaNodes(
      area.provinces?.map((p) => p.adcode),
      (error: any, areaNodes: any) => {
        for (const [i, areaNode] of areaNodes.entries()) {
          const props = areaNode.getProps();

          const fillColor = getDistrictColor(props.adcode, props.childrenNum);
          const strokeColor = getDistrictColor(props.adcode, props.childrenNum);
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
  }

  return (
    <>
      {/* <div className="absolute flex h-[96px] w-full items-center justify-center bg-dashboard-head bg-cover bg-center text-white">
        <div className="select-none text-ellipsis whitespace-nowrap text-3xl font-bold">
          远东幕墙市场拓展地图
        </div>
      </div> */}

      <div
        className={cn(
          "absolute bottom-[5vh] left-1/2 -translate-x-1/2 transition",
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
          "absolute bottom-[5vh] left-1/2 -translate-x-1/2 transition",
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
              {/* <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  {selectedDistrict?.name || "全国"}
                  <ChevronUp className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={20}
                  className="rouned-lg overflow-hidden bg-black/20 text-white backdrop-blur"
                >
                  {districts.map((district) => (
                    <DropdownMenuItem
                      key={district.id}
                      className="hover:bg-black/60"
                      onSelect={() => {
                        // switch2AreaNode(district.adcode[0]);
                        // setVisible(true);
                        resetNaivgation();
                        map?.remove(satelliteLayer!);
                        setSelectedDistrict(district);
                        renderArea(district);
                      }}
                    >
                      {district.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}
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
            {/* <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">
                {countryTree.children[4].name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">
                {countryTree.children[4].children?.[0].name}
              </BreadcrumbLink>
            </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <TenderList />

      <div className="flex gap-2 px-4 pt-14">
        <div
          className={cn(
            "hidden h-full w-[clamp(380px,20vw,380px)] space-y-2 transition xl:block",
            !dashboardVisible && "-translate-x-[110%]",
          )}
        >
          <AmountBoard data={data} />

          <NewTenderBoard data={data} />
        </div>

        <div className="flex-1 space-y-2"></div>

        <div
          className={cn(
            "hidden w-[clamp(380px,20vw,380px)] space-y-2 transition xl:block",
            !dashboardVisible && "translate-x-[110%]",
          )}
        >
          <TenderTypeChart data={data} />

          <RankingListChart />

          <DashboardTenderList data={data} />
        </div>
      </div>

      <AnimatePresence>
        {selectedTenderStatus && <TenderStatusList data={data} />}
      </AnimatePresence>
    </>
  );
}

function TenderList() {
  const tenderList = useMapStore((state) => state.tenderList);
  const tenderListVisible = useMapStore((state) => state.tenderListVisible);
  const map = useMapStore((state) => state.map);
  const selectedTender = useMapStore((state) => state.selectedTender);
  const tenderViewTender = useMapStore((state) => state.tenderViewTender);
  const tenderListHovering = useMapStore((state) => state.tenderListHovering);
  const setTenderListHovering = useMapStore(
    (state) => state.setTenderListHovering,
  );
  const markers = useMapStore((state) => state.mapCircles);

  // React.useEffect(() => {
  //   setHovering(0);
  // }, [tenderList.length]);

  return (
    <>
      <div
        className={cn(
          "absolute left-4 top-14 h-full w-[440px] space-y-2 transition",
          !selectedTender && "-translate-x-[110%]",
        )}
      >
        <Card
          className={cn(
            "h-[90vh] overflow-hidden rounded border border-brand bg-black/60 pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur-xl",
          )}
        >
          <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            <div className="flex items-center justify-between">
              <div className="line-clamp-1">{selectedTender?.name}</div>
              {!tenderViewTender && (
                <button
                  onClick={() => {
                    useMapStore.setState({
                      selectedTender: null,
                      tenderListVisible: true,
                    });
                  }}
                >
                  <Undo2 />
                </button>
              )}
            </div>
          </CardHeader>

          <CardContent className="h-full py-4">
            {selectedTender?.images && selectedTender?.images?.length > 0 ? (
              <Carousel>
                <CarouselContent className="min-h-[220px]">
                  {selectedTender?.images?.map((image, i) => (
                    <CarouselItem key={i}>
                      <img
                        src={image}
                        className="aspect-[16/9] rounded"
                        alt={selectedTender?.name}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="flex aspect-[16/9] flex-col items-center justify-center text-white">
                <ImageOff className="mb-2 h-16 w-16" />
                暂没图片
              </div>
            )}

            <Tabs
              key={selectedTender?.id}
              defaultValue="detail"
              className="mt-4 w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 text-white">
                <TabsTrigger
                  value="detail"
                  className="data-[state=active]:bg-brand/70 data-[state=active]:text-white"
                >
                  基本信息
                </TabsTrigger>
                <TabsTrigger
                  value="rating"
                  className="data-[state=active]:bg-brand/70 data-[state=active]:text-white"
                >
                  项目评分
                </TabsTrigger>
                <TabsTrigger
                  value="follow-up"
                  className="data-[state=active]:bg-brand/70 data-[state=active]:text-white"
                >
                  跟进情况
                </TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[480px]">
                <TabsContent value="detail" className="mt-4 space-y-2">
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">项目名称</div>
                    <div className="col-span-2">{selectedTender?.name}</div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">项目地址</div>
                    <div className="col-span-2">
                      {selectedTender?.fullAddress}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">业主单位</div>
                    <div className="col-span-2">
                      {selectedTender?.customer?.name || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">总包单位</div>
                    <div className="col-span-2">
                      {selectedTender?.contractor || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">业主类型</div>
                    <div className="col-span-2">
                      {ownerType(selectedTender?.customer?.ownerType) || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">设计单位</div>
                    <div className="col-span-2">
                      {selectedTender?.designUnit || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">预计金额</div>
                    <div className="col-span-2">
                      {selectedTender?.estimatedAmount
                        ? `${fixAmount(selectedTender?.estimatedAmount)} 亿`
                        : "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">幕墙顾问</div>
                    <div className="col-span-2">
                      {selectedTender?.facadeConsultant || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">咨询公司</div>
                    <div className="col-span-2">
                      {selectedTender?.consultingFirm || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">招标代理</div>
                    <div className="col-span-2">
                      {selectedTender?.tenderingAgency || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">招标形式</div>
                    <div className="col-span-2">
                      {selectedTender?.tenderForm || "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">预计招标日期</div>
                    <div className="col-span-2">
                      {selectedTender?.tenderDate
                        ? new Date(
                            selectedTender.tenderDate,
                          ).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-gray-400">合同形式</div>
                    <div className="col-span-2">
                      {selectedTender?.contractForm || "-"}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="rating" className="mt-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">规模及价值</div>
                      <div className="col-span-2">
                        {selectedTender?.sizeAndValueRatingOverview || "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">资信及付款</div>
                      <div className="col-span-2">
                        {selectedTender?.creditAndPaymentRatingOverview || "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">中标原则及时限</div>
                      <div className="col-span-2">
                        {selectedTender?.timeLimitRatingOverview || "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">客情关系</div>
                      <div className="col-span-2">
                        {selectedTender?.customerRelationshipRatingOverview ||
                          "-"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-gray-400">竞争合作关系</div>
                      <div className="col-span-2">
                        {selectedTender?.competitivePartnershipRatingOverview ||
                          "-"}
                      </div>
                    </div>
                  </div>
                  <TenderRatingChart
                    sizeAndValueRating={selectedTender?.sizeAndValueRating}
                    creditAndPaymentRating={
                      selectedTender?.creditAndPaymentRating
                    }
                    timeLimitRating={selectedTender?.timeLimitRating}
                    customerRelationshipRating={
                      selectedTender?.customerRelationshipRating
                    }
                    competitivePartnershipRating={
                      selectedTender?.competitivePartnershipRating
                    }
                  />
                </TabsContent>
                <TabsContent value="follow-up" className="">
                  {selectedTender?.visitRecords &&
                  selectedTender?.visitRecords?.length < 1 ? (
                    <div className="mt-8 flex items-center justify-center">
                      没有拜访记录
                    </div>
                  ) : (
                    selectedTender?.visitRecords?.map((record) => (
                      <div className="mt-4 space-y-2">
                        <div className="grid grid-cols-3">
                          <div className="text-gray-400">沟通对象</div>
                          <div className="col-span-2">{record?.commPeople}</div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="text-gray-400">沟通形式</div>
                          <div className="col-span-2">
                            {record?.visitType == 1 ? "现场拜访" : "沟通内容"}
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="text-gray-400">沟通内容</div>
                          <div className="col-span-2">
                            {record?.commContent}
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="text-gray-400">下一步计划</div>
                          <div className="col-span-2">
                            {record?.nextStep || "-"}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div
        className={cn(
          "absolute left-4 top-14 h-full w-[440px] space-y-2 transition",
          !tenderListVisible && "-translate-x-[110%]",
        )}
      >
        <Card
          className={cn(
            "h-[90vh] overflow-hidden rounded border border-brand bg-black/60 pb-4 text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur-xl",
          )}
        >
          <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
            项目例表
          </CardHeader>

          <CardContent className="h-full px-0">
            <ScrollArea className="h-full pb-6">
              <div className="space-y-4 px-4 py-2">
                {tenderList.map((tender, i) => (
                  <div
                    key={tender?.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-x-4 rounded-md p-2 transition-shadow hover:bg-brand/50",
                      (tenderListHovering === i ||
                        tenderListHovering === tender.id) &&
                        "ring ring-white",
                    )}
                    onClick={() => {
                      useMapStore.setState({
                        tenderListVisible: false,
                        selectedTender: tender,
                      });
                    }}
                    onMouseEnter={(e) => {
                      if (tender.geoCoordinate?.coordinates) {
                        map?.setCenter(
                          tender.geoCoordinate.coordinates as AMap.LngLatLike,
                          false,
                          600,
                        );
                        for (const m of markers) {
                          if (m instanceof AMap.CircleMarker) {
                            continue;
                          }
                          const ext = m.getExtData();
                          if (ext?.tenderId === tender.id) {
                            (m as any).getContentDom().focus();
                          }
                        }
                        setTenderListHovering(tender?.id || 0);
                      }
                    }}
                  >
                    <div className="w-[40%]">
                      {tender?.images && tender.images.length > 0 ? (
                        <Carousel>
                          <CarouselContent>
                            {tender?.images?.map((image, i) => (
                              <CarouselItem key={["list", i].join("-")}>
                                <img
                                  src={image}
                                  className="aspect-[4/3] h-full w-full rounded"
                                  alt={tender?.name}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>
                      ) : (
                        <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-md bg-gray-300 text-gray-600">
                          <ImageOff className="mb-2" />
                          <span className="text-xs">暂没图片</span>
                        </div>
                      )}
                    </div>
                    <div className="w-[60%] space-y-2 py-1">
                      <h3 className="line-clamp-1 font-bold">{tender?.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-300">预计招标日期</div>
                        <div>
                          {tender?.tenderDate
                            ? new Date(tender?.tenderDate).toLocaleDateString()
                            : "-"}
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between text-sm">
                        <div className="text-gray-300">招标形式</div>
                        <div>{tender?.tenderForm || "-"}</div>
                      </div>
                      <div className="flex items-baseline justify-between text-sm">
                        <div className="text-gray-300">预计金额</div>
                        <div>
                          {tender?.estimatedAmount
                            ? `${fixAmount(tender?.estimatedAmount)} 亿`
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
