import { useCreateTenderMutation } from "__generated__/useCreateTenderMutation.graphql";
import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const mutation = graphql`
  mutation useCreateTenderMutation(
    $input: CreateTenderInput!
    $connections: [ID!]!
    $imageFileNames: [String!]!
    $attachmentFileNames: [String!]!
    $geoCoordinate: [Float!]
  ) {
    createTender(
      input: $input
      imageFileNames: $imageFileNames
      attachmentFileNames: $attachmentFileNames
      geoCoordinate: $geoCoordinate
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
