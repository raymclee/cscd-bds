import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { loadQuery } from 'react-relay'
import node, {
  customersPageQuery,
} from '__generated__/customersPageQuery.graphql'

export const Route = createFileRoute('/__auth/__portal/portal/customers/')({
  async loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<customersPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
    })
  },
})
