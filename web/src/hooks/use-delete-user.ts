import { graphql, useMutation } from "react-relay";

export function useDeleteUser() {
  return useMutation(graphql`
    mutation useDeleteUserMutation($id: ID!) {
      deleteUser(id: $id) {
        id
      }
    }
  `);
}
