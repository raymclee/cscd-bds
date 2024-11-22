import { createFileRoute } from '@tanstack/react-router'
import AMapLoader from '@amap/amap-jsapi-loader'

export const Route = createFileRoute('/__auth/__dashboard/__map/edit')({
  async loader() {
    await AMapLoader.load({
      key: '',
      version: '2.0',
      plugins: ['AMap.PolygonEditor'],
    })
  },
})
