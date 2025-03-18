import { useLoseTenderMutation } from "__generated__/useLoseTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useLoseTender() {
  return useMutation<useLoseTenderMutation>(graphql`
    mutation useLoseTenderMutation($id: ID!, $input: LoseTenderInput!) {
      loseTender(id: $id, input: $input) {
        ...tenderDetailFragment
      }
    }
  `);
}
