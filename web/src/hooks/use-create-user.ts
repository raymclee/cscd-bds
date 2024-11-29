import { useCreateUserMutation } from "__generated__/useCreateUserMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateUser() {
  return useMutation<useCreateUserMutation>(graphql`
    mutation useCreateUserMutation(
      $input: CreateUserInput!
      $connections: [ID!]!
    ) {
      createUser(input: $input) {
        edges @appendNode(connections: $connections, edgeTypeName: "UserEdge") {
          node {
            id
            name
            areas {
              edges {
                node {
                  name
                }
              }
            }
            isAdmin
            isLeader
          }
        }
      }
    }
  `);
}
