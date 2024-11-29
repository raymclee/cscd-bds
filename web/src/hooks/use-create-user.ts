import { useCreateUserMutation } from "__generated__/useCreateUserMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateUser() {
  return useMutation<useCreateUserMutation>(graphql`
    mutation useCreateUserMutation(
      $input: CreateUserInput!
      $connections: [ID!]!
    ) {
      createUser(input: $input) {
        edges
          @prependNode(connections: $connections, edgeTypeName: "UserEdge") {
          node {
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
            isAdmin
            isEditor
            hasMapAccess
          }
        }
      }
    }
  `);
}
