import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { RelayEnvironmentProvider } from 'react-relay'

export const Route = createLazyFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const { RelayEnvironment } = Route.useRouteContext()
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Outlet />
    </RelayEnvironmentProvider>
  )
}
