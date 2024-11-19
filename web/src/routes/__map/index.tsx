import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__map/')({
  loader: async ({ context: { RelayEnvironment } }) => {
    // return loadQuery<MapPageQuery>(RelayEnvironment, node, {});
  },
})
