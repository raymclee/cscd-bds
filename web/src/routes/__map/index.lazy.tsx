import { createLazyFileRoute } from "@tanstack/react-router";
import { BadgeJapaneseYen, ChartPie, Layers, Wallet } from "lucide-react";
import * as React from "react";
import { useShallow } from "zustand/shallow";
import { BidChart } from "~/components/bid-chart";
import { BusinessChart } from "~/components/business-chart";
import { PercentageChart } from "~/components/percentage-chart";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getDistrictColor } from "~/lib/color";
import { cn } from "~/lib/utils";
import { District, useMapStore } from "~/store/map";
import { Bar } from "@ant-design/plots";
import { DashboardCard } from "~/components/dasboard-card";
import { NewTenderBoard } from "~/components/new-tender-card";
import { TenderTypeChart } from "~/components/tender-type-chart";
import { RankingListChart } from "~/components/ranking-list-chart";

export const Route = createLazyFileRoute("/__map/")({
  component: RouteComponent,
});

type Item = {
  label: string;
  value: number;
  children: Item[];
};

const data = {
  "1": [0.8, 1, 10],
  "2": [4, 5, 20],
  "3": [6, 7, 25],
  "4": [10, 6, 30],
  "5": [7, 3, 19],
};

function RouteComponent() {
  const [
    map,
    initMap,
    districtExplorer,
    setCurrentAreaNode,
    dashboardVisible,
    setDashboardVisible,
    districts,
    selectedDistrict,
    setSelectedDistrict,
    navigations,
    push,
    pop,
    resetNaivgation,
  ] = useMapStore(
    useShallow((state) => [
      state.map,
      state.initMap,
      state.districtExplorer,
      state.setCurrentAreaNode,
      state.dashboardVisible,
      state.setDashboardVisible,
      state.districts,
      state.selectedDistrict,
      state.setSelectedDistrict,
      state.navigations,
      state.push,
      state.pop,
      state.resetNavigation,
    ]),
  );
  const satelliteRef = React.useRef<AMap.TileLayer>();
  // const districtExplorerRef = React.useRef<any>();
  // const [visible, setVisible] = React.useState(false);
  const makersRef = React.useRef<AMap.Marker[]>([]);
  const polygonsRef = React.useRef<AMap.Polygon[]>([]);

  // const data = usePreloadedQuery<MapPageQuery>(query, Route.useLoaderData());
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
    map?.on("complete", () => {
      //外部区域被点击
      districtExplorer.on("outsideClick", function (e: any) {
        districtExplorer.locatePosition(
          e.originalEvent.lnglat,
          (error: any, routeFeatures: any) => {
            if (routeFeatures && routeFeatures.length > 1) {
              //切换到省级区域
              const props = routeFeatures[1].properties;
              const district = districts.find((d) =>
                d.adcode.includes(props.adcode),
              );
              if (district) {
                setSelectedDistrict(district);
              }
              switch2AreaNode(props.adcode);
              // switchNavigation({
              //   name: routeFeatures[1].properties.name,
              //   adcode: routeFeatures[1].properties.adcode,
              // });
              pop(1);
            } else {
              //切换到全国
              switch2AreaNode(100000);
              resetNaivgation();
              setSelectedDistrict(null);
            }
            map?.remove(polygonsRef.current);
          },
          {
            levelLimit: 2,
          },
        );
        map?.removeLayer(satelliteRef.current!);
      });

      districtExplorer.on("featureMouseover", (e: any, feature: any) => {
        makersRef.current.forEach((marker) => {
          if (
            marker.getExtData()?.hidable &&
            !marker.getExtData()?.home &&
            marker.getExtData()?.adcode !== feature.properties.adcode
          ) {
            // marker.hide();
            marker.getContentDom().style.opacity = "0";
          }
        });
      });

      districtExplorer.on("featureMouseout", (e: any, feature: any) => {
        makersRef.current.forEach((marker) => {
          // marker.show();
          marker.getContentDom().style.opacity = "1";
        });
      });

      districtExplorer.on("featureClick", (e: any, feature: any) => {
        const props = feature.properties;
        const district = districts.find((d) => d.adcode.includes(props.adcode));
        if (district) {
          setSelectedDistrict(district);
        }

        if (e.target.getZoom() < 5) {
          if (!district) {
            return;
          }

          // setSelectedDistrict(district);
          push({ name: district.name });
          renderArea(district);
          return;
        }

        // const district = districts.find((d) => d.adcode.includes(props.adcode));
        // setSelectedDistrict(district ?? null);
        //如果存在子节点
        // if (props.childrenNum > 0) {
        //切换聚焦区域

        // }

        onFeatureOrMarkerClick(props);
      });

      //切换区域

      switch2AreaNode(100000);
    });

    return () => {
      map?.destroy();
    };
  }, [map, satelliteRef]);

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
      for (const district of districts) {
        //@ts-expect-error
        const marker = new AMapUI.SimpleMarker({
          // @ts-expect-error
          iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
          label: {
            content: `
              <div class="flex flex-col">
                <div class="text-lg font-medium">${district.name}</div>
                <div class="flex items-baseline gap-3">
                  <div>
                    项目:<span class="ml-1 font-bold text-xl">${Math.floor(Math.random() * 100)}</span>
                  </div>
                  <div>
                    金额:<span class="mx-1 font-bold text-xl">${Math.floor(Math.random() * 1000)}</span>亿
                  </div>
                </div>
                <div></div>
              </div>
          `,
            // offset: new AMap.Pixel(-40, 40),
          },
          map,
          position: district.center,
          extData: {
            home: true,
          },
        });
        marker.on("click", () => {
          map?.remove(makersRef.current);

          districtExplorer.clearFeaturePolygons();

          districtExplorer.loadMultiAreaNodes(
            district.adcode,
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

          const zoom = getDistrictZoomLevel(district.id);
          setSelectedDistrict(district);
          push({ name: district.name });
          map?.setZoomAndCenter(zoom, district.center, false, 600);
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
    switch2AreaNode(props.adcode, props.childrenNum > 0);
    if (props.childrenNum == 0) {
      // map?.setZoom(18, true, 200);
      const polygon = new AMap.Polygon();
      polygon.setPath([
        [114.233116, 22.279279],
        [114.233116, 22.279338],
        [114.234902, 22.279259],
        [114.234987, 22.279082],
        [114.234945, 22.278885],
        [114.23486, 22.27861],
        [114.234796, 22.278374],
        [114.234732, 22.278078],
        [114.234477, 22.277527],
        [114.234137, 22.276996],
        [114.234094, 22.276937],
        [114.233094, 22.276956],
      ]);
      polygonsRef.current.push(polygon);
      const poly2 = new AMap.Polygon();
      poly2.setPath([
        [114.230747, 22.280171],
        [114.230898, 22.28005],
        [114.231043, 22.279986],
        [114.232733, 22.279985],
        [114.23281, 22.27997],
        [114.232862, 22.279943],
        [114.2329, 22.27992],
        [114.232932, 22.279869],
        [114.232977, 22.279393],
        [114.232929, 22.279254],
        [114.232921, 22.276892],
        [114.232573, 22.276895],
        [114.232337, 22.276902],
        [114.232225, 22.276926],
        [114.232142, 22.276961],
        [114.231989, 22.277065],
        [114.231262, 22.277748],
        [114.23094, 22.27808],
        [114.2303, 22.278423],
        [114.230003, 22.278827],
        [114.23009, 22.279543],
      ]);
      poly2.setOptions({ fillColor: "red", strokeColor: "red" });
      polygonsRef.current.push(poly2);

      const poly3 = new AMap.Polygon();
      poly3.setPath([
        [114.229415, 22.281422],
        [114.230694, 22.280218],
        [114.229326, 22.27889],
        [114.22885, 22.279186],
        [114.228657, 22.279255],
        [114.228463, 22.279372],
        [114.227928, 22.280012],
      ]);
      poly3.setOptions({ fillColor: "yellow", strokeColor: "yellow" });
      polygonsRef.current.push(poly3);

      map?.add(polygon);
      map?.add(poly2);
      map?.add(poly3);

      setDashboardVisible(false);
      map?.setZoomAndCenter(15, props.center, false, 600);
      map?.addLayer(satelliteRef.current!);
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

    // if (!topLevel) {
    //   renderMarker(props);
    // }

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

    const projectCount = Math.floor(Math.random() * 100);
    const projectAmount = Math.floor(Math.random() * 1000);

    if (projectCount < 0) {
      return;
    }
    // @ts-expect-error
    const marker = new AMapUI.SimpleMarker({
      // @ts-expect-error
      iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
      label: {
        content: `
        <div class="flex flex-col gap-1 text-xs">
          <div class="font-medium">${props.name}(${projectCount})</div>
          <div>${projectAmount}亿</div>
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
      const district = districts.find((d) => d.adcode.includes(props.adcode));
      if (district) {
        setSelectedDistrict(district);
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

  function renderArea(district: District) {
    setDashboardVisible(true);
    map?.remove(makersRef.current);
    districtExplorer.clearFeaturePolygons();

    districtExplorer.loadMultiAreaNodes(
      district.adcode,
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

    const zoom = getDistrictZoomLevel(district.id);
    map?.setZoomAndCenter(zoom, district.center, false, 600);
  }

  return (
    <div className="relative max-h-dvh min-h-dvh overflow-hidden bg-dashboard bg-no-repeat">
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
                  setSelectedDistrict(null);
                  resetNaivgation();
                  map?.remove(satelliteRef.current!);
                  map?.remove(polygonsRef.current);
                  switch2AreaNode(100000);
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
                  setCurrentAreaNode(null);
                  pop(0);
                  map?.remove(satelliteRef.current!);
                  map?.remove(polygonsRef.current);
                  // setSelectedDistrict(selectedDistrict);
                  renderArea(selectedDistrict!);
                }}
              >
                {selectedDistrict?.name}
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
                          map?.remove(polygonsRef.current);
                          map?.remove(satelliteRef.current!);
                          pop(i);
                          switch2AreaNode(navigation.adcode || 100000);
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

      <div className="flex gap-2 px-4 pt-14">
        <div
          className={cn(
            "hidden h-full w-[380px] space-y-2 transition xl:block",
            !dashboardVisible && "-translate-x-[110%]",
          )}
        >
          <AmountBoard />

          <NewTenderBoard />
        </div>

        <div className="flex-1 space-y-2"></div>

        <div
          className={cn(
            "hidden w-[380px] space-y-2 transition xl:block",
            !dashboardVisible && "translate-x-[110%]",
          )}
        >
          <TenderTypeChart />

          <RankingListChart />

          <DashboardCard title="项目例表">
            <ScrollArea className="mt-4 h-96">
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="bg-brand/10">
                  <TableRow className="items-center">
                    <TableHead className="w-[55px] text-[0.7rem] text-gray-300">
                      序号
                    </TableHead>
                    <TableHead className="text-[0.7rem] text-gray-300">
                      名称
                    </TableHead>
                    <TableHead className="text-[0.7rem] text-gray-300">
                      区域
                    </TableHead>
                    <TableHead className="w-[80px] text-center text-[0.7rem] text-gray-300">
                      <div>预计金额</div>
                      (亿元)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs text-white">
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell className="font-medium">珠海国际大厦</TableCell>
                    <TableCell>珠海</TableCell>
                    <TableCell className="text-center">3.12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell className="font-medium">珠海国际大厦</TableCell>
                    <TableCell>珠海</TableCell>
                    <TableCell className="text-center">3.12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell className="font-medium">珠海国际大厦</TableCell>
                    <TableCell>珠海</TableCell>
                    <TableCell className="text-center">3.12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell className="font-medium">珠海国际大厦</TableCell>
                    <TableCell>珠海</TableCell>
                    <TableCell className="text-center">3.12</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ScrollArea>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

const statusItems = ["跟进中", "中标", "失标", "估价", "已交标", "停止跟进"];

function getDistrictZoomLevel(id: string) {
  let zoom = 5;
  if (id === "5") {
    zoom = 10;
  } else if (id === "3" || id === "4") {
    zoom = 6;
  }
  return zoom;
}

function AmountBoard() {
  const selectedDistrict = useMapStore((state) => state.selectedDistrict);

  const total = Object.values(data).reduce(
    (acc, cur) => {
      if (selectedDistrict) {
        return data[selectedDistrict.id as keyof typeof data];
      }
      acc[0] += cur[0];
      acc[1] += cur[1];
      acc[2] += cur[2];
      return acc;
    },
    [0, 0, 0],
  );

  return (
    <DashboardCard title="商机汇总总金额" className="h-[clamp(34rem,58dvh)]">
      <div className="mt-5 rounded bg-gradient-to-b from-brand/40 to-transparent p-px">
        <div className="flex items-center justify-between rounded px-6 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">¥</span>
            <span className="text-4xl font-black text-white">{total[0]}</span>
            <span className="large-screen:block hidden font-medium text-brand">
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
            const percentage = Math.floor(Math.random() * 100);
            const count = Math.floor(Math.random() * 10);
            return (
              <div
                key={status}
                className="mt-2 flex items-center justify-between gap-x-4"
              >
                <div className="w-[5rem]">{status}</div>
                <div className="text-white">{count}</div>
                <Progress
                  value={percentage}
                  className="h-2 w-[70%] text-brand"
                />
                <div>{percentage}%</div>
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
                <span className="text-3xl font-bold">1.20</span>
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
                <span className="text-3xl font-bold">5</span>
                <span className="pt-2 font-medium text-brand">个项目</span>
              </div>
              <div className="bg-gray-500/50 py-1 text-center text-xs">
                总体情况
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );

  return (
    <DashboardCard title="新增商机数">
      <div className="mt-14 flex h-full justify-around">
        <div className="space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/40 p-2 backdrop-blur">
            <BadgeJapaneseYen className="h-full w-full text-brand" />
          </div>
          <div className="text-center text-gray-300">
            <span className="mr-2 text-3xl font-bold">{total[0]}</span>
            亿元
          </div>
          <div className="text-center text-xs text-gray-300">金额</div>
        </div>

        <div className="space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/40 p-2 backdrop-blur">
            <Layers className="h-full w-full text-brand" />
          </div>
          <div className="text-center text-gray-300">
            <span className="mr-2 text-3xl font-bold">{total[1]}</span>个
          </div>
          <div className="text-center text-xs text-gray-300">数量</div>
        </div>

        <div className="space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/40 p-2 backdrop-blur">
            <ChartPie className="h-full w-full text-brand" />
          </div>
          <div className="text-center text-gray-300">
            <span className="mr-2 text-3xl font-bold">{total[2]}</span>%
          </div>
          <div className="text-center text-xs text-gray-300">比例</div>
        </div>
      </div>
    </DashboardCard>
  );
}
