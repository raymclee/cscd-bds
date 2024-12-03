/**
 * @generated SignedSource<<20204bc5f22453195943678030731160>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type VisitRecordOrderField = "CREATED_AT" | "DATE" | "%future added value";
export type VisitRecordOrder = {
  direction?: OrderDirection;
  field: VisitRecordOrderField;
};
export type customersDetailPageQuery$variables = {
  first?: number | null | undefined;
  id: string;
  last?: number | null | undefined;
  orderBy?: VisitRecordOrder | null | undefined;
  userId: string;
};
export type customersDetailPageQuery$data = {
  readonly node: {
    readonly areas?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly customers: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly area: {
                  readonly name: string;
                };
                readonly contactPerson: string | null | undefined;
                readonly contactPersonEmail: string | null | undefined;
                readonly contactPersonPhone: string | null | undefined;
                readonly contactPersonPosition: string | null | undefined;
                readonly createdBy: {
                  readonly name: string;
                };
                readonly id: string;
                readonly industry: number;
                readonly name: string;
                readonly ownerType: number | null | undefined;
                readonly sales: {
                  readonly name: string;
                } | null | undefined;
                readonly size: number | null | undefined;
                readonly tenders: {
                  readonly edges: ReadonlyArray<{
                    readonly __id: string;
                    readonly node: {
                      readonly id: string;
                    } | null | undefined;
                  } | null | undefined> | null | undefined;
                };
                readonly updatedAt: any;
                readonly visitRecords: {
                  readonly edges: ReadonlyArray<{
                    readonly __id: string;
                  } | null | undefined> | null | undefined;
                };
                readonly " $fragmentSpreads": FragmentRefs<"customersTenderListFragment" | "customersVisitRecordListFragment">;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
};
export type customersDetailPageQuery = {
  response: customersDetailPageQuery$data;
  variables: customersDetailPageQuery$variables;
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
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v6 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "industry",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPerson",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPosition",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPhone",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonEmail",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v20 = {
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
},
v21 = {
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
v22 = [
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy"
  }
],
v23 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  }
],
v24 = [
  (v8/*: any*/),
  (v7/*: any*/)
],
v25 = [
  (v7/*: any*/),
  (v8/*: any*/)
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
    "name": "customersDetailPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
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
                          {
                            "alias": null,
                            "args": (v6/*: any*/),
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
                                      (v7/*: any*/),
                                      (v8/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "createdBy",
                                        "plural": false,
                                        "selections": (v9/*: any*/),
                                        "storageKey": null
                                      },
                                      (v10/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/),
                                      (v14/*: any*/),
                                      (v15/*: any*/),
                                      (v16/*: any*/),
                                      (v17/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "sales",
                                        "plural": false,
                                        "selections": (v9/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Area",
                                        "kind": "LinkedField",
                                        "name": "area",
                                        "plural": false,
                                        "selections": (v9/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "tenders",
                                        "args": null,
                                        "concreteType": "TenderConnection",
                                        "kind": "LinkedField",
                                        "name": "__customersTenderListFragment_tenders_connection",
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
                                                  (v7/*: any*/),
                                                  (v18/*: any*/)
                                                ],
                                                "storageKey": null
                                              },
                                              (v19/*: any*/),
                                              (v20/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v21/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v22/*: any*/),
                                        "concreteType": "VisitRecordConnection",
                                        "kind": "LinkedField",
                                        "name": "visitRecords",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "VisitRecordEdge",
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              (v20/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "args": null,
                                        "kind": "FragmentSpread",
                                        "name": "customersVisitRecordListFragment"
                                      },
                                      {
                                        "args": (v23/*: any*/),
                                        "kind": "FragmentSpread",
                                        "name": "customersTenderListFragment"
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
      }
    ],
    "type": "Query",
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
    "name": "customersDetailPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v18/*: any*/),
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
                            "args": (v6/*: any*/),
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
                                      (v7/*: any*/),
                                      (v8/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "createdBy",
                                        "plural": false,
                                        "selections": (v24/*: any*/),
                                        "storageKey": null
                                      },
                                      (v10/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/),
                                      (v14/*: any*/),
                                      (v15/*: any*/),
                                      (v16/*: any*/),
                                      (v17/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "sales",
                                        "plural": false,
                                        "selections": (v24/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Area",
                                        "kind": "LinkedField",
                                        "name": "area",
                                        "plural": false,
                                        "selections": (v24/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v23/*: any*/),
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
                                                  (v7/*: any*/),
                                                  (v18/*: any*/),
                                                  (v8/*: any*/),
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
                                                    "selections": (v25/*: any*/),
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
                                                    "concreteType": "Area",
                                                    "kind": "LinkedField",
                                                    "name": "area",
                                                    "plural": false,
                                                    "selections": [
                                                      (v7/*: any*/),
                                                      (v8/*: any*/),
                                                      {
                                                        "alias": null,
                                                        "args": null,
                                                        "kind": "ScalarField",
                                                        "name": "code",
                                                        "storageKey": null
                                                      }
                                                    ],
                                                    "storageKey": null
                                                  }
                                                ],
                                                "storageKey": null
                                              },
                                              (v19/*: any*/),
                                              (v20/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v21/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v23/*: any*/),
                                        "filters": null,
                                        "handle": "connection",
                                        "key": "customersTenderListFragment_tenders",
                                        "kind": "LinkedHandle",
                                        "name": "tenders"
                                      },
                                      {
                                        "alias": null,
                                        "args": (v22/*: any*/),
                                        "concreteType": "VisitRecordConnection",
                                        "kind": "LinkedField",
                                        "name": "visitRecords",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "VisitRecordEdge",
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              (v20/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "VisitRecord",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v7/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "date",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "visitType",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "commPeople",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "commContent",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "nextStep",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "Tender",
                                                    "kind": "LinkedField",
                                                    "name": "tender",
                                                    "plural": false,
                                                    "selections": (v25/*: any*/),
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
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v7/*: any*/)
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
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d0b88a920be578dd647a8350b00ddb83",
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
    "name": "customersDetailPageQuery",
    "operationKind": "query",
    "text": "query customersDetailPageQuery(\n  $userId: ID!\n  $id: ID!\n  $orderBy: VisitRecordOrder\n  $first: Int\n  $last: Int\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      areas {\n        edges {\n          node {\n            customers(where: {id: $id}) {\n              edges {\n                node {\n                  id\n                  name\n                  createdBy {\n                    name\n                    id\n                  }\n                  updatedAt\n                  ownerType\n                  industry\n                  size\n                  contactPerson\n                  contactPersonPosition\n                  contactPersonPhone\n                  contactPersonEmail\n                  sales {\n                    name\n                    id\n                  }\n                  area {\n                    name\n                    id\n                  }\n                  tenders(first: $first, last: $last) {\n                    edges {\n                      node {\n                        id\n                        __typename\n                      }\n                      cursor\n                    }\n                    pageInfo {\n                      endCursor\n                      hasNextPage\n                      hasPreviousPage\n                      startCursor\n                    }\n                  }\n                  ...customersVisitRecordListFragment\n                  ...customersTenderListFragment_2pIUTM\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment customersTenderListFragment_2pIUTM on Customer {\n  tenders(first: $first, last: $last) {\n    edges {\n      node {\n        id\n        ...tenderListItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment customersVisitRecordListFragment on Customer {\n  visitRecords(orderBy: $orderBy) {\n    edges {\n      node {\n        id\n        date\n        visitType\n        commPeople\n        commContent\n        nextStep\n        tender {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  name\n  status\n  createdAt\n  estimatedAmount\n  customer {\n    id\n    name\n  }\n  images\n  fullAddress\n  tenderDate\n  discoveryDate\n  tenderClosingDate\n  area {\n    id\n    name\n    code\n  }\n}\n"
  }
};
})();

(node as any).hash = "401f6da8321694d4d2c87d14b743253e";

export default node;
