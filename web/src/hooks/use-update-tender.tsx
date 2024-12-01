import { useUpdateTenderMutation } from "__generated__/useUpdateTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateTender() {
  return useMutation<useUpdateTenderMutation>(graphql`
    mutation useUpdateTenderMutation($id: ID!, $input: UpdateTenderInput!) {
      updateTender(id: $id, input: $input) {
        ...tenderListItemFragment
      }
    }
  `);
}
