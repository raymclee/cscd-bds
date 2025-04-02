import { useUpdateTenderMutation } from "__generated__/useUpdateTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateTender() {
  return useMutation<useUpdateTenderMutation>(graphql`
    mutation useUpdateTenderMutation(
      $id: ID!
      $tenderInput: UpdateTenderInput!
      $profileInput: CreateTenderProfileInput!
      $imageFileNames: [String!]!
      $removeImageFileNames: [String!]
    ) {
      updateTender(
        id: $id
        tenderInput: $tenderInput
        profileInput: $profileInput
        imageFileNames: $imageFileNames
        removeImageFileNames: $removeImageFileNames
      ) {
        ...tenderDetailFragment
        customer {
          id
          name
        }
      }
    }
  `);
}
``;
