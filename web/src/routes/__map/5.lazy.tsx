import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { District, useMapStore } from "~/store/map";
import { useShallow } from "zustand/shallow";
import { getDistrictColor } from "~/lib/color";

export const Route = createLazyFileRoute("/__map/5")({
  component: RouteComponent,
});

const satellite = new AMap.TileLayer.Satellite();

function RouteComponent() {
  const [map, initMap, districts, openSatalite, closeSatalite] = useMapStore(
    useShallow((state) => [
      state.map,
      state.initMap,
      state.districts,
      state.openSatalite,
      state.closeSatalite,
    ])
  );
  const districtExplorerRef = React.useRef();
  const tipMakerRef = React.useRef<AMap.Marker[]>([]);
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    initMap("map", {
      zoom: 4,
    });
  }, []);

  let colors = [
    "#3366cc",
    "#dc3912",
    "#ff9900",
    "#109618",
    "#990099",
    "#0099c6",
    "#dd4477",
    "#66aa00",
    "#b82e2e",
    "#316395",
    "#994499",
    "#22aa99",
    "#aaaa11",
    "#6633cc",
    "#e67300",
    "#8b0707",
    "#651067",
    "#329262",
    "#5574a6",
    "#3b3eac",
  ];

  React.useEffect(() => {
    map?.on("complete", () => {
      const districtExplorer = new AMapUI.DistrictExplorer({
        eventSupport: true, //打开事件支持
        map: map,
      });

      districtExplorerRef.current = districtExplorer;

      let currentAreaNode = null;

      //鼠标hover提示内容
      let $tipMarkerContent = '<div class="tipMarker top"></div>';

      let tipMarker = new AMap.Marker({
        content: $tipMarkerContent,
        offset: new AMap.Pixel(0, 0),
        bubble: true,
      });

      //根据Hover状态设置相关样式
      function toggleHoverFeature(feature, isHover, position) {
        tipMarker.setMap(isHover ? map : null);

        if (!feature) {
          return;
        }

        let props = feature.properties;

        // if (isHover) {
        //   //更新提示内容
        //   $tipMarkerContent.html(props.adcode + ": " + props.name);
        //   //更新位置
        //   tipMarker.setPosition(position || props.center);
        // }

        // const trees = document
        //   .querySelector(`#area-tree h2[data-adcode=${props.adcode}]`)
        //   ?.classList.toggle("hover", isHover);

        // $("#area-tree")
        //   .find('h2[data-adcode="' + props.adcode + '"]')
        //   .toggleClass("hover", isHover);

        //更新相关多边形的样式
        let polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
        for (let i = 0, len = polys.length; i < len; i++) {
          polys[i].setOptions({
            fillOpacity: isHover ? 0.5 : 0.2,
          });
        }
      }

      //监听feature的hover事件
      districtExplorer.on(
        "featureMouseout featureMouseover",
        function (e, feature) {
          toggleHoverFeature(
            feature,
            e.type === "featureMouseover",
            e.originalEvent ? e.originalEvent.lnglat : null
          );
        }
      );

      //监听鼠标在feature上滑动
      districtExplorer.on("featureMousemove", function (e, feature) {
        //更新提示位置
        tipMarker.setPosition(e.originalEvent.lnglat);
      });

      //feature被点击

      //外部区域被点击
      districtExplorer.on("outsideClick", function (e) {
        districtExplorer.locatePosition(
          e.originalEvent.lnglat,
          function (error, routeFeatures) {
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
        map?.removeLayer(satellite);
      });

      districtExplorer.on("featureClick", function (e, feature) {
        let props = feature.properties;
        // openSatalite();
        console.log("featureClick", props);
        // satellite.setMap(map);
        console.log("length", props.acroutes.length);
        // satellite.setMap(map);
        // map.add(satellite);

        if (!props.childrenNum) {
          map?.setZoom(16);
          map?.addLayer(satellite);
        }
        //如果存在子节点
        // if (props.childrenNum > 0) {
        //切换聚焦区域
        switch2AreaNode(props.adcode);
        // }
      });

      //绘制区域面板的节点
      function renderAreaPanelNode(ele, props, color) {
        // const box = React.createElement('li', { className: "lv_" + props.level });
        const box = document.createElement("li");
        box.className = "lv_" + props.level;

        const h2 = document.createElement("h2");
        h2.className = "lv_" + props.level;
        h2.setAttribute("data-adcode", props.adcode);
        h2.setAttribute("data-level", props.level);
        h2.setAttribute("data-children-num", props.childrenNum || void 0);
        h2.setAttribute("data-center", props.center.join(","));
        h2.innerHTML = props.name;

        if (color) {
          h2.style.borderColor = color;
        }

        h2.append(box);

        //如果存在子节点
        // if (props.childrenNum > 0) {
        //   //显示隐藏
        //   $('<div class="showHideBtn"></div>').appendTo($box);

        //   //子区域列表
        //   $("<ul/>")
        //     .addClass("sublist lv_" + props.level)
        //     .appendTo($box);

        //   $('<div class="clear"></div>').appendTo($box);

        //   if (props.level !== "country") {
        //     $box.addClass("hide-sub");
        //   }
        // }

        box.append(ele);
      }

      //填充某个节点的子区域列表
      function renderAreaPanel(areaNode) {
        let props = areaNode.getProps();

        // const $areaTree = document.getElementById("area-tree");

        // let $subBox =document.querySelectorAll(`#area-tree h2[data-adcode=${props.adcode} ul.sublist]`)

        // if (!$subBox.length && props.childrenNum) {
        //   //父节点不存在，先创建
        //   renderAreaPanelNode(areaTree, props);
        //   $subBox = $("#area-tree").find("ul.sublist");
        // }
        // if ($subBox.attr("data-loaded") === "rendered") {
        //   return;
        // }

        // $subBox.attr("data-loaded", "rendered");

        let subFeatures = areaNode.getSubFeatures();

        //填充子区域
        // for (let i = 0, len = subFeatures.length; i < len; i++) {
        //   renderAreaPanelNode(
        //     $subBox,
        //     areaNode.getPropsOfFeature(subFeatures[i]),
        //     colors[i % colors.length]
        //   );
        // }
      }

      //绘制某个区域的边界
      function renderAreaPolygons(areaNode) {
        //更新地图视野
        map.setBounds(areaNode.getBounds(), null, null, true);
        // console.log("renderAreaPolygons", areaNode);
        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons();

        //绘制子区域
        districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
          //   console.log("feature", feature, i);
          //   let fillColor = colors[i % colors.length];
          //   let strokeColor = colors[colors.length - 1 - (i % colors.length)];

          //   console.log(feature.acroutes?.length);
          //   if (feature.acroutes?.length > 2) {
          //     districtExplorer.clearFeaturePolygons();
          //     return;
          //   }

          const strokeColor = getDistrictColor(feature.properties.adcode, i);
          const fillColor = getDistrictColor(feature.properties.adcode, i);

          return {
            cursor: "default",
            bubble: true,
            strokeColor: strokeColor, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: fillColor, //填充色
            fillOpacity: 0.35, //填充透明度
          };
        });

        //绘制父区域
        districtExplorer.renderParentFeature(areaNode, {
          cursor: "default",
          bubble: true,
          strokeColor: "black", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: areaNode.getSubFeatures().length ? null : colors[0], //填充色
          //   fillColor: "black",
          //   fillColor: areaNode.getParentFeature() ? "black" : null,
          fillOpacity: 0.35, //填充透明度
        });
      }

      //切换区域后刷新显示内容
      function refreshAreaNode(areaNode) {
        // console.log(areaNode);
        districtExplorer.setHoverFeature(null);

        renderAreaPolygons(areaNode);

        //更新选中节点的class
        // let $nodeEles = $("#area-tree").find("h2");

        // $nodeEles.removeClass("selected");

        // let $selectedNode = $nodeEles
        //   .filter("h2[data-adcode=" + areaNode.getAdcode() + "]")
        //   .addClass("selected");

        //展开下层节点
        // $selectedNode.closest("li").removeClass("hide-sub");

        //折叠下层的子节点
        // $selectedNode.siblings("ul.sublist").children().addClass("hide-sub");
      }

      //切换区域
      function switch2AreaNode(adcode, callback) {
        if (
          currentAreaNode &&
          "" + currentAreaNode.getAdcode() === "" + adcode
        ) {
          return;
        }

        loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            if (callback) {
              callback(error);
            }

            return;
          }

          currentAreaNode = window.currentAreaNode = areaNode;

          //设置当前使用的定位用节点
          districtExplorer.setAreaNodesForLocating([currentAreaNode]);

          refreshAreaNode(areaNode);

          if (callback) {
            callback(null, areaNode);
          }
        });
      }

      //加载区域
      function loadAreaNode(adcode, callback) {
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
          if (error) {
            if (callback) {
              callback(error);
            }

            console.error(error);

            return;
          }

          renderAreaPanel(areaNode);

          if (callback) {
            callback(null, areaNode);
          }
        });
      }

      switch2AreaNode(100000);
    });

    return () => {
      map?.destroy();
    };
  }, [map, districtExplorerRef]);

  return (
    <>
      <div id="map" className="absolute inset-0" ref={mapContainerRef}></div>
      <div
        id="area-tree"
        className="absolute top-6 right-6 bg-black/35 p-4 rounded-lg"
        ref={menuRef}
      ></div>
    </>
  );
}
