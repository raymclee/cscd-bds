import * as React from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { loadQuery } from 'react-relay'
import node, {
  tendersNewTenderPageQuery,
} from '__generated__/tendersNewTenderPageQuery.graphql'
import { canEdit } from '~/lib/permission'

export const Route = createFileRoute('/_auth/_portal/portal/tenders_/new')({
  loader({ context: { RelayEnvironment, session } }) {
    if (!canEdit(session)) {
      throw redirect({ to: '/access-denied' })
    }
    return loadQuery<tendersNewTenderPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
    })
  },
})
