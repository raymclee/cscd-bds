import { useMutation, graphql } from "react-relay";

export function useRejectCustomerRequest() {
  return useMutation(graphql`
    mutation useRejectCustomerRequestMutation($id: ID!) {
      rejectCustomerRequest(id: $id) {
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
