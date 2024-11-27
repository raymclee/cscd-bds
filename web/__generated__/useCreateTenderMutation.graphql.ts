/**
 * @generated SignedSource<<67c299d07377912417d8c211e099a7fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateTenderInput = {
  address?: string | null | undefined;
  areaID: string;
  attachements?: ReadonlyArray<string> | null | undefined;
  biddingDate?: any | null | undefined;
  biddingInstructions?: string | null | undefined;
  cityID?: string | null | undefined;
  code: string;
  competitivePartnershipRating?: number | null | undefined;
  competitivePartnershipRatingOverview?: string | null | undefined;
  competitorSituations?: string | null | undefined;
  consultingFirm?: string | null | undefined;
  contractForm?: string | null | undefined;
  contractor?: string | null | undefined;
  costEngineer?: string | null | undefined;
  createdAt?: any | null | undefined;
  createdByID: string;
  creditAndPaymentRating?: number | null | undefined;
  creditAndPaymentRatingOverview?: string | null | undefined;
  customerID: string;
  customerRelationshipRating?: number | null | undefined;
  customerRelationshipRatingOverview?: string | null | undefined;
  designUnit?: string | null | undefined;
  discoveryDate: any;
  districtID: string;
  estimatedAmount?: number | null | undefined;
  estimatedProjectEndDate?: any | null | undefined;
  estimatedProjectStartDate?: any | null | undefined;
  facadeConsultant?: string | null | undefined;
  finderID: string;
  followingSaleIDs?: ReadonlyArray<string> | null | undefined;
  fullAddress?: string | null | undefined;
  images?: ReadonlyArray<string> | null | undefined;
  keyProject?: boolean | null | undefined;
  managementCompany?: string | null | undefined;
  name: string;
  ownerSituations?: string | null | undefined;
  prepareToBid?: boolean | null | undefined;
  projectCode?: string | null | undefined;
  projectDefinition?: string | null | undefined;
  projectType?: string | null | undefined;
  provinceID: string;
  remark?: string | null | undefined;
  sizeAndValueRating?: number | null | undefined;
  sizeAndValueRatingOverview?: string | null | undefined;
  status?: number | null | undefined;
  tenderDate?: any | null | undefined;
  tenderForm?: string | null | undefined;
  tenderSituations?: string | null | undefined;
  tenderingAgency?: string | null | undefined;
  timeLimitRating?: number | null | undefined;
  timeLimitRatingOverview?: string | null | undefined;
  updatedAt?: any | null | undefined;
  visitRecordIDs?: ReadonlyArray<string> | null | undefined;
};
export type useCreateTenderMutation$variables = {
  connections: ReadonlyArray<string>;
  imageFileNames: ReadonlyArray<string>;
  input: CreateTenderInput;
};
export type useCreateTenderMutation$data = {
  readonly createTender: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"tendersTenderListItemFragment">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
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
  "name": "input"
},
v3 = [
  {
    "kind": "Variable",
    "name": "imageFileNames",
    "variableName": "imageFileNames"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "TenderConnection",
        "kind": "LinkedField",
        "name": "createTender",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Tender",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "tendersTenderListItemFragment"
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
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "TenderConnection",
        "kind": "LinkedField",
        "name": "createTender",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Tender",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
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
                    "selections": (v6/*: any*/),
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
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edges",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7795d1805a0094f10e77999c47b870b9",
    "id": null,
    "metadata": {},
    "name": "useCreateTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateTenderMutation(\n  $input: CreateTenderInput!\n  $imageFileNames: [String!]!\n) {\n  createTender(input: $input, imageFileNames: $imageFileNames) {\n    edges {\n      node {\n        ...tendersTenderListItemFragment\n        id\n      }\n    }\n  }\n}\n\nfragment tendersTenderListItemFragment on Tender {\n  id\n  name\n  status\n  createdAt\n  estimatedAmount\n  customer {\n    name\n    id\n  }\n  images\n  fullAddress\n  tenderDate\n  discoveryDate\n  area {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e8a29435dd570b65ebbbf62840dc4b79";

export default node;
