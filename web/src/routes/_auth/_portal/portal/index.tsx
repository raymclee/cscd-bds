import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_portal/portal/')({
  beforeLoad() {
    throw redirect({ to: '/portal/tenders' })
  },
})
