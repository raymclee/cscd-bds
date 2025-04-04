import { useCreateCustomerV2Mutation } from "__generated__/useCreateCustomerV2Mutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateCustomerV2() {
  return useMutation<useCreateCustomerV2Mutation>(graphql`
    mutation useCreateCustomerV2Mutation(
      $customerInput: CreateCustomerInput!
      $profileInput: CreateCustomerProfileInput!
      $connections: [ID!]!
    ) {
      createCustomerV2(
        customerInput: $customerInput
        profileInput: $profileInput
      ) @appendNode(connections: $connections, edgeTypeName: "CustomerEdge") {
        id
        ...customerDetailFragment
      }
    }
  `);
}
