import { useCreateTenderProfileMutation } from "__generated__/useCreateTenderProfileMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateTenderProfile() {
  return useMutation<useCreateTenderProfileMutation>(graphql`
    mutation useCreateTenderProfileMutation(
      $id: ID!
      $input: CreateTenderProfileInput!
      $imageFileNames: [String!]!
      $attachmentFileNames: [String!]!
    ) {
      createTenderProfile(
        id: $id
        input: $input
        imageFileNames: $imageFileNames
        attachmentFileNames: $attachmentFileNames
      ) {
        ...tenderDetailFragment
      }
    }
  `);
}
