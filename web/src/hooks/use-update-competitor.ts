import { useUpdateCompetitorMutation } from "__generated__/useUpdateCompetitorMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateCompetitor() {
  return useMutation<useUpdateCompetitorMutation>(graphql`
    mutation useUpdateCompetitorMutation(
      $id: ID!
      $input: UpdateCompetitorInput!
    ) {
      updateCompetitor(id: $id, input: $input) {
        id
        shortName
        name
      }
    }
  `);
}
