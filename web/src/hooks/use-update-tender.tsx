import { useUpdateTenderMutation } from "__generated__/useUpdateTenderMutation.graphql";
import { graphql, useMutation } from "react-relay";

export function useUpdateTender() {
  return useMutation<useUpdateTenderMutation>(graphql`
    mutation useUpdateTenderMutation($id: ID!, $input: UpdateTenderInput!) {
      updateTender(id: $id, input: $input) {
        id
        name
        code
        status
        area {
          id
          name
          code
        }
        customer {
          id
          name
        }
        discoveryDate
        createdBy {
          id
          name
        }
        finder {
          id
          name
        }
        followingSales {
          id
          name
        }
        province {
          id
          name
          adcode
        }
        city {
          id
          name
          adcode
        }
        district {
          id
          name
          adcode
        }
        estimatedAmount
        tenderDate
        contractor
        prepareToBid
        projectCode
        biddingDate
        estimatedProjectStartDate
        estimatedProjectEndDate
        projectType
        fullAddress
        images
        attachements
        architect
        visitRecords {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `);
}
