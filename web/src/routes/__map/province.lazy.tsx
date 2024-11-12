import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__map/province')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /__map/province!'
}
