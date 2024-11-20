import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/access-denied')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /access-denied!'
}
