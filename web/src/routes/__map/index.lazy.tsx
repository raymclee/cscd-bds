import { createLazyFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { useShallow } from 'zustand/shallow'
import { DistrictSelect } from '~/components/district-select'
import { getDistrictColor } from '~/lib/color'
import { useMapStore } from '~/store/map'
import { TreeSelect } from '@arco-design/web-react'
const TreeNode = TreeSelect.Node

export const Route = createLazyFileRoute('/__map/')({
  component: RouteComponent,
})

type Item = {
  label: string
  value: number
  children: Item[]
}

function RouteComponent() {
  const [map, initMap, districts] = useMapStore(
    useShallow((state) => [state.map, state.initMap, state.districts]),
  )
  const satelliteRef = React.useRef<AMap.TileLayer>()
  const [menu, setMenu] = React.useState<Item[]>([])

  React.useEffect(() => {
    initMap('map', {
      zoom: 4,
    })
    satelliteRef.current = new AMap.TileLayer.Satellite()
  }, [])

  React.useEffect(() => {
    map?.on('complete', () => {
      const markers: AMap.Marker[] = []
      // @ts-expect-error
      const districtExplorer = new AMapUI.DistrictExplorer({
        eventSupport: true, //打开事件支持
        map: map,
        preload: [100000],
      })

      let currentAreaNode: any = null
      const tipMarker = new AMap.Marker({
        content: '<div class=""></div>',
        offset: new AMap.Pixel(15, 5),
        bubble: true,
      })

      //根据Hover状态设置相关样式
      function toggleHoverFeature(
        feature: any,
        isHover: boolean,
        position: [number, number],
      ) {
        tipMarker.setMap(isHover ? map : null)

        if (!feature) {
          return
        }
        const props = feature.properties

        if (isHover) {
          //更新提示内容
          tipMarker.setContent(
            `<div class="bg-black/70 backdrop-blur text-white px-2 py-1 rounded-lg min-w-max">${props.name}</div>`,
          )
          //更新位置
          tipMarker.setPosition(position || props.center)
        }

        // const trees = document
        //   .querySelector(`#area-tree h2[data-adcode=${props.adcode}]`)
        //   ?.classList.toggle("hover", isHover);

        // $("#area-tree")
        //   .find('h2[data-adcode="' + props.adcode + '"]')
        //   .toggleClass("hover", isHover);

        //更新相关多边形的样式
        let polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode)
        for (const poly of polys) {
          poly.setOptions({
            fillOpacity: isHover ? 0.5 : 0.2,
          })
        }
        // for (let i = 0, len = polys.length; i < len; i++) {
        //   polys[i].setOptions({
        //     fillOpacity: isHover ? 0.5 : 0.2,
        //   });
        // }
      }

      //监听feature的hover事件
      districtExplorer.on(
        'featureMouseout featureMouseover',
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
          toggleHoverFeature(
            feature,
            e.type === 'featureMouseover',
            e.originalEvent ? e.originalEvent.lnglat : null,
          )
        },
      )

      //监听鼠标在feature上滑动
      districtExplorer.on('featureMousemove', function (e: any, feature: any) {
        //更新提示位置
        tipMarker.setPosition(e.originalEvent.lnglat)
      })

      //feature被点击

      //外部区域被点击
      districtExplorer.on('outsideClick', function (e: any) {
        districtExplorer.locatePosition(
          e.originalEvent.lnglat,
          (error: any, routeFeatures: any) => {
            if (routeFeatures && routeFeatures.length > 1) {
              //切换到省级区域
              switch2AreaNode(routeFeatures[1].properties.adcode)
            } else {
              //切换到全国
              switch2AreaNode(100000)
            }
          },
          {
            levelLimit: 2,
          },
        )
        map?.removeLayer(satelliteRef.current!)
      })

      const onFeatureOrMarkerClick = (props: any) => {
        switch2AreaNode(props.adcode, props.childrenNum > 0)

        if (props.childrenNum == 0) {
          map?.addLayer(satelliteRef.current!)
          // map?.setZoom(18, true, 200);
          map?.setZoomAndCenter(15, props.center, false, 600)
        }
      }

      districtExplorer.on('featureClick', (e: any, feature: any) => {
        let props = feature.properties

        //如果存在子节点
        // if (props.childrenNum > 0) {
        //切换聚焦区域

        // }

        onFeatureOrMarkerClick(props)
      })

      //绘制区域面板的节点
      function renderAreaPanelNode(
        ele: HTMLElement,
        props: any,
        color: string,
      ) {
        // const box = React.createElement('li', { className: "lv_" + props.level });
        const box = document.createElement('li')
        box.className = 'lv_' + props.level

        const h2 = document.createElement('h2')
        h2.className = 'lv_' + props.level
        h2.setAttribute('data-adcode', props.adcode)
        h2.setAttribute('data-level', props.level)
        h2.setAttribute('data-children-num', props.childrenNum || void 0)
        h2.setAttribute('data-center', props.center.join(','))
        h2.innerHTML = props.name

        if (color) {
          h2.style.borderColor = color
        }

        h2.append(box)

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

        box.append(ele)
      }

      //填充某个节点的子区域列表
      function renderAreaPanel(areaNode: any) {
        // let props = areaNode.getProps();
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
        // let subFeatures = areaNode.getSubFeatures();
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
      function renderAreaPolygons(
        areaNode: any,
        zoomeToNode: boolean,
        topLevel: boolean,
        clear: boolean = true,
      ) {
        //更新地图视野
        if (zoomeToNode) {
          map?.setBounds(areaNode.getBounds(), false)
        }

        if (clear) {
          //清除已有的绘制内容
          districtExplorer.clearFeaturePolygons()
        }

        //绘制子区域
        districtExplorer.renderSubFeatures(
          areaNode,
          function (feature: any, i: number) {
            const props = feature.properties
            //   let fillColor = colors[i % colors.length];
            //   let strokeColor = colors[colors.length - 1 - (i % colors.length)];

            //   if (feature.acroutes?.length > 2) {
            //     districtExplorer.clearFeaturePolygons();
            //     return;
            //   }

            // if (feature.properties.childrenNum > 0) {
            //   const marker = new AMapUI.SimpleMarker({
            //     iconTheme: "default",
            //     iconLabel: {
            //       // innerHTML: `<div>${feature.properties.name}</div>`,
            //     },
            //     label: {
            //       content: feature.properties.name,
            //       // offset: new AMap.Pixel(20, 20),
            //     },
            //     map,
            //     position: feature.properties.center,
            //   });
            //   markers.push(marker);
            // }

            if (!topLevel) {
              // @ts-expect-error
              const marker = new AMapUI.SimpleMarker({
                // @ts-expect-error
                iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles('default'),
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
              })

              marker.on('click', () => {
                onFeatureOrMarkerClick(props)
              })
              marker.on('mouseover', () => {
                marker.setOptions({ zIndex: 13 })
              })
              marker.on('mouseout', () => {
                marker.setOptions({ zIndex: 12 })
              })
              markers.push(marker)
            }

            const strokeColor = getDistrictColor(feature.properties.adcode, i)
            const fillColor = getDistrictColor(feature.properties.adcode, i)

            return {
              cursor: 'default',
              bubble: true,
              strokeColor: strokeColor, //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: fillColor, //填充色
              fillOpacity: 0.35, //填充透明度
            }
          },
        )

        //绘制父区域;
        districtExplorer.renderParentFeature(areaNode, {
          cursor: 'default',
          bubble: true,
          strokeColor: areaNode.getSubFeatures().length ? 'black' : 'white', //线颜色
          // strokeColor: areaNode.getSubFeatures().length ? "black" : "", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 1, //线宽
          fillColor: '', //填充色
          //   fillColor: "black",
          //   fillColor: areaNode.getParentFeature() ? "black" : null,
          fillOpacity: 0.35, //填充透明度
        })
      }

      //切换区域后刷新显示内容
      function refreshAreaNode(
        areaNode: any,
        zoomeToNode: boolean,
        topLevel: boolean,
      ) {
        districtExplorer.setHoverFeature(null)

        renderAreaPolygons(areaNode, zoomeToNode, topLevel)

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

        map?.remove(markers)

        if (adcode === 100000) {
          for (const district of districts) {
            //@ts-expect-error
            const marker = new AMapUI.SimpleMarker({
              // @ts-expect-error
              iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles('default'),
              label: {
                content: `
                  <div class="flex flex-col">
                    <div class="text-lg font-medium">${district.name}</div>
                    <div class="flex items-baseline gap-3">
                      <div>
                        項目數量:<span class="ml-1 font-bold text-xl">${Math.floor(Math.random() * 100)}</span>
                      </div>
                      <div>
                        金額:<span class="ml-1 font-bold text-xl">${Math.floor(Math.random() * 1000)}億</span>
                      </div>
                    </div>
                    <div></div>
                  </div>
              `,
                offset: new AMap.Pixel(-40, 40),
              },
              map,
              position: district.center,
            })
            marker.on('click', () => {
              map?.remove(markers)

              // districtExplorer.loadMultiAreaNodes(
              //   district.adcode,
              //   (error, areaNodes) => {
              //     if (error) {
              //       console.error(error);
              //       return;
              //     }

              //     districtExplorer.clearFeaturePolygons();

              //     for (const areaNode of areaNodes) {
              //       renderAreaPolygons(areaNode, false, false, false);
              //     }

              //     districtExplorer.setAreaNodesForLocating(areaNodes);
              //   }
              // );

              // console.log(districtExplorer.getAllFeaturePolygons());
              // map?.setFitView(districtExplorer.getAllFeaturePolygons());
              loadAreaNode(district.adcode[0], (error: any, areaNode: any) => {
                if (error) {
                  console.error(error)
                  return
                }
                districtExplorer.setAreaNodesForLocating([areaNode])
                refreshAreaNode(areaNode, zoomeToNode, false)
              })
            })
            markers.push(marker)
          }
        }

        loadAreaNode(adcode, function (error: any, areaNode: any) {
          if (error) {
            return
          }

          currentAreaNode = areaNode

          //设置当前使用的定位用节点
          districtExplorer.setAreaNodesForLocating([currentAreaNode])

          refreshAreaNode(areaNode, zoomeToNode, adcode === 100000)
        })
      }

      //加载区域
      function loadAreaNode(
        adcode: number,
        callback: (error: any, areaNode?: any) => void,
      ) {
        districtExplorer.loadAreaNode(adcode, (error: any, areaNode: any) => {
          if (error) {
            if (callback) {
              callback(error)
            }

            console.error(error)

            return
          }

          renderAreaPanel(areaNode)

          if (callback) {
            callback(null, areaNode)
          }
        })
      }

      switch2AreaNode(100000)

      districtExplorer.loadAreaNode(
        100000,
        function (error: any, areaNode: any) {
          if (error) {
            console.error(error)
            return
          }

          districtExplorer.loadMultiAreaNodes(
            areaNode
              .getSubFeatures()
              .map((feature: any) => feature.properties.adcode),
            function (error: any, areaNodes: any) {
              let master: Item[] = []
              for (const areaNode of areaNodes) {
                const props = areaNode.getProps()

                const children: Item[] = []
                const childs = areaNode.getSubFeatures()
                for (const child of childs) {
                  const childProps = child.properties
                  children.push({
                    label: childProps.name as string,
                    value: childProps.adcode as number,
                    children: [],
                  })
                }

                master.push({
                  label: props.name as string,
                  value: props.adcode as number,
                  children,
                })
              }

              setMenu(master)
            },
          )
        },
      )
    })

    return () => {
      map?.destroy()
    }
  }, [map, satelliteRef])

  return (
    <>
      <div id="map" className="absolute inset-0"></div>
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
    </>
  )
}
