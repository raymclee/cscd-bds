import { useMutation, graphql } from "react-relay";

export function useRejectCustomer() {
  return useMutation(graphql`
    mutation useRejectCustomerMutation($id: ID!) {
      rejectCustomer(id: $id) {
        ...customerDetailFragment
      }
    }
  `);
}
