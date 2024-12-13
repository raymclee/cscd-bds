import * as React from 'react'
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useMapStore } from '~/store/map'
import { Blocks, Monitor } from 'lucide-react'
import { Button, Tooltip } from 'antd'

export const Route = createLazyFileRoute('/_auth/_dashboard/_map')({
  component: RouteComponent,
})

function RouteComponent() {
  const map = useMapStore((s) => s.map)
  const initMap = useMapStore((s) => s.initMap)
  const { session } = Route.useRouteContext()

  React.useEffect(() => {
    initMap('map', {
      zoom: 4,
      // mapStyle: "amap://styles/grey",
      mapStyle: 'amap://styles/darkblue',
      // viewMode: "3D",
      // pitch: 30,
    })
  }, [])

  React.useEffect(() => {
    return () => {
      useMapStore.setState({
        selectedArea: null,
        currentAreaNode: null,
        navigations: [],
        selectedTender: null,
        tenderListVisible: false,
        tenderViewTender: null,
        selectedTenderStatus: null,
      })
      map?.destroy()
    }
  }, [map])

  return (
    <>
      <div
        id="map"
        className="fixed left-0 right-0 top-0 h-[50vh] xl:bottom-0 xl:h-full"
      ></div>

      <div className="fixed left-0 right-0 top-0 flex h-[72px] w-full items-center justify-center bg-dashboard-head bg-cover bg-center text-white xl:h-[96px]">
        <div className="select-none text-ellipsis whitespace-nowrap text-3xl font-bold">
          远东幕墙市场拓展地图
        </div>
      </div>

      <div className="fixed left-4 top-4 lg:top-2">
        {((session.hasMapAccess && session.hasEditAccess) ||
          session.isAdmin) && (
          <Tooltip title="后台">
            <Link to="/portal">
              <Button
                className="border-0 bg-gradient-to-r from-sky-900 to-sky-600 text-white drop-shadow-2xl"
                size="small"
                shape="circle"
                icon={<Blocks size={14} />}
              ></Button>
            </Link>
          </Tooltip>
        )}
      </div>
      <Outlet />
    </>
  )
}
