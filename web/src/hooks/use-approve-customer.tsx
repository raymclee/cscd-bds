import { useMutation, graphql } from "react-relay";

export function useApproveCustomer() {
  return useMutation(graphql`
    mutation useApproveCustomerMutation($id: ID!) {
      approveCustomer(id: $id) {
        ...customerDetailFragment
      }
    }
  `);
}
