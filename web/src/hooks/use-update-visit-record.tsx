import { useUpdateCustomerMutation } from "__generated__/useUpdateCustomerMutation.graphql";
import { useUpdateVisitRecordMutation } from "__generated__/useUpdateVisitRecordMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateVisitRecord() {
  return useMutation<useUpdateVisitRecordMutation>(graphql`
    mutation useUpdateVisitRecordMutation(
      $id: ID!
      $input: UpdateVisitRecordInput!
    ) {
      updateVisitRecord(id: $id, input: $input) {
        ...visitRecordItemFragment
      }
    }
  `);
}
