import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { loadQuery } from 'react-relay'
import node, { competitorsQuery } from '__generated__/competitorsQuery.graphql'
import * as v from 'valibot'

const competitorSearchParams = v.object({
  page: v.optional(v.number(), 1),
  q: v.optional(v.string()),
})

export const Route = createFileRoute(
  '/_auth/_portal/portal/_admin/competitors',
)({
  loader({ context: { RelayEnvironment } }) {
    return loadQuery<competitorsQuery>(RelayEnvironment, node, {})
  },
  validateSearch: competitorSearchParams,
})
