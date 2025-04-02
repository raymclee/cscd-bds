import { useUpdateTenderV2Mutation } from "__generated__/useUpdateTenderV2Mutation.graphql";
import { graphql, useMutation } from "react-relay";

export const useUpdateTenderV2 = () => {
  return useMutation<useUpdateTenderV2Mutation>(graphql`
    mutation useUpdateTenderV2Mutation(
      $id: ID!
      $tenderInput: UpdateTenderInput!
      $profileInput: CreateTenderProfileInput!
      $imageFileNames: [String!]!
      $attachmentFileNames: [String!]!
      $removeImageFileNames: [String!]
      $removeAttachmentFileNames: [String!]
    ) {
      updateTenderV2(
        id: $id
        tenderInput: $tenderInput
        profileInput: $profileInput
        imageFileNames: $imageFileNames
        attachmentFileNames: $attachmentFileNames
        removeImageFileNames: $removeImageFileNames
        removeAttachmentFileNames: $removeAttachmentFileNames
      ) {
        ...tenderDetailFragment
      }
    }
  `);
};
