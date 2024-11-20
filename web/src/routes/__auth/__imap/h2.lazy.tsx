import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useMapStore } from '~/store/map'
import { graphql, usePreloadedQuery } from 'react-relay'

export const Route = createLazyFileRoute('/__auth/__imap/h2')({
  component: RouteComponent,
})

// const query = graphql`
//   query MapPageQuery {
//     areas {
//       edges {
//         node {
//           id
//         }
//       }
//     }
//   }
// `;

function RouteComponent() {
  const map = useMapStore((state) => state.map)
  const districtExplorer = useMapStore((state) => state.districtExplorer)
  const navigate = Route.useNavigate()
  // const data = usePreloadedQuery(query, Route.useLoaderData())

  React.useEffect(() => {
    console.log('hi')
  }, [])

  React.useEffect(() => {
    map?.on('complete', () => {
      districtExplorer.on('featureClick', (e: any) => {
        // console.log(e.target.getPosition());
        navigate({ to: '/h3' })

        map.setZoomAndCenter(14, [117.226568, 39.122125])
      })

      districtExplorer.loadAreaNode(100000, (err: any, areaNode: any) => {
        districtExplorer.renderSubFeatures(
          areaNode,
          (feature: any, i: number) => {
            const props = feature.properties
            return {
              cursor: 'default',
              bubble: true,
              strokeColor: 'red', //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 1, //线宽
              fillColor: 'red', //填充色
              fillOpacity: 0.5, //填充透明度
            }
          },
        )
      })
    })
  }, [map])

  return <div className="text-white">123</div>
}
