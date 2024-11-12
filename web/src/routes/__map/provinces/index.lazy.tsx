import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__map/provinces/')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /__map/provinces/!'
}
