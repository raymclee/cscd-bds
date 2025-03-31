import { useCreateCustomerV2Mutation } from "__generated__/useCreateCustomerV2Mutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateCustomerV2() {
  return useMutation<useCreateCustomerV2Mutation>(graphql`
    mutation useCreateCustomerV2Mutation(
      $customerInput: CreateCustomerInput!
      $profileInput: CreateCustomerProfileInput!
    ) {
      createCustomerV2(
        customerInput: $customerInput
        profileInput: $profileInput
      ) {
        ...customerDetailFragment
        activeProfile {
          id
          approvalStatus
          name
          createdAt
          ownerType
          industry
          size
        }
        area {
          id
          code
          name
        }
        tenders {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `);
}
