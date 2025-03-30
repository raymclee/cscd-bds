/**
 * @generated SignedSource<<c04dc4624ffc85713cd31619c31f890b>>
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
  updatedByID?: string | null | undefined;
  visitRecordIDs?: ReadonlyArray<string> | null | undefined;
};
export type useCreateTenderMutation$variables = {
  attachmentFileNames: ReadonlyArray<string>;
  connections: ReadonlyArray<string>;
  geoCoordinate?: ReadonlyArray<number> | null | undefined;
  imageFileNames: ReadonlyArray<string>;
  input: CreateTenderInput;
};
export type useCreateTenderMutation$data = {
  readonly createTender: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"tenderListItemFragment">;
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
  "name": "attachmentFileNames"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "geoCoordinate"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "imageFileNames"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v5 = [
  {
    "kind": "Variable",
    "name": "attachmentFileNames",
    "variableName": "attachmentFileNames"
  },
  {
    "kind": "Variable",
    "name": "geoCoordinate",
    "variableName": "geoCoordinate"
  },
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
  (v6/*: any*/)
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
    "name": "useCreateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
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
                    "name": "tenderListItemFragment"
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
      (v4/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
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
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Area",
                    "kind": "LinkedField",
                    "name": "area",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/),
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
                    "selections": (v8/*: any*/),
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
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "approvalStatus",
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
                                  (v6/*: any*/),
                                  (v7/*: any*/)
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
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              }
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
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edges",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "725c9ba53926817b2361c69f8b440649",
    "id": null,
    "metadata": {},
    "name": "useCreateTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateTenderMutation(\n  $input: CreateTenderInput!\n  $imageFileNames: [String!]!\n  $attachmentFileNames: [String!]!\n  $geoCoordinate: [Float!]\n) {\n  createTender(input: $input, imageFileNames: $imageFileNames, attachmentFileNames: $attachmentFileNames, geoCoordinate: $geoCoordinate) {\n    edges {\n      node {\n        ...tenderListItemFragment\n        id\n      }\n    }\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  area {\n    id\n    name\n    code\n  }\n  followingSales {\n    id\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        approvalStatus\n        name\n        status\n        createdAt\n        estimatedAmount\n        classify\n        customer {\n          id\n          name\n        }\n        images\n        fullAddress\n        tenderDate\n        discoveryDate\n        tenderClosingDate\n        createdBy {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c0e85fad73ac25041659a2cd7f1c5ee5";

export default node;
