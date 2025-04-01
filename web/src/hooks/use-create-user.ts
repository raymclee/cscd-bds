import { useCreateUserMutation } from "__generated__/useCreateUserMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateUser() {
  return useMutation<useCreateUserMutation>(graphql`
    mutation useCreateUserMutation(
      $input: CreateUserInput!
      $connections: [ID!]!
    ) {
      createUser(input: $input) {
        edges @appendEdge(connections: $connections) {
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
            leader {
              id
              name
            }
            teamMembers {
              id
              name
            }
            projects {
              edges {
                node {
                  id
                  code
                }
              }
            }
            isAdmin
            isSuperAdmin
            isCeo
            hasMapAccess
            hasEditAccess
          }
        }
      }
    }
  `);
}
