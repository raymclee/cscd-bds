import { createFileRoute } from '@tanstack/react-router'
import { loadQuery } from 'react-relay'
import node, {
  customersDetailPageQuery,
} from '__generated__/customersDetailPageQuery.graphql'
import * as v from 'valibot'

const customerDetailSearchSchema = v.object({
  tab: v.optional(
    v.pipe(
      v.number(),
      v.transform((value) => Number(value)),
    ),
    1,
  ),
})

export const Route = createFileRoute('/__auth/__portal/portal/customers_/$id')({
  loader({ context: { RelayEnvironment }, params: { id } }) {
    return loadQuery<customersDetailPageQuery>(RelayEnvironment, node, {
      id,
      orderBy: { field: 'DATE', direction: 'DESC' },
    })
  },
  validateSearch: customerDetailSearchSchema,
})
