import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_portal/portal/_admin')({
  beforeLoad(ctx) {
    if (!ctx.context.session.isAdmin) {
      throw redirect({ to: '/access-denied' })
    }
  },
})