/**
 * @generated SignedSource<<88b941a854bf11b144623cb127131369>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateTenderInput = {
  addFollowingSaleIDs?: ReadonlyArray<string> | null | undefined;
  addVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  address?: string | null | undefined;
  appendAttachements?: ReadonlyArray<string> | null | undefined;
  appendImages?: ReadonlyArray<string> | null | undefined;
  architect?: string | null | undefined;
  areaID?: string | null | undefined;
  attachements?: ReadonlyArray<string> | null | undefined;
  biddingDate?: any | null | undefined;
  biddingInstructions?: string | null | undefined;
  cityID?: string | null | undefined;
  clearAddress?: boolean | null | undefined;
  clearArchitect?: boolean | null | undefined;
  clearAttachements?: boolean | null | undefined;
  clearBiddingDate?: boolean | null | undefined;
  clearBiddingInstructions?: boolean | null | undefined;
  clearCity?: boolean | null | undefined;
  clearCompetitivePartnershipRating?: boolean | null | undefined;
  clearCompetitivePartnershipRatingOverview?: boolean | null | undefined;
  clearCompetitorSituations?: boolean | null | undefined;
  clearConstructionArea?: boolean | null | undefined;
  clearConsultingFirm?: boolean | null | undefined;
  clearContractForm?: boolean | null | undefined;
  clearContractor?: boolean | null | undefined;
  clearCostEngineer?: boolean | null | undefined;
  clearCreditAndPaymentRating?: boolean | null | undefined;
  clearCreditAndPaymentRatingOverview?: boolean | null | undefined;
  clearCustomerRelationshipRating?: boolean | null | undefined;
  clearCustomerRelationshipRatingOverview?: boolean | null | undefined;
  clearDesignUnit?: boolean | null | undefined;
  clearEstimatedAmount?: boolean | null | undefined;
  clearEstimatedProjectEndDate?: boolean | null | undefined;
  clearEstimatedProjectStartDate?: boolean | null | undefined;
  clearFacadeConsultant?: boolean | null | undefined;
  clearFollowingSales?: boolean | null | undefined;
  clearFullAddress?: boolean | null | undefined;
  clearImages?: boolean | null | undefined;
  clearLastTenderAmount?: boolean | null | undefined;
  clearManagementCompany?: boolean | null | undefined;
  clearOwnerSituations?: boolean | null | undefined;
  clearProjectCode?: boolean | null | undefined;
  clearProjectDefinition?: boolean | null | undefined;
  clearProjectType?: boolean | null | undefined;
  clearRemark?: boolean | null | undefined;
  clearSizeAndValueRating?: boolean | null | undefined;
  clearSizeAndValueRatingOverview?: boolean | null | undefined;
  clearTenderClosingDate?: boolean | null | undefined;
  clearTenderCode?: boolean | null | undefined;
  clearTenderDate?: boolean | null | undefined;
  clearTenderForm?: boolean | null | undefined;
  clearTenderSituations?: boolean | null | undefined;
  clearTenderWinAmount?: boolean | null | undefined;
  clearTenderWinDate?: boolean | null | undefined;
  clearTenderingAgency?: boolean | null | undefined;
  clearTimeLimitRating?: boolean | null | undefined;
  clearTimeLimitRatingOverview?: boolean | null | undefined;
  clearVisitRecords?: boolean | null | undefined;
  code?: string | null | undefined;
  competitivePartnershipRating?: number | null | undefined;
  competitivePartnershipRatingOverview?: string | null | undefined;
  competitorSituations?: string | null | undefined;
  constructionArea?: string | null | undefined;
  consultingFirm?: string | null | undefined;
  contractForm?: string | null | undefined;
  contractor?: string | null | undefined;
  costEngineer?: string | null | undefined;
  createdByID?: string | null | undefined;
  creditAndPaymentRating?: number | null | undefined;
  creditAndPaymentRatingOverview?: string | null | undefined;
  customerID?: string | null | undefined;
  customerRelationshipRating?: number | null | undefined;
  customerRelationshipRatingOverview?: string | null | undefined;
  designUnit?: string | null | undefined;
  discoveryDate?: any | null | undefined;
  districtID?: string | null | undefined;
  estimatedAmount?: number | null | undefined;
  estimatedProjectEndDate?: any | null | undefined;
  estimatedProjectStartDate?: any | null | undefined;
  facadeConsultant?: string | null | undefined;
  finderID?: string | null | undefined;
  fullAddress?: string | null | undefined;
  images?: ReadonlyArray<string> | null | undefined;
  keyProject?: boolean | null | undefined;
  lastTenderAmount?: number | null | undefined;
  managementCompany?: string | null | undefined;
  name?: string | null | undefined;
  ownerSituations?: string | null | undefined;
  prepareToBid?: boolean | null | undefined;
  projectCode?: string | null | undefined;
  projectDefinition?: string | null | undefined;
  projectType?: string | null | undefined;
  provinceID?: string | null | undefined;
  remark?: string | null | undefined;
  removeFollowingSaleIDs?: ReadonlyArray<string> | null | undefined;
  removeVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  sizeAndValueRating?: number | null | undefined;
  sizeAndValueRatingOverview?: string | null | undefined;
  status?: number | null | undefined;
  tenderClosingDate?: string | null | undefined;
  tenderCode?: string | null | undefined;
  tenderDate?: any | null | undefined;
  tenderForm?: string | null | undefined;
  tenderSituations?: string | null | undefined;
  tenderWinAmount?: string | null | undefined;
  tenderWinDate?: any | null | undefined;
  tenderingAgency?: string | null | undefined;
  timeLimitRating?: number | null | undefined;
  timeLimitRatingOverview?: string | null | undefined;
  updatedAt?: any | null | undefined;
};
export type useUpdateTenderMutation$variables = {
  id: string;
  input: UpdateTenderInput;
};
export type useUpdateTenderMutation$data = {
  readonly updateTender: {
    readonly " $fragmentSpreads": FragmentRefs<"tenderListItemFragment">;
  };
};
export type useUpdateTenderMutation = {
  response: useUpdateTenderMutation$data;
  variables: useUpdateTenderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "updateTender",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "tenderListItemFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "updateTender",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "estimatedAmount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Customer",
            "kind": "LinkedField",
            "name": "customer",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "images",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fullAddress",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tenderDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "discoveryDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cbc43585ceb1604983e8192f9c3260f9",
    "id": null,
    "metadata": {},
    "name": "useUpdateTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateTenderMutation(\n  $id: ID!\n  $input: UpdateTenderInput!\n) {\n  updateTender(id: $id, input: $input) {\n    ...tenderListItemFragment\n    id\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  name\n  status\n  createdAt\n  estimatedAmount\n  customer {\n    name\n    id\n  }\n  images\n  fullAddress\n  tenderDate\n  discoveryDate\n  area {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "213a9bf7e7c7ddd74c3ea332c95de32c";

export default node;
