/**
 * @generated SignedSource<<2ab97b5e5ac85171fb133d0c36be80ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderDetailFragment$data = {
  readonly activeProfile: {
    readonly address: string | null | undefined;
    readonly approvalStatus: number;
    readonly approver: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly architect: string | null | undefined;
    readonly attachments: ReadonlyArray<string> | null | undefined;
    readonly biddingDate: any | null | undefined;
    readonly biddingInstructions: string | null | undefined;
    readonly city: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly classify: number | null | undefined;
    readonly competitivePartnershipRating: number | null | undefined;
    readonly competitivePartnershipRatingOverview: string | null | undefined;
    readonly competitorSituations: string | null | undefined;
    readonly constructionArea: string | null | undefined;
    readonly consultingFirm: string | null | undefined;
    readonly contractForm: string | null | undefined;
    readonly contractor: string | null | undefined;
    readonly costEngineer: string | null | undefined;
    readonly createdAt: any;
    readonly createdBy: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly creditAndPaymentRating: number | null | undefined;
    readonly creditAndPaymentRatingOverview: string | null | undefined;
    readonly currentProgress: string | null | undefined;
    readonly customer: {
      readonly id: string;
      readonly name: string;
      readonly ownerType: number | null | undefined;
    } | null | undefined;
    readonly customerRelationshipRating: number | null | undefined;
    readonly customerRelationshipRatingOverview: string | null | undefined;
    readonly designUnit: string | null | undefined;
    readonly developer: string | null | undefined;
    readonly discoveryDate: any | null | undefined;
    readonly district: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly estimatedAmount: number | null | undefined;
    readonly estimatedProjectEndDate: any | null | undefined;
    readonly estimatedProjectStartDate: any | null | undefined;
    readonly facadeConsultant: string | null | undefined;
    readonly finder: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly fullAddress: string | null | undefined;
    readonly geoCoordinate: ReadonlyArray<number> | null | undefined;
    readonly id: string;
    readonly images: ReadonlyArray<string> | null | undefined;
    readonly keyProject: boolean;
    readonly lastTenderAmount: number | null | undefined;
    readonly levelInvolved: number | null | undefined;
    readonly managementCompany: string | null | undefined;
    readonly name: string | null | undefined;
    readonly ownerSituations: string | null | undefined;
    readonly prepareToBid: boolean;
    readonly projectCode: string | null | undefined;
    readonly projectType: string | null | undefined;
    readonly province: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly remark: string | null | undefined;
    readonly sizeAndValueRating: number | null | undefined;
    readonly sizeAndValueRatingOverview: string | null | undefined;
    readonly status: number;
    readonly tenderClosingDate: any | null | undefined;
    readonly tenderCode: string | null | undefined;
    readonly tenderDate: any | null | undefined;
    readonly tenderForm: string | null | undefined;
    readonly tenderSituations: string | null | undefined;
    readonly tenderWinAmount: number | null | undefined;
    readonly tenderWinCompany: string | null | undefined;
    readonly tenderWinDate: any | null | undefined;
    readonly tenderingAgency: string | null | undefined;
    readonly timeLimitRating: number | null | undefined;
    readonly timeLimitRatingOverview: string | null | undefined;
    readonly updatedAt: any;
  } | null | undefined;
  readonly area: {
    readonly code: string;
    readonly id: string;
    readonly name: string;
  };
  readonly code: string;
  readonly followingSales: ReadonlyArray<{
    readonly id: string;
    readonly name: string | null | undefined;
  }> | null | undefined;
  readonly id: string;
  readonly pendingProfile: {
    readonly address: string | null | undefined;
    readonly approvalStatus: number;
    readonly approver: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly architect: string | null | undefined;
    readonly attachments: ReadonlyArray<string> | null | undefined;
    readonly biddingDate: any | null | undefined;
    readonly biddingInstructions: string | null | undefined;
    readonly city: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly classify: number | null | undefined;
    readonly competitivePartnershipRating: number | null | undefined;
    readonly competitivePartnershipRatingOverview: string | null | undefined;
    readonly competitorSituations: string | null | undefined;
    readonly constructionArea: string | null | undefined;
    readonly consultingFirm: string | null | undefined;
    readonly contractForm: string | null | undefined;
    readonly contractor: string | null | undefined;
    readonly costEngineer: string | null | undefined;
    readonly createdAt: any;
    readonly createdBy: {
      readonly id: string;
      readonly leader: {
        readonly id: string;
      } | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly creditAndPaymentRating: number | null | undefined;
    readonly creditAndPaymentRatingOverview: string | null | undefined;
    readonly currentProgress: string | null | undefined;
    readonly customer: {
      readonly id: string;
      readonly name: string;
      readonly ownerType: number | null | undefined;
    } | null | undefined;
    readonly customerRelationshipRating: number | null | undefined;
    readonly customerRelationshipRatingOverview: string | null | undefined;
    readonly designUnit: string | null | undefined;
    readonly developer: string | null | undefined;
    readonly discoveryDate: any | null | undefined;
    readonly district: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly estimatedAmount: number | null | undefined;
    readonly estimatedProjectEndDate: any | null | undefined;
    readonly estimatedProjectStartDate: any | null | undefined;
    readonly facadeConsultant: string | null | undefined;
    readonly finder: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly fullAddress: string | null | undefined;
    readonly geoCoordinate: ReadonlyArray<number> | null | undefined;
    readonly id: string;
    readonly images: ReadonlyArray<string> | null | undefined;
    readonly keyProject: boolean;
    readonly lastTenderAmount: number | null | undefined;
    readonly levelInvolved: number | null | undefined;
    readonly managementCompany: string | null | undefined;
    readonly name: string | null | undefined;
    readonly ownerSituations: string | null | undefined;
    readonly prepareToBid: boolean;
    readonly projectCode: string | null | undefined;
    readonly projectType: string | null | undefined;
    readonly province: {
      readonly adcode: number;
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly remark: string | null | undefined;
    readonly sizeAndValueRating: number | null | undefined;
    readonly sizeAndValueRatingOverview: string | null | undefined;
    readonly status: number;
    readonly tenderClosingDate: any | null | undefined;
    readonly tenderCode: string | null | undefined;
    readonly tenderDate: any | null | undefined;
    readonly tenderForm: string | null | undefined;
    readonly tenderSituations: string | null | undefined;
    readonly tenderWinAmount: number | null | undefined;
    readonly tenderWinCompany: string | null | undefined;
    readonly tenderWinDate: any | null | undefined;
    readonly tenderingAgency: string | null | undefined;
    readonly timeLimitRating: number | null | undefined;
    readonly timeLimitRatingOverview: string | null | undefined;
  } | null | undefined;
  readonly profiles: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly address: string | null | undefined;
        readonly approvalDate: any | null | undefined;
        readonly approvalStatus: number;
        readonly approver: {
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly architect: string | null | undefined;
        readonly attachments: ReadonlyArray<string> | null | undefined;
        readonly biddingDate: any | null | undefined;
        readonly biddingInstructions: string | null | undefined;
        readonly city: {
          readonly adcode: number;
          readonly id: string;
          readonly name: string;
        } | null | undefined;
        readonly classify: number | null | undefined;
        readonly competitivePartnershipRating: number | null | undefined;
        readonly competitivePartnershipRatingOverview: string | null | undefined;
        readonly competitorSituations: string | null | undefined;
        readonly constructionArea: string | null | undefined;
        readonly consultingFirm: string | null | undefined;
        readonly contractForm: string | null | undefined;
        readonly contractor: string | null | undefined;
        readonly costEngineer: string | null | undefined;
        readonly createdAt: any;
        readonly createdBy: {
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly creditAndPaymentRating: number | null | undefined;
        readonly creditAndPaymentRatingOverview: string | null | undefined;
        readonly currentProgress: string | null | undefined;
        readonly customer: {
          readonly id: string;
          readonly name: string;
          readonly ownerType: number | null | undefined;
        } | null | undefined;
        readonly customerRelationshipRating: number | null | undefined;
        readonly customerRelationshipRatingOverview: string | null | undefined;
        readonly designUnit: string | null | undefined;
        readonly developer: string | null | undefined;
        readonly discoveryDate: any | null | undefined;
        readonly district: {
          readonly adcode: number;
          readonly id: string;
          readonly name: string;
        } | null | undefined;
        readonly estimatedAmount: number | null | undefined;
        readonly estimatedProjectEndDate: any | null | undefined;
        readonly estimatedProjectStartDate: any | null | undefined;
        readonly facadeConsultant: string | null | undefined;
        readonly finder: {
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly fullAddress: string | null | undefined;
        readonly geoCoordinate: ReadonlyArray<number> | null | undefined;
        readonly id: string;
        readonly images: ReadonlyArray<string> | null | undefined;
        readonly keyProject: boolean;
        readonly lastTenderAmount: number | null | undefined;
        readonly levelInvolved: number | null | undefined;
        readonly managementCompany: string | null | undefined;
        readonly name: string | null | undefined;
        readonly ownerSituations: string | null | undefined;
        readonly prepareToBid: boolean;
        readonly projectCode: string | null | undefined;
        readonly projectType: string | null | undefined;
        readonly province: {
          readonly adcode: number;
          readonly id: string;
          readonly name: string;
        } | null | undefined;
        readonly remark: string | null | undefined;
        readonly sizeAndValueRating: number | null | undefined;
        readonly sizeAndValueRatingOverview: string | null | undefined;
        readonly status: number;
        readonly tenderClosingDate: any | null | undefined;
        readonly tenderCode: string | null | undefined;
        readonly tenderDate: any | null | undefined;
        readonly tenderForm: string | null | undefined;
        readonly tenderSituations: string | null | undefined;
        readonly tenderWinAmount: number | null | undefined;
        readonly tenderWinCompany: string | null | undefined;
        readonly tenderWinDate: any | null | undefined;
        readonly tenderingAgency: string | null | undefined;
        readonly timeLimitRating: number | null | undefined;
        readonly timeLimitRatingOverview: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "tenderDetailFragment";
};
export type tenderDetailFragment$key = {
  readonly " $data"?: tenderDetailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tenderDetailFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v0/*: any*/),
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approvalStatus",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "approver",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedAmount",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderDate",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "discoveryDate",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullAddress",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractor",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "prepareToBid",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectCode",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectType",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedProjectStartDate",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedProjectEndDate",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "levelInvolved",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "costEngineer",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRating",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRatingOverview",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRating",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRatingOverview",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRating",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRatingOverview",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRating",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRatingOverview",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRating",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRatingOverview",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderSituations",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerSituations",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "biddingInstructions",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitorSituations",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderForm",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractForm",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "managementCompany",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderingAgency",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "biddingDate",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "facadeConsultant",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "designUnit",
  "storageKey": null
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultingFirm",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "keyProject",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentProgress",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinCompany",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinDate",
  "storageKey": null
},
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinAmount",
  "storageKey": null
},
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastTenderAmount",
  "storageKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "attachments",
  "storageKey": null
},
v50 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderCode",
  "storageKey": null
},
v51 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "developer",
  "storageKey": null
},
v52 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "architect",
  "storageKey": null
},
v53 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderClosingDate",
  "storageKey": null
},
v54 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "constructionArea",
  "storageKey": null
},
v55 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "remark",
  "storageKey": null
},
v56 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "images",
  "storageKey": null
},
v57 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geoCoordinate",
  "storageKey": null
},
v58 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v59 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "finder",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v60 = {
  "alias": null,
  "args": null,
  "concreteType": "Customer",
  "kind": "LinkedField",
  "name": "customer",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ownerType",
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v61 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "adcode",
    "storageKey": null
  },
  (v2/*: any*/)
],
v62 = {
  "alias": null,
  "args": null,
  "concreteType": "Province",
  "kind": "LinkedField",
  "name": "province",
  "plural": false,
  "selections": (v61/*: any*/),
  "storageKey": null
},
v63 = {
  "alias": null,
  "args": null,
  "concreteType": "City",
  "kind": "LinkedField",
  "name": "city",
  "plural": false,
  "selections": (v61/*: any*/),
  "storageKey": null
},
v64 = {
  "alias": null,
  "args": null,
  "concreteType": "District",
  "kind": "LinkedField",
  "name": "district",
  "plural": false,
  "selections": (v61/*: any*/),
  "storageKey": null
},
v65 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "classify",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderDetailFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/)
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
      "selections": (v3/*: any*/),
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
        (v0/*: any*/),
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "updatedAt",
          "storageKey": null
        },
        (v5/*: any*/),
        (v6/*: any*/),
        (v2/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/),
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
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
        (v62/*: any*/),
        (v63/*: any*/),
        (v64/*: any*/),
        (v65/*: any*/)
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
        (v0/*: any*/),
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "createdBy",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "User",
              "kind": "LinkedField",
              "name": "leader",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            },
            (v2/*: any*/)
          ],
          "storageKey": null
        },
        (v5/*: any*/),
        (v6/*: any*/),
        (v2/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/),
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
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
        (v59/*: any*/),
        (v60/*: any*/),
        (v62/*: any*/),
        (v63/*: any*/),
        (v64/*: any*/),
        (v65/*: any*/)
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
                (v0/*: any*/),
                (v4/*: any*/),
                (v5/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "approvalDate",
                  "storageKey": null
                },
                (v6/*: any*/),
                (v2/*: any*/),
                (v7/*: any*/),
                (v8/*: any*/),
                (v9/*: any*/),
                (v10/*: any*/),
                (v11/*: any*/),
                (v12/*: any*/),
                (v13/*: any*/),
                (v14/*: any*/),
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
                (v62/*: any*/),
                (v63/*: any*/),
                (v64/*: any*/),
                (v65/*: any*/)
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
  "type": "Tender",
  "abstractKey": null
};
})();

(node as any).hash = "c616aa66cad909ff86ebeafc2ea7c3fb";

export default node;
