/**
 * @generated SignedSource<<f6855360dbc3db7f0a52d82172f6288b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type TenderOrderField = "APPROVAL_STATUS" | "CLOSING_DATE" | "CREATED_AT" | "NAME" | "TENDER_DATE" | "%future added value";
export type TenderOrder = {
  direction?: OrderDirection;
  field: TenderOrderField;
};
export type tendersPageQuery$variables = {
  first?: number | null | undefined;
  orderBy?: ReadonlyArray<TenderOrder> | null | undefined;
  userId: string;
};
export type tendersPageQuery$data = {
  readonly node: {
    readonly areaTenders?: {
      readonly " $fragmentSpreads": FragmentRefs<"tendersTenderListFragment">;
    } | null | undefined;
  } | null | undefined;
};
export type tendersPageQuery = {
  response: tendersPageQuery$data;
  variables: tendersPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "code",
    "storageKey": null
  },
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderClosingDate",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "classify",
  "storageKey": null
},
v12 = [
  (v6/*: any*/)
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
    "name": "tendersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
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
                      "args": (v4/*: any*/),
                      "kind": "FragmentSpread",
                      "name": "tendersTenderListFragment"
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "tendersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v5/*: any*/),
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
                        "selections": (v8/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "tenders",
                "args": (v4/*: any*/),
                "concreteType": "TenderConnection",
                "kind": "LinkedField",
                "name": "myTenders",
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
                          (v7/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Area",
                            "kind": "LinkedField",
                            "name": "area",
                            "plural": false,
                            "selections": (v8/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "followingSales",
                            "plural": true,
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
                                      (v9/*: any*/),
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
                                      (v11/*: any*/),
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
                                      (v10/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "createdBy",
                                        "plural": false,
                                        "selections": (v12/*: any*/),
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
                          },
                          (v5/*: any*/)
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
                  },
                  {
                    "kind": "ClientExtension",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__id",
                        "storageKey": null
                      }
                    ]
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "tenders",
                "args": (v4/*: any*/),
                "filters": [
                  "orderBy"
                ],
                "handle": "connection",
                "key": "tendersTenderListFragment_tenders",
                "kind": "LinkedHandle",
                "name": "myTenders"
              }
            ],
            "type": "User",
            "abstractKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "708f8489ff2902742340f514147500dd",
    "id": null,
    "metadata": {},
    "name": "tendersPageQuery",
    "operationKind": "query",
    "text": "query tendersPageQuery(\n  $userId: ID!\n  $orderBy: [TenderOrder!]\n  $first: Int\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      ...tendersTenderListFragment_3p2xDJ\n    }\n    id\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  area {\n    id\n    name\n    code\n  }\n  followingSales {\n    id\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        approvalStatus\n        name\n        status\n        createdAt\n        estimatedAmount\n        classify\n        customer {\n          id\n          name\n        }\n        images\n        fullAddress\n        tenderDate\n        discoveryDate\n        tenderClosingDate\n        createdBy {\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment tendersTenderListFragment_3p2xDJ on User {\n  areas {\n    edges {\n      node {\n        id\n        code\n        name\n      }\n    }\n  }\n  tenders: myTenders(orderBy: $orderBy, first: $first) {\n    edges {\n      node {\n        id\n        name\n        status\n        tenderClosingDate\n        classify\n        area {\n          id\n          code\n        }\n        ...tenderListItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6e74ad3cd21849c19a27ab1d735b579b";

export default node;
