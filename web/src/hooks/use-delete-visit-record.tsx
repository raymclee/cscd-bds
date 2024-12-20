import { useDeleteVisitRecordMutation } from "__generated__/useDeleteVisitRecordMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useDeleteVisitRecord() {
  return useMutation<useDeleteVisitRecordMutation>(graphql`
    mutation useDeleteVisitRecordMutation($id: ID!, $connections: [ID!]!) {
      deleteVisitRecord(id: $id) {
        id @deleteEdge(connections: $connections)
      }
    }
  `);
}
