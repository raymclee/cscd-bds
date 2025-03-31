import { useRejectTenderMutation } from "__generated__/useRejectTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useRejectTender() {
  return useMutation<useRejectTenderMutation>(graphql`
    mutation useRejectTenderMutation($id: ID!) {
      rejectTender(id: $id) {
        ...tenderDetailFragment
      }
    }
  `);
}
