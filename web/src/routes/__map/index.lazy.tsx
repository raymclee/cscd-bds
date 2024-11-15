import { createLazyFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useShallow } from "zustand/shallow";
import { DistrictSelect } from "~/components/district-select";
import { getDistrictColor } from "~/lib/color";
import { useMapStore } from "~/store/map";
import { cn } from "~/lib/utils";
import { Progress } from "~/components/ui/progress";
import { BidChart } from "~/components/bid-chart";

export const Route = createLazyFileRoute("/__map/")({
  component: RouteComponent,
});

type Item = {
  label: string;
  value: number;
  children: Item[];
};

function RouteComponent() {
  const [map, initMap, districts] = useMapStore(
    useShallow((state) => [state.map, state.initMap, state.districts])
  );
  const satelliteRef = React.useRef<AMap.TileLayer>();
  const [menu, setMenu] = React.useState<Item[]>([]);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    initMap("map", {
      zoom: 4,
      // mapStyle: "amap://styles/grey",
      mapStyle: "amap://styles/darkblue",
    });
    satelliteRef.current = new AMap.TileLayer.Satellite();
  }, []);

  React.useEffect(() => {
    map?.on("complete", () => {
      const markers: AMap.Marker[] = [];
      // @ts-expect-error
      const districtExplorer = new AMapUI.DistrictExplorer({
        eventSupport: true, //打开事件支持
        map: map,
        preload: [100000],
      });

      let currentAreaNode: any = null;
      const tipMarker = new AMap.Marker({
        content: '<div class=""></div>',
        offset: new AMap.Pixel(15, 5),
        bubble: true,
      });

      //根据Hover状态设置相关样式
      function toggleHoverFeature(
        feature: any,
        isHover: boolean,
        position: [number, number]
      ) {
        tipMarker.setMap(isHover ? map : null);

        if (!feature) {
          return;
        }
        const props = feature.properties;

        if (isHover) {
          //更新提示内容
          tipMarker.setContent(
            `<div class="bg-black/70 backdrop-blur text-white px-2 py-1 rounded-lg min-w-max">${props.name}</div>`
          );
          //更新位置
          tipMarker.setPosition(position || props.center);
        }

        // const trees = document
        //   .querySelector(`#area-tree h2[data-adcode=${props.adcode}]`)
        //   ?.classList.toggle("hover", isHover);

        // $("#area-tree")
        //   .find('h2[data-adcode="' + props.adcode + '"]')
        //   .toggleClass("hover", isHover);

        //更新相关多边形的样式
        let polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
        for (const poly of polys) {
          poly.setOptions({
            fillOpacity: isHover ? 0.5 : 0.2,
          });
        }
        // for (let i = 0, len = polys.length; i < len; i++) {
        //   polys[i].setOptions({
        //     fillOpacity: isHover ? 0.5 : 0.2,
        //   });
        // }
      }

      //监听feature的hover事件
      districtExplorer.on(
        "featureMouseout featureMouseover",
        (e: any, feature: any) => {
          // districtExplorer.locatePosition(
          //   e.originalEvent.lnglat,
          //   (error, routeFeatures) => {
          //     console.log(routeFeatures);
          //   }
          // );
          // const hovering = markers.find(
          //   (m) => m.getExtData().adcode === feature.properties.adcode
          // );
          // if (hovering) {
          //   hovering.hide();
          // }
          // toggleHoverFeature(
          //   feature,
          //   e.type === "featureMouseover",
          //   e.originalEvent ? e.originalEvent.lnglat : null
          // );
        }
      );

      //监听鼠标在feature上滑动
      districtExplorer.on("featureMousemove", function (e: any, feature: any) {
        //更新提示位置
        // tipMarker.setPosition(e.originalEvent.lnglat);
      });

      //feature被点击

      //外部区域被点击
      districtExplorer.on("outsideClick", function (e: any) {
        setVisible(true);
        districtExplorer.locatePosition(
          e.originalEvent.lnglat,
          (error: any, routeFeatures: any) => {
            if (routeFeatures && routeFeatures.length > 1) {
              //切换到省级区域
              switch2AreaNode(routeFeatures[1].properties.adcode);
            } else {
              //切换到全国
              switch2AreaNode(100000);
            }
          },
          {
            levelLimit: 2,
          }
        );
        map?.removeLayer(satelliteRef.current!);
      });

      const onFeatureOrMarkerClick = (props: any) => {
        switch2AreaNode(props.adcode, props.childrenNum > 0);

        if (props.childrenNum == 0) {
          map?.addLayer(satelliteRef.current!);
          // map?.setZoom(18, true, 200);
          map?.setZoomAndCenter(15, props.center, false, 600);
        }
      };

      districtExplorer.on("featureClick", (e: any, feature: any) => {
        setVisible(false);
        map?.remove(markers);

        if (e.target.getZoom() < 5) {
          const district = districts.find((d) =>
            d.adcode.includes(feature.properties.adcode)
          );
          if (!district) {
            return;
          }

          districtExplorer.clearFeaturePolygons();

          districtExplorer.loadMultiAreaNodes(
            district.adcode,
            (error: any, areaNodes: any) => {
              for (const [i, areaNode] of areaNodes.entries()) {
                const props = areaNode.getProps();

                const fillColor = getDistrictColor(
                  props.adcode,
                  props.childrenNum
                );
                const strokeColor = getDistrictColor(
                  props.adcode,
                  props.childrenNum
                );
                renderMarker(props, i);

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
                  fillOpacity: 0.35, //填充透明度
                });
              }
            }
          );

          const zoom = getDistrictZoomLevel(district.id);
          map?.setZoomAndCenter(zoom, district.center, false, 600);
          return;
        }
        let props = feature.properties;

        //如果存在子节点
        // if (props.childrenNum > 0) {
        //切换聚焦区域

        // }

        onFeatureOrMarkerClick(props);
      });

      //绘制某个区域的边界
      function renderAreaPolygons(
        areaNode: any,
        zoomeToNode: boolean,
        topLevel: boolean,
        clear: boolean = true
      ) {
        //更新地图视野
        if (zoomeToNode) {
          map?.setBounds(areaNode.getBounds(), false);
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
              renderMarker(props, i);
            }

            const colorIndex = topLevel ? 0 : i;
            const strokeColor = getDistrictColor(
              feature.properties.adcode,
              colorIndex
            );
            const fillColor = getDistrictColor(
              feature.properties.adcode,
              colorIndex
            );

            return {
              cursor: "default",
              bubble: true,
              strokeColor: strokeColor, //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: fillColor, //填充色
              fillOpacity: 0.35, //填充透明度
            };
          }
        );

        const props = areaNode.getProps();

        if (!topLevel) {
          // @ts-expect-error
          const marker = new AMapUI.SimpleMarker({
            // @ts-expect-error
            iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
            label: {
              content: `
              <div class="flex flex-col">
                <div class="text font-medium mb-1">${props.name}</div>
                <div class="flex items-baseline gap-2">
                  <div>
                    項目數量:<span class="ml-1 font-bold ">${Math.floor(Math.random() * 100)}</span>
                  </div>
                  <div>
                    金額:<span class="ml-1 font-bold ">${Math.floor(Math.random() * 1000)}億</span>
                  </div>
                </div>
                <div></div>
              </div>
              `,
              offset: new AMap.Pixel(0, 0),
            },
            map,
            position: props.center,
            extData: {
              adcode: props.adcode,
            },
          });

          marker.on("click", () => {
            setVisible(false);
            onFeatureOrMarkerClick(props);
          });
          marker.on("mouseover", () => {
            marker.setOptions({ zIndex: 13 });
          });
          marker.on("mouseout", () => {
            marker.setOptions({ zIndex: 12 });
          });
          markers.push(marker);
        }

        const fillColor = getDistrictColor(
          props,
          Math.floor(Math.random() * 10)
        );

        //绘制父区域;
        districtExplorer.renderParentFeature(areaNode, {
          cursor: "default",
          bubble: true,
          strokeColor: "#c4c4c4", //线颜色
          // strokeColor: areaNode.getSubFeatures().length ? "black" : "", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 2, //线宽
          // fillColor, //填充色
          fillColor: "",
          //   fillColor: "black",
          //   fillColor: areaNode.getParentFeature() ? "black" : null,
          fillOpacity: 0.35, //填充透明度
        });
      }

      //绘制marker
      function renderMarker(props: any, i: number) {
        // @ts-expect-error
        const marker = new AMapUI.SimpleMarker({
          // @ts-expect-error
          iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
          label: {
            content: `
        <div class="flex flex-col">
          <div class="text font-medium mb-1">${props.name}</div>
          <div class="flex items-baseline gap-2">
            <div>
              項目數量:<span class="ml-1 font-bold ">${Math.floor(Math.random() * 100)}</span>
            </div>
            <div>
              金額:<span class="ml-1 font-bold ">${Math.floor(Math.random() * 1000)}億</span>
            </div>
          </div>
          <div></div>
        </div>
        `,
            offset: new AMap.Pixel(0, 0),
          },
          map,
          position: props.center,
          extData: {
            adcode: props.adcode,
          },
        });

        marker.on("click", () => {
          onFeatureOrMarkerClick(props);
        });
        marker.on("mouseover", () => {
          marker.setOptions({ zIndex: 13 });
        });
        marker.on("mouseout", () => {
          marker.setOptions({ zIndex: 12 });
        });
        markers.push(marker);
      }

      //切换区域后刷新显示内容
      function refreshAreaNode(
        areaNode: any,
        zoomeToNode: boolean,
        topLevel: boolean
      ) {
        districtExplorer.setHoverFeature(null);

        renderAreaPolygons(areaNode, zoomeToNode, topLevel);
      }

      //切换区域
      function switch2AreaNode(
        adcode: number,
        zoomeToNode = true,
        callback?: () => void
      ) {
        // if (
        //   currentAreaNode &&
        //   "" + currentAreaNode.getAdcode() === "" + adcode
        // ) {
        //   return;
        // }

        map?.remove(markers);

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
                        項目數量:<span class="ml-1 font-bold text-xl">${Math.floor(Math.random() * 100)}</span>
                      </div>
                      <div>
                        金額:<span class="ml-1 font-bold text-xl">${Math.floor(Math.random() * 1000)}</span>億
                      </div>
                    </div>
                    <div></div>
                  </div>
              `,
                offset: new AMap.Pixel(-40, 40),
              },
              map,
              position: district.center,
            });
            marker.on("click", () => {
              map?.remove(markers);

              setVisible(false);

              districtExplorer.clearFeaturePolygons();

              districtExplorer.loadMultiAreaNodes(
                district.adcode,
                (error: any, areaNodes: any) => {
                  for (const [i, areaNode] of areaNodes.entries()) {
                    const props = areaNode.getProps();

                    const fillColor = getDistrictColor(
                      props.adcode,
                      props.childrenNum
                    );
                    const strokeColor = getDistrictColor(
                      props.adcode,
                      props.childrenNum
                    );
                    renderMarker(props, i);

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
                      fillOpacity: 0.35, //填充透明度
                    });
                  }
                }
              );

              const zoom = getDistrictZoomLevel(district.id);

              map?.setZoomAndCenter(zoom, district.center, false, 600);
            });
            markers.push(marker);
          }
        }

        loadAreaNode(adcode, function (error: any, areaNode: any) {
          if (error) {
            return;
          }

          currentAreaNode = areaNode;

          //设置当前使用的定位用节点
          districtExplorer.setAreaNodesForLocating([currentAreaNode]);

          refreshAreaNode(areaNode, zoomeToNode, adcode === 100000);
        });
      }

      //加载区域
      function loadAreaNode(
        adcode: number,
        callback: (error: any, areaNode?: any) => void
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

      switch2AreaNode(100000);

      // districtExplorer.loadAreaNode(
      //   100000,
      //   function (error: any, areaNode: any) {
      //     if (error) {
      //       console.error(error);
      //       return;
      //     }

      //     districtExplorer.loadMultiAreaNodes(
      //       areaNode
      //         .getSubFeatures()
      //         .map((feature: any) => feature.properties.adcode),
      //       function (error: any, areaNodes: any) {
      //         let master: Item[] = [];
      //         for (const areaNode of areaNodes) {
      //           const props = areaNode.getProps();

      //           const children: Item[] = [];
      //           const childs = areaNode.getSubFeatures();
      //           for (const child of childs) {
      //             const childProps = child.properties;
      //             children.push({
      //               label: childProps.name as string,
      //               value: childProps.adcode as number,
      //               children: [],
      //             });
      //           }

      //           master.push({
      //             label: props.name as string,
      //             value: props.adcode as number,
      //             children,
      //           });
      //         }

      //         setMenu(master);
      //       }
      //     );
      //   }
      // );
    });

    return () => {
      map?.destroy();
    };
  }, [map, satelliteRef]);

  return (
    <div className="overflow-hidden relative h-screen">
      <div id="map" className="absolute inset-0"></div>

      {/* <button
        className="absolute left-1/2 -translate-x-1/2 top-4"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        change
      </button> */}

      <div
        className={cn(
          "backdrop-blur-2xl absolute p-6 rounded-lg shadow-2xl transition-[left_top] text-white duration-300 hidden xl:block",
          visible && "left-4 top-4",
          !visible && "-left-96 -top-[calc(50%-1.5rem)]"
        )}
      >
        <h2 className="font-bold text-xl">商機匯總總金額</h2>
        <div className="mt-4">
          <span className="text-7xl font-semibold mr-3 font-mono">
            {Math.floor(Math.random() * 1000)}
          </span>
          億元
        </div>
      </div>

      <div
        className={cn(
          "backdrop-blur-2xl absolute w-72 rounded-lg shadow-2xl transition-[left_top] text-white p-4 duration-300 hidden xl:block",
          visible && "left-4 bottom-4",
          !visible && "-left-96 -bottom-[calc(50%-1.5rem)]"
        )}
      >
        <div className="space-y-2">
          {statusItems.map((status, i) => (
            <div key={[status, i].join("-")}>
              <div className="text-xs text-gray-400">{status}</div>
              <Progress
                value={Math.floor(Math.random() * 100) || 40}
                className="bg-transparent h-3"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "backdrop-blur-2xl absolute w-96 rounded-lg shadow-2xl transition-[left_top] text-white p-4 duration-300 hidden xl:block",
          visible && "right-4 top-4",
          !visible && "-right-96 -top-[calc(50%-1.5rem)]"
        )}
      >
        <h2 className="font-bold text-xl mb-4">項目商機類型金額占比</h2>
        <BidChart />
      </div>

      {/* <div
        className={cn(
          "bg-gray-900/50 backdrop-blur absolute w-96 h-[calc(50%-1.5rem)] rounded-lg shadow-2xl transition-[left_top] text-white p-4 duration-300 hidden xl:block",
          visible && "right-4 bottom-4",
          !visible && "-right-96 -bottom-[calc(50%-1.5rem)]"
        )}
      >
        <h1>商機匯總總金額</h1>
      </div> */}

      {/* <div
        id="area-tree"
        className="absolute top-6 right-6 bg-black/35 p-4 rounded-lg"
        ref={menuRef}
      ></div> */}
      {/* <DistrictSelect className="absolute top-6 left-6 bg-black/70 backdrop-blur text-white" /> */}
      {/* <TreeSelect
        treeProps={{ defaultExpandedKeys: [] }}
        className="absolute top-6 left-6 w-48 bg-black/70! backdrop-blur rounded-lg shadow-xl"
      >
        {menu.map((m) => (
          <TreeNode title={m.label} key={m.value}>
            {m.children.map((c) => (
              <TreeNode title={c.label} key={c.value} />
            ))}
          </TreeNode>
        ))}
      </TreeSelect> */}
    </div>
  );
}

const statusItems = ["跟進中", "中標", "失標", "估價", "已交標", "停止跟進"];

function getDistrictZoomLevel(id: string) {
  let zoom = 5;
  if (id === "5") {
    zoom = 10;
  } else if (id === "3" || id === "4") {
    zoom = 6;
  }
  return zoom;
}
