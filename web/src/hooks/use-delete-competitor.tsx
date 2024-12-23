import { graphql, useMutation } from "react-relay";

export function useDeleteCompetitor() {
  return useMutation(graphql`
    mutation useDeleteCompetitorMutation($id: ID!, $connections: [ID!]!) {
      deleteCompetitor(id: $id) {
        id @deleteEdge(connections: $connections)
      }
    }
  `);
}
