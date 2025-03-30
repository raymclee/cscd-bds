import { useCreateTenderV2Mutation } from "__generated__/useCreateTenderV2Mutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateTenderV2() {
  return useMutation<useCreateTenderV2Mutation>(graphql`
    mutation useCreateTenderV2Mutation(
      $tenderInput: CreateTenderInput!
      $profileInput: CreateTenderProfileInput!
      $imageFileNames: [String!]!
      $attachmentFileNames: [String!]!
      $connections: [ID!]!
    ) {
      createTenderV2(
        tenderInput: $tenderInput
        profileInput: $profileInput
        imageFileNames: $imageFileNames
        attachmentFileNames: $attachmentFileNames
      ) @appendNode(connections: $connections, edgeTypeName: "TenderEdge") {
        ...tenderListItemFragment
      }
    }
  `);
}
