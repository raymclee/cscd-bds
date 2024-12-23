import { useCreateCompetitorMutation } from "__generated__/useCreateCompetitorMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateCompetitor() {
  return useMutation<useCreateCompetitorMutation>(graphql`
    mutation useCreateCompetitorMutation(
      $input: CreateCompetitorInput!
      $connections: [ID!]!
    ) {
      createCompetitor(input: $input)
        @appendNode(connections: $connections, edgeTypeName: "CompetitorEdge") {
        id
        name
        shortName
      }
    }
  `);
}
