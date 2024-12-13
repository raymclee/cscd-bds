import { useSetCompetitorMutation } from "__generated__/useSetCompetitorMutation.graphql";
import { useMutation, graphql } from "react-relay";

export function useSetCompetitor() {
  return useMutation<useSetCompetitorMutation>(graphql`
    mutation useSetCompetitorMutation(
      $tenderId: ID!
      $competitorId: ID!
      $won: Boolean!
    ) {
      setTenderCompetitor(
        tenderId: $tenderId
        competitorId: $competitorId
        won: $won
      ) {
        ...tenderListItemFragment
      }
    }
  `);
}
