import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useMapStore } from '~/store/map'

export const Route = createLazyFileRoute('/__auth/__dashboard/__map/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const map = useMapStore((state) => state.map)
  const initMap = useMapStore((state) => state.initMap)
  const polygonEditor = useMapStore((state) => state.polygonEditor)
  const setPolygonEditor = useMapStore((state) => state.setPolygonEditor)

  React.useEffect(() => {
    initMap('map', {
      center: [114.225965, 22.279779],
      zoom: 15,
    })
  }, [initMap])

  React.useEffect(() => {
    map?.on('complete', () => {
      const editor = new AMap.PolygonEditor(map)
      setPolygonEditor(editor)

      editor?.open()
      editor.on('addnode', (e) => {
        console.log(e)
      })
      editor.on(['add', 'addnode', 'addnode', 'end', 'move'], (e) => {
        console.log(
          JSON.stringify(
            e.target.getPath().map((item: any) => [item.lng, item.lat]),
          ),
        )
      })
    })

    return () => {
      map?.destroy()
    }
  }, [map])

  return (
    <>
      <div id="map" className="absolute inset-0" />
      <button
        onClick={() => {
          map?.clearMap()
        }}
      >
        Clear
      </button>
    </>
  )
}
