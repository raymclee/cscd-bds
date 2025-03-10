import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute(
  '/__auth/__portal/portal/potential-tenders',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__auth/__portal/portal/potential-tenders"!</div>
}
