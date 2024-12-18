import { useCreateVisitRecordMutation } from "__generated__/useCreateVisitRecordMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useCreateVisitRecord() {
  return useMutation<useCreateVisitRecordMutation>(graphql`
    mutation useCreateVisitRecordMutation(
      $input: CreateVisitRecordInput!
      $connections: [ID!]!
    ) {
      createVisitRecord(input: $input) {
        edges @prependEdge(connections: $connections) {
          node {
            ...visitRecordItemFragment
          }
        }
      }
    }
  `);
}
