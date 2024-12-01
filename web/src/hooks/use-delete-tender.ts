import { useDeleteTenderMutation } from "__generated__/useDeleteTenderMutation.graphql";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const mutation = graphql`
  mutation useDeleteTenderMutation($id: ID!, $connections: [ID!]!) {
    deleteTender(id: $id) {
      id @deleteEdge(connections: $connections)
    }
  }
`;

export function useDeleteTenderMutation() {
  return useMutation<useDeleteTenderMutation>(mutation);
}
