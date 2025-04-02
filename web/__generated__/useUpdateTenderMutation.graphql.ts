/**
 * @generated SignedSource<<6458811f2d31fdeda98524c61dcd2907>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateTenderInput = {
  activeProfileID?: string | null | undefined;
  addCompetitorIDs?: ReadonlyArray<string> | null | undefined;
  addFollowingSaleIDs?: ReadonlyArray<string> | null | undefined;
  addProfileIDs?: ReadonlyArray<string> | null | undefined;
  addVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  address?: string | null | undefined;
  appendAttachements?: ReadonlyArray<string> | null | undefined;
  appendImages?: ReadonlyArray<string> | null | undefined;
  approvalMsgID?: string | null | undefined;
  approvalStatus?: number | null | undefined;
  approverID?: string | null | undefined;
  architect?: string | null | undefined;
  areaID?: string | null | undefined;
  attachements?: ReadonlyArray<string> | null | undefined;
  biddingDate?: any | null | undefined;
  biddingInstructions?: string | null | undefined;
  cityID?: string | null | undefined;
  classify?: number | null | undefined;
  clearActiveProfile?: boolean | null | undefined;
  clearAddress?: boolean | null | undefined;
  clearApprovalMsgID?: boolean | null | undefined;
  clearApprover?: boolean | null | undefined;
  clearArchitect?: boolean | null | undefined;
  clearAttachements?: boolean | null | undefined;
  clearBiddingDate?: boolean | null | undefined;
  clearBiddingInstructions?: boolean | null | undefined;
  clearCity?: boolean | null | undefined;
  clearClassify?: boolean | null | undefined;
  clearCompetitivePartnershipRating?: boolean | null | undefined;
  clearCompetitivePartnershipRatingOverview?: boolean | null | undefined;
  clearCompetitorSituations?: boolean | null | undefined;
  clearCompetitors?: boolean | null | undefined;
  clearConstructionArea?: boolean | null | undefined;
  clearConsultingFirm?: boolean | null | undefined;
  clearContractForm?: boolean | null | undefined;
  clearContractor?: boolean | null | undefined;
  clearCostEngineer?: boolean | null | undefined;
  clearCreatedBy?: boolean | null | undefined;
  clearCreditAndPaymentRating?: boolean | null | undefined;
  clearCreditAndPaymentRatingOverview?: boolean | null | undefined;
  clearCurrentProgress?: boolean | null | undefined;
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
  clearFinder?: boolean | null | undefined;
  clearFollowingSales?: boolean | null | undefined;
  clearFullAddress?: boolean | null | undefined;
  clearImages?: boolean | null | undefined;
  clearLastTenderAmount?: boolean | null | undefined;
  clearLevelInvolved?: boolean | null | undefined;
  clearManagementCompany?: boolean | null | undefined;
  clearOwnerSituations?: boolean | null | undefined;
  clearPendingProfile?: boolean | null | undefined;
  clearProfiles?: boolean | null | undefined;
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
  currentProgress?: string | null | undefined;
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
  levelInvolved?: number | null | undefined;
  managementCompany?: string | null | undefined;
  name?: string | null | undefined;
  ownerSituations?: string | null | undefined;
  pendingProfileID?: string | null | undefined;
  prepareToBid?: boolean | null | undefined;
  projectCode?: string | null | undefined;
  projectDefinition?: string | null | undefined;
  projectType?: string | null | undefined;
  provinceID?: string | null | undefined;
  remark?: string | null | undefined;
  removeCompetitorIDs?: ReadonlyArray<string> | null | undefined;
  removeFollowingSaleIDs?: ReadonlyArray<string> | null | undefined;
  removeProfileIDs?: ReadonlyArray<string> | null | undefined;
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
export type CreateTenderProfileInput = {
  address?: string | null | undefined;
  approvalMsgID?: string | null | undefined;
  approvalStatus?: number | null | undefined;
  approverID?: string | null | undefined;
  architect?: string | null | undefined;
  attachments?: ReadonlyArray<string> | null | undefined;
  biddingDate?: any | null | undefined;
  biddingInstructions?: string | null | undefined;
  cityID?: string | null | undefined;
  classify?: number | null | undefined;
  competitivePartnershipRating?: number | null | undefined;
  competitivePartnershipRatingOverview?: string | null | undefined;
  competitorSituations?: string | null | undefined;
  constructionArea?: string | null | undefined;
  consultingFirm?: string | null | undefined;
  contractForm?: string | null | undefined;
  contractor?: string | null | undefined;
  costEngineer?: string | null | undefined;
  createdAt?: any | null | undefined;
  createdByID?: string | null | undefined;
  creditAndPaymentRating?: number | null | undefined;
  creditAndPaymentRatingOverview?: string | null | undefined;
  currentProgress?: string | null | undefined;
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
  geoCoordinate?: ReadonlyArray<number> | null | undefined;
  images?: ReadonlyArray<string> | null | undefined;
  keyProject?: boolean | null | undefined;
  lastTenderAmount?: number | null | undefined;
  levelInvolved?: number | null | undefined;
  managementCompany?: string | null | undefined;
  name?: string | null | undefined;
  ownerSituations?: string | null | undefined;
  prepareToBid?: boolean | null | undefined;
  projectCode?: string | null | undefined;
  projectDefinition?: string | null | undefined;
  projectType?: string | null | undefined;
  provinceID?: string | null | undefined;
  remark?: string | null | undefined;
  sizeAndValueRating?: number | null | undefined;
  sizeAndValueRatingOverview?: string | null | undefined;
  status?: number | null | undefined;
  tenderClosingDate?: any | null | undefined;
  tenderCode?: string | null | undefined;
  tenderDate?: any | null | undefined;
  tenderForm?: string | null | undefined;
  tenderID: string;
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
  imageFileNames: ReadonlyArray<string>;
  profileInput: CreateTenderProfileInput;
  removeImageFileNames?: ReadonlyArray<string> | null | undefined;
  tenderInput: UpdateTenderInput;
};
export type useUpdateTenderMutation$data = {
  readonly updateTender: {
    readonly customer: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"tenderDetailFragment">;
  };
};
export type useUpdateTenderMutation = {
  response: useUpdateTenderMutation$data;
  variables: useUpdateTenderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "imageFileNames"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "profileInput"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "removeImageFileNames"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tenderInput"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "imageFileNames",
    "variableName": "imageFileNames"
  },
  {
    "kind": "Variable",
    "name": "profileInput",
    "variableName": "profileInput"
  },
  {
    "kind": "Variable",
    "name": "removeImageFileNames",
    "variableName": "removeImageFileNames"
  },
  {
    "kind": "Variable",
    "name": "tenderInput",
    "variableName": "tenderInput"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Customer",
  "kind": "LinkedField",
  "name": "customer",
  "plural": false,
  "selections": (v8/*: any*/),
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v11 = [
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "adcode",
    "storageKey": null
  },
  (v7/*: any*/)
],
v12 = [
  (v6/*: any*/),
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
    "name": "approvalStatus",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "approver",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  },
  (v7/*: any*/),
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
    "name": "discoveryDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "address",
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
    "name": "projectType",
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
    "name": "levelInvolved",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "costEngineer",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "sizeAndValueRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "sizeAndValueRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "creditAndPaymentRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "creditAndPaymentRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "timeLimitRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "timeLimitRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "customerRelationshipRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "customerRelationshipRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "competitivePartnershipRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "competitivePartnershipRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderSituations",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ownerSituations",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "biddingInstructions",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "competitorSituations",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderForm",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "contractForm",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "managementCompany",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderingAgency",
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
    "name": "facadeConsultant",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "designUnit",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "consultingFirm",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "keyProject",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currentProgress",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderWinCompany",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderWinDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderWinAmount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastTenderAmount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "attachments",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "developer",
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
    "kind": "ScalarField",
    "name": "tenderClosingDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "constructionArea",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "remark",
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
    "name": "geoCoordinate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "createdBy",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "finder",
    "plural": false,
    "selections": (v8/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Customer",
    "kind": "LinkedField",
    "name": "customer",
    "plural": false,
    "selections": [
      (v6/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ownerType",
        "storageKey": null
      },
      (v7/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Province",
    "kind": "LinkedField",
    "name": "province",
    "plural": false,
    "selections": (v11/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "City",
    "kind": "LinkedField",
    "name": "city",
    "plural": false,
    "selections": (v11/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "District",
    "kind": "LinkedField",
    "name": "district",
    "plural": false,
    "selections": (v11/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "classify",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "updateTender",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "tenderDetailFragment"
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "useUpdateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "updateTender",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v10/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "followingSales",
            "plural": true,
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "activeProfile",
            "plural": false,
            "selections": (v12/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "pendingProfile",
            "plural": false,
            "selections": (v12/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": [
                  {
                    "direction": "DESC",
                    "field": "CREATED_AT"
                  }
                ]
              }
            ],
            "concreteType": "TenderProfileConnection",
            "kind": "LinkedField",
            "name": "profiles",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TenderProfileEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TenderProfile",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "profiles(orderBy:[{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"}])"
          },
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bac603230f2875fb619239f9c26e2c6b",
    "id": null,
    "metadata": {},
    "name": "useUpdateTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateTenderMutation(\n  $id: ID!\n  $tenderInput: UpdateTenderInput!\n  $profileInput: CreateTenderProfileInput!\n  $imageFileNames: [String!]!\n  $removeImageFileNames: [String!]\n) {\n  updateTender(id: $id, tenderInput: $tenderInput, profileInput: $profileInput, imageFileNames: $imageFileNames, removeImageFileNames: $removeImageFileNames) {\n    ...tenderDetailFragment\n    customer {\n      id\n      name\n    }\n    id\n  }\n}\n\nfragment tenderDetailFragment on Tender {\n  id\n  code\n  area {\n    id\n    code\n    name\n  }\n  followingSales {\n    id\n    name\n  }\n  activeProfile {\n    id\n    createdAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  pendingProfile {\n    id\n    createdAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        createdAt\n        approvalStatus\n        approver {\n          id\n          name\n        }\n        name\n        status\n        estimatedAmount\n        tenderDate\n        discoveryDate\n        address\n        fullAddress\n        contractor\n        prepareToBid\n        projectCode\n        projectType\n        estimatedProjectStartDate\n        estimatedProjectEndDate\n        levelInvolved\n        costEngineer\n        sizeAndValueRating\n        sizeAndValueRatingOverview\n        creditAndPaymentRating\n        creditAndPaymentRatingOverview\n        timeLimitRating\n        timeLimitRatingOverview\n        customerRelationshipRating\n        customerRelationshipRatingOverview\n        competitivePartnershipRating\n        competitivePartnershipRatingOverview\n        tenderSituations\n        ownerSituations\n        biddingInstructions\n        competitorSituations\n        tenderForm\n        contractForm\n        managementCompany\n        tenderingAgency\n        biddingDate\n        facadeConsultant\n        designUnit\n        consultingFirm\n        keyProject\n        currentProgress\n        tenderWinCompany\n        tenderWinDate\n        tenderWinAmount\n        lastTenderAmount\n        attachments\n        tenderCode\n        developer\n        architect\n        tenderClosingDate\n        constructionArea\n        remark\n        images\n        geoCoordinate\n        createdBy {\n          id\n          name\n        }\n        finder {\n          id\n          name\n        }\n        customer {\n          id\n          ownerType\n          name\n        }\n        province {\n          id\n          adcode\n          name\n        }\n        city {\n          id\n          adcode\n          name\n        }\n        district {\n          id\n          adcode\n          name\n        }\n        classify\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "76c0865006265c6506f67b9db3600291";

export default node;
