import * as React from 'react'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { useMapStore } from '~/store/map'

export const Route = createLazyFileRoute('/__auth/__imap')({
  component: RouteComponent,
})

function RouteComponent() {
  const map = useMapStore((state) => state.map)
  const initMap = useMapStore((state) => state.initMap)

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
      map?.destroy()
    }
  }, [map])

  return (
    <div className="dark relative max-h-dvh min-h-dvh bg-black">
      <div id="map" className="absolute inset-0"></div>
      <div className="relative">
        <Outlet />
      </div>
    </div>
  )
}
