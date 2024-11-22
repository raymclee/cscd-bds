import { createFileRoute } from '@tanstack/react-router'
// import node, { MapPageQuery } from '__generated__/MapPageQuery.graphql'
import { loadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'

export const Route = createFileRoute('/__auth/__imap/h2')({
  async loader({ context: { RelayEnvironment } }) {
    // return loadQuery<MapPageQuery>(RelayEnvironment, node, {})
  },
})
