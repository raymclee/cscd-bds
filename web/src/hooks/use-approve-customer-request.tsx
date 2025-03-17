import { useMutation, graphql } from "react-relay";

export function useApproveCustomerRequest() {
  return useMutation(graphql`
    mutation useApproveCustomerRequestMutation($id: ID!) {
      approveCustomerRequest(id: $id) {
        ...customerDetailFragment
        draft {
          name
          ownerType
          industry
          size
          contactPerson
          contactPersonPosition
          contactPersonPhone
          contactPersonEmail
          area {
            id
            name
            code
          }
          sales {
            id
            name
          }
        }
      }
    }
  `);
}
