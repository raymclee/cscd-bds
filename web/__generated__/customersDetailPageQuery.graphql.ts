/**
 * @generated SignedSource<<13b4e67c9b2a4adf4a3956facfeba208>>
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
  id: string;
  orderBy?: ReadonlyArray<VisitRecordOrder> | null | undefined;
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
  "name": "id"
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
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "industry",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPerson",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPosition",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPhone",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonEmail",
  "storageKey": null
},
v16 = {
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
v17 = [
  (v16/*: any*/)
],
v18 = [
  {
    "kind": "Variable",
    "name": "orderBy",
    "variableName": "orderBy"
  }
],
v19 = [
  (v6/*: any*/),
  (v5/*: any*/)
],
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "Area",
  "kind": "LinkedField",
  "name": "area",
  "plural": false,
  "selections": (v19/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "customersDetailPageQuery",
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
                            "args": (v4/*: any*/),
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
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "createdBy",
                                        "plural": false,
                                        "selections": (v7/*: any*/),
                                        "storageKey": null
                                      },
                                      (v8/*: any*/),
                                      (v9/*: any*/),
                                      (v10/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/),
                                      (v14/*: any*/),
                                      (v15/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "sales",
                                        "plural": false,
                                        "selections": (v7/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Area",
                                        "kind": "LinkedField",
                                        "name": "area",
                                        "plural": false,
                                        "selections": (v7/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
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
                                            "selections": (v17/*: any*/),
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": (v18/*: any*/),
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
                                            "selections": (v17/*: any*/),
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
                                        "args": null,
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
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "customersDetailPageQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
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
                            "args": (v4/*: any*/),
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
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "User",
                                        "kind": "LinkedField",
                                        "name": "createdBy",
                                        "plural": false,
                                        "selections": (v19/*: any*/),
                                        "storageKey": null
                                      },
                                      (v8/*: any*/),
                                      (v9/*: any*/),
                                      (v10/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/),
                                      (v14/*: any*/),
                                      (v15/*: any*/),
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
                                      (v20/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
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
                                              (v16/*: any*/),
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
                                                  (v20/*: any*/)
                                                ],
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
                                        "args": (v18/*: any*/),
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
                                              (v16/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "VisitRecord",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v5/*: any*/),
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
                          (v5/*: any*/)
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
      }
    ]
  },
  "params": {
    "cacheID": "f240ec7552afce4e96e853596217a29a",
    "id": null,
    "metadata": {},
    "name": "customersDetailPageQuery",
    "operationKind": "query",
    "text": "query customersDetailPageQuery(\n  $userId: ID!\n  $id: ID!\n  $orderBy: [VisitRecordOrder!]\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      areas {\n        edges {\n          node {\n            customers(where: {id: $id}) {\n              edges {\n                node {\n                  id\n                  name\n                  createdBy {\n                    name\n                    id\n                  }\n                  updatedAt\n                  ownerType\n                  industry\n                  size\n                  contactPerson\n                  contactPersonPosition\n                  contactPersonPhone\n                  contactPersonEmail\n                  sales {\n                    name\n                    id\n                  }\n                  area {\n                    name\n                    id\n                  }\n                  ...customersVisitRecordListFragment\n                  ...customersTenderListFragment\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment customersTenderListFragment on Customer {\n  tenders {\n    edges {\n      node {\n        id\n        ...tenderListItemFragment\n      }\n    }\n  }\n}\n\nfragment customersVisitRecordListFragment on Customer {\n  visitRecords(orderBy: $orderBy) {\n    edges {\n      node {\n        id\n        date\n        visitType\n        commPeople\n        commContent\n        nextStep\n        tender {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  name\n  status\n  createdAt\n  estimatedAmount\n  customer {\n    name\n    id\n  }\n  images\n  fullAddress\n  tenderDate\n  discoveryDate\n  area {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "15b627a94a19ecb34581d96fad81122f";

export default node;
