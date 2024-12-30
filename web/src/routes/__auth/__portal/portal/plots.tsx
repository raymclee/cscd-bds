import AMapLoader from '@amap/amap-jsapi-loader'
import { createFileRoute, redirect } from '@tanstack/react-router'
import node, { plotsPageQuery } from '__generated__/plotsPageQuery.graphql'
import { loadQuery } from 'react-relay'
import { canEdit } from '~/lib/permission'

export const Route = createFileRoute('/__auth/__portal/portal/plots')({
  async loader({ context }) {
    if (!canEdit(context.session)) {
      throw redirect({ to: '/access-denied' })
    }
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
    return loadQuery<plotsPageQuery>(context.RelayEnvironment, node, {
      userId: context.session.userId,
    })
  },
})
