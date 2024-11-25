import { useCreateTenderMutation } from "__generated__/useCreateTenderMutation.graphql";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const mutation = graphql`
  mutation useCreateTenderMutation($input: CreateTenderInput!) {
    createTender(input: $input) {
      id
      name
      status
      createdAt
      estimatedAmount
      customer {
        name
      }
      images
      fullAddress
      tenderDate
      discoveryDate
      area {
        id
        name
      }
    }
  }
`;

export function useCreateTender() {
  return useMutation<useCreateTenderMutation>(mutation);
}
