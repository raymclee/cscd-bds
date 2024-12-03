/**
 * @generated SignedSource<<086afe3c6eb7388de8f5b4aa8db72b06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
  clearCustomer?: boolean | null | undefined;
  clearCustomerRelationshipRating?: boolean | null | undefined;
  clearCustomerRelationshipRatingOverview?: boolean | null | undefined;
  clearDesignUnit?: boolean | null | undefined;
  clearDeveloper?: boolean | null | undefined;
  clearDistrict?: boolean | null | undefined;
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
  clearProvince?: boolean | null | undefined;
  clearRemark?: boolean | null | undefined;
  clearSizeAndValueRating?: boolean | null | undefined;
  clearSizeAndValueRatingOverview?: boolean | null | undefined;
  clearTenderClosingDate?: boolean | null | undefined;
  clearTenderCode?: boolean | null | undefined;
  clearTenderDate?: boolean | null | undefined;
  clearTenderForm?: boolean | null | undefined;
  clearTenderSituations?: boolean | null | undefined;
  clearTenderWinAmount?: boolean | null | undefined;
  clearTenderWinCompany?: boolean | null | undefined;
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
  developer?: string | null | undefined;
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
  tenderClosingDate?: any | null | undefined;
  tenderCode?: string | null | undefined;
  tenderDate?: any | null | undefined;
  tenderForm?: string | null | undefined;
  tenderSituations?: string | null | undefined;
  tenderWinAmount?: number | null | undefined;
  tenderWinCompany?: string | null | undefined;
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
    readonly architect: string | null | undefined;
    readonly area: {
      readonly code: string;
      readonly id: string;
      readonly name: string;
    };
    readonly attachements: ReadonlyArray<string> | null | undefined;
    readonly biddingDate: any | null | undefined;
    readonly city: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly code: string;
    readonly contractor: string | null | undefined;
    readonly createdBy: {
      readonly id: string;
      readonly name: string;
    };
    readonly customer: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly discoveryDate: any;
    readonly district: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly estimatedAmount: number | null | undefined;
    readonly estimatedProjectEndDate: any | null | undefined;
    readonly estimatedProjectStartDate: any | null | undefined;
    readonly finder: {
      readonly id: string;
      readonly name: string;
    };
    readonly followingSales: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }> | null | undefined;
    readonly fullAddress: string | null | undefined;
    readonly id: string;
    readonly images: ReadonlyArray<string> | null | undefined;
    readonly name: string;
    readonly prepareToBid: boolean;
    readonly projectCode: string | null | undefined;
    readonly projectType: string | null | undefined;
    readonly province: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly status: number;
    readonly tenderDate: any | null | undefined;
    readonly visitRecords: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v5 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "adcode",
    "storageKey": null
  }
],
v6 = [
  {
    "alias": null,
    "args": [
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
    "concreteType": "Tender",
    "kind": "LinkedField",
    "name": "updateTender",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
        "concreteType": "Area",
        "kind": "LinkedField",
        "name": "area",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
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
        "name": "discoveryDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "createdBy",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "finder",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "followingSales",
        "plural": true,
        "selections": (v4/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Province",
        "kind": "LinkedField",
        "name": "province",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "City",
        "kind": "LinkedField",
        "name": "city",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "District",
        "kind": "LinkedField",
        "name": "district",
        "plural": false,
        "selections": (v5/*: any*/),
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
        "kind": "ScalarField",
        "name": "tenderDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "contractor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "prepareToBid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "projectCode",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "biddingDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "estimatedProjectStartDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "estimatedProjectEndDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "projectType",
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
        "name": "images",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "attachements",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "architect",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "VisitRecordConnection",
        "kind": "LinkedField",
        "name": "visitRecords",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "VisitRecordEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "VisitRecord",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateTenderMutation",
    "selections": (v6/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateTenderMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "3c0cef369fe92518e924524f48ee8610",
    "id": null,
    "metadata": {},
    "name": "useUpdateTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateTenderMutation(\n  $id: ID!\n  $input: UpdateTenderInput!\n) {\n  updateTender(id: $id, input: $input) {\n    id\n    name\n    code\n    status\n    area {\n      id\n      name\n      code\n    }\n    customer {\n      id\n      name\n    }\n    discoveryDate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    followingSales {\n      id\n      name\n    }\n    province {\n      id\n      name\n      adcode\n    }\n    city {\n      id\n      name\n      adcode\n    }\n    district {\n      id\n      name\n      adcode\n    }\n    estimatedAmount\n    tenderDate\n    contractor\n    prepareToBid\n    projectCode\n    biddingDate\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    projectType\n    fullAddress\n    images\n    attachements\n    architect\n    visitRecords {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b717544d73ba3866431a1a5d13173eba";

export default node;
