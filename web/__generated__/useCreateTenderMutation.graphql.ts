/**
 * @generated SignedSource<<92667ae14de827504292dad4710eb9eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateTenderInput = {
  activeProfileID?: string | null | undefined;
  address?: string | null | undefined;
  approvalMsgID?: string | null | undefined;
  approvalStatus?: number | null | undefined;
  approverID?: string | null | undefined;
  architect?: string | null | undefined;
  areaID: string;
  attachements?: ReadonlyArray<string> | null | undefined;
  biddingDate?: any | null | undefined;
  biddingInstructions?: string | null | undefined;
  cityID?: string | null | undefined;
  classify?: number | null | undefined;
  code: string;
  competitivePartnershipRating?: number | null | undefined;
  competitivePartnershipRatingOverview?: string | null | undefined;
  competitorIDs?: ReadonlyArray<string> | null | undefined;
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
  followingSaleIDs?: ReadonlyArray<string> | null | undefined;
  fullAddress?: string | null | undefined;
  images?: ReadonlyArray<string> | null | undefined;
  keyProject?: boolean | null | undefined;
  lastTenderAmount?: number | null | undefined;
  levelInvolved?: number | null | undefined;
  managementCompany?: string | null | undefined;
  name: string;
  ownerSituations?: string | null | undefined;
  pendingProfileID?: string | null | undefined;
  prepareToBid?: boolean | null | undefined;
  profileIDs?: ReadonlyArray<string> | null | undefined;
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
  tenderSituations?: string | null | undefined;
  tenderWinAmount?: number | null | undefined;
  tenderWinCompany?: string | null | undefined;
  tenderWinDate?: any | null | undefined;
  tenderingAgency?: string | null | undefined;
  timeLimitRating?: number | null | undefined;
  timeLimitRatingOverview?: string | null | undefined;
  updatedAt?: any | null | undefined;
  visitRecordIDs?: ReadonlyArray<string> | null | undefined;
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
export type useCreateTenderMutation$variables = {
  connections: ReadonlyArray<string>;
  imageFileNames: ReadonlyArray<string>;
  profileInput: CreateTenderProfileInput;
  tenderInput: CreateTenderInput;
};
export type useCreateTenderMutation$data = {
  readonly createTender: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"tenderListItemFragment">;
  };
};
export type useCreateTenderMutation = {
  response: useCreateTenderMutation$data;
  variables: useCreateTenderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
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
  "name": "tenderInput"
},
v4 = [
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v5/*: any*/)
],
v8 = [
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "approvalStatus",
    "storageKey": null
  },
  (v6/*: any*/),
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
    "kind": "ScalarField",
    "name": "classify",
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
      (v5/*: any*/),
      (v6/*: any*/)
    ],
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
    "kind": "ScalarField",
    "name": "tenderClosingDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "createdBy",
    "plural": false,
    "selections": (v7/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "createTender",
        "plural": false,
        "selections": [
          (v5/*: any*/),
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
    "argumentDefinitions": [
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "createTender",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "code",
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
            "name": "followingSales",
            "plural": true,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "pendingProfile",
            "plural": false,
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
            "selections": (v8/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "filters": null,
        "handle": "prependNode",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createTender",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          },
          {
            "kind": "Literal",
            "name": "edgeTypeName",
            "value": "TenderEdge"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "2787dff3c66a229cd60b90bdd47c3232",
    "id": null,
    "metadata": {},
    "name": "useCreateTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateTenderMutation(\n  $tenderInput: CreateTenderInput!\n  $profileInput: CreateTenderProfileInput!\n  $imageFileNames: [String!]!\n) {\n  createTender(tenderInput: $tenderInput, profileInput: $profileInput, imageFileNames: $imageFileNames) {\n    id\n    ...tenderListItemFragment\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  area {\n    id\n    name\n    code\n  }\n  followingSales {\n    id\n  }\n  pendingProfile {\n    id\n    approvalStatus\n    name\n    status\n    createdAt\n    estimatedAmount\n    classify\n    customer {\n      id\n      name\n    }\n    images\n    fullAddress\n    tenderDate\n    discoveryDate\n    tenderClosingDate\n    createdBy {\n      id\n    }\n  }\n  activeProfile {\n    id\n    approvalStatus\n    name\n    status\n    createdAt\n    estimatedAmount\n    classify\n    customer {\n      id\n      name\n    }\n    images\n    fullAddress\n    tenderDate\n    discoveryDate\n    tenderClosingDate\n    createdBy {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c09a153d34b66b0a59abb76ed0be51b6";

export default node;
