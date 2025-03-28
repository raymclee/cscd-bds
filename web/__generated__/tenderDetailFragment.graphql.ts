/**
 * @generated SignedSource<<f45ecc981da3041c2c81a4c66427da3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderDetailFragment$data = {
  readonly address: string | null | undefined;
  readonly approvalStatus: number;
  readonly architect: string | null | undefined;
  readonly area: {
    readonly code: string;
    readonly id: string;
    readonly name: string;
  };
  readonly attachements: ReadonlyArray<string> | null | undefined;
  readonly biddingDate: any | null | undefined;
  readonly biddingInstructions: string | null | undefined;
  readonly city: {
    readonly adcode: number;
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly classify: number | null | undefined;
  readonly code: string;
  readonly competitivePartnershipRating: number | null | undefined;
  readonly competitivePartnershipRatingOverview: string | null | undefined;
  readonly competitorSituations: string | null | undefined;
  readonly constructionArea: string | null | undefined;
  readonly consultingFirm: string | null | undefined;
  readonly contractForm: string | null | undefined;
  readonly contractor: string | null | undefined;
  readonly costEngineer: string | null | undefined;
  readonly createdBy: {
    readonly id: string;
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
  readonly discoveryDate: any;
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
  readonly followingSales: ReadonlyArray<{
    readonly id: string;
    readonly name: string | null | undefined;
  }> | null | undefined;
  readonly fullAddress: string | null | undefined;
  readonly geoCoordinate: {
    readonly coordinates: ReadonlyArray<number>;
  } | null | undefined;
  readonly id: string;
  readonly images: ReadonlyArray<string> | null | undefined;
  readonly keyProject: boolean;
  readonly lastTenderAmount: number | null | undefined;
  readonly levelInvolved: number | null | undefined;
  readonly managementCompany: string | null | undefined;
  readonly name: string;
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
v4 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "adcode",
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderDetailFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "approvalStatus",
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/),
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
      "name": "attachements",
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
      "concreteType": "GeoJson",
      "kind": "LinkedField",
      "name": "geoCoordinate",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "coordinates",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "finder",
      "plural": false,
      "selections": (v3/*: any*/),
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
    {
      "alias": null,
      "args": null,
      "concreteType": "Province",
      "kind": "LinkedField",
      "name": "province",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "City",
      "kind": "LinkedField",
      "name": "city",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "District",
      "kind": "LinkedField",
      "name": "district",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "classify",
      "storageKey": null
    }
  ],
  "type": "Tender",
  "abstractKey": null
};
})();

(node as any).hash = "c864c786c5468be40519d843c483f132";

export default node;
