/**
 * @generated SignedSource<<a281ce4d4e189cc7b6aba08304314383>>
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
  approvalDate?: any | null | undefined;
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
export type useUpdateTenderV2Mutation$variables = {
  attachmentFileNames: ReadonlyArray<string>;
  id: string;
  imageFileNames: ReadonlyArray<string>;
  profileInput: CreateTenderProfileInput;
  removeAttachmentFileNames?: ReadonlyArray<string> | null | undefined;
  removeImageFileNames?: ReadonlyArray<string> | null | undefined;
  tenderInput: UpdateTenderInput;
};
export type useUpdateTenderV2Mutation$data = {
  readonly updateTenderV2: {
    readonly " $fragmentSpreads": FragmentRefs<"tenderDetailFragment">;
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
  "name": "removeAttachmentFileNames"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "removeImageFileNames"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tenderInput"
},
v7 = [
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
    "name": "removeAttachmentFileNames",
    "variableName": "removeAttachmentFileNames"
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = [
  (v8/*: any*/),
  (v10/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approvalStatus",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "approver",
  "plural": false,
  "selections": (v11/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedAmount",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderDate",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "discoveryDate",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullAddress",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractor",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "prepareToBid",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectCode",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectType",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedProjectStartDate",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedProjectEndDate",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "levelInvolved",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "costEngineer",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRating",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRatingOverview",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRating",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRatingOverview",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRating",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRatingOverview",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRating",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRatingOverview",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRating",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRatingOverview",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderSituations",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerSituations",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "biddingInstructions",
  "storageKey": null
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitorSituations",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderForm",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractForm",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "managementCompany",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderingAgency",
  "storageKey": null
},
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "biddingDate",
  "storageKey": null
},
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "facadeConsultant",
  "storageKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "designUnit",
  "storageKey": null
},
v50 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultingFirm",
  "storageKey": null
},
v51 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "keyProject",
  "storageKey": null
},
v52 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentProgress",
  "storageKey": null
},
v53 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinCompany",
  "storageKey": null
},
v54 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinDate",
  "storageKey": null
},
v55 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinAmount",
  "storageKey": null
},
v56 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastTenderAmount",
  "storageKey": null
},
v57 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "attachments",
  "storageKey": null
},
v58 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderCode",
  "storageKey": null
},
v59 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "developer",
  "storageKey": null
},
v60 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "architect",
  "storageKey": null
},
v61 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderClosingDate",
  "storageKey": null
},
v62 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "constructionArea",
  "storageKey": null
},
v63 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "remark",
  "storageKey": null
},
v64 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "images",
  "storageKey": null
},
v65 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geoCoordinate",
  "storageKey": null
},
v66 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": (v11/*: any*/),
  "storageKey": null
},
v67 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "finder",
  "plural": false,
  "selections": (v11/*: any*/),
  "storageKey": null
},
v68 = {
  "alias": null,
  "args": null,
  "concreteType": "Customer",
  "kind": "LinkedField",
  "name": "customer",
  "plural": false,
  "selections": [
    (v8/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ownerType",
      "storageKey": null
    },
    (v10/*: any*/)
  ],
  "storageKey": null
},
v69 = [
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "adcode",
    "storageKey": null
  },
  (v10/*: any*/)
],
v70 = {
  "alias": null,
  "args": null,
  "concreteType": "Province",
  "kind": "LinkedField",
  "name": "province",
  "plural": false,
  "selections": (v69/*: any*/),
  "storageKey": null
},
v71 = {
  "alias": null,
  "args": null,
  "concreteType": "City",
  "kind": "LinkedField",
  "name": "city",
  "plural": false,
  "selections": (v69/*: any*/),
  "storageKey": null
},
v72 = {
  "alias": null,
  "args": null,
  "concreteType": "District",
  "kind": "LinkedField",
  "name": "district",
  "plural": false,
  "selections": (v69/*: any*/),
  "storageKey": null
},
v73 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "classify",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateTenderV2Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "updateTenderV2",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "tenderDetailFragment"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v6/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v5/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "useUpdateTenderV2Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v7/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "updateTenderV2",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
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
            "selections": (v11/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "activeProfile",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updatedAt",
                "storageKey": null
              },
              (v13/*: any*/),
              (v14/*: any*/),
              (v10/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v33/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v36/*: any*/),
              (v37/*: any*/),
              (v38/*: any*/),
              (v39/*: any*/),
              (v40/*: any*/),
              (v41/*: any*/),
              (v42/*: any*/),
              (v43/*: any*/),
              (v44/*: any*/),
              (v45/*: any*/),
              (v46/*: any*/),
              (v47/*: any*/),
              (v48/*: any*/),
              (v49/*: any*/),
              (v50/*: any*/),
              (v51/*: any*/),
              (v52/*: any*/),
              (v53/*: any*/),
              (v54/*: any*/),
              (v55/*: any*/),
              (v56/*: any*/),
              (v57/*: any*/),
              (v58/*: any*/),
              (v59/*: any*/),
              (v60/*: any*/),
              (v61/*: any*/),
              (v62/*: any*/),
              (v63/*: any*/),
              (v64/*: any*/),
              (v65/*: any*/),
              (v66/*: any*/),
              (v67/*: any*/),
              (v68/*: any*/),
              (v70/*: any*/),
              (v71/*: any*/),
              (v72/*: any*/),
              (v73/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "pendingProfile",
            "plural": false,
            "selections": [
              (v8/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v10/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v33/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/),
              (v36/*: any*/),
              (v37/*: any*/),
              (v38/*: any*/),
              (v39/*: any*/),
              (v40/*: any*/),
              (v41/*: any*/),
              (v42/*: any*/),
              (v43/*: any*/),
              (v44/*: any*/),
              (v45/*: any*/),
              (v46/*: any*/),
              (v47/*: any*/),
              (v48/*: any*/),
              (v49/*: any*/),
              (v50/*: any*/),
              (v51/*: any*/),
              (v52/*: any*/),
              (v53/*: any*/),
              (v54/*: any*/),
              (v55/*: any*/),
              (v56/*: any*/),
              (v57/*: any*/),
              (v58/*: any*/),
              (v59/*: any*/),
              (v60/*: any*/),
              (v61/*: any*/),
              (v62/*: any*/),
              (v63/*: any*/),
              (v64/*: any*/),
              (v65/*: any*/),
              (v66/*: any*/),
              (v67/*: any*/),
              (v68/*: any*/),
              (v70/*: any*/),
              (v71/*: any*/),
              (v72/*: any*/),
              (v73/*: any*/)
            ],
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
                    "selections": [
                      (v8/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "approvalDate",
                        "storageKey": null
                      },
                      (v14/*: any*/),
                      (v10/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/),
                      (v28/*: any*/),
                      (v29/*: any*/),
                      (v30/*: any*/),
                      (v31/*: any*/),
                      (v32/*: any*/),
                      (v33/*: any*/),
                      (v34/*: any*/),
                      (v35/*: any*/),
                      (v36/*: any*/),
                      (v37/*: any*/),
                      (v38/*: any*/),
                      (v39/*: any*/),
                      (v40/*: any*/),
                      (v41/*: any*/),
                      (v42/*: any*/),
                      (v43/*: any*/),
                      (v44/*: any*/),
                      (v45/*: any*/),
                      (v46/*: any*/),
                      (v47/*: any*/),
                      (v48/*: any*/),
                      (v49/*: any*/),
                      (v50/*: any*/),
                      (v51/*: any*/),
                      (v52/*: any*/),
                      (v53/*: any*/),
                      (v54/*: any*/),
                      (v55/*: any*/),
                      (v56/*: any*/),
                      (v57/*: any*/),
                      (v58/*: any*/),
                      (v59/*: any*/),
                      (v60/*: any*/),
                      (v61/*: any*/),
                      (v62/*: any*/),
                      (v63/*: any*/),
                      (v64/*: any*/),
                      (v65/*: any*/),
                      (v66/*: any*/),
                      (v67/*: any*/),
                      (v68/*: any*/),
                      (v70/*: any*/),
                      (v71/*: any*/),
                      (v72/*: any*/),
                      (v73/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "profiles(orderBy:[{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"}])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "53d29d504c6f69dc65c6c623564df3eb",
    "id": null,
    "metadata": {},
    "name": "useUpdateTenderV2Mutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateTenderV2Mutation(\n  $id: ID!\n  $tenderInput: UpdateTenderInput!\n  $profileInput: CreateTenderProfileInput!\n  $imageFileNames: [String!]!\n  $attachmentFileNames: [String!]!\n  $removeImageFileNames: [String!]\n  $removeAttachmentFileNames: [String!]\n) {\n  updateTenderV2(id: $id, tenderInput: $tenderInput, profileInput: $profileInput, imageFileNames: $imageFileNames, attachmentFileNames: $attachmentFileNames, removeImageFileNames: $removeImageFileNames, removeAttachmentFileNames: $removeAttachmentFileNames) {\n    ...tenderDetailFragment\n    id\n  }\n}\n\nfragment tenderDetailFragment on Tender {\n  id\n  code\n  area {\n    id\n    code\n    name\n  }\n  followingSales {\n    id\n    name\n  }\n  activeProfile {\n    id\n    createdAt\n    updatedAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  pendingProfile {\n    id\n    createdAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        createdAt\n        approvalStatus\n        approvalDate\n        approver {\n          id\n          name\n        }\n        name\n        status\n        estimatedAmount\n        tenderDate\n        discoveryDate\n        address\n        fullAddress\n        contractor\n        prepareToBid\n        projectCode\n        projectType\n        estimatedProjectStartDate\n        estimatedProjectEndDate\n        levelInvolved\n        costEngineer\n        sizeAndValueRating\n        sizeAndValueRatingOverview\n        creditAndPaymentRating\n        creditAndPaymentRatingOverview\n        timeLimitRating\n        timeLimitRatingOverview\n        customerRelationshipRating\n        customerRelationshipRatingOverview\n        competitivePartnershipRating\n        competitivePartnershipRatingOverview\n        tenderSituations\n        ownerSituations\n        biddingInstructions\n        competitorSituations\n        tenderForm\n        contractForm\n        managementCompany\n        tenderingAgency\n        biddingDate\n        facadeConsultant\n        designUnit\n        consultingFirm\n        keyProject\n        currentProgress\n        tenderWinCompany\n        tenderWinDate\n        tenderWinAmount\n        lastTenderAmount\n        attachments\n        tenderCode\n        developer\n        architect\n        tenderClosingDate\n        constructionArea\n        remark\n        images\n        geoCoordinate\n        createdBy {\n          id\n          name\n        }\n        finder {\n          id\n          name\n        }\n        customer {\n          id\n          ownerType\n          name\n        }\n        province {\n          id\n          adcode\n          name\n        }\n        city {\n          id\n          adcode\n          name\n        }\n        district {\n          id\n          adcode\n          name\n        }\n        classify\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "44f62e2602b8653d0982bca9d34753e1";

export default node;
