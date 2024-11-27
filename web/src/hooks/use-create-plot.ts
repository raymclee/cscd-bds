import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import { CreatePlotInput } from "~/graphql/graphql";
import { useCreatePlotMutation } from "__generated__/useCreatePlotMutation.graphql";

const createPlotMutation = graphql`
  mutation useCreatePlotMutation(
    $input: CreatePlotInput!
    $geoBounds: [[Float!]!]
    $connections: [ID!]!
  ) {
    createPlot(input: $input, geoBounds: $geoBounds) {
      edges @prependNode(connections: $connections, edgeTypeName: "PlotEdge") {
        node {
          id
          name
          geoBounds
          colorHex
        }
      }
    }
  }
`;

export function useCreatePlot() {
  return useMutation<useCreatePlotMutation>(createPlotMutation);
}
