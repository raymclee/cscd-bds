import { createFileRoute, redirect } from '@tanstack/react-router'
import node, {
  tendersEditPageQuery,
} from '__generated__/tendersEditPageQuery.graphql'
import { loadQuery } from 'react-relay'
import { canEdit } from '~/lib/permission'

export const Route = createFileRoute(
  '/_auth/_portal/portal/tenders_/$id_/edit',
)({
  beforeLoad({ context: { session } }) {
    if (!canEdit(session)) {
      throw redirect({ to: '/access-denied' })
    }
    return { userId: session.userId }
  },
  loader({ context: { RelayEnvironment, userId }, params: { id } }) {
    return loadQuery<tendersEditPageQuery>(RelayEnvironment, node, {
      id,
      userId,
    })
  },
})
