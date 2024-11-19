import AMapLoader from '@amap/amap-jsapi-loader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__imap')({
  async loader() {
    await AMapLoader.load({
      key: '2fe0b3e2e45dce4b4180ec0f5683cc24',
      version: '2.0',
      AMapUI: {
        version: '1.1',
        plugins: ['geo/DistrictExplorer', 'overlay/SimpleMarker'],
      },
      // plugins: ["ui/geo/DistrictCluster"],
      // plugins: ["AMap.PolygonEditor", "AMap.ToolBar", "AMap.Scale"],
    })
  },
})
