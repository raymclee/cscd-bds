import { createFileRoute } from '@tanstack/react-router'
import node, {
  MapIndexPageQuery,
} from '__generated__/MapIndexPageQuery.graphql'
import { loadQuery } from 'react-relay'

export const Route = createFileRoute('/__auth/__map/')({
  loader: async ({ context: { RelayEnvironment } }) => {
    return loadQuery<MapIndexPageQuery>(RelayEnvironment, node, {})
  },
})
