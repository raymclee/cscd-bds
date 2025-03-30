import { useApproveTenderMutation } from "__generated__/useApproveTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useApproveTender() {
  return useMutation<useApproveTenderMutation>(graphql`
    mutation useApproveTenderMutation($id: ID!, $profileId: ID!) {
      approveTender(id: $id, profileId: $profileId) {
        ...tenderDetailFragment
      }
    }
  `);
}
