import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_portal/portal/_super-admin')({
  beforeLoad(ctx) {
    if (!ctx.context.session.isSuperAdmin) {
      throw redirect({ to: '/access-denied' })
    }
  },
})
