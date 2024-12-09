import { useCreateTenderMutation } from "__generated__/useCreateTenderMutation.graphql";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const mutation = graphql`
  mutation useCreateTenderMutation(
    $input: CreateTenderInput!
    $connections: [ID!]!
    $imageFileNames: [String!]!
    $attachmentFileNames: [String!]!
  ) {
    createTender(
      input: $input
      imageFileNames: $imageFileNames
      attachmentFileNames: $attachmentFileNames
    ) {
      edges @prependEdge(connections: $connections) {
        node {
          ...tenderListItemFragment
        }
      }
    }
  }
`;

export function useCreateTender() {
  return useMutation<useCreateTenderMutation>(mutation);
}
