import { useCreateTenderMutation } from "__generated__/useCreateTenderMutation.graphql";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const mutation = graphql`
  mutation useCreateTenderMutation(
    $tenderInput: CreateTenderInput!
    $profileInput: CreateTenderProfileInput!
    $connections: [ID!]!
    $imageFileNames: [String!]!
  ) {
    createTender(
      tenderInput: $tenderInput
      profileInput: $profileInput
      imageFileNames: $imageFileNames
    ) @prependNode(connections: $connections, edgeTypeName: "TenderEdge") {
      ...tenderListItemFragment
    }
  }
`;

export function useCreateTender() {
  return useMutation<useCreateTenderMutation>(mutation);
}
