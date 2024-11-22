import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useMapStore } from '~/store/map'

export const Route = createLazyFileRoute('/__auth/__imap/h3')({
  component: RouteComponent,
})

function RouteComponent() {
  const map = useMapStore((state) => state.map)

  React.useEffect(() => {
    return () => {
      map?.setZoomAndCenter(4, [116.3683244, 39.915085])
    }
  }, [map])

  return 'Hello /__m/h3!'
}
