/**
 * @generated SignedSource<<162195b277ed6d4f2e9def89feb1ae86>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateTenderInput = {
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
  clearUpdatedBy?: boolean | null | undefined;
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
  updatedByID?: string | null | undefined;
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
  discoveryDate: any;
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
  name: string;
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
  updatedByID?: string | null | undefined;
};
export type useUpdateTenderV2Mutation$variables = {
  attachmentFileNames: ReadonlyArray<string>;
  id: string;
  imageFileNames: ReadonlyArray<string>;
  profileInput: CreateTenderProfileInput;
  tenderInput: UpdateTenderInput;
};
export type useUpdateTenderV2Mutation$data = {
  readonly updateTenderV2: {
    readonly id: string;
  };
};
export type useUpdateTenderV2Mutation = {
  response: useUpdateTenderV2Mutation$data;
  variables: useUpdateTenderV2Mutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "attachmentFileNames"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "imageFileNames"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "profileInput"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tenderInput"
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "attachmentFileNames",
        "variableName": "attachmentFileNames"
      },
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
        "name": "tenderInput",
        "variableName": "tenderInput"
      }
    ],
    "concreteType": "Tender",
    "kind": "LinkedField",
    "name": "updateTenderV2",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
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
    "name": "useUpdateTenderV2Mutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useUpdateTenderV2Mutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "7d73dfaa5e99dd11de287617c8dc272c",
    "id": null,
    "metadata": {},
    "name": "useUpdateTenderV2Mutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateTenderV2Mutation(\n  $id: ID!\n  $tenderInput: UpdateTenderInput!\n  $profileInput: CreateTenderProfileInput!\n  $imageFileNames: [String!]!\n  $attachmentFileNames: [String!]!\n) {\n  updateTenderV2(id: $id, tenderInput: $tenderInput, profileInput: $profileInput, imageFileNames: $imageFileNames, attachmentFileNames: $attachmentFileNames) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "05191eb4fb0cde3cfebcf24d17631bbb";

export default node;
