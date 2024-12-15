import { createFileRoute } from '@tanstack/react-router'
import { loadQuery } from 'react-relay'
import node, {
  tendersResultPageQuery,
} from '__generated__/tendersResultPageQuery.graphql'

export const Route = createFileRoute(
  '/_auth/_portal/portal/tenders_/$id/result',
)({
  loader({ context: { RelayEnvironment, session }, params: { id } }) {
    return loadQuery<tendersResultPageQuery>(RelayEnvironment, node, {
      id,
      userId: session.userId,
    })
  },
})
