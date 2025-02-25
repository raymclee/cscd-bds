import { createFileRoute } from '@tanstack/react-router'
import node, {
  MapIndexPageQuery,
} from '__generated__/MapIndexPageQuery.graphql'
import { loadQuery } from 'react-relay'

export const Route = createFileRoute('/__auth/__dashboard/__scaled/__map/')({
  loader: async ({ context: { RelayEnvironment, session } }) => {
    return loadQuery<MapIndexPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
      orderBy: [
        { field: 'TENDER_DATE', direction: 'ASC' },
        { field: 'CLOSING_DATE', direction: 'ASC' },
        { field: 'CREATED_AT', direction: 'ASC' },
      ],
      visitOrderBy: { field: 'DATE', direction: 'DESC' },
    })
  },
})
