import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_dashboard')({
  beforeLoad(ctx) {
    if (
      !ctx.context.session.isLeader &&
      !ctx.context.session.isAdmin &&
      !ctx.context.session.hasMapAccess
    ) {
      throw redirect({ to: '/portal/tenders' })
    }
  },
})
