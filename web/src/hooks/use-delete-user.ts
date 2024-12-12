import { useDeleteTenderMutation } from "__generated__/useDeleteTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useDeleteUser() {
  return useMutation<useDeleteTenderMutation>(graphql`
    mutation useDeleteUserMutation($id: ID!, $connections: [ID!]!) {
      deleteUser(id: $id) {
        id @deleteEdge(connections: $connections)
      }
    }
  `);
}
