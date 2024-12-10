/**
 * @generated SignedSource<<7fe017f80f3196325aabdcac66054f8e>>
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
                readonly sales: {
                  readonly id: string;
                } | null | undefined;
                readonly tenders: {
                  readonly edges: ReadonlyArray<{
                    readonly __id: string;
                  } | null | undefined> | null | undefined;
                };
                readonly visitRecords: {
                  readonly edges: ReadonlyArray<{
                    readonly __id: string;
                  } | null | undefined> | null | undefined;
                };
                readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment" | "customerTenderListFragment" | "customerVisitRecordListFragment">;
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
  "name": "cursor",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = [
  (v9/*: any*/)
],
v11 = {
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
v12 = {
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
v13 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v14 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v15 = {
  "kind": "Variable",
  "name": "last",
  "variableName": "last"
},
v16 = [
  (v14/*: any*/),
  (v15/*: any*/),
  (v13/*: any*/)
],
v17 = [
  (v14/*: any*/),
  (v15/*: any*/)
],
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v19 = [
  (v7/*: any*/),
  (v18/*: any*/)
],
v20 = {
  "count": null,
  "cursor": null,
  "direction": "bidirectional",
  "path": null
};
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
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "sales",
                                        "plural": false,
                                        "selections": [
                                          (v7/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "tenders",
                                        "args": null,
                                        "concreteType": "TenderConnection",
                                        "kind": "LinkedField",
                                        "name": "__customerTenderListFragment_tenders_connection",
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
                                              (v8/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Tender",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": (v10/*: any*/),
                                                "storageKey": null
                                              },
                                              (v11/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v12/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "visitRecords",
                                        "args": [
                                          (v13/*: any*/)
                                        ],
                                        "concreteType": "VisitRecordConnection",
                                        "kind": "LinkedField",
                                        "name": "__customerVisitRecordListFragment_visitRecords_connection",
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
                                              (v8/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "VisitRecord",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": (v10/*: any*/),
                                                "storageKey": null
                                              },
                                              (v11/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v12/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "args": null,
                                        "kind": "FragmentSpread",
                                        "name": "customerDetailFragment"
                                      },
                                      {
                                        "args": (v16/*: any*/),
                                        "kind": "FragmentSpread",
                                        "name": "customerVisitRecordListFragment"
                                      },
                                      {
                                        "args": (v17/*: any*/),
                                        "kind": "FragmentSpread",
                                        "name": "customerTenderListFragment"
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
          (v9/*: any*/),
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
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "sales",
                                        "plural": false,
                                        "selections": (v19/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v17/*: any*/),
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
                                              (v8/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Tender",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v9/*: any*/),
                                                  (v7/*: any*/),
                                                  (v18/*: any*/),
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
                                                    "selections": (v19/*: any*/),
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
                                                      (v18/*: any*/),
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
                                              (v11/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v12/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v17/*: any*/),
                                        "filters": null,
                                        "handle": "connection",
                                        "key": "customerTenderListFragment_tenders",
                                        "kind": "LinkedHandle",
                                        "name": "tenders"
                                      },
                                      {
                                        "alias": null,
                                        "args": (v16/*: any*/),
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
                                              (v8/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "VisitRecord",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v9/*: any*/),
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
                                                    "selections": (v19/*: any*/),
                                                    "storageKey": null
                                                  }
                                                ],
                                                "storageKey": null
                                              },
                                              (v11/*: any*/)
                                            ],
                                            "storageKey": null
                                          },
                                          (v12/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v16/*: any*/),
                                        "filters": [
                                          "orderBy"
                                        ],
                                        "handle": "connection",
                                        "key": "customerVisitRecordListFragment_visitRecords",
                                        "kind": "LinkedHandle",
                                        "name": "visitRecords"
                                      },
                                      (v7/*: any*/),
                                      (v18/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "createdBy",
                                        "plural": false,
                                        "selections": [
                                          (v18/*: any*/),
                                          (v7/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "updatedAt",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "ownerType",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "industry",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "size",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Area",
                                        "kind": "LinkedField",
                                        "name": "area",
                                        "plural": false,
                                        "selections": (v19/*: any*/),
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
    "cacheID": "ba1d1959efd38740132d52de5b079f1b",
    "id": null,
    "metadata": {
      "connection": [
        (v20/*: any*/),
        (v20/*: any*/)
      ]
    },
    "name": "customersDetailPageQuery",
    "operationKind": "query",
    "text": "query customersDetailPageQuery(\n  $userId: ID!\n  $id: ID!\n  $orderBy: VisitRecordOrder\n  $first: Int\n  $last: Int\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      areas {\n        edges {\n          node {\n            customers(where: {id: $id}) {\n              edges {\n                node {\n                  sales {\n                    id\n                  }\n                  tenders(first: $first, last: $last) {\n                    edges {\n                      cursor\n                      node {\n                        __typename\n                        id\n                      }\n                    }\n                    pageInfo {\n                      endCursor\n                      hasNextPage\n                      hasPreviousPage\n                      startCursor\n                    }\n                  }\n                  visitRecords(first: $first, last: $last, orderBy: $orderBy) {\n                    edges {\n                      cursor\n                      node {\n                        __typename\n                        id\n                      }\n                    }\n                    pageInfo {\n                      endCursor\n                      hasNextPage\n                      hasPreviousPage\n                      startCursor\n                    }\n                  }\n                  ...customerDetailFragment\n                  ...customerVisitRecordListFragment_4d76iu\n                  ...customerTenderListFragment_2pIUTM\n                  id\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment customerDetailContactFragment on Customer {\n  id\n}\n\nfragment customerDetailFragment on Customer {\n  id\n  name\n  createdBy {\n    name\n    id\n  }\n  updatedAt\n  ownerType\n  industry\n  size\n  sales {\n    id\n    name\n  }\n  area {\n    id\n    name\n  }\n  ...customerDetailContactFragment\n}\n\nfragment customerTenderListFragment_2pIUTM on Customer {\n  tenders(first: $first, last: $last) {\n    edges {\n      node {\n        id\n        ...tenderListItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment customerVisitRecordListFragment_4d76iu on Customer {\n  visitRecords(first: $first, last: $last, orderBy: $orderBy) {\n    edges {\n      node {\n        id\n        date\n        visitType\n        commPeople\n        commContent\n        nextStep\n        tender {\n          id\n          name\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  name\n  status\n  createdAt\n  estimatedAmount\n  customer {\n    id\n    name\n  }\n  images\n  fullAddress\n  tenderDate\n  discoveryDate\n  tenderClosingDate\n  area {\n    id\n    name\n    code\n  }\n}\n"
  }
};
})();

(node as any).hash = "38331d4cf61b6b7cc2c99130e99f7a2f";

export default node;
