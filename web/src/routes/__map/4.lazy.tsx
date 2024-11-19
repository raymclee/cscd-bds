import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { District, useMapStore } from '~/store/map'
import { useShallow } from 'zustand/shallow'

export const Route = createLazyFileRoute('/__map/4')({
  component: RouteComponent,
})

function RouteComponent() {
  const [map, initMap, districts] = useMapStore(
    useShallow((state) => [state.map, state.initMap, state.districts]),
  )
  const districtExplorerRef = React.useRef()
  const tipMakerRef = React.useRef<AMap.Marker[]>([])

  React.useEffect(() => {
    initMap('map', {
      zoom: 4,
    })
  }, [])

  React.useEffect(() => {
    map?.on('complete', () => {
      const districtExplorer = new AMapUI.DistrictExplorer({
        map: map, //关联的地图实例,
        eventSupport: true, //打开事件支持
      })
      districtExplorerRef.current = districtExplorer

      const adcode = 100000 //全国的区划编码

      districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
        if (error) {
          console.error(error)
          return
        }

        //绘制载入的区划节点
        renderAreaNode(districtExplorer, areaNode)
      })
    })

    for (const district of districts) {
      const tipMarker = new AMap.Marker({
        content: `<div class="bg-white px-2 py-1 w-[80px] rounded-lg">${district.name}</div>`,
        offset: new AMap.Pixel(10, 10),
        bubble: true,
      })

      tipMarker.setPosition(district.center)
      tipMarker.setMap(map)
      tipMarker.on('click', () => {
        onDistrictClick(district)
        map?.setZoomAndCenter(6, district.center)
      })
      tipMakerRef.current?.push(tipMarker)
    }

    return () => {
      map?.destroy()
    }
  }, [map])

  function renderAreaNode(districtExplorer, areaNode) {
    //清除已有的绘制内容
    districtExplorer.clearFeaturePolygons()
    districtExplorer.setAreaNodesForLocating([areaNode])

    // districtExplorer.on("featureMouseover", function (e, feature) {
    //   console.log(e, feature, areaNode);
    // });

    //just some colors
    // const colors = [
    //   "#3366cc",
    //   "#dc3912",
    //   "#ff9900",
    //   "#109618",
    //   "#990099",
    //   "#0099c6",
    //   "#dd4477",
    //   "#66aa00",
    // ];

    //绘制子级区划
    districtExplorer.renderSubFeatures(areaNode, function (feature) {
      console.log(feature)

      let fillColor
      let strokeColor
      switch (feature.properties.adcode) {
        //華西
        case 540000: //西藏
        case 650000: //新疆
        case 620000: //甘肃
        case 630000: //青海
        case 510000: //四川
        case 530000: //云南
        case 640000: //宁夏
        case 610000: //陕西
        case 500000: //重庆
        case 520000: //貴州
        case 450000: //广西
          fillColor = '#d0f5ce'
          strokeColor = '#d0f5ce'
          break
        //華北
        case 150000: //内蒙古
        case 230000: //黑龙江
        case 220000: //吉林
        case 210000: //辽宁
        case 110000: //北京
        case 130000: //河北
        case 140000: //山西
        case 120000: //天津
        case 370000: //山东
          fillColor = '#efe6fe'
          strokeColor = '#efe6fe'
          break
        //華東
        case 320000: //江苏
        case 310000: //上海
        case 340000: //安徽
        case 330000: //浙江
        case 410000: //河南
        case 350000: //福建
          fillColor = '#e0e9ff'
          strokeColor = '#e0e9ff'
          break
        //華南
        case 430000: //湖南
        case 440000: //广东
        case 360000: //江西
        case 420000: //湖北
        case 460000: //海南
        case 710000: //台湾
          fillColor = '#fee3e2'
          strokeColor = '#fee3e2'
          break
        case 810000: //香港
        case 820000: //澳门
          fillColor = '#fee7cd'
          strokeColor = '#fee7cd'
          break
      }

      return {
        cursor: 'default',
        bubble: true,
        strokeColor: strokeColor, //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 1, //线宽
        fillColor: fillColor, //填充色
        fillOpacity: 0.55, //填充透明度
      }
    })

    //绘制父级区划，仅用黑色描边
    districtExplorer.renderParentFeature(areaNode, {
      //   cursor: "default",
      //   bubble: true,
      //   strokeColor: "black", //线颜色
      fillColor: null,
      strokeWeight: 0, //线宽
    })

    //更新地图视野以适合区划面
    map.setFitView(districtExplorer.getAllFeaturePolygons())
  }

  const onDistrictClick = React.useCallback(
    (district: District) => {
      districtExplorerRef.current.clearFeaturePolygons()

      districtExplorerRef.current.loadMultiAreaNodes(
        [100000],
        (err, areaNodes) => {
          const countryNode = areaNodes[0]
          const cityNodes = areaNodes.slice(1)
          const provCodes = district.adcode

          const path = []

          //首先放置背景区域，这里是大陆的边界
          path.push(getLongestRing(countryNode.getParentFeature()))

          for (let i = 0, len = provCodes.length; i < len; i++) {
            //逐个放置需要镂空的省级区域
            path.push.apply(
              path,
              getAllRings(countryNode.getSubFeatureByAdcode(provCodes[i])),
            )
          }

          for (let i = 0, len = cityNodes.length; i < len; i++) {
            //逐个放置需要镂空的市级区域
            console.log(cityNodes[i])
            path.push.apply(path, getAllRings(cityNodes[i].getParentFeature()))
          }

          //绘制带环多边形
          //https://lbs.amap.com/api/javascript-api/reference/overlay#Polygon
          new AMap.Polygon().setOptions({
            bubble: true,
            lineJoin: 'round',
            strokeColor: 'red', //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: 'black', //填充色
            fillOpacity: 0.65, //填充透明度
            map: map,
            path: path,
          })
        },
      )
    },
    [map, districtExplorerRef],
  )

  return (
    <>
      <div id="map" className="absolute inset-0"></div>
      <div className="absolute top-0 right-0 flex">
        <button
          onClick={() => {
            districtExplorerRef.current.clearFeaturePolygons()
            tipMakerRef.current.forEach((marker) => {
              marker.setMap(null)
            })
          }}
        >
          onclick
        </button>
        <button
          onClick={() => {
            tipMakerRef.current.forEach((marker) => {
              marker.setMap(map)
            })
          }}
        >
          show
        </button>
      </div>
    </>
  )
}

function getAllRings(feature) {
  var coords = feature.geometry.coordinates,
    rings = []

  for (var i = 0, len = coords.length; i < len; i++) {
    rings.push(coords[i][0])
  }

  return rings
}

function getLongestRing(feature) {
  const rings = getAllRings(feature)

  rings.sort(function (a, b) {
    return b.length - a.length
  })

  return rings[0]
}
