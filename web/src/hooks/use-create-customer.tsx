import { useCreateCustomerMutation } from "__generated__/useCreateCustomerMutation.graphql";
import { graphql } from "relay-runtime";

import { useMutation } from "react-relay";

export function useCreateCustomer() {
  return useMutation<useCreateCustomerMutation>(graphql`
    mutation useCreateCustomerMutation(
      $input: CreateCustomerInput!
      $connections: [ID!]!
    ) {
      createCustomer(input: $input) {
        edges @appendEdge(connections: $connections) {
          node {
            ...customerDetailFragment
          }
        }
      }
    }
  `);
}
