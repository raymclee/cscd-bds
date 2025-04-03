import { useUpdateCustomerV2Mutation } from "__generated__/useUpdateCustomerV2Mutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateCustomerV2() {
  return useMutation<useUpdateCustomerV2Mutation>(graphql`
    mutation useUpdateCustomerV2Mutation(
      $id: ID!
      $customerInput: UpdateCustomerInput!
      $profileInput: CreateCustomerProfileInput!
    ) {
      updateCustomerV2(
        id: $id
        customerInput: $customerInput
        profileInput: $profileInput
      ) {
        id
        ...customerDetailFragment
      }
    }
  `);
}
