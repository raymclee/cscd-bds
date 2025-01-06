import { createLazyFileRoute } from '@tanstack/react-router'
import { Rhino } from '~/components/rhino'

export const Route = createLazyFileRoute('/r')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Rhino />
}
