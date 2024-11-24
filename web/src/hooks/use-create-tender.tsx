import { useMutation } from "react-relay";
import { graphql } from "relay-runtime";

const mutation = graphql`
  mutation useCreateTenderMutation($input: CreateTenderInput!) {
    createTender(input: $input) {
      id
    }
  }
`;

export function useCreateTenderMutation() {
  return useMutation(mutation);
}
