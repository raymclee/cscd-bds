/**
 * @generated SignedSource<<6f4d5ff9daeb1255a2cb4d67f38faf80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type TenderOrderField = "APPROVAL_STATUS" | "CLOSING_DATE" | "CREATED_AT" | "NAME" | "TENDER_DATE" | "%future added value";
export type TenderOrder = {
  direction?: OrderDirection;
  field: TenderOrderField;
};
export type AmapPageQuery$variables = {
  first?: number | null | undefined;
  last?: number | null | undefined;
  orderBy?: ReadonlyArray<TenderOrder> | null | undefined;
  userId: string;
};
export type AmapPageQuery$data = {
  readonly customers: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly ownerType: number | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly node: {
    readonly areas?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly center: {
            readonly coordinates: ReadonlyArray<number>;
          } | null | undefined;
          readonly code: string;
          readonly createdAt: any;
          readonly id: string;
          readonly name: string;
          readonly provinces: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly adcode: number;
                readonly center: {
                  readonly coordinates: ReadonlyArray<number>;
                } | null | undefined;
                readonly id: string;
                readonly name: string;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
          readonly tenders: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly area: {
                  readonly code: string;
                  readonly name: string;
                };
                readonly city: {
                  readonly adcode: number;
                  readonly name: string;
                } | null | undefined;
                readonly createdAt: any;
                readonly customer: {
                  readonly ownerType: number | null | undefined;
                } | null | undefined;
                readonly district: {
                  readonly adcode: number;
                  readonly name: string;
                } | null | undefined;
                readonly estimatedAmount: number | null | undefined;
                readonly id: string;
                readonly images: ReadonlyArray<string> | null | undefined;
                readonly name: string;
                readonly province: {
                  readonly adcode: number;
                  readonly name: string;
                } | null | undefined;
                readonly status: number;
                readonly tenderDate: any | null | undefined;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
  readonly topCompetitors: ReadonlyArray<{
    readonly id: string;
    readonly shortName: string;
    readonly wonTendersCount: number;
  }>;
  readonly users: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type AmapPageQuery = {
  response: AmapPageQuery$data;
  variables: AmapPageQuery$variables;
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
  "name": "last"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "GeoJson",
  "kind": "LinkedField",
  "name": "center",
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
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "ProvinceConnection",
  "kind": "LinkedField",
  "name": "provinces",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ProvinceEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Province",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v5/*: any*/),
            (v6/*: any*/),
            (v10/*: any*/),
            (v9/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v13 = {
  "kind": "Literal",
  "name": "where",
  "value": {
    "approvalStatus": 2,
    "statusNEQ": 7
  }
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedAmount",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderDate",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "images",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v19 = [
  (v6/*: any*/),
  (v10/*: any*/)
],
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v22 = {
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
v23 = {
  "alias": null,
  "args": null,
  "concreteType": "TopCompetitor",
  "kind": "LinkedField",
  "name": "topCompetitors",
  "plural": true,
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shortName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "wonTendersCount",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "UserConnection",
  "kind": "LinkedField",
  "name": "users",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v5/*: any*/),
            (v6/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": "CustomerConnection",
  "kind": "LinkedField",
  "name": "customers",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CustomerEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Customer",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v5/*: any*/),
            (v6/*: any*/),
            (v18/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v26 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  },
  (v12/*: any*/),
  (v13/*: any*/)
],
v27 = [
  (v6/*: any*/),
  (v10/*: any*/),
  (v5/*: any*/)
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
    "name": "AmapPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
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
                          (v5/*: any*/),
                          {
                            "kind": "RequiredField",
                            "field": (v6/*: any*/),
                            "action": "NONE",
                            "path": "node.areas.edges.node.name"
                          },
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v11/*: any*/),
                          {
                            "alias": "tenders",
                            "args": [
                              (v12/*: any*/),
                              (v13/*: any*/)
                            ],
                            "concreteType": "TenderConnection",
                            "kind": "LinkedField",
                            "name": "__MapIndexPageQuery_tenders_connection",
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
                                      (v5/*: any*/),
                                      (v6/*: any*/),
                                      (v14/*: any*/),
                                      (v8/*: any*/),
                                      (v15/*: any*/),
                                      (v16/*: any*/),
                                      (v17/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Customer",
                                        "kind": "LinkedField",
                                        "name": "customer",
                                        "plural": false,
                                        "selections": [
                                          (v18/*: any*/)
                                        ],
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
                                          (v7/*: any*/),
                                          (v6/*: any*/)
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
                                        "selections": [
                                          (v10/*: any*/),
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "City",
                                        "kind": "LinkedField",
                                        "name": "city",
                                        "plural": false,
                                        "selections": (v19/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "District",
                                        "kind": "LinkedField",
                                        "name": "district",
                                        "plural": false,
                                        "selections": (v19/*: any*/),
                                        "storageKey": null
                                      },
                                      (v20/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v21/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v22/*: any*/)
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
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      (v23/*: any*/),
      (v24/*: any*/),
      (v25/*: any*/)
    ],
    "type": "Query",
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
    "name": "AmapPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v20/*: any*/),
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
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": (v26/*: any*/),
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
                                      (v5/*: any*/),
                                      (v6/*: any*/),
                                      (v14/*: any*/),
                                      (v8/*: any*/),
                                      (v15/*: any*/),
                                      (v16/*: any*/),
                                      (v17/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Customer",
                                        "kind": "LinkedField",
                                        "name": "customer",
                                        "plural": false,
                                        "selections": [
                                          (v18/*: any*/),
                                          (v5/*: any*/)
                                        ],
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
                                          (v7/*: any*/),
                                          (v6/*: any*/),
                                          (v5/*: any*/)
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
                                        "selections": [
                                          (v10/*: any*/),
                                          (v6/*: any*/),
                                          (v5/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "City",
                                        "kind": "LinkedField",
                                        "name": "city",
                                        "plural": false,
                                        "selections": (v27/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "District",
                                        "kind": "LinkedField",
                                        "name": "district",
                                        "plural": false,
                                        "selections": (v27/*: any*/),
                                        "storageKey": null
                                      },
                                      (v20/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v21/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v22/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": (v26/*: any*/),
                            "filters": [
                              "orderBy",
                              "where"
                            ],
                            "handle": "connection",
                            "key": "MapIndexPageQuery_tenders",
                            "kind": "LinkedHandle",
                            "name": "tenders"
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
            "type": "User",
            "abstractKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      (v23/*: any*/),
      (v24/*: any*/),
      (v25/*: any*/)
    ]
  },
  "params": {
    "cacheID": "0fe6b87601c757b8f1c17a27fb963a6c",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "bidirectional",
          "path": null
        }
      ]
    },
    "name": "AmapPageQuery",
    "operationKind": "query",
    "text": "query AmapPageQuery(\n  $userId: ID!\n  $orderBy: [TenderOrder!]\n  $first: Int\n  $last: Int\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      areas {\n        edges {\n          node {\n            id\n            name\n            code\n            createdAt\n            center {\n              coordinates\n            }\n            provinces {\n              edges {\n                node {\n                  id\n                  name\n                  adcode\n                  center {\n                    coordinates\n                  }\n                }\n              }\n            }\n            tenders(orderBy: $orderBy, first: $first, last: $last, where: {statusNEQ: 7, approvalStatus: 2}) {\n              edges {\n                node {\n                  id\n                  name\n                  status\n                  createdAt\n                  estimatedAmount\n                  tenderDate\n                  images\n                  customer {\n                    ownerType\n                    id\n                  }\n                  area {\n                    code\n                    name\n                    id\n                  }\n                  province {\n                    adcode\n                    name\n                    id\n                  }\n                  city {\n                    name\n                    adcode\n                    id\n                  }\n                  district {\n                    name\n                    adcode\n                    id\n                  }\n                  __typename\n                }\n                cursor\n              }\n              pageInfo {\n                endCursor\n                hasNextPage\n                hasPreviousPage\n                startCursor\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n  topCompetitors {\n    id\n    shortName\n    wonTendersCount\n  }\n  users {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  customers {\n    edges {\n      node {\n        id\n        name\n        ownerType\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a74d4e8344082b18ac0e07b7790d7eb";

export default node;
