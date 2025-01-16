import { useUpdateProjectMutation } from "__generated__/useUpdateProjectMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateProject() {
  return useMutation<useUpdateProjectMutation>(graphql`
    mutation useUpdateProjectMutation($id: ID!, $input: UpdateProjectInput!) {
      updateProject(id: $id, input: $input) {
        fsDate
        opDate
      }
    }
  `);
}
