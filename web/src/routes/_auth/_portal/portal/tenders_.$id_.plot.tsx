import AMapLoader from '@amap/amap-jsapi-loader'
import { createFileRoute } from '@tanstack/react-router'
import node, {
  tendersDetailPlotPageQuery,
} from '__generated__/tendersDetailPlotPageQuery.graphql'
import { loadQuery } from 'react-relay'

export const Route = createFileRoute(
  '/_auth/_portal/portal/tenders_/$id_/plot',
)({
  async loader(ctx) {
    await AMapLoader.load({
      key: '2fe0b3e2e45dce4b4180ec0f5683cc24',
      version: '2.0',
      plugins: ['AMap.PolygonEditor'],
      AMapUI: {
        version: '1.1',
        plugins: ['geo/DistrictExplorer', 'overlay/SimpleMarker'],
      },
      // plugins: ["ui/geo/DistrictCluster"],
      // plugins: ["AMap.PolygonEditor", "AMap.ToolBar", "AMap.Scale"],
    })
    return loadQuery<tendersDetailPlotPageQuery>(
      ctx.context.RelayEnvironment,
      node,
      { id: ctx.params.id },
    )
  },
})
