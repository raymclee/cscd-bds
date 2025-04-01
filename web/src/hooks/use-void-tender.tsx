import { useVoidTenderMutation } from "__generated__/useVoidTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useVoidTender() {
  return useMutation<useVoidTenderMutation>(graphql`
    mutation useVoidTenderMutation($id: ID!) {
      voidTender(id: $id) {
        ...tenderDetailFragment
      }
    }
  `);
}
