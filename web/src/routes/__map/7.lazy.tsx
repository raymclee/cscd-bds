import { createLazyFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { useShallow } from 'zustand/shallow'
import { DistrictSelect } from '~/components/district-select'
import { getDistrictColor } from '~/lib/color'
import { cn } from '~/lib/utils'
import { Progress } from '~/components/ui/progress'
import { BidChart } from '~/components/bid-chart'
import { BadgeJapaneseYen, ChartPie, Layers, Layers2Icon } from 'lucide-react'
import { BusinessChart } from '~/components/business-chart'
import { PercentageChart } from '~/components/percentage-chart'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { ScrollArea } from '~/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useMapStore } from '~/store/map'
import countryTree from '~/lib/country-tree.json'

export const Route = createLazyFileRoute('/__map/7')({
  component: RouteComponent,
})

function RouteComponent() {
  const [map, initMap, districts] = useMapStore(
    useShallow((state) => [state.map, state.initMap, state.districts]),
  )
  const satelliteRef = React.useRef<AMap.TileLayer>()
  const [visible, setVisible] = React.useState(true)

  React.useEffect(() => {
    initMap('map', {
      zoom: 4,
      // mapStyle: "amap://styles/grey",
      mapStyle: 'amap://styles/darkblue',
      center: [116.397428, 39.90923],
    })
    satelliteRef.current = new AMap.TileLayer.Satellite()
  }, [])

  React.useEffect(() => {
    map?.on('complete', () => {
      for (const [i, district] of districts.entries()) {
        const province = new AMap.DistrictLayer.Province({
          adcode: district.adcode,
          depth: 0,
        })
        const color = getDistrictColor(district.adcode[0], i)
        province.setStyles({
          fill: color,
          // "fill-opacity": 0.5,
          'nation-stroke': '#c2c2c2',
          'city-stroke': '#c2c2c2',
        })
        // province.setFitViewByAdcode(district.adcode[0], false, [0, 0, 0, 0]);
        province.on('complete', (e) => {
          console.log(e, district)
        })
        province.setMap(map)
      }
      // const city = countryTree.children[1];
      // const dl = new AMap.DistrictLayer.Province({
      //   adcode: [
      //     city.adcode,
      //     countryTree.children[2].adcode,
      //     countryTree.children[3].adcode,
      //   ],
      // });
      // const color = getDistrictColor(city.adcode, 2);
      // dl.setStyles({
      //   fill: color,
      //   "fill-opacity": 0.5,
      //   "stroke-color": "#fff",
      //   "stroke-weight": 1,
      //   "stroke-opacity": 0.5,
      // });
      // dl.setMap(map);

      // const maker = new AMap.Marker({
      //   position: new AMap.LngLat(city.center[0], city.center[1]),
      //   content: `<div class="text-white text-center bg-black">北京</div>`,
      // });
      // maker.setMap(map);

      map.setZoomAndCenter(5, [116.397428, 39.90923], false, 600)

      // map.setFitView([maker], false, [420, 0, 0, 0], city.idealZoom);
    })

    return () => {
      map?.destroy()
    }
  }, [map])

  return (
    <div className="relative min-h-screen bg-dashboard">
      <div id="map" className="absolute inset-0"></div>
      <div className="absolute z-10 flex h-[96px] w-full items-center justify-center bg-dashboard-head bg-cover bg-center text-white">
        <div className="select-none text-ellipsis whitespace-nowrap text-3xl font-semibold">
          遠東幕牆市場投標地圖
        </div>
      </div>

      <div className="flex gap-2 px-4 pt-14">
        <div className="hidden h-full w-[18vw] space-y-2 xl:block">
          <DashboardCard title="新增商機數" className="">
            <div className="mt-14 flex h-full justify-around">
              <div className="space-y-2">
                <div className="bg-brand/40 mx-auto flex h-12 w-12 items-center justify-center rounded-full p-2 backdrop-blur">
                  <BadgeJapaneseYen className="h-full w-full text-brand" />
                </div>
                <div className="text-center text-gray-300">
                  <span className="mr-2 text-3xl font-bold">0.8</span>
                  億元
                </div>
                <div className="text-center text-xs text-gray-300">金額</div>
              </div>

              <div className="space-y-2">
                <div className="bg-brand/40 mx-auto flex h-12 w-12 items-center justify-center rounded-full p-2 backdrop-blur">
                  <Layers className="h-full w-full text-brand" />
                </div>
                <div className="text-center text-gray-300">
                  <span className="mr-2 text-3xl font-bold">1</span>個
                </div>
                <div className="text-center text-xs text-gray-300">數量</div>
              </div>

              <div className="space-y-2">
                <div className="bg-brand/40 mx-auto flex h-12 w-12 items-center justify-center rounded-full p-2 backdrop-blur">
                  <ChartPie className="h-full w-full text-brand" />
                </div>
                <div className="text-center text-gray-300">
                  <span className="mr-2 text-3xl font-bold">27</span>%
                </div>
                <div className="text-center text-xs text-gray-300">比例</div>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="商機匯總總金額">
            <BidChart />
          </DashboardCard>

          <DashboardCard title="項目商機類型金額占比">
            <PercentageChart />
          </DashboardCard>
        </div>

        <div className="flex-1 space-y-2"></div>

        <div className="hidden w-[18vw] space-y-2 xl:block">
          <DashboardCard title="市場競爭龍虎榜">
            <BusinessChart />
          </DashboardCard>

          <DashboardCard title="市場競爭龍虎榜">
            <BusinessChart />
          </DashboardCard>

          <DashboardCard title="項目列表">
            <ScrollArea className="h-96">
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader className="bg-brand/25">
                  <TableRow className="items-center">
                    <TableHead className="w-[60px] text-xs text-gray-300">
                      序號
                    </TableHead>
                    <TableHead className="text-xs text-gray-300">
                      名稱
                    </TableHead>
                    <TableHead className="text-xs text-gray-300">
                      區域
                    </TableHead>
                    <TableHead className="text-center text-xs text-gray-300">
                      <div>預計金額</div>
                      (億元)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-white">
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell className="font-medium">珠海國際大廈</TableCell>
                    <TableCell>珠海</TableCell>
                    <TableCell className="text-center">3.12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell className="font-medium">珠海國際大廈</TableCell>
                    <TableCell>珠海</TableCell>
                    <TableCell className="text-center">3.12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell className="font-medium">珠海國際大廈</TableCell>
                    <TableCell>珠海</TableCell>
                    <TableCell className="text-center">3.12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>4</TableCell>
                    <TableCell className="font-medium">珠海國際大廈</TableCell>
                    <TableCell>珠海</TableCell>
                    <TableCell className="text-center">3.12</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ScrollArea>{' '}
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}

const statusItems = ['跟進中', '中標', '失標', '估價', '已交標', '停止跟進']

function getDistrictZoomLevel(id: string) {
  let zoom = 5
  if (id === '5') {
    zoom = 10
  } else if (id === '3' || id === '4') {
    zoom = 6
  }
  return zoom
}

function DashboardCard({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card
      className={cn(
        'h-[17.5rem] overflow-hidden rounded border border-brand bg-transparent shadow-dashboard-card drop-shadow-2xl backdrop-blur',
        className,
      )}
    >
      <CardHeader className="bg-gradient-to-r from-sky-900 via-teal-600 to-sky-800 font-bold text-white">
        {title}
      </CardHeader>
      <CardContent className="mt-4 h-full">{children}</CardContent>
    </Card>
  )
}
