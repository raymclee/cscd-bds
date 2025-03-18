import { useWinTenderMutation } from "__generated__/useWinTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useWinTender() {
  return useMutation<useWinTenderMutation>(graphql`
    mutation useWinTenderMutation($id: ID!, $input: WinTenderInput!) {
      winTender(id: $id, input: $input) {
        ...tenderDetailFragment
      }
    }
  `);
}
