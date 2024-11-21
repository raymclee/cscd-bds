import { createLazyFileRoute } from "@tanstack/react-router";
import { MapIndexPageQuery } from "__generated__/MapIndexPageQuery.graphql";
import { ImageOff, Undo2, Wallet } from "lucide-react";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { useShallow } from "zustand/shallow";
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
import { Progress } from "~/components/ui/progress";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { colors, getDistrictColor } from "~/lib/color";
import { findTenderWithLevel, fixAmount, ownerType } from "~/lib/helper";
import { cn } from "~/lib/utils";
import { StoreArea, useMapStore } from "~/store/map";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const Route = createLazyFileRoute("/__auth/__map/")({
  component: RouteComponent,
});

const query = graphql`
  query MapIndexPageQuery {
    areas {
      edges {
        node {
          id
          name
          code
          createdAt
          center {
            coordinates
          }
          provinces {
            id
            name
            adcode
            center @required(action: THROW) {
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
            }
            city {
              adcode
            }
            district {
              adcode
            }
            geoCoordinate {
              coordinates
            }
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

function RouteComponent() {
  const [
    map,
    initMap,
    districtExplorer,
    setCurrentAreaNode,
    dashboardVisible,
    setDashboardVisible,
    selectedArea,
    setSelectedArea,
    navigations,
    push,
    pop,
  ] = useMapStore(
    useShallow((state) => [
      state.map,
      state.initMap,
      state.districtExplorer,
      state.setCurrentAreaNode,
      state.dashboardVisible,
      state.setDashboardVisible,
      // state.districts,
      state.selectedArea,
      state.setSelectedArea,
      state.navigations,
      state.push,
      state.pop,
    ]),
  );
  const satelliteRef = React.useRef<AMap.TileLayer>();
  // const districtExplorerRef = React.useRef<any>();
  // const [visible, setVisible] = React.useState(false);
  const makersRef = React.useRef<AMap.Marker[]>([]);
  // const polygonsRef = React.useRef<AMap.Polygon[]>([]);

  const data = usePreloadedQuery<MapIndexPageQuery>(
    query,
    Route.useLoaderData(),
  );

  // const districts = data.areas.edges?.flatMap((e) => e?.node?.provinces) || [];
  const areas = data.areas.edges?.map((e) => e?.node);
  // const data = useLazyLoadQuery<MapPageQuery>(query, {});

  React.useEffect(() => {
    initMap("map", {
      zoom: 4,
      // mapStyle: "amap://styles/grey",
      mapStyle: "amap://styles/darkblue",
      // viewMode: "3D",
      // pitch: 30,
    });
    satelliteRef.current = new AMap.TileLayer.Satellite();
  }, []);

  React.useEffect(() => {
    const areas = data.areas.edges?.map((e) => e?.node);
    if (!areas?.length) {
      return;
    }

    map?.on("complete", () => {
      //外部区域被点击
      // districtExplorer.on("outsideClick", function (e: any) {
      // districtExplorer.locatePosition(
      //   e.originalEvent.lnglat,
      //   (error: any, routeFeatures: any) => {
      //     if (routeFeatures && routeFeatures.length > 1) {
      //       //切换到省级区域
      //       const props = routeFeatures[1].properties;
      //       const area = areas?.find((a) =>
      //         a?.provinces?.map((p) => p.adcode).includes(props.adcode),
      //       ) as StoreArea;
      //       if (area) {
      //         setSelectedArea(area);
      //       }
      //       switch2AreaNode(props.adcode);
      //       // switchNavigation({
      //       //   name: routeFeatures[1].properties.name,
      //       //   adcode: routeFeatures[1].properties.adcode,
      //       // });
      //       pop(1);
      //     } else {
      //       //切换到全国
      //       switch2AreaNode(100000);
      //       resetNaivgation();
      //       setSelectedArea(null);
      //       useMapStore.setState((state) => {
      //         for (const cir of state.mapCircles) {
      //           cir.remove();
      //         }
      //         return {
      //           tenderListVisible: false,
      //           tenderList: [],
      //           mapCircles: [],
      //         };
      //       });
      //     }
      //     // map?.remove(polygonsRef.current);
      //   },
      //   {
      //     levelLimit: 2,
      //   },
      // );
      // map?.removeLayer(satelliteRef.current!);
      // });

      // districtExplorer.on("featureMouseover", (e: any, feature: any) => {
      // makersRef.current.forEach((marker) => {
      //   if (
      //     marker.getExtData()?.hidable &&
      //     !marker.getExtData()?.home &&
      //     marker.getExtData()?.adcode !== feature.properties.adcode
      //   ) {
      //     // marker.hide();
      //     marker.getContentDom().style.opacity = "0";
      //   }
      // });
      // });

      // districtExplorer.on("featureMouseout", (e: any, feature: any) => {
      // makersRef.current.forEach((marker) => {
      //   // marker.show();
      //   marker.getContentDom().style.opacity = "1";
      // });
      // });

      // districtExplorer.on("featureClick", (e: any, feature: any) => {
      // const props = feature.properties;
      // const area = areas?.find((d) =>
      //   d?.provinces?.map((p) => p.adcode).includes(props.adcode),
      // ) as StoreArea;
      // // if (!area) {
      // //   console.log("not area");
      // //   return;
      // // }
      // if (area) {
      //   setSelectedArea(area);
      // }
      // if (e.target.getZoom() < 5) {
      //   if (!area) {
      //     return;
      //   }
      //   // setSelectedDistrict(district);
      //   push({ name: area.name });
      //   renderArea(area);
      //   return;
      // }
      // // const district = districts.find((d) => d.adcode.includes(props.adcode));
      // // setSelectedDistrict(district ?? null);
      // // 如果存在子节点
      // // if (props.childrenNum > 0) {
      // // 切换聚焦区域
      // // }
      // onFeatureOrMarkerClick(props);
      // });

      //切换区域

      switch2AreaNode(100000);
    });

    return () => {
      map?.destroy();
      useMapStore.setState({
        selectedArea: null,
        currentAreaNode: null,
        navigations: [],
        selectedTender: null,
        tenderListVisible: false,
      });
    };
  }, [data, map, satelliteRef]);

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

    map?.removeLayer(satelliteRef.current!);
    setDashboardVisible(true);
    map?.remove(makersRef.current);

    if (adcode === 100000) {
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
          map?.remove(makersRef.current);

          districtExplorer.clearFeaturePolygons();

          districtExplorer.loadMultiAreaNodes(
            area?.provinces?.map((p) => p.adcode),
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
        makersRef.current.push(marker);
      }
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

  const onFeatureOrMarkerClick = (props: any) => {
    const selectedArea = useMapStore.getState().selectedArea;

    switch2AreaNode(props.adcode, props.childrenNum > 0);
    if (props.childrenNum == 0) {
      const tenders =
        findTenderWithLevel(
          props.adcode,
          props.level,
          selectedArea?.tenders!,
        ) || [];
      const mapCircles: AMap.CircleMarker[] | any[] = [];
      for (const [i, tender] of tenders.entries()) {
        if (tender.geoCoordinate?.coordinates) {
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
            strokeColor: colors[i],
            strokeWeight: 2,
            strokeOpacity: 1,
            fillColor: colors[i],
            fillOpacity: 0.5,
            zIndex: 15,
            bubble: true,
            cursor: "pointer",
          });
          mapCircles.push(circleMarker);
          mapCircles.push(label);
          // map?.add(circleMarker);
        }
      }
      // map?.setZoom(18, true, 200);
      // const polygon = new AMap.Polygon();
      // polygon.setPath([
      //   [114.233116, 22.279279],
      //   [114.233116, 22.279338],
      //   [114.234902, 22.279259],
      //   [114.234987, 22.279082],
      //   [114.234945, 22.278885],
      //   [114.23486, 22.27861],
      //   [114.234796, 22.278374],
      //   [114.234732, 22.278078],
      //   [114.234477, 22.277527],
      //   [114.234137, 22.276996],
      //   [114.234094, 22.276937],
      //   [114.233094, 22.276956],
      // ]);
      // polygonsRef.current.push(polygon);
      // const poly2 = new AMap.Polygon();
      // poly2.setPath([
      //   [114.230747, 22.280171],
      //   [114.230898, 22.28005],
      //   [114.231043, 22.279986],
      //   [114.232733, 22.279985],
      //   [114.23281, 22.27997],
      //   [114.232862, 22.279943],
      //   [114.2329, 22.27992],
      //   [114.232932, 22.279869],
      //   [114.232977, 22.279393],
      //   [114.232929, 22.279254],
      //   [114.232921, 22.276892],
      //   [114.232573, 22.276895],
      //   [114.232337, 22.276902],
      //   [114.232225, 22.276926],
      //   [114.232142, 22.276961],
      //   [114.231989, 22.277065],
      //   [114.231262, 22.277748],
      //   [114.23094, 22.27808],
      //   [114.2303, 22.278423],
      //   [114.230003, 22.278827],
      //   [114.23009, 22.279543],
      // ]);
      // poly2.setOptions({ fillColor: "red", strokeColor: "red" });
      // polygonsRef.current.push(poly2);

      // const poly3 = new AMap.Polygon();
      // poly3.setPath([
      //   [114.229415, 22.281422],
      //   [114.230694, 22.280218],
      //   [114.229326, 22.27889],
      //   [114.22885, 22.279186],
      //   [114.228657, 22.279255],
      //   [114.228463, 22.279372],
      //   [114.227928, 22.280012],
      // ]);
      // poly3.setOptions({ fillColor: "yellow", strokeColor: "yellow" });
      // polygonsRef.current.push(poly3);

      // map?.add(polygon);
      // map?.add(poly2);
      // map?.add(poly3);

      const center =
        tenders?.length > 0
          ? tenders[0].geoCoordinate?.coordinates
          : props.center;
      map?.setZoomAndCenter(15, center, false, 600);
      map?.addLayer(satelliteRef.current!);
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
        d?.provinces?.map((p) => p.adcode).includes(props.adcode),
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
    makersRef.current.push(marker);
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
    map?.remove(makersRef.current);
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
    <div className="relative min-h-screen overflow-hidden">
      <div id="map" className="absolute inset-0"></div>

      <div className="absolute flex h-[96px] w-full items-center justify-center bg-dashboard-head bg-cover bg-center text-white">
        <div className="select-none text-ellipsis whitespace-nowrap text-3xl font-bold">
          远东幕墙市场拓展地图
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2 transition",
          navigations.length < 1 && "translate-y-[200%]",
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
                  map?.remove(satelliteRef.current!);
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
                  map?.remove(satelliteRef.current!);
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
                        map?.remove(satelliteRef.current!);
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
                          map?.remove(satelliteRef.current!);
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
            "hidden h-full w-[380px] space-y-2 transition xl:block",
            !dashboardVisible && "-translate-x-[110%]",
          )}
        >
          <AmountBoard />

          <NewTenderBoard data={data} />
        </div>

        <div className="flex-1 space-y-2"></div>

        <div
          className={cn(
            "hidden w-[380px] space-y-2 transition xl:block",
            !dashboardVisible && "translate-x-[110%]",
          )}
        >
          <TenderTypeChart data={data} />

          <RankingListChart />

          <DashboardTenderList data={data} />
        </div>
      </div>
    </div>
  );
}

function getDistrictZoomLevel(id: string) {
  let zoom = 5;
  if (id === "GA") {
    zoom = 10;
  } else if (id === "HD" || id === "HN") {
    zoom = 6;
  }
  return zoom;
}

const statusItems = ["跟进中", "停止跟进", "中标", "失标", "估价", "已交标"];

function AmountBoard() {
  const selectedArea = useMapStore((state) => state.selectedArea);
  const currentAreaNode = useMapStore((state) => state.currentAreaNode);

  const nodeProps = currentAreaNode?.getProps();

  const adcodes = currentAreaNode
    ?.getSubFeatures()
    ?.map((f: any) => f.properties.adcode);
  const data = usePreloadedQuery<MapIndexPageQuery>(
    query,
    Route.useLoaderData(),
  );
  const allTenders = data.areas.edges?.flatMap((e) => e?.node?.tenders) || [];

  const tenders =
    nodeProps?.level === "province" || nodeProps?.level === "city"
      ? allTenders.filter((t) => {
          switch (nodeProps?.level) {
            case "province":
            case "city":
              return (
                adcodes?.includes(t?.city?.adcode) ||
                adcodes?.includes(t?.district.adcode)
              );
          }
        })
      : selectedArea
        ? selectedArea?.tenders
        : allTenders;

  const totalAmount = fixAmount(
    tenders?.reduce(
      (acc, inc) => (inc?.estimatedAmount ? acc + inc?.estimatedAmount : acc),
      0,
    ),
  );

  const tenderCount = tenders?.length || 0;

  const processingAmount = fixAmount(
    tenders
      ?.filter((t) => t?.status === 1)
      .reduce(
        (acc, inc) => (inc?.estimatedAmount ? acc + inc?.estimatedAmount : acc),
        0,
      ),
  );

  return (
    <Card
      className={cn(
        "h-[clamp(33.5rem,59dvh,33.5rem)]overflow-hidden rounded border border-brand bg-transparent text-white shadow-dashboard-card drop-shadow-2xl backdrop-blur",
      )}
    >
      <CardHeader className="bg-gradient-to-tl from-sky-500 via-sky-900 to-sky-700 font-bold text-white">
        商机汇总总金额
      </CardHeader>
      <CardContent className="h-full">
        <div className="mt-5 rounded bg-gradient-to-b from-brand/40 to-transparent p-px">
          <div className="flex items-center justify-between rounded px-6 py-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">¥</span>
              <span className="text-4xl font-black text-white">
                {totalAmount}
              </span>
              <span className="hidden font-medium text-brand large-screen:block">
                亿元
              </span>
            </div>

            <div className="rounded-full bg-brand/30 p-2">
              <Wallet className="h-10 w-10 text-brand" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-right text-xs text-brand/70">单位: 项目数量</div>
          <div className="mt-2 space-y-4 text-sm text-brand">
            {statusItems.map((status, i) => {
              const tends = tenders?.filter((t) => t?.status === i + 1);
              const percentage =
                tends?.length && tenders?.length
                  ? Math.floor((tends?.length / tenders?.length) * 100)
                  : 0;
              const count = tends?.length || 0;
              return (
                <div
                  key={status}
                  className="mt-2 flex items-center justify-between gap-x-4"
                >
                  <div className="w-24">{status}</div>
                  <div className="w-8 text-white">{count}</div>
                  <Progress
                    value={percentage}
                    className="h-2 w-[80%] text-brand"
                  />
                  <div className="w-12 text-right">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 h-[6rem]">
          <div className="flex h-full items-center justify-between gap-6">
            <div className="h-full flex-1 overflow-hidden rounded bg-gradient-to-b from-brand/40 to-transparent">
              <div className="flex h-full flex-col rounded">
                <div className="flex flex-1 items-center justify-center gap-1">
                  <span className="text-3xl font-bold">{processingAmount}</span>
                  <span className="pt-2 font-medium text-brand">亿元</span>
                </div>
                <div className="bg-gray-500/50 py-1 text-center text-xs">
                  实施中的金额(亿元)
                </div>
              </div>
            </div>

            <div className="h-full flex-1 overflow-hidden rounded bg-gradient-to-b from-brand/40 to-transparent">
              <div className="flex h-full flex-col rounded">
                <div className="flex flex-1 items-center justify-center gap-1">
                  <span className="text-3xl font-bold">{tenderCount}</span>
                  <span className="pt-2 font-medium text-brand">个项目</span>
                </div>
                <div className="bg-gray-500/50 py-1 text-center text-xs">
                  总体情况
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TenderList() {
  const tenderList = useMapStore((state) => state.tenderList);
  const tenderListVisible = useMapStore((state) => state.tenderListVisible);
  const map = useMapStore((state) => state.map);
  const selectedTender = useMapStore((state) => state.selectedTender);
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
              <ScrollArea className="h-[460px]">
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
                          // @ts-expect-error
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
                          暂没图片
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
