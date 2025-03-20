import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/__auth/__dashboard/__amap/v2/areas/$id/p/$id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__auth/__dashboard/__amap/v2/areas/$id/p/$id"!</div>
}
