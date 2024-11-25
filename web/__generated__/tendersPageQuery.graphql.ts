/**
 * @generated SignedSource<<beab4a6a5ffc6f2fe2428862d7f01ea9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tendersPageQuery$variables = {
  userId: string;
};
export type tendersPageQuery$data = {
  readonly node: {
    readonly areaTenders?: {
      readonly " $fragmentSpreads": FragmentRefs<"tendersAreaTenderListFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type tendersPageQuery = {
  response: tendersPageQuery$data;
  variables: tendersPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "CREATED_AT"
    }
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "fragment": {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "tendersAreaTenderListFragment"
                    }
                  ],
                  "type": "User",
                  "abstractKey": null
                },
                "kind": "AliasedInlineFragmentSpread",
                "name": "areaTenders"
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "tendersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AreaConnection",
                "kind": "LinkedField",
                "name": "areas",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AreaEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Area",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
                            "concreteType": "TenderConnection",
                            "kind": "LinkedField",
                            "name": "tenders",
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
                                      },
                                      (v2/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "cursor",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PageInfo",
                                "kind": "LinkedField",
                                "name": "pageInfo",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "endCursor",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "hasNextPage",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "hasPreviousPage",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "startCursor",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": "tenders(orderBy:{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"})"
                          },
                          {
                            "alias": null,
                            "args": (v3/*: any*/),
                            "filters": [
                              "orderBy"
                            ],
                            "handle": "connection",
                            "key": "TendersAreaTenderListFragment_tenders",
                            "kind": "LinkedHandle",
                            "name": "tenders"
                          },
                          (v4/*: any*/)
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
            "type": "User",
            "abstractKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e1a1b15670213945efa8b735a311383b",
    "id": null,
    "metadata": {},
    "name": "tendersPageQuery",
    "operationKind": "query",
    "text": "query tendersPageQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      ...tendersAreaTenderListFragment\n    }\n    id\n  }\n}\n\nfragment tendersAreaTenderListFragment on User {\n  areas {\n    edges {\n      node {\n        tenders(orderBy: {field: CREATED_AT, direction: DESC}) {\n          edges {\n            node {\n              id\n              name\n              status\n              createdAt\n              estimatedAmount\n              customer {\n                name\n                id\n              }\n              images\n              fullAddress\n              tenderDate\n              discoveryDate\n              area {\n                name\n                id\n              }\n              __typename\n            }\n            cursor\n          }\n          pageInfo {\n            endCursor\n            hasNextPage\n            hasPreviousPage\n            startCursor\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8913109556aad78c6f401bc6b2004bd2";

export default node;
