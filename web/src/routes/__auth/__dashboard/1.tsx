import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__auth/__dashboard/1')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /__auth/__dashboard/1!'
}
