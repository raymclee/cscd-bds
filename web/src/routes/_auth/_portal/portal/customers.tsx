import { createFileRoute } from '@tanstack/react-router'
import { loadQuery } from 'react-relay'
import node, {
  customersPageQuery,
} from '__generated__/customersPageQuery.graphql'
import * as v from 'valibot'

const customerSearchSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
  q: v.optional(v.string()),
  area: v.optional(v.string()),
})

export const Route = createFileRoute('/_auth/_portal/portal/customers')({
  async loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<customersPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
    })
  },
  validateSearch: customerSearchSchema,
})
