import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const mutation = graphql`
  mutation useDeleteTenderMutation($id: ID!) {
    deleteTender(id: $id) {
      id @deleteRecord
    }
  }
`;

export function useDeleteTenderMutation() {
  return useMutation(mutation);
}
