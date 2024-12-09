import { useUpdateCustomerMutation } from "__generated__/useUpdateCustomerMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateCustomer() {
  return useMutation<useUpdateCustomerMutation>(graphql`
    mutation useUpdateCustomerMutation($id: ID!, $input: UpdateCustomerInput!) {
      updateCustomer(id: $id, input: $input) {
        ...customerDetailFragment
      }
    }
  `);
}
