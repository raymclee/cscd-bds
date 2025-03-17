import { graphql, useMutation } from "react-relay";

export function useUpdateCustomerRequest() {
  return useMutation(graphql`
    mutation useUpdateCustomerRequestMutation(
      $id: ID!
      $input: UpdateCustomerInput!
    ) {
      updateCustomerRequest(id: $id, input: $input) {
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
            code
            name
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
