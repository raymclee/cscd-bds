import { useCreateTenderMutation } from "__generated__/useCreateTenderMutation.graphql";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const mutation = graphql`
  mutation useCreateTenderMutation(
    $input: CreateTenderInput!
    $connections: [ID!]!
  ) {
    createTender(input: $input) {
      edges
        @prependNode(connections: $connections, edgeTypeName: "TenderEdge") {
        node {
          ...tendersTenderListItemFragment
        }
      }
    }
  }
`;

export function useCreateTender() {
  return useMutation<useCreateTenderMutation>(mutation);
}
