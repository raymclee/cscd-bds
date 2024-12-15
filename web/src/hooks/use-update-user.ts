import { useUpdateUserMutation } from "__generated__/useUpdateUserMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateUser() {
  return useMutation<useUpdateUserMutation>(graphql`
    mutation useUpdateUserMutation($id: ID!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) {
        id
        name
        email
        username
        openID
        avatarURL
        disabled
        areas {
          edges {
            node {
              id
              name
            }
          }
        }
        isSuperAdmin
        isAdmin
        isCeo
        hasMapAccess
        hasEditAccess
      }
    }
  `);
}
